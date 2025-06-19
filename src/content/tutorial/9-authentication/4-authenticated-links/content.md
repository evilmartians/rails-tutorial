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

Since only logged in users can create products, we can modify the
`app/views/products/index.html.erb` view to only display the new product link if
the user is authenticated.

```erb
<%= link_to "New product", new_product_path if authenticated? %>
```

Click the Log out button and you'll see the New link is hidden. Log in at
http://localhost:3000/session/new and you'll see the New link on the index page.

Optionally, you can include a link to this route in the navbar to add a Login
link if not authenticated.

```erb
<%= link_to "Login", new_session_path unless authenticated? %>
```

You can also update the Edit and Delete links on the
`app/views/products/show.html.erb` view to only display if authenticated.

```erb {4,7}
<h1><%= @product.name %></h1>

<%= link_to "Back", products_path %>
<% if authenticated? %>
  <%= link_to "Edit", edit_product_path(@product) %>
  <%= button_to "Delete", @product, method: :delete, data: { turbo_confirm: "Are you sure?" } %>
<% end %>
```
