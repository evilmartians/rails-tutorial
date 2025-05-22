---
type: lesson
title: Database Migrations
custom:
  shell:
    workdir: "/workspace/store"
  fs:
    remove:
      - "/workspace/store"
---

Database Migrations
-------------------

A _migration_ is a set of changes we want to make to our database.

By defining migrations, we're telling Rails how to change the database to add,
change, or remove tables, columns or other attributes of our database. This
helps keep track of changes we make in development (only on our computer) so
they can be deployed to production (live, online!) safely.

In the editor, open the migration Rails created for us so we can see what
the migration does. This is located in
`db/migrate/<timestamp>_create_products.rb`:

```file:/workspace/store/db/migrate/20250521010850_create_products.rb
```

This migration is telling Rails to create a new database table named `products`.

:::info
In contrast to the model above, Rails makes the database table names
_plural_, because the database holds all of the instances of each model (i.e.,
You are creating a database of _products_).
:::

The `create_table` block then defines which columns and types should be defined
in this database table.

`t.string :name` tells Rails to create a column in the `products` table called
`name` and set the type as `string`.

`t.timestamps` is a shortcut for defining two columns on your models:
`created_at:datetime` and `updated_at:datetime`. You'll see these columns on
most Active Record models in Rails and they are automatically set by Active
Record when creating or updating records.
