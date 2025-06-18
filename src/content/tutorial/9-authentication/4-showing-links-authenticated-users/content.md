---
type: lesson
title: Showing Links for Authenticated Users Only
focus: /workspace/store/app/views/products/index.html.erb
previews:
  - 3000
custom:
  shell:
    workdir: "/workspace/store"
---

### Showing Links for Authenticated Users Only

Since only logged in users can create products, we can modify the `app/views/products/index.html.erb` view to only display the new product link if the user is authenticated.

```erb ins={2} del={2}
<h1>Products</h1>
<%= link_to "New product", new_product_path %>
<%= link_to "New product", new_product_path if authenticated? %>

<div id="products">
  <% @products.each do |product| %>
    <div>
      <%= link_to product.name, product %>
    </div>
  <% end %>
</div>
```

Click the Log out button and you'll see the New link is hidden. Log in at http://localhost:3000/session/new and you'll see the New link on the index page.

Optionally, you can include a link to this route in the navbar to add a Login link if not authenticated.

```erb ins={3} del={3}
<nav>
  <%= link_to "Home", root_path %>
  <%= button_to "Log out", session_path, method: :delete if authenticated? %>
  <%= link_to "Login", new_session_path unless authenticated? %>
  <%= button_to "Log out", session_path, method: :delete if authenticated? %>
</nav>
```

You can also update the Edit and Delete links on the `app/views/products/show.html.erb` view to only display if authenticated.

```erb ins={3-6} del={3-4}
<h1><%= @product.name %></h1>
<%= link_to "Back", products_path %>
<%= link_to "Edit", edit_product_path(@product) %>
<%= button_to "Delete", @product, method: :delete, data: { turbo_confirm: "Are you sure?" } %>
<% if authenticated? %>
  <%= link_to "Edit", edit_product_path(@product) %>
  <%= button_to "Delete", @product, method: :delete, data: { turbo_confirm: "Are you sure?" } %>
<% end %>
```

Now your application has a complete authentication system that:

- Allows anyone to browse products
- Requires authentication to manage products
- Shows appropriate links based on authentication status
- Provides login and logout functionality

This creates a user-friendly experience where visitors can explore your store, but they need to create an account to make changes.