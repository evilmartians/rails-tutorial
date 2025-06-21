---
type: lesson
title: In Stock Email Notifications
focus: /workspace/store/app/models/product.rb
previews:
  - 3000
custom:
  shell:
    workdir: "/workspace/store"
---

### In Stock Email Notifications

Action Mailer is a feature of Rails that allows you to send emails. We'll use it
to notify subscribers when a product is back in stock.

We can generate a mailer with the following command:

```bash
$ bin/rails g mailer Product in_stock
```

This generates a class at `app/mailers/product_mailer.rb` with an `in_stock`
method.

Update this method to mail to a subscriber's email address.

```ruby ins={7-10}
class ProductMailer < ApplicationMailer
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.product_mailer.in_stock.subject
  #
  def in_stock
    @product = params[:product]
    mail to: params[:subscriber].email
  end
end
```

The mailer generator also generates two email templates in our views folder: one
for HTML and one for Text. We can update those to include a message and link to
the product.

Change `app/views/product_mailer/in_stock.html.erb` to:

```erb
<h1>Good news!</h1>

<p><%= link_to @product.name, product_url(@product) %> is back in stock.</p>
```

And `app/views/product_mailer/in_stock.text.erb` to:

```erb
Good news!

<%= @product.name %> is back in stock.
<%= product_url(@product) %>
```

We use `product_url` instead of `product_path` in mailers because email clients
need to know the full URL to open in the browser when the link is clicked.

We can test an email by opening the Rails console and loading a product and
subscriber to send to:

```irb
store(dev)> product = Product.first
store(dev)> subscriber = product.subscribers.find_or_create_by(email: "subscriber@example.org")
store(dev)> ProductMailer.with(product: product, subscriber: subscriber).in_stock.deliver_later
```

You'll see that it prints out an email in the logs.

```
ProductMailer#in_stock: processed outbound mail in 63.0ms
Delivered mail 66a3a9afd5d4a_108b04a4c41443@local.mail (33.1ms)
Date: Fri, 26 Jul 2024 08:50:39 -0500
From: from@example.com
To: subscriber@example.com
Message-ID: <66a3a9afd5d4a_108b04a4c41443@local.mail>
Subject: In stock
Mime-Version: 1.0
Content-Type: multipart/alternative;
 boundary="--==_mimepart_66a3a9afd235e_108b04a4c4136f";
 charset=UTF-8
Content-Transfer-Encoding: 7bit


----==_mimepart_66a3a9afd235e_108b04a4c4136f
Content-Type: text/plain;
 charset=UTF-8
Content-Transfer-Encoding: 7bit

Good news!

T-Shirt is back in stock.
http://localhost:3000/products/1


----==_mimepart_66a3a9afd235e_108b04a4c4136f
Content-Type: text/html;
 charset=UTF-8
Content-Transfer-Encoding: 7bit

<!-- BEGIN app/views/layouts/mailer.html.erb --><!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <style>
      /* Email styles need to be inline */
    </style>
  </head>

  <body>
    <!-- BEGIN app/views/product_mailer/in_stock.html.erb --><h1>Good news!</h1>

<p><a href="http://localhost:3000/products/1">T-Shirt</a> is back in stock.</p>
<!-- END app/views/product_mailer/in_stock.html.erb -->
  </body>
</html>
<!-- END app/views/layouts/mailer.html.erb -->
----==_mimepart_66a3a9afd235e_108b04a4c4136f--

Performed ActionMailer::MailDeliveryJob (Job ID: 5e2bd5f2-f54f-4088-ace3-3f6eb15aaf46) from Async(default) in 111.34ms
```

To trigger these emails, we can use a callback in the Product model to send
emails anytime the inventory count changes from 0 to a positive number.

```ruby ins={9-19}
class Product < ApplicationRecord
  has_many :subscribers, dependent: :destroy
  has_one_attached :featured_image
  has_rich_text :description

  validates :name, presence: true
  validates :inventory_count, numericality: { greater_than_or_equal_to: 0 }

  after_update_commit :notify_subscribers, if: :back_in_stock?

  def back_in_stock?
    inventory_count_previously_was&.zero? && inventory_count > 0
  end

  def notify_subscribers
    subscribers.each do |subscriber|
      ProductMailer.with(product: self, subscriber: subscriber).in_stock.deliver_later
    end
  end
end
```

`after_update_commit` is an Active Record callback that is fired after changes
are saved to the database. `if: :back_in_stock?` tells the callback to run only
if the `back_in_stock?` method returns true.

Active Record keeps track of changes to attributes so `back_in_stock?` checks
the previous value of `inventory_count` using `inventory_count_previously_was`.
Then we can compare that against the current inventory count to determine if the
product is back in stock.

`notify_subscribers` uses the Active Record association to query the
`subscribers` table for all subscribers for this specific product and then
queues up the `in_stock` email to be sent to each of them.
