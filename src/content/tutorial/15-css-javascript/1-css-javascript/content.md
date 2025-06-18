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

### Adding CSS & JavaScript

CSS & JavaScript are core to building web applications, so let's learn how to use them with Rails.

## Propshaft

Rails' asset pipeline is called Propshaft. It takes your CSS, JavaScript, images, and other assets and serves them to your browser. In production, Propshaft keeps track of each version of your assets so they can be cached to make your pages faster.

Let's modify `app/assets/stylesheets/application.css` and change our font to sans-serif.

```css ins={14-42} del={13}
/*
 * This is a manifest file that'll be compiled into application.css, which will include all the files
 * listed below.
 *
 * Any CSS (and SCSS, if configured) file within this directory, lib/assets/stylesheets, or any plugin's
 * vendor/assets/stylesheets directory can be referenced here using a relative path.
 *
 * You're free to add application-wide styles to this file and they'll appear at the bottom of the
 * compiled file so the styles you add here take precedence over styles defined in any other CSS
 * files in this directory. Styles in this file should be added after the last require_* statement.
 * It is generally better to create a new file per style scope.
 *
 *= require_tree .
 *= require_self
 */

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

```erb ins={1} ins={3-12} del={1-9}
<p><%= link_to "Back", products_path %></p>

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

## Import Maps

Rails uses import maps for JavaScript by default. This allows you to write modern JavaScript modules with no build steps.

You can find the JavaScript pins in `config/importmap.rb`. This file maps the JavaScript package names with the source file which is used to generate the importmap tag in the browser.

```ruby
# Pin npm packages by running ./bin/importmap
pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
```

Each pin maps a JavaScript package name (e.g., `"@hotwired/turbo-rails"`) to a specific file or URL (e.g., `"turbo.min.js"`). `pin_all_from` maps all files in a directory (e.g., `app/javascript/controllers`) to a namespace (e.g., `"controllers"`).

Import maps keep the setup clean and minimal, while still supporting modern JavaScript features.

What are these JavaScript files already in our import map? They are a frontend framework called Hotwire that Rails uses by default.

## Hotwire

Hotwire is a JavaScript framework designed to take full advantage of server-side generated HTML. It is comprised of 3 core components:

1. [**Turbo**](https://turbo.hotwired.dev/) handles navigation, form submissions, page components, and updates without writing any custom JavaScript.
2. [**Stimulus**](https://stimulus.hotwired.dev/) provides a framework for when you need custom JavaScript to add functionality to the page.
3. [**Native**](https://native.hotwired.dev/) allows you to make hybrid mobile apps by embedding your web app and progressively enhancing it with native mobile features.

We haven't written any JavaScript yet, but we have been using Hotwire on the frontend. For instance, the form you created to add and edit a product was powered by Turbo.

## How the Asset Pipeline Works

The Rails asset pipeline provides:

1. **Asset compilation** - Combines multiple files into fewer requests
2. **Fingerprinting** - Adds unique hashes to filenames for caching
3. **Compression** - Minifies CSS and JavaScript for production
4. **Preprocessing** - Supports Sass, CoffeeScript, and other preprocessors
5. **Development convenience** - Live reloading and source maps

This creates a powerful development experience while optimizing performance for production!