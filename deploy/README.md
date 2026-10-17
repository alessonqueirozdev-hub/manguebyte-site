# Deploying the site

The site is a folder of static files, `dist/`, made by `node build.mjs`. It
is published with GitHub Pages at `https://manguebyte.org`: the workflow in
[.github/workflows/pages.yml](../.github/workflows/pages.yml) builds it and
publishes it on every push to `main`. The build needs Node and nothing
else.

## Once, to set it up

1. The repository's Pages settings use "GitHub Actions" as the source.
2. The custom domain is `manguebyte.org`, set in the same settings, with
   "Enforce HTTPS" on. With a workflow as the source, GitHub ignores a
   `CNAME` file, so the site has none.
3. At the registrar, the domain points at GitHub Pages: `A` records for
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and
   `185.199.111.153`, `AAAA` records for `2606:50c0:8000::153` to
   `2606:50c0:8003::153`, and `www` as a `CNAME` for
   `alessonqueirozdev-hub.github.io`.
4. The domain is verified in the GitHub account's Pages settings, so that
   no one else can publish a site on it.
5. For Google, the domain is verified in Search Console with a `TXT`
   record, and the sitemap, `https://manguebyte.org/sitemap.xml`, is
   submitted there. `robots.txt` already points at it.

`manguebyte.com` is not this project's domain and must never be used.

## Changing the address

The address lives in one place: `baseUrl` in
[site.config.mjs](../site.config.mjs). Canonical links, alternate-language
links, the sitemap, `robots.txt` and the share card's address all come
from it.

## What GitHub Pages cannot do

Pages sends no custom headers, so the content security policy is a `<meta>`
tag in every page, and assets are cached for the ten minutes Pages chooses
rather than for a year. A server of our own would do both better;
[nginx.conf](nginx.conf) and [deploy.sh](deploy.sh) are kept for that day.
