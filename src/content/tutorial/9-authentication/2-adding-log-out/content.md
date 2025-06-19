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

To log out of the application, we can add a button to the top of
`app/views/layouts/application.html.erb`. This layout is where you put HTML that
you want to include in every page like a header or footer.

Add a small `<nav>` section inside the `<body>` with a link to Home and a Log
out button and wrap `yield` with a `<main>` tag.

```erb ins={5-8,10,12}
<!DOCTYPE html>
<html>
  <!-- ... -->
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

This will display a Log out button only if the user is authenticated. When
clicked, it will send a DELETE request to the session path which will log the
user out.
