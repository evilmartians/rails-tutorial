---
type: lesson
title: "CRUD: Deleting Products"
focus: /workspace/store/app/controllers/products_controller.rb
previews:
  - 3000
custom:
  shell:
    workdir: "/workspace/store"
---

### Deleting Products

The last feature we need to implement is deleting products. We will add a
`destroy` action to our `ProductsController` to handle `DELETE /products/:id`
requests.

Adding `destroy` to `before_action :set_product` lets us set the `@product`
instance variable in the same way we do for the other actions.

```ruby ins={2,35-38}
class ProductsController < ApplicationController
  before_action :set_product, only: %i[ show edit update destroy ]

  def index
    @products = Product.all
  end

  def show
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

  def edit
  end

  def update
    if @product.update(product_params)
      redirect_to @product
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @product.destroy
    redirect_to products_path
  end

  private
    def set_product
      @product = Product.find(params[:id])
    end

    def product_params
      params.expect(product: [ :name ])
    end
end
```

To make this work, we need to add a Delete button to
`app/views/products/show.html.erb`:

```erb ins={5}
<h1><%= @product.name %></h1>

<%= link_to "Back", products_path %>
<%= link_to "Edit", edit_product_path(@product) %>
<%= button_to "Delete", @product, method: :delete, data: { turbo_confirm: "Are you sure?" } %>
```

`button_to` generates a form with a single button in it with the "Delete" text.
When this button is clicked, it submits the form which makes a `DELETE` request
to `/products/:id` which triggers the `destroy` action in our controller.

The `turbo_confirm` data attribute tells the Turbo JavaScript library to ask the
user to confirm before submitting the form. We'll dig more into that shortly.

:::success
Go to the Preview pane and check that it works!
:::
