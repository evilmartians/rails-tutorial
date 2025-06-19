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

File Uploads with Active Storage
--------------------------------

Action Text is built upon another feature of Rails called Active Storage that
makes it easy to upload files.

~~Try editing a product and dragging an image into the rich text editor, then
update the record. You'll see that Rails uploads this image and renders it
inside the rich text editor. Cool, right?!~~ _Action Text embeds are not supported in the browser yet, sorry_.

We can also use Active Storage directly. Let's add a featured image to the
`Product` model.

```ruby ins={2}
class Product < ApplicationRecord
  has_one_attached :featured_image
  has_rich_text :description
  validates :name, presence: true
end
```

Then we can add a file upload field to our product form before the submit
button:

```erb ins={4-7}
<%= form_with model: product do |form| %>
  <%# ... %>

  <div>
    <%= form.label :featured_image, style: "display: block" %>
    <%= form.file_field :featured_image, accept: "image/*" %>
  </div>

  <div>
    <%= form.submit %>
  </div>
<% end %>
```

Add `:featured_image` as a permitted parameter in
`app/controllers/products_controller.rb`

```ruby {3}
    # Only allow a list of trusted parameters through.
    def product_params
      params.expect(product: [ :name, :description, :featured_image ])
    end
```

Lastly, we want to display the featured image for our product in
`app/views/products/show.html.erb`. Add the following to the top.

```erb
<%= image_tag @product.featured_image if @product.featured_image.attached? %>
```

Try uploading an image for a product and you'll see the image displayed on the
show page after saving.

Check out the [Active Storage Overview](https://guides.rubyonrails.org/active_storage_overview.html) for more
details.
