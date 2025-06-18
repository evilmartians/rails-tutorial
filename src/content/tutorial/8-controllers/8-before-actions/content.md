---
type: lesson
title: "Before Actions"
focus: /workspace/store/app/controllers/products_controller.rb
previews:
  - 3000
custom:
  shell:
    workdir: "/workspace/store"
---

#### Before Actions

Since `edit` and `update` require an existing database record like `show` we can
deduplicate this into a `before_action`.

A `before_action` allows you to extract shared code between actions and run it
*before* the action. In the above controller code,
`@product = Product.find(params[:id])` is defined in three different methods.
Extracting this query to a before action called `set_product` cleans up our code
for each action.

This is a good example of the DRY (Don't Repeat Yourself) philosophy in action.

```ruby {2,8-9,24-25,27-33,36-38}
class ProductsController < ApplicationController
  before_action :set_product, only: %i[ show edit update ]

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

  private
    def set_product
      @product = Product.find(params[:id])
    end

    def product_params
      params.expect(product: [ :name ])
    end
end
```
