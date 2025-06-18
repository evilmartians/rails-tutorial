---
type: lesson
title: CRUD Actions
focus: /workspace/store/app/controllers/products_controller.rb
previews:
  - 3000
custom:
  shell:
    workdir: "/workspace/store"
---

### CRUD Actions

We need to be able to access individual products. This is the R in CRUD to read a resource.

We've already defined the route for individual products with our `resources :products` route. This generates `/products/:id` as a route that points to `products#show`.

Now we need to add that action to the `ProductsController` and define what happens when it is called.

## Showing Individual Products

Open the Products controller and add the `show` action like this:

```ruby ins={7-9}
class ProductsController < ApplicationController
  def index
    @products = Product.all
  end

  def show
    @product = Product.find(params[:id])
  end
end
```

The `show` action here defines the _singular_ `@product` because it's loading a single record from the database, in other words: Show this one product. We use plural `@products` in `index` because we're loading multiple products.

To query the database, we use `params` to access the request parameters. In this case, we're using the `:id` from our route `/products/:id`. When we visit `/products/1`, the params hash contains `{id: 1}` which results in our `show` action calling `Product.find(1)` to load Product with ID of `1` from the database.

We need a view for the show action next. Following the Rails naming conventions, the `ProductsController` expects views in `app/views` in a subfolder named `products`.

The `show` action expects a file in `app/views/products/show.html.erb`. Let's create that file and add the following contents:

```erb
<h1><%= @product.name %></h1>
<%= link_to "Back", products_path %>
```

It would be helpful for the index page to link to the show page for each product so we can click on them to navigate. We can update the `app/views/products/index.html.erb` view to link to this new page.

```erb ins={6-10} del={6-8}
<h1>Products</h1>

<div id="products">
  <% @products.each do |product| %>
    <div>
      <%= product.name %>
      <a href="/products/<%= product.id %>">
        <%= product.name %>
      </a>
    </div>
  <% end %>
</div>
```

Refresh this page in your browser and you'll see that this works, but we can do better.

Rails provides helper methods for generating paths and URLs. When you run `bin/rails routes`, you'll see the Prefix column. This prefix matches the helpers you can use for generating URLs with Ruby code.

```
                 Prefix Verb  URI Pattern                                            Controller#Action
                products GET  /products(.:format)                                        products#index
                 product GET  /products/:id(.:format)                                      products#show
```

These route prefixes give us helpers like the following:

- `products_path` generates `"/products"`
- `products_url` generates `"http://localhost:3000/products"`
- `product_path(1)` generates `"/products/1"`
- `product_url(1)` generates `"http://localhost:3000/products/1"`

`_path` returns a relative path which the browser understands is for the current domain.

`_url` returns a full URL including the protocol, host, and port.

URL helpers are useful for rendering emails that will be viewed outside of the browser.

Combined with the `link_to` helper, we can generate anchor tags and use the URL helper to do this cleanly in Ruby. `link_to` accepts the display content for the link (`product.name`) and the path or URL to link to for the `href` attribute (`product`).

Let's refactor this to use these helpers:

```erb ins={6-8} del={6-10}
<h1>Products</h1>

<div id="products">
  <% @products.each do |product| %>
    <div>
      <a href="/products/<%= product.id %>">
        <%= product.name %>
      </a>
      <%= link_to product.name, product %>
    </div>
  <% end %>
</div>
```

Now you can click on product names to view individual products!