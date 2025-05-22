---
type: lesson
title: Active Record Basics
focus: /workspace/store/app/models/product.rb
custom:
  shell:
    workdir: "/workspace/store"
---

Active Record Basics
--------------------------

When we ran the Rails model generator to create the `Product` model, it created
a file at `app/models/product.rb`. This file creates a class that uses Active
Record for interacting with our `products` database table.

```ruby
class Product < ApplicationRecord
end
```

You might be surprised that there is no code in this class. How does Rails know
what defines this model?

When the `Product` model is used, Rails will query the database table for the
column names and types and automatically generate code for these attributes.
Rails saves us from writing this boilerplate code and instead takes care of it
for us behind the scenes so we can focus on our application logic instead.

Let's use the Rails console to see what columns Rails detects for the Product
model.

Run:

```irb
store(dev)> Product.column_names
```

And you should see:

```irb
=> ["id", "name", "created_at", "updated_at"]
```

Rails asked the database for column information above and used that information
to define attributes on the `Product` class dynamically so you don't have to
manually define each of them. This is one example of how Rails makes development
a breeze.
