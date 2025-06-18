---
type: lesson
title: Continuous Integration with GitHub Actions
focus: /workspace/store/.github/workflows/ci.yml
previews:
  - 3000
custom:
  shell:
    workdir: "/workspace/store"
---

### Continuous Integration with GitHub Actions

Rails apps generate a `.github` folder that includes a prewritten GitHub Actions configuration that runs rubocop, brakeman, and our test suite.

When we push our code to a GitHub repository with GitHub Actions enabled, it will automatically run these steps and report back success or failure for each. This allows us to monitor our code changes for defects and issues and ensure consistent quality for our work.

Let's examine the GitHub Actions workflow file at `.github/workflows/ci.yml`:

```yaml
name: CI
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:14-alpine
        ports:
          - "5432:5432"
        env:
          POSTGRES_DB: rails_test
          POSTGRES_USER: rails
          POSTGRES_PASSWORD: password
    env:
      RAILS_ENV: test
      DATABASE_URL: "postgres://rails:password@localhost:5432/rails_test"
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Install Ruby and gems
        uses: ruby/setup-ruby@v1
        with:
          bundler-cache: true
      - name: Set up database schema
        run: bin/rails db:schema:load
      - name: Run tests
        run: bin/rails test

  lint:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Install Ruby and gems
        uses: ruby/setup-ruby@v1
        with:
          bundler-cache: true
      - name: Security audit dependencies
        run: bin/bundler-audit --update
      - name: Security audit application code
        run: bin/brakeman -q -w2
      - name: Lint Ruby files
        run: bin/rubocop --parallel
```

This workflow includes:

## Test Job

1. **Database setup** - Creates a PostgreSQL test database
2. **Ruby environment** - Installs Ruby and gems
3. **Database schema** - Loads the test database schema
4. **Test execution** - Runs the full test suite

## Lint Job

1. **Security auditing** - Checks for vulnerable dependencies
2. **Code security** - Runs Brakeman for security analysis
3. **Code style** - Runs RuboCop for style consistency

## Understanding CI/CD

Continuous Integration provides several benefits:

1. **Automated testing** - Every code change is automatically tested
2. **Quality gates** - Prevents broken code from being merged
3. **Fast feedback** - Developers get immediate feedback on their changes
4. **Consistency** - Same testing environment for all team members
5. **Documentation** - Test results provide change history

### CI Best Practices

- **Run on every push** - Catch issues early
- **Keep builds fast** - Quick feedback is crucial
- **Test in production-like environment** - Reduce environment-specific bugs
- **Fail fast** - Stop on first failure to save resources
- **Comprehensive testing** - Include unit, integration, and security tests

### GitHub Actions Benefits

- **Integrated with GitHub** - Seamless workflow with code reviews
- **Free for open source** - No cost for public repositories
- **Flexible configuration** - Supports complex workflows
- **Rich ecosystem** - Thousands of pre-built actions
- **Scalable** - Handles projects of any size

This automated pipeline ensures your Rails application maintains high quality and security standards!