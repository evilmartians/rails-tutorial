---
type: lesson
title: Rails Routes
focus: /workspace/store/config/routes.rb
custom:
  shell:
    workdir: "/workspace/store"
---

### Rails Routes

A `route` in Rails refers to a line of code that pairs an HTTP Method and a URL
path. The route also tells Rails which `controller` and `action` should respond
to a request.

To define a route in Rails, go to the code editor and add the
following route to `config/routes.rb`

```ruby ins={2-3}
Rails.application.routes.draw do
  get "/products", to: "products#index"

  # Defines the root path route ("/")
  # root "posts#index"
end
```

This route tells Rails to look for GET requests to the `/products` path. In this
example, we specified `"products#index"` for where to route the request.

You can verify that by running a special Rails command that displays all the routes your application responds
to. In the terminal, run the following:

```bash
$ bin/rails routes
```

The output contains routes for the built-in Rails features like health checks, so it could be tricky to spot the route we've just added. You can use the `-g` option to grep the matching routes:

```bash
$ bin/rails routes -g products
```

Now, let's talk a bit on how Rails routing works.
