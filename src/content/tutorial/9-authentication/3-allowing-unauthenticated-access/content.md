---
type: lesson
title: Allowing Unauthenticated Access
focus: /workspace/store/app/controllers/products_controller.rb
previews:
  - 3000
custom:
  shell:
    workdir: "/workspace/store"
---

### Allowing Unauthenticated Access

However, our store's product index and show pages should be accessible to everyone. By default, the Rails authentication generator will restrict all pages to authenticated users only.

To allow guests to view products, we can allow unauthenticated access in our controller.

```ruby ins={2}
class ProductsController < ApplicationController
  allow_unauthenticated_access only: %i[ index show ]
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

Log out and visit the products index and show pages to see they're accessible without being authenticated.

## Understanding Access Control

The `allow_unauthenticated_access` directive tells Rails which actions in this controller should be accessible to users who aren't logged in. In our case:

- **`index`** - Anyone can browse all products
- **`show`** - Anyone can view individual product details
- **`new`, `create`, `edit`, `update`, `destroy`** - Only authenticated users can manage products

This creates a good user experience where visitors can browse your store, but they need to create an account to manage products. This is a common pattern in e-commerce applications.

You can test this by:

1. Logging out of your application
2. Visiting the products index at http://localhost:3000/ - this should work
3. Trying to visit http://localhost:3000/products/new - this should prompt for authentication