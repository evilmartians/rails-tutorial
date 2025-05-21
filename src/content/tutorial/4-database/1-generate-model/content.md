---
type: lesson
title: Model generator
custom:
  shell:
    workdir: "/workspace/store"
---

Generate a model
----------------

Active Record is a feature of Rails that maps relational databases to Ruby code.
It helps generate the structured query language (SQL) for interacting with the
database like creating, updating, and deleting tables and records. Our
application is using SQLite which is the default for Rails.

Let's start by adding a database table to our Rails application to add products
to our simple e-commerce store. Run the following command in the terminal:

```bash
$ bin/rails generate model Product name:string
```

This command tells Rails to generate a model named `Product` which has a `name`
column and type of `string` in the database. Later on, you'll learn how to add
other column types.

You should see the following in your terminal:

```bash
      invoke  active_record
      create    db/migrate/20250526151900_create_products.rb
      create    app/models/product.rb
      invoke    test_unit
      create      test/models/product_test.rb
      create      test/fixtures/products.yml
```

This command does several things. It creates...

1. A migration in the `db/migrate` folder.
2. An Active Record model in `app/models/product.rb`.
3. Tests and test fixtures for this model.

:::info
Model names are *singular*, because an instantiated model represents a
single record in the database (i.e., You are creating a _product_ to add to the
database.).
:::
