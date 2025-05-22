---
type: lesson
title: Running Migrations
focus: /workspace/store/db/migrate/20250521010850_create_products.rb
custom:
  shell:
    workdir: "/workspace/store"
  fs:
    remove:
      - "/workspace/store"
---

Running Migrations
-------------------

Now that you have defined what changes to make to the database, use the
following command to run the migrations:

```bash
$ bin/rails db:migrate
```

This command checks for any new migrations and applies them to your database.
Its output looks like this:

```bash
== 20250521010850 CreateProducts: migrating ===================================
-- create_table(:products)
   -> 0.0030s
== 20250521010850 CreateProducts: migrated (0.0031s) ==========================
```

:::tip
If you make a mistake, you can run `bin/rails db:rollback` to undo the last
migration.
:::
