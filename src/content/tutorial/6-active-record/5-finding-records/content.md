---
type: lesson
title: Finding Records
focus: /workspace/store/app/models/product.rb
custom:
  shell:
    workdir: "/workspace/store"
---

### Finding Records

What if we want to find one specific record?

We can do this by using the `find` class method to look up a single record by
ID. Call the method and pass in the specific ID by using the following code:

```irb
store(dev)> Product.find(1)
  Product Load (0.2ms)  SELECT "products".* FROM "products" WHERE "products"."id" = 1 LIMIT 1 /*application='Store'*/
=> #<Product:0x000000012054af08 id: 1, name: "T-Shirt", created_at: "2024-11-09 16:35:01.117836000 +0000", updated_at: "2024-11-09 16:35:01.117836000 +0000">
```

This generates a `SELECT` query but specifies a `WHERE` for the `id` column
matching the ID of `1` that was passed in. It also adds a `LIMIT` to only return
a single record.

This time, we get a `Product` instance instead of an `ActiveRecord::Relation`
since we're only retrieving a single record from the database.
