---
type: lesson
title: Deploying to Production
focus: /workspace/store/config/deploy.yml
previews:
  - 3000
custom:
  shell:
    workdir: "/workspace/store"
---

### Deploying to Production

And now the fun part: let's deploy your app.

Rails comes with a deployment tool called [Kamal](https://kamal-deploy.org) that we can use to deploy our application directly to a server. Kamal uses Docker containers to run your application and deploy with zero downtime.

By default, Rails comes with a production-ready Dockerfile that Kamal will use to build the Docker image, creating a containerized version of your application with all its dependencies and configurations. This Dockerfile uses [Thruster](https://github.com/basecamp/thruster) to compress and serve assets efficiently in production.

To deploy with Kamal, we need:

* A server running Ubuntu LTS with 1GB RAM or more. The server should run the Ubuntu operating system with a Long-Term Support (LTS) version so it receives regular security and bug fixes. Hetzner, DigitalOcean, and other hosting services provide servers to get started.
* A [Docker Hub](https://hub.docker.com) account and access token. Docker Hub stores the image of the application so it can be downloaded and run on the server.

On Docker Hub, [create a Repository](https://hub.docker.com/repository/create) for your application image. Use "store" as the name for the repository.

Open `config/deploy.yml` and replace `192.168.0.1` with your server's IP address and `your-user` with your Docker Hub username.

```yaml
# Name of your application. Used to uniquely configure containers.
service: store

# Name of the container image.
image: your-user/store

# Deploy to these servers.
servers:
  web:
    - 192.168.0.1

# Credentials for your image host.
registry:
  # Specify the registry server, if you're not using Docker Hub
  # server: registry.digitalocean.com / ghcr.io / ...
  username: your-user
```

Under the `proxy:` section, you can add a domain to enable SSL for your application too. Make sure your DNS record points to the server and Kamal will use LetsEncrypt to issue an SSL certificate for the domain.

```yaml
proxy:
  ssl: true
  host: app.example.com
```

[Create an access token](https://app.docker.com/settings/personal-access-tokens/create) with Read & Write permissions on Docker's website so Kamal can push the Docker image for your application.

Then export the access token in the terminal so Kamal can find it.

```bash
export KAMAL_REGISTRY_PASSWORD=your-access-token
```

Run the following command to set up your server and deploy your application for the first time.

```bash
bin/kamal setup
```

Congratulations! Your new Rails application is live and in production!

To view your new Rails app in action, open your browser and enter your server's IP address. You should see your store up and running.

After this, when you make changes to your app and want to push them to production, you can run the following:

```bash
bin/kamal deploy
```

## Adding a User to Production

To create and edit products in production, we need a User record in the production database.

You can use Kamal to open a production Rails console.

```bash
bin/kamal console
```

```ruby
User.create!(email_address: "you@example.org", password: "s3cr3t", password_confirmation: "s3cr3t")
```

Now you can log in to production with this email and password and manage products.

## Background Jobs using Solid Queue

Background jobs allow you to run tasks asynchronously behind-the-scenes in a separate process, preventing them from interrupting the user experience. Imagine sending in stock emails to 10,000 recipients. It could take a while, so we can offload that task to a background job to keep the Rails app responsive.

In development, Rails uses the `:async` queue adapter to process background jobs with ActiveJob. Async stores pending jobs in memory but it will lose pending jobs on restart. This is great for development, but not production.

To make background jobs more robust, Rails uses `solid_queue` for production environments. Solid Queue stores jobs in the database and executes them in a separate process.

Solid Queue is enabled for our production Kamal deployment using the `SOLID_QUEUE_IN_PUMA: true` environment variable to `config/deploy.yml`. This tells our web server, Puma, to start and stop the Solid Queue process automatically.

When emails are sent with Action Mailer's `deliver_later`, these emails will be sent to Active Job for sending in the background so they don't delay the HTTP request. With Solid Queue in production, emails will be sent in the background, automatically retried if they fail to send, and jobs are kept safe in the database during restarts.

## Understanding Modern Deployment

Modern Rails deployment involves several key concepts:

1. **Containerization** - Docker packages your app with all dependencies
2. **Zero-downtime deployment** - Updates without service interruption
3. **Load balancing** - Distribute traffic across multiple instances
4. **SSL/TLS** - Automatic HTTPS certificate management
5. **Background jobs** - Async processing for time-consuming tasks

### Deployment Best Practices

- **Infrastructure as Code** - Version control your deployment configuration
- **Monitoring** - Track application performance and errors
- **Backups** - Regular database and file backups
- **Security** - Keep systems updated and secure
- **Scaling** - Plan for traffic growth
- **Rollback strategy** - Quick recovery from failed deployments

### Production Considerations

- **Environment variables** - Secure configuration management
- **Database migrations** - Safe schema changes
- **Asset compilation** - Optimized static files
- **Logging** - Comprehensive application logs
- **Health checks** - Monitor application status

Congratulations! You now have a complete Rails application running in production with modern deployment practices!