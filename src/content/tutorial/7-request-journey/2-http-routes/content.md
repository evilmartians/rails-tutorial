---
type: lesson
title: HTTP Routes
editor: false
custom:
  shell:
    workdir: "/workspace/store"
---

HTTP Routes
------

In Rails, a route is the part of the URL that determines how an incoming HTTP
request is directed to the appropriate controller and action for processing.
First, let's do a quick refresher on URLs and HTTP Request methods.

### Parts of a URL

Let's examine the different parts of a URL:

```
https://example.org/products?sale=true&sort=asc
```

In this URL, each part has a name:

- `https` is the **protocol**
- `example.org` is the **host**
- `/products` is the **path**
- `?sale=true&sort=asc` are the **query parameters**

### HTTP Methods and Their Purpose

HTTP requests use methods to tell a server what action it should perform for a
given URL. Here are the most common methods:

- A `GET` request tells the server to retrieve the data for a given URL (e.g.,
  loading a page or fetching a record).
- A `POST` request will submit data to the URL for processing (usually creating
  a new record).
- A `PUT` or `PATCH` request submits data to a URL to update an existing record.
- A `DELETE` request to a URL tells the server to delete a record.
