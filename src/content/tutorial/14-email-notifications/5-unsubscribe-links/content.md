---
type: lesson
title: Unsubscribe links
focus: /workspace/store/app/models/subscriber.rb
previews:
  - 3000
custom:
  shell:
    workdir: "/workspace/store"
---

### Unsubscribe links

A subscriber may want to unsubscribe at some point, so let's build that next.

First, we need a route for unsubscribing that will be the URL we include in emails.

```ruby ins={8}
Rails.application.routes.draw do
  resources :products do
    resources :subscribers, only: [ :create ]
  end

  # Defines the root path route ("/")
  root "products#index"
  resource :unsubscribe, only: [ :show ]
end
```

Active Record has a feature called `generates_token_for` that can generate unique tokens to find database records for different purposes. We can use this for generating a unique unsubscribe token to use in the email's unsubscribe URL.

```ruby ins={3}
class Subscriber < ApplicationRecord
  belongs_to :product
  generates_token_for :unsubscribe
end
```

Our controller will first look up the Subscriber record from the token in the URL. Once the subscriber is found, it will destroy the record and redirect to the homepage. Create `app/controllers/unsubscribes_controller.rb` and add the following code:

```ruby
class UnsubscribesController < ApplicationController
  allow_unauthenticated_access
  before_action :set_subscriber

  def show
    @subscriber&.destroy
    redirect_to root_path, notice: "Unsubscribed successfully."
  end

  private

  def set_subscriber
    @subscriber = Subscriber.find_by_token_for(:unsubscribe, params[:token])
  end
end
```

Last but not least, let's add the unsubscribe link to our email templates.

In `app/views/product_mailer/in_stock.html.erb`, add a `link_to`:

```erb ins={3}
<h1>Good news!</h1>
<p><%= link_to @product.name, product_url(@product) %> is back in stock.</p>
<%= link_to "Unsubscribe", unsubscribe_url(token: params[:subscriber].generate_token_for(:unsubscribe)) %>
```

In `app/views/product_mailer/in_stock.text.erb`, add the URL in plain text:

```erb ins={4}
Good news!
<%= @product.name %> is back in stock.
<%= product_url(@product) %>
Unsubscribe: <%= unsubscribe_url(token: params[:subscriber].generate_token_for(:unsubscribe)) %>
```

When the unsubscribe link is clicked, the subscriber record will be deleted from the database. The controller also safely handles invalid or expired tokens without raising any errors.

Use the Rails console to send another email and test the unsubscribe link in the logs.

## Understanding Token Generation

Rails' `generates_token_for` provides secure token generation:

1. **Unique tokens** - Each token is cryptographically unique
2. **Purpose-scoped** - Tokens are tied to specific purposes
3. **Time-based expiry** - Tokens can expire automatically
4. **Tamper-proof** - Tokens are signed and verified
5. **URL-safe** - Tokens work safely in URLs

### Security Benefits

- **No guessable patterns** - Tokens are randomly generated
- **Purpose isolation** - Unsubscribe tokens only work for unsubscribing
- **Automatic expiry** - Prevents old tokens from working indefinitely
- **Verification** - Rails validates token authenticity

This provides a secure and user-friendly way to handle unsubscribe functionality!