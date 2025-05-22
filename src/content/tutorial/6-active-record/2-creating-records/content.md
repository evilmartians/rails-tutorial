---
type: lesson
title: Creating Records
focus: /workspace/store/app/models/product.rb
custom:
  shell:
    workdir: "/workspace/store"
---

### Creating Records

We can instantiate a new Product record with the following code:

```irb
store(dev)> product = Product.new(name: "T-Shirt")
=> #<Product:0x000000012e616c30 id: nil, name: "T-Shirt", created_at: nil, updated_at: nil>
```

The `product` variable is an instance of `Product`. It has not been saved to the
database, and so does not have an ID, created_at, or updated_at timestamps.

We can call `save` to write the record to the database.

```irb
store(dev)> product.save
  TRANSACTION (0.1ms)  BEGIN immediate TRANSACTION /*application='Store'*/
  Product Create (0.9ms)  INSERT INTO "products" ("name", "created_at", "updated_at") VALUES ('T-Shirt', '2024-11-09 16:35:01.117836', '2024-11-09 16:35:01.117836') RETURNING "id" /*application='Store'*/
  TRANSACTION (0.9ms)  COMMIT TRANSACTION /*application='Store'*/
=> true
```

When `save` is called, Rails takes the attributes in memory and generates an
`INSERT` SQL query to insert this record into the database.

Rails also updates the object in memory with the database record `id` along with
the `created_at` and `updated_at` timestamps. We can see that by printing out
the `product` variable.

```irb
store(dev)> product
=> #<Product:0x00000001221f6260 id: 1, name: "T-Shirt", created_at: "2024-11-09 16:35:01.117836000 +0000", updated_at: "2024-11-09 16:35:01.117836000 +0000">
```

Similar to `save`, we can use `create` to instantiate and save an Active Record
object in a single call.

```irb
store(dev)> Product.create(name: "Pants")
  TRANSACTION (0.1ms)  BEGIN immediate TRANSACTION /*application='Store'*/
  Product Create (0.4ms)  INSERT INTO "products" ("name", "created_at", "updated_at") VALUES ('Pants', '2024-11-09 16:36:01.856751', '2024-11-09 16:36:01.856751') RETURNING "id" /*application='Store'*/
  TRANSACTION (0.1ms)  COMMIT TRANSACTION /*application='Store'*/
=> #<Product:0x0000000120485c80 id: 2, name: "Pants", created_at: "2024-11-09 16:36:01.856751000 +0000", updated_at: "2024-11-09 16:36:01.856751000 +0000">
```
