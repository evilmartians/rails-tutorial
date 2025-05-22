---
type: lesson
title: Filtering & Ordering Records
focus: /workspace/store/app/models/product.rb
custom:
  shell:
    workdir: "/workspace/store"
---

### Filtering & Ordering Records

What if we want to filter the results from our database? We can use `where` to
filter records by a column.

```irb
store(dev)> Product.where(name: "Pants")
  Product Load (1.5ms)  SELECT "products".* FROM "products" WHERE "products"."name" = 'Pants' /* loading for pp */ LIMIT 11 /*application='Store'*/
=> [#<Product:0x000000012184d858 id: 2, name: "Pants", created_at: "2024-11-09 16:36:01.856751000 +0000", updated_at: "2024-11-09 16:36:01.856751000 +0000">]
```

This generates a `SELECT` SQL query but also adds a `WHERE` clause to filter the
records that have a `name` matching `"Pants"`. This also returns an
`ActiveRecord::Relation` because multiple records may have the same name.

We can use `order(name: :asc)` to sort records by name in ascending alphabetical order.

```irb
store(dev)> Product.order(name: :asc)
  Product Load (0.3ms)  SELECT "products".* FROM "products" /* loading for pp */ ORDER BY "products"."name" ASC LIMIT 11 /*application='Store'*/
=> [#<Product:0x0000000120e02a88 id: 2, name: "Pants", created_at: "2024-11-09 16:36:01.856751000 +0000", updated_at: "2024-11-09 16:36:01.856751000 +0000">,
 #<Product:0x0000000120e02948 id: 1, name: "T-Shirt", created_at: "2024-11-09 16:35:01.117836000 +0000", updated_at: "2024-11-09 16:35:01.117836000 +0000">]
```
