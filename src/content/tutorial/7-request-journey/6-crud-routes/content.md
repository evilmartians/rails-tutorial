---
type: lesson
title: CRUD Routes
focus: /workspace/store/config/routes.rb
custom:
  shell:
    workdir: "/workspace/store"
---

#### CRUD Routes

There are 4 common actions you will generally need for a resource: Create, Read,
Update, Delete (CRUD). This translates to 8 typical routes:

* Index - Shows all the records
* New - Renders a form for creating a new record
* Create - Processes the new form submission, handling errors and creating the
  record
* Show - Renders a specific record for viewing
* Edit - Renders a form for updating a specific record
* Update (full) - Handles the edit form submission, handling errors and updating the entire record, and typically triggered by a PUT request.
* Update (partial) - Handles the edit form submission, handling errors and updating specific attributes of the record, and typically triggered by a PATCH request.
* Destroy - Handles deleting a specific record

We can add routes for these CRUD actions with the following:

```ruby
get "/products", to: "products#index"

get "/products/new", to: "products#new"
post "/products", to: "products#create"

get "/products/:id", to: "products#show"

get "/products/:id/edit", to: "products#edit"
patch "/products/:id", to: "products#update"
put "/products/:id", to: "products#update"

delete "/products/:id", to: "products#destroy"
```

#### Resource Routes

Typing out these routes every time is redundant, so Rails provides a shortcut
for defining them. To create all of the same CRUD routes, replace the above
routes with this single line:

```ruby
resources :products
```

:::tip
If you don’t want all these CRUD actions, you specify exactly what you
need. Check out the [routing guide](routing.html) for details.
:::

Let's run `bin/rails routes -g products` one more time to see the list of resourceful routes.
