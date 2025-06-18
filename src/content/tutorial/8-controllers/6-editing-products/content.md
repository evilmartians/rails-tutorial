---
type: lesson
title: Editing Products
focus: /workspace/store/app/controllers/products_controller.rb
previews:
  - 3000
custom:
  shell:
    workdir: "/workspace/store"
---

### Editing Products

The process of editing records is very similar to creating records. Instead of `new` and `create` actions, we will have `edit` and `update`.

Let's implement them in the controller with the following:

```ruby ins={19-30}
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

  def edit
    @product = Product.find(params[:id])
  end

  def update
    @product = Product.find(params[:id])

    if @product.update(product_params)
      redirect_to @product
    else
      render :edit, status: :unprocessable_entity
    end
  end

  private
    def product_params
      params.expect(product: [ :name ])
    end
end
```

Next we can add an Edit link to `app/views/products/show.html.erb`:

```erb ins={3}
<h1><%= @product.name %></h1>
<%= link_to "Back", products_path %>
<%= link_to "Edit", edit_product_path(@product) %>
```

## Before Actions

Since `edit` and `update` require an existing database record like `show` we can deduplicate this into a `before_action`.

A `before_action` allows you to extract shared code between actions and run it _before_ the action. In the above controller code, `@product = Product.find(params[:id])` is defined in three different methods. Extracting this query to a before action called `set_product` cleans up our code for each action.

This is a good example of the DRY (Don't Repeat Yourself) philosophy in action.

```ruby ins={2} ins={37-39} del={7} del={24} del={29}
class ProductsController < ApplicationController
  before_action :set_product, only: %i[ show edit update ]

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

  def edit
    @product = Product.find(params[:id])
  end

  def update
    @product = Product.find(params[:id])

    if @product.update(product_params)
      redirect_to @product
    else
      render :edit, status: :unprocessable_entity
    end
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

## Extracting Partials

We've already written a form for creating new products. Wouldn't it be nice if we could reuse that for edit and update? We can, using a feature called "partials" that allows you to reuse a view in multiple places.

We can move the form into a file called `app/views/products/_form.html.erb`. The filename starts with an underscore to denote this is a partial.

We also want to replace any instance variables with a local variable, which we can define when we render the partial. We'll do this by replacing `@product` with `product`.

```erb
<%= form_with model: product do |form| %>
  <div>
    <%= form.label :name %>
    <%= form.text_field :name %>
  </div>

  <div>
    <%= form.submit %>
  </div>
<% end %>
```

Using local variables allows partials to be reused multiple times on the same page with a different value each time. This comes in handy rendering lists of items like an index page.

To use this partial in our `app/views/products/new.html.erb` view, we can replace the form with a render call:

```erb ins={2-3} del={3-12}
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
<%= render "form", product: @product %>
<%= link_to "Cancel", products_path %>
```

The edit view becomes almost the exact same thing thanks to the form partial. Let's create `app/views/products/edit.html.erb` with the following:

```erb
<h1>Edit product</h1>

<%= render "form", product: @product %>
<%= link_to "Cancel", @product %>
```

Now you can edit products by clicking the Edit link on any product's show page!