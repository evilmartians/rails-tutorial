---
type: lesson
title: Adding Subscribers to Products
focus: /workspace/store
previews:
  - 3000
custom:
  shell:
    workdir: "/workspace/store"
---

### Adding Subscribers to Products

In order to notify users that a product is back in stock, we need to keep track of these subscribers.

Let's generate a model called Subscriber to store these email addresses and associate them with the respective product.

```bash
bin/rails generate model Subscriber product:belongs_to email
```

Then run the new migration:

```bash
bin/rails db:migrate
```

By including `product:belongs_to` above, we told Rails that subscribers and products have a one-to-many relationship, meaning a Subscriber "belongs to" a single Product instance.

A Product, however, can have many subscribers, so we then add `has_many :subscribers, dependent: :destroy` to our Product model to add the second part of this association between the two models. This tells Rails how to join queries between the two database tables.

```ruby ins={5}
class Product < ApplicationRecord
  has_one_attached :featured_image
  has_rich_text :description
  validates :name, presence: true
  validates :inventory_count, numericality: { greater_than_or_equal_to: 0 }
  has_many :subscribers, dependent: :destroy
end
```

Now we need a controller to create these subscribers. Let's create that in `app/controllers/subscribers_controller.rb` with the following code:

```ruby
class SubscribersController < ApplicationController
  allow_unauthenticated_access
  before_action :set_product

  def create
    @product.subscribers.where(subscriber_params).first_or_create
    redirect_to @product, notice: "You are now subscribed."
  end

  private

  def set_product
    @product = Product.find(params[:product_id])
  end

  def subscriber_params
    params.expect(subscriber: [ :email ])
  end
end
```

Our redirect sets a notice in the Rails flash. The flash is used for storing messages to display on the next page.

To display the flash message, let's add the notice to `app/views/layouts/application.html.erb` inside the body:

```erb ins={14}
<!DOCTYPE html>
<html>
  <head>
    <title>Store</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>
    
    <%= stylesheet_link_tag "application", "data-turbo-track": "reload" %>
    <%= javascript_importmap_tags %>
  </head>

  <body>
    <div class="notice"><%= notice %></div>
    <nav>
      <%= link_to "Home", root_path %>
      <%= link_to "Login", new_session_path unless authenticated? %>
      <%= button_to "Log out", session_path, method: :delete if authenticated? %>
    </nav>

    <main>
      <%= yield %>
    </main>
  </body>
</html>
```

To subscribe users to a specific product, we'll use a nested route so we know which product the subscriber belongs to. In `config/routes.rb` change `resources :products` to the following:

```ruby ins={2-4} del={2}
Rails.application.routes.draw do
  resources :products
  resources :products do
    resources :subscribers, only: [ :create ]
  end

  # Defines the root path route ("/")
  root "products#index"
end
```

On the product show page, we can check if there is inventory and display the amount in stock. Otherwise, we can display an out of stock message with the subscribe form to get notified when it is back in stock.

Create a new partial at `app/views/products/_inventory.html.erb` and add the following:

```erb
<% if product.inventory_count? %>
  <p><%= product.inventory_count %> in stock</p>
<% else %>
  <p>Out of stock</p>
  <p>Email me when available.</p>
  <%= form_with model: [product, Subscriber.new] do |form| %>
    <%= form.email_field :email, placeholder: "you@example.com", required: true %>
    <%= form.submit "Submit" %>
  <% end %>
<% end %>
```

Then update `app/views/products/show.html.erb` to render this partial after the `cache` block.

```erb ins={7}
<% cache @product do %>
  <%= image_tag @product.featured_image if @product.featured_image.attached? %>
  <h1><%= @product.name %></h1>
  <%= @product.description %>
<% end %>

<%= render "inventory", product: @product %>

<%= link_to "Back", products_path %>
<% if authenticated? %>
  <%= link_to "Edit", edit_product_path(@product) %>
  <%= button_to "Delete", @product, method: :delete, data: { turbo_confirm: "Are you sure?" } %>
<% end %>
```

Now users can subscribe to be notified when products are back in stock!