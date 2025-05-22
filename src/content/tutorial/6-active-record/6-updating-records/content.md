---
type: lesson
title: Updating Records
focus: /workspace/store/app/models/product.rb
custom:
  shell:
    workdir: "/workspace/store"
---

### Updating Records

Records can be updated in 2 ways: using `update` or assigning attributes and
calling `save`.

We can call `update` on a Product instance and pass in a Hash of new attributes
to save to the database. This will assign the attributes, run validations, and
save the changes to the database in one method call.

```irb
store(dev)> product = Product.find(1)
store(dev)> product.update(name: "Shoes")
  TRANSACTION (0.1ms)  BEGIN immediate TRANSACTION /*application='Store'*/
  Product Update (0.3ms)  UPDATE "products" SET "name" = 'Shoes', "updated_at" = '2024-11-09 22:38:19.638912' WHERE "products"."id" = 1 /*application='Store'*/
  TRANSACTION (0.4ms)  COMMIT TRANSACTION /*application='Store'*/
=> true
```

This updated the name of the "T-Shirt" product to "Shoes" in the database.
Confirm this by running `Product.all` again.

```irb
store(dev)> Product.all
```

You will see two products: Shoes and Pants.

```irb
  Product Load (0.3ms)  SELECT "products".* FROM "products" /* loading for pp */ LIMIT 11 /*application='Store'*/
=>
[#<Product:0x000000012c0f7300
  id: 1,
  name: "Shoes",
  created_at: "2024-12-02 20:29:56.303546000 +0000",
  updated_at: "2024-12-02 20:30:14.127456000 +0000">,
 #<Product:0x000000012c0f71c0
  id: 2,
  name: "Pants",
  created_at: "2024-12-02 20:30:02.997261000 +0000",
  updated_at: "2024-12-02 20:30:02.997261000 +0000">]
```

Alternatively, we can assign attributes and call `save` when we're ready to
validate and save changes to the database.

Let's change the name "Shoes" back to "T-Shirt".

```irb
store(dev)> product = Product.find(1)
store(dev)> product.name = "T-Shirt"
=> "T-Shirt"
store(dev)> product.save
  TRANSACTION (0.1ms)  BEGIN immediate TRANSACTION /*application='Store'*/
  Product Update (0.2ms)  UPDATE "products" SET "name" = 'T-Shirt', "updated_at" = '2024-11-09 22:39:09.693548' WHERE "products"."id" = 1 /*application='Store'*/
  TRANSACTION (0.0ms)  COMMIT TRANSACTION /*application='Store'*/
=> true
```
