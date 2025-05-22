---
type: lesson
title: Querying Records
focus: /workspace/store/app/models/product.rb
custom:
  shell:
    workdir: "/workspace/store"
---

### Querying Records

We can also look up records from the database using our Active Record model.

To find all the Product records in the database, we can use the `all` method.
This is a _class_ method, which is why we can use it on Product (versus an
instance method that we would call on the product instance, like `save` above).

```irb
store(dev)> Product.all
  Product Load (0.1ms)  SELECT "products".* FROM "products" /* loading for pp */ LIMIT 11 /*application='Store'*/
=> [#<Product:0x0000000121845158 id: 1, name: "T-Shirt", created_at: "2024-11-09 16:35:01.117836000 +0000", updated_at: "2024-11-09 16:35:01.117836000 +0000">,
 #<Product:0x0000000121845018 id: 2, name: "Pants", created_at: "2024-11-09 16:36:01.856751000 +0000", updated_at: "2024-11-09 16:36:01.856751000 +0000">]
```

This generates a `SELECT` SQL query to load all records from the `products`
table. Each record is automatically converted into an instance of our Product
Active Record model so we can easily work with them from Ruby.

TIP: The `all` method returns an `ActiveRecord::Relation` object which is an
Array-like collection of database records with features to filter, sort, and
execute other database operations.
