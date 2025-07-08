---
type: lesson
title: "HTTP Intro"
editor: false
custom:
  shell:
    workdir: "/workspace/store"
---

A Request's Journey Through Rails
---------------------------------

To get Rails saying "Hello", you need to create at minimum a _route_, a
_controller_ with an _action_, and a _view_. A route maps a request to a
controller action. A controller action performs the necessary work to handle the
request, and prepares any data for the view. A view displays data in a desired
format.

In terms of implementation: Routes are rules written in a Ruby
[DSL (Domain-Specific Language)](https://en.wikipedia.org/wiki/Domain-specific_language).
Controllers are Ruby classes, and their public methods are actions. And views
are templates, usually written in a mixture of HTML and Ruby.

That's the short of it, but we’re going to walk through each of these steps in
more detail next.
