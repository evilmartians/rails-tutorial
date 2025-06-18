---
type: lesson
title: File Uploads with Active Storage
focus: /workspace/store/app/models/product.rb
previews:
  - 3000
custom:
  shell:
    workdir: "/workspace/store"
---

### File Uploads with Active Storage

Action Text is built upon another feature of Rails called Active Storage that makes it easy to upload files.

Try editing a product and dragging an image into the rich text editor, then update the record. You'll see that Rails uploads this image and renders it inside the rich text editor. Cool, right?!

We can also use Active Storage directly. Let's add a featured image to the `Product` model.

```ruby ins={2}
class Product < ApplicationRecord
  has_one_attached :featured_image
  has_rich_text :description
  validates :name, presence: true
end
```

Then we can add a file upload field to our product form before the submit button:

```erb ins={12-15}
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
    <%= form.submit %>
  </div>
<% end %>
```

Add `:featured_image` as a permitted parameter in `app/controllers/products_controller.rb`

```ruby ins={45} del={45}
  # Only allow a list of trusted parameters through.
  def product_params
    params.expect(product: [ :name, :description ])
    params.expect(product: [ :name, :description, :featured_image ])
  end
```

Lastly, we want to display the featured image for our product in `app/views/products/show.html.erb`. Add the following to the top.

```erb ins={2}
<% cache @product do %>
  <%= image_tag @product.featured_image if @product.featured_image.attached? %>
  <h1><%= @product.name %></h1>
  <%= @product.description %>
<% end %>
<%= link_to "Back", products_path %>
<% if authenticated? %>
  <%= link_to "Edit", edit_product_path(@product) %>
  <%= button_to "Delete", @product, method: :delete, data: { turbo_confirm: "Are you sure?" } %>
<% end %>
```

Try uploading an image for a product and you'll see the image displayed on the show page after saving.

## How Active Storage Works

Active Storage provides a comprehensive file upload solution:

1. **File attachments** - Attach files to Active Record models
2. **Cloud storage** - Support for Amazon S3, Google Cloud Storage, and Microsoft Azure
3. **Local storage** - Store files locally for development
4. **Image processing** - Automatic image resizing and format conversion
5. **Direct uploads** - Upload files directly from the browser to cloud storage
6. **Metadata tracking** - Store file information like filename, content type, and size

### Attachment Types

Active Storage provides two types of attachments:

- **`has_one_attached`** - For single file attachments (like a featured image)
- **`has_many_attached`** - For multiple file attachments (like a photo gallery)

### File Processing

Active Storage can automatically process uploaded files:

```ruby
# Generate different sizes of images
user.avatar.variant(resize_to_limit: [100, 100])
user.avatar.variant(resize_to_fill: [300, 200])
```

The `image_tag` helper automatically generates appropriate `img` tags with the uploaded file's URL, making it easy to display images in your views.