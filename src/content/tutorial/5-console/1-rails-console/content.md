---
type: lesson
title: Rails Console
custom:
  shell:
    workdir: "/workspace/store"
---

Rails Console
-------------------

Now that we have created our products table, we can interact with it in Rails.
Let's try it out.

For this, we're going to use a Rails feature called the *console*. The console
is a helpful, interactive tool for testing our code in our Rails application.

```bash
$ bin/rails console
```

You will be presented with a prompt like the following:

```irb
Loading development environment (Rails 8.0.2)
store(dev)>
```

Here we can type code that will be executed when we hit `Enter`. Let's try
printing out the Rails version:

```irb
store(dev)> Rails.version
=> "8.0.2"
```

It works!
