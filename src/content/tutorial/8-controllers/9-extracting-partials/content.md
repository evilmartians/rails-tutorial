---
type: lesson
title: "Extracting Partials"
focus: /workspace/store/app/views/products/new.html.erb
previews:
  - 3000
custom:
  shell:
    workdir: "/workspace/store"
---

#### Extracting Partials

We've already written a form for creating new products. Wouldn't it be nice if
we could reuse that for edit and update? We can, using a feature called
"partials" that allows you to reuse a view in multiple places.

We can move the form into a file called `app/views/products/_form.html.erb`. The
filename starts with an underscore to denote this is a partial.

We also want to replace any instance variables with a local variable, which we
can define when we render the partial. We'll do this by replacing `@product`
with `product`.

```erb {1}
<%= form_with model: product do |form| %>
  <div>
    <%= form.label :name %>
    <%= form.text_field :name %>
  </div>

  <div>
    <%= form.submit %>
  </div>
<% end %>
```

:::tip
Using local variables allows partials to be reused multiple times on the
same page with a different value each time. This comes in handy rendering lists
of items like an index page.
:::

To use this partial in our `app/views/products/new.html.erb` view, we can
replace the form with a render call:

```erb {3}
<h1>New product</h1>

<%= render "form", product: @product %>
<%= link_to "Cancel", products_path %>
```

The edit view becomes almost the exact same thing thanks to the form partial.
Let's create `app/views/products/edit.html.erb` with the following:

```erb {3}
<h1>Edit product</h1>

<%= render "form", product: @product %>
<%= link_to "Cancel", @product %>
```

To learn more about view partials, check out the
[Action View Guide](https://guides.rubyonrails.org/action_view_overview.html).

:::success
Now, everything is ready to go and try editing the products! Launch the Rails server and give this new feature a try!
