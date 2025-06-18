---
type: lesson
title: Basic Inventory Tracking
focus: /workspace/store
previews:
  - 3000
custom:
  shell:
    workdir: "/workspace/store"
---

### Basic Inventory Tracking

A common feature of e-commerce stores is an email subscription to get notified when a product is back in stock. Now that we've seen the basics of Rails, let's add this feature to our store.

First, let's add an inventory count to the Product model so we can keep track of stock. We can generate this migration using the following command:

```bash
bin/rails generate migration AddInventoryCountToProducts inventory_count:integer
```

Then let's run the migration.

```bash
bin/rails db:migrate
```

We'll need to add the inventory count to the product form in `app/views/products/_form.html.erb`.

```erb ins={17-20}
<%= form_with model: product do |form| %>
  <div>
    <%= form.label :name %>
    <%= form.text_field :name %>
  </div>

  <div>
    <%= form.label :description, style: "display: block" %>
    <%= form.rich_text_area :description %>
  </div>

  <div>
    <%= form.label :featured_image, style: "display: block" %>
    <%= form.file_field :featured_image, accept: "image/*" %>
  </div>

  <div>
    <%= form.label :inventory_count, style: "display: block" %>
    <%= form.number_field :inventory_count %>
  </div>

  <div>
    <%= form.submit %>
  </div>
<% end %>
```

The controller also needs `:inventory_count` added to the permitted parameters.

```ruby ins={49} del={49}
  def product_params
    params.expect(product: [ :name, :description, :featured_image ])
    params.expect(product: [ :name, :description, :featured_image, :inventory_count ])
  end
```

It would also be helpful to validate that our inventory count is never a negative number, so let's also add a validation for that in our model.

```ruby ins={4}
class Product < ApplicationRecord
  has_one_attached :featured_image
  has_rich_text :description
  validates :name, presence: true
  validates :inventory_count, numericality: { greater_than_or_equal_to: 0 }
end
```

With these changes, we can now update the inventory count of products in our store.

## Understanding Inventory Management

Inventory tracking is a fundamental part of e-commerce applications:

1. **Stock levels** - Track how many items are available
2. **Validation** - Ensure inventory counts are valid (non-negative)
3. **User interface** - Allow easy inventory management
4. **Business logic** - Foundation for stock notifications and purchasing

### Key Features Added

- **Migration** - Database column for inventory tracking
- **Form field** - User interface for updating inventory
- **Validation** - Business rules for valid inventory counts
- **Parameter permission** - Security for form submissions

Try creating and editing products with different inventory counts to see how the system works!