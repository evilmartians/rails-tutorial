---
type: lesson
title: Fixtures
focus: /workspace/store/test/fixtures/products.yml
previews:
  - 3000
custom:
  shell:
    workdir: "/workspace/store"
---

Testing
-------

Rails comes with a robust test suite. Let's write a test to ensure that the
correct number of emails are sent when a product is back in stock.

### Fixtures

When you generate a model using Rails, it automatically creates a corresponding
fixture file in the `test/fixtures` directory.

Fixtures are predefined sets of data that populate your test database before
running tests. They allow you to define records with easy-to-remember names,
making it simple to access them in your tests.

This file will be empty by default - you need to populate it with fixtures for
your tests.

Let’s update the product fixtures file at `test/fixtures/products.yml` with the
following:

```yaml
tshirt:
  name: T-Shirt
  inventory_count: 15
```

And for subscribers, let's add these two fixtures to
`test/fixtures/subscribers.yml`:

```yaml
david:
  product: tshirt
  email: david@example.org

chris:
  product: tshirt
  email: chris@example.org
```

You'll notice that we can reference the `Product` fixture by name here. Rails
associates this automatically for us in the database so we don't have to manage
record IDs and associations in tests.

These fixtures will be automatically inserted into the database when we run our
test suite.
