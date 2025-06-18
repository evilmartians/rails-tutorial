---
type: lesson
title: Adding Authentication
previews:
  - 3000
custom:
  shell:
    workdir: "/workspace/store"
---

Adding Authentication
---------------------

Anyone can edit or delete products which isn't safe. Let's add some security by
requiring a user to be authenticated to manage products.

Rails comes with an authentication generator that we can use. It creates User
and Session models and the controllers and views necessary to login to our
application.

Head back to your terminal and run the following command:

```bash
$ bin/rails generate authentication
```

Then migrate the database to add the User and Session tables.

```bash
$ bin/rails db:migrate
```

Open the Rails console to create a User.

```bash
$ bin/rails console
```

Use `User.create!` method to create a User in the Rails console. Feel free to
use your own email and password instead of the example.

```irb
store(dev)> User.create! email_address: "you@example.org", password: "s3cr3t", password_confirmation: "s3cr3t"
```

Restart your Rails server so it picks up the `bcrypt` gem added by the
generator. BCrypt is used for securely hashing passwords for authentication.

```bash
$ bin/rails server
```

When you visit any page, Rails will prompt for a username and password. Enter
the email and password you used when creating the User record.

:::success
Try logging in into your application!
:::

If you enter the correct username and password, it will allow you through. Your
browser will also store these credentials for future requests so you don't have
to type it in every page view.
