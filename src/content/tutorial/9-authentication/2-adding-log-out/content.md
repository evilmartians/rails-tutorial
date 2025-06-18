---
type: lesson
title: Adding Log Out
focus: /workspace/store/app/views/layouts/application.html.erb
previews:
  - 3000
custom:
  shell:
    workdir: "/workspace/store"
---

### Adding Log Out

To log out of the application, we can add a button to the top of `app/views/layouts/application.html.erb`. This layout is where you put HTML that you want to include in every page like a header or footer.

Add a small `<nav>` section inside the `<body>` with a link to Home and a Log out button and wrap `yield` with a `<main>` tag.

```erb ins={12-16} ins={18} ins={20}
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
    <nav>
      <%= link_to "Home", root_path %>
      <%= button_to "Log out", session_path, method: :delete if authenticated? %>
    </nav>

    <main>
      <%= yield %>
    </main>
  </body>
</html>
```

This will display a Log out button only if the user is authenticated. When clicked, it will send a DELETE request to the session path which will log the user out.

Now when you visit your application, you'll see the navigation bar at the top with a Home link and a Log out button (when authenticated).

Test the logout functionality by:

1. Visiting your application and logging in
2. Clicking the "Log out" button
3. Trying to visit `/products/new` - you should be prompted to log in again

The layout file is a powerful feature that lets you define common HTML structure across your entire application.