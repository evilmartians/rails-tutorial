---
type: lesson
title: Adding CSS & JavaScript
focus: /workspace/store/app/assets/stylesheets/application.css
previews:
  - 3000
custom:
  shell:
    workdir: "/workspace/store"
---

Adding CSS & JavaScript
-----------------------

CSS & JavaScript are core to building web applications, so let's learn how to
use them with Rails.

### Propshaft

Rails' asset pipeline is called Propshaft. It takes your CSS, JavaScript,
images, and other assets and serves them to your browser. In production,
Propshaft keeps track of each version of your assets so they can be cached to
make your pages faster. Check out the
[Asset Pipeline guide](asset_pipeline.html) to learn more about how this works.

Let's modify `app/assets/stylesheets/application.css` and change our font to
sans-serif.

```css
body {
  font-family: Arial, Helvetica, sans-serif;
  padding: 1rem;
}

nav {
  justify-content: flex-end;
  display: flex;
  font-size: 0.875em;
  gap: 0.5rem;
  max-width: 1024px;
  margin: 0 auto;
  padding: 1rem;
}

nav a {
  display: inline-block;
}

main {
  max-width: 1024px;
  margin: 0 auto;
}

.notice {
  color: green;
}

section.product {
  display: flex;
  gap: 1rem;
  flex-direction: row;
}

section.product img {
  border-radius: 8px;
  flex-basis: 50%;
  max-width: 50%;
}
```

Then we'll update `app/views/products/show.html.erb` to use these new styles.

```erb {1,3,6,18-19}
<p><%= link_to "Back", products_path %></p>

<section class="product">
  <%= image_tag @product.featured_image if @product.featured_image.attached? %>

  <section class="product-info">
    <% cache @product do %>
      <h1><%= @product.name %></h1>
      <%= @product.description %>
    <% end %>

    <%= render "inventory", product: @product %>

    <% if authenticated? %>
      <%= link_to "Edit", edit_product_path(@product) %>
      <%= button_to "Delete", @product, method: :delete, data: { turbo_confirm: "Are you sure?" } %>
    <% end %>
  </section>
</section>
```

Refresh your page and you'll see the CSS has been applied.
