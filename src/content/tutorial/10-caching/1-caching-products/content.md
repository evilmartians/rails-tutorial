---
type: lesson
title: Caching Products
focus: /workspace/store/app/views/products/show.html.erb
previews:
  - 3000
custom:
  shell:
    workdir: "/workspace/store"
---

Caching Products
----------------

Sometimes caching specific parts of a page can improve performance. Rails
simplifies this process with Solid Cache, a database-backed cache store that
comes included by default.

Using the `cache` method, we can store HTML in the cache. Let's cache the header
in `app/views/products/show.html.erb`.

```erb ins={1,3}
<% cache @product do %>
  <h1><%= @product.name %></h1>
<% end %>
```

By passing `@product` into `cache`, Rails generates a unique cache key for the
product. Active Record objects have a `cache_key` method that returns a String
like `"products/1"`. The `cache` helper in the views combines this with the
template digest to create a unique key for this HTML.

To enable caching in development, run the following command in your terminal.

```bash
$ bin/rails dev:cache
```

When you visit a product's show action (like `/products/2`), you'll see the new
caching lines in your Rails server logs:

```bash
Read fragment views/products/show:a5a585f985894cd27c8b3d49bb81de3a/products/1-20240918154439539125 (1.6ms)
Write fragment views/products/show:a5a585f985894cd27c8b3d49bb81de3a/products/1-20240918154439539125 (4.0ms)
```

The first time we open this page, Rails will generate a cache key and ask the
cache store if it exists. This is the `Read fragment` line.

Since this is the first page view, the cache does not exist so the HTML is
generated and written to the cache. We can see this as the `Write fragment` line
in the logs.

Refresh the page and you'll see the logs no longer contain the `Write fragment`.

```bash
Read fragment views/products/show:a5a585f985894cd27c8b3d49bb81de3a/products/1-20240918154439539125 (1.3ms)
```

The cache entry was written by the last request, so Rails finds the cache entry
on the second request. Rails also changes the cache key when records are updated
to ensure that it never renders stale cache data.

Learn more in the [Caching with Rails](https://guides.rubyonrails.org/caching_with_rails.html) guide.
