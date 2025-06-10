---
type: lesson
title: More Rails Routes
focus: /workspace/store/config/routes.rb
custom:
  shell:
    workdir: "/workspace/store"
---

### More Rails Routes

:::tip
After adding each new route, try to re-run `bin/rails routes` to see how the route table has changed.
:::

Let's look at another example. Add this line after the previous route:

```ruby
post "/products", to: "products#create"
```

Here, we've told Rails to take POST requests to "/products" and process them
with the `ProductsController` using the `create` action.

Routes may also need to match URLs with certain patterns. So how does that work?

```ruby
get "/products/:id", to: "products#show"
```

This route has `:id` in it. This is called a `parameter` and it captures a
portion of the URL to be used later for processing the request.

If a user visits `/products/1`, the `:id` param is set to `1` and can be used in
the controller action to look up and display the Product record with an ID of 1.
`/products/2` would display Product with an ID of 2 and so on.

Route parameters don't have to be Integers, either.

For example, you could have a blog with articles and match `/blog/hello-world`
with the following route:

```ruby
get "/blog/:title", to: "blog#show"
```

Rails will capture `hello-world` out of `/blog/hello-world` and this can be used
to look up the blog post with the matching title.
