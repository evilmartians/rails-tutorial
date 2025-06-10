---
type: lesson
title: Controllers & Actions
focus: /workspace/store/app/controllers/products_controller.rb
previews:
  - 3000
custom:
  shell:
    workdir: "/workspace/store"
---

### Making Requests

Let's see this in our browser.

First, run `bin/rails server` in your terminal to
start the Rails server. You will see the Rails welcome page in the preview pane.

Go to http://localhost:3000/products, Rails will render the
products index HTML.

Our browser requested `/products` and Rails matched this route to
`products#index`. Rails sent the request to the `ProductsController` and called
the `index` action. Since this action was empty, Rails rendered the matching
template at `app/views/products/index.html.erb` and returned that to our
browser. Pretty cool!

If we open `config/routes.rb`, we can tell Rails the root route should render
the Products index action by adding this line:

```ruby
root "products#index"
```

Restart the server (by stopping it vis Ctrl+C and starting again), got to http://localhost:3000, and you will see that Rails will render `Products#index` at the home screen.
