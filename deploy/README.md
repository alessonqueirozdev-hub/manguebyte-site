# Deploying the site

The site is a folder of static files: `dist/`, made by `node build.mjs`.
Any web server can serve it. These files describe one way to do it, on a
Linux server with nginx; adapt them to what the server already runs.

Nothing here has been run yet. Before the first deploy:

- the domain has to be registered and its DNS pointed at the server;
- the server's address, user, web server and folder have to be known;
- the site's content should be brought up to date with the framework
  (see "The rule" in the main README).

## nginx

[nginx.conf](nginx.conf) is a server block for `manguebyte.org`. It serves
`dist/`, answers unknown addresses with the right language's 404 page,
lets browsers keep assets for a year (their addresses change when their
contents do) and sends a strict content security policy: the site loads
nothing from anywhere else.

Copy it to `/etc/nginx/sites-available/`, link it from `sites-enabled/`,
then add HTTPS with Certbot:

```bash
sudo certbot --nginx -d manguebyte.org -d www.manguebyte.org
```

## Copying the files

[deploy.sh](deploy.sh) builds the site and copies `dist/` to the server
over SSH with `tar`, which Git Bash on Windows also has. Each version goes
into a folder of its own, and the link the web server serves (`current`)
moves to it in one step, so a reader never sees half a site. The last three
versions stay on the server to go back to.

```bash
DEPLOY_HOST=user@server DEPLOY_PATH=/var/www/manguebyte.org ./deploy/deploy.sh
```
