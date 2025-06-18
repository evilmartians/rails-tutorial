---
type: lesson
title: Security
focus: /workspace/store
previews:
  - 3000
custom:
  shell:
    workdir: "/workspace/store"
---

### Security

Rails includes the Brakeman gem for checking security issues with your application - vulnerabilities that can lead to attacks such as session hijacking, session fixation, or redirection.

Run `bin/brakeman` and it will analyze your application and output a report.

```bash
bin/brakeman
```

```
Loading scanner...
...
== Overview ==

Controllers: 6
Models: 6
Templates: 15
Errors: 0
Security Warnings: 0

== Warning Types ==

No warnings found
```

## Understanding Application Security

Security is a critical aspect of web application development:

1. **Vulnerability scanning** - Automated detection of security issues
2. **Input validation** - Ensuring user input is safe and expected
3. **Output encoding** - Preventing XSS attacks
4. **Authentication** - Verifying user identity
5. **Authorization** - Controlling access to resources

### Common Security Vulnerabilities

- **SQL Injection** - Malicious SQL code in user input
- **Cross-Site Scripting (XSS)** - Malicious scripts in user content
- **Cross-Site Request Forgery (CSRF)** - Unauthorized commands from trusted users
- **Session Hijacking** - Stealing user session identifiers
- **Mass Assignment** - Unauthorized modification of model attributes

### Rails Security Features

Rails provides built-in protection against many vulnerabilities:

- **Strong Parameters** - Prevent mass assignment attacks
- **CSRF Protection** - Built-in CSRF token verification
- **SQL Injection Prevention** - Parameterized queries by default
- **XSS Protection** - Automatic HTML escaping in views
- **Secure Headers** - Security-focused HTTP headers

### Security Best Practices

- **Keep dependencies updated** - Regularly update gems and Rails
- **Use HTTPS everywhere** - Encrypt all communication
- **Validate all input** - Never trust user input
- **Follow least privilege** - Grant minimal necessary permissions
- **Regular security audits** - Use tools like Brakeman regularly
- **Security headers** - Implement CSP, HSTS, and other security headers

Brakeman helps identify potential security issues before they become problems in production!