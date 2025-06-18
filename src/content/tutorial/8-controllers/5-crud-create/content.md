---
type: lesson
title: "CRUD: Creating Products"
focus: /workspace/store/app/controllers/products_controller.rb
previews:
  - 3000
custom:
  shell:
    workdir: "/workspace/store"
---

### Creating Products

So far we've had to create products in the Rails console, but let's make this
work in the browser.

We need to create two actions for create:

1. The new product form to collect product information
2. The create action in the controller to save the product and check for errors

Let's start with our controller actions.

```ruby ins={9-12}
class ProductsController < ApplicationController
  def index
    @products = Product.all
  end

  def show
    @product = Product.find(params[:id])
  end

  def new
    @product = Product.new
  end
end
```

The `new` action instantiates a new `Product` which we will use for displaying
the form fields.

We can update `app/views/products/index.html.erb` to link to the new action.

```erb ins={3}
<h1>Products</h1>

<%= link_to "New product", new_product_path %>

<div id="products">
  <% @products.each do |product| %>
    <div>
      <%= link_to product.name, product_path(product.id) %>
    </div>
  <% end %>
</div>
```

Let's create `app/views/products/new.html.erb` to render the form for this new
`Product`.

```erb
<h1>New product</h1>

<%= form_with model: @product do |form| %>
  <div>
    <%= form.label :name %>
    <%= form.text_field :name %>
  </div>

  <div>
    <%= form.submit %>
  </div>
<% end %>
```

In this view, we are using the Rails `form_with` helper to generate an HTML form
to create products. This helper uses a *form builder* to handle things like CSRF
tokens, generating the URL based upon the `model:` provided, and even tailoring
the submit button text to the model.

If you open this page in your browser and View Source, the HTML for the form
will look like this:

```html
<form action="/products" accept-charset="UTF-8" method="post">
  <input type="hidden" name="authenticity_token" value="UHQSKXCaFqy_aoK760zpSMUPy6TMnsLNgbPMABwN1zpW-Jx6k-2mISiF0ulZOINmfxPdg5xMyZqdxSW1UK-H-Q" autocomplete="off">

  <div>
    <label for="product_name">Name</label>
    <input type="text" name="product[name]" id="product_name">
  </div>

  <div>
    <input type="submit" name="commit" value="Create Product" data-disable-with="Create Product">
  </div>
</form>
```

The form builder has included a CSRF token for security, configured the form for
UTF-8 support, set the input field names and even added a disabled state for the
submit button.

Because we passed a new `Product` instance to the form builder, it automatically
generated a form configured to send a `POST` request to `/products`, which is
the default route for creating a new record.

To handle this, we first need to implement the `create` action in our
controller.

```ruby ins={14-26}
class ProductsController < ApplicationController
  def index
    @products = Product.all
  end

  def show
    @product = Product.find(params[:id])
  end

  def new
    @product = Product.new
  end

  def create
    @product = Product.new(product_params)
    if @product.save
      redirect_to @product
    else
      render :new, status: :unprocessable_entity
    end
  end

  private
    def product_params
      params.expect(product: [ :name ])
    end
end
```

We're ready to give this feature a try—go to the Preview pane and try to create a new product!
