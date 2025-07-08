---
type: lesson
title: Rails Routes Explained
editor: false
custom:
  shell:
    workdir: "/workspace/store"
---

Rails Routes Explained
------

When Rails sees a request that matches, it will send the request to the
`ProductsController` and the `index` action inside of that controller. This is
how Rails will process the request and return a response to the browser.

You'll notice that we don't need to specify the protocol, domain, or query
params in our routes. That's basically because the protocol and domain make sure
the request reaches your server. From there, Rails picks up the request and
knows which path to use for responding to the request based on what routes are
defined. The query params are like options that Rails can use to apply to the
request, so they are typically used in the controller for filtering the data.

<picture class="flowdiagram">
  <source srcset="/images/getting_started/routing_dark.jpg" media="(prefers-color-scheme:dark)">
  <img src="/images/getting_started/routing_light.jpg">
</picture>

Let's look at more examples.
