---
type: lesson
title: Instance Variables
focus: /workspace/store/app/controllers/products_controller.rb
previews:
  - 3000
custom:
  shell:
    workdir: "/workspace/store"
---

### Instance Variables

Let's take this a step further and render some records from our database.

In the `index` action, let's add a database query and assign it to an instance
variable. Rails uses instance variables (variables that start with an @) to
share data with the views.

```ruby ins={3}
class ProductsController < ApplicationController
  def index
    @products = Product.all
  end
end
```

In `app/views/products/index.html.erb`, we can replace the HTML with this ERB:

```erb
<%= debug @products %>
```

ERB is short for [Embedded Ruby](https://docs.ruby-lang.org/en/master/ERB.html)
and allows us to execute Ruby code to dynamically generate HTML with Rails. The
`<%= %>` tag tells ERB to execute the Ruby code inside and output the return
value. In our case, this takes `@products`, converts it to YAML, and outputs the
YAML.

Now refresh http://localhost:3000/ in your browser and you'll see that the
output has changed. What you're seeing is the records in your database being
displayed in YAML format.

The `debug` helper prints out variables in YAML format to help with debugging.
For example, if you weren't paying attention and typed singular `@product`
instead of plural `@products`, the debug helper could help you identify that the
variable was not set correctly in the controller.

TIP: Check out the [Action View Helpers guide](action_view_helpers.html) to see
more helpers that are available.

Let's update `app/views/products/index.html.erb` to render all of our product
names.

```erb
<h1>Products</h1>

<div id="products">
  <% @products.each do |product| %>
    <div>
      <%= product.name %>
    </div>
  <% end %>
</div>
```

Using ERB, this code loops through each product in the `@products`
`ActiveRecord::Relation` object and renders a `<div>` tag containing the product
name.

We've used a new ERB tag this time as well. `<% %>` evaluates the Ruby code but
does not output the return value. That ignores the output of `@products.each`
which would output an array that we don't want in our HTML.
