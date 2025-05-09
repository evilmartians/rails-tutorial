---
type: lesson
title: Meet the Rails server!
previews:
  - 3000
custom:
  shell:
    workdir: "/workspace"
---

Hello, Rails!
-------------

Let's start easy by creating our application's database and boot up our Rails server for the first time.

In your terminal, run the following commands in the `store` directory:

```bash
$ bin/rails db:create
```

This will initially create the application's database.

```bash
$ bin/rails server
```

NOTE: When we run commands inside an application directory, we should use
`bin/rails`. This makes sure the application's version of Rails is used.

This will start up a web server called Puma that will serve static files and
your Rails application:

```bash
=> Booting Puma
=> Rails 8.1.0 application starting in development
=> Run `bin/rails server --help` for more startup options
Puma starting in single mode...
* Puma version: 6.4.3 (ruby 3.3.5-p100) ("The Eagle of Durango")
*  Min threads: 3
*  Max threads: 3
*  Environment: development
*          PID: 12345
* Listening on http://127.0.0.1:3000
* Listening on http://[::1]:3000
Use Ctrl-C to stop
```

To see your Rails application, open http://localhost:3000 in your browser. You
will see the default Rails welcome page:

It works!

This page is the *smoke test* for a new Rails application, ensuring that
everything is working behind the scenes to serve a page.

To stop the Rails server anytime, press `Ctrl-C` in your terminal.
