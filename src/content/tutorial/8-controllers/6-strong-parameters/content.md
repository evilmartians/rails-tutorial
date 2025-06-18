---
type: lesson
title: "Strong Parameters"
focus: /workspace/store/app/controllers/products_controller.rb
previews:
  - 3000
custom:
  shell:
    workdir: "/workspace/store"
---

#### Strong Parameters

The `create` action handles the data submitted by the form, but it needs to be
filtered for security. That's where the `product_params` method comes into play.

In `product_params`, we tell Rails to inspect the params and ensure there is a
key named `:product` with an array of parameters as the value. The only
permitted parameters for products is `:name` and Rails will ignore any other
parameters. This protects our application from malicious users who might try to
hack our application.

:::tip
Try this feature in action by removing the `:name` parameter from the list or replacing it with something else. What will happen if you try to submit the form?
:::

#### Handling Errors

After assigning these params to the new `Product`, we can try to save it to the
database. `@product.save` tells Active Record to run validations and save the
record to the database.

If `save` is successful, we want to redirect to the new product. When
`redirect_to` is given an Active Record object, Rails generates a path for that
record's show action.

```ruby
redirect_to @product
```

Since `@product` is a `Product` instance, Rails pluralizes the model name and
includes the object's ID in the path to produce `"/products/2"` for the
redirect.

When `save` is unsuccessful and the record wasn't valid, we want to re-render
the form so the user can fix the invalid data. In the `else` clause, we tell
Rails to `render :new`. Rails knows we're in the `Products` controller, so it
should render `app/views/products/new.html.erb`. Since we've set the `@product`
variable in `create`, we can render that template and the form will be populated
with our `Product` data even though it wasn't able to be saved in the database.

We also set the HTTP status to 422 Unprocessable Entity to tell the browser this
POST request failed and to handle it accordingly.
