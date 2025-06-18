---
type: lesson
title: Consistently Formatted Code with RuboCop
focus: /workspace/store
previews:
  - 3000
custom:
  shell:
    workdir: "/workspace/store"
---

### Consistently Formatted Code with RuboCop

When writing code we may sometimes use inconsistent formatting. Rails comes with a linter called RuboCop that helps keep our code formatted consistently.

We can check our code for consistency by running:

```bash
bin/rubocop
```

This will print out any offenses and tell you what they are.

```
Inspecting 53 files
.....................................................

53 files inspected, no offenses detected
```

RuboCop can automatically fix offenses using the `--autocorrect` flag (or its short version `-a`).

```bash
bin/rubocop -a
```

## Understanding RuboCop

RuboCop is a Ruby static code analyzer and formatter that helps maintain consistent code style:

1. **Style checking** - Enforces Ruby style guide conventions
2. **Code complexity** - Identifies overly complex methods and classes
3. **Performance** - Suggests performance improvements
4. **Security** - Catches potential security issues
5. **Auto-correction** - Automatically fixes many style issues

### Key Features

- **Configurable rules** - Customize which rules to enforce
- **Multiple output formats** - JSON, HTML, JUnit for CI integration
- **Editor integration** - Works with VS Code, Vim, Emacs, and more
- **Team consistency** - Ensures all team members follow the same style
- **Gradual adoption** - Can be introduced incrementally

### Best Practices

- **Run regularly** - Include in development workflow
- **Configure thoughtfully** - Adjust rules to match team preferences
- **Fix incrementally** - Address violations gradually in large codebases
- **Integrate with CI** - Ensure style consistency in pull requests
- **Document exceptions** - Use comments to explain rule violations when necessary

RuboCop helps maintain professional, readable code that's easier to maintain and review!