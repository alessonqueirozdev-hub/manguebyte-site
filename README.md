# The Manguebyte website

The website of [Manguebyte](https://github.com/alessonqueirozdev-hub/manguebyte),
an open-source audio framework for Rust, in English and Brazilian Portuguese.
It is meant to live at `manguebyte.org`.

The framework lives in its own repository. This one holds only the site.

## What it is made of

Plain HTML and CSS, written by hand and put together by a build script that
needs Node 20 or newer and nothing else: no `npm install`, no
`node_modules`. Pages are drawn when the site is built, so a reader's
browser runs one small script (the theme switch and the copy buttons), and
the site works without it. There are no cookies, no trackers and no
requests to anyone else's servers: the fonts are served from the site
itself.

```text
site.config.mjs        the address, the repository, the pinned framework commit
build.mjs              builds dist/ and checks it
serve.mjs              serves dist/ on http://localhost:4173
src/content/           every sentence of the site and the data behind it
  en.mjs, pt.mjs         the text of the pages, one file per language
  claims.mjs             the Beyond JUCE claims, in both languages
  features.mjs           what exists today, by area
  roadmap.mjs            phases, items and their status
  sources.mjs            which tests and code samples the site uses
  generated.json         written by tools/sync.mjs; do not edit by hand
src/pages/             one module per page
src/lib/               the page frame, links, code highlighting, drawings
src/assets/            stylesheet, script, fonts and images
tools/sync.mjs         reads proofs and samples from the framework's repository
tools/make-images.py   makes the images from the framework's logo
deploy/                an example server configuration and a deploy script
```

## Build and look at it

```bash
node build.mjs
node serve.mjs
```

The build stops with a list of problems if the English and Portuguese
texts do not have the same entries, if a page links to a page or an anchor
that does not exist, if an id is used twice on a page, or if the proofs
were read from a different commit than the one in `site.config.mjs`.

## The rule: nothing the repository does not prove

Every claim on the site links to the test, CI job or file that backs it,
at a fixed commit of the framework. Code samples are copied from the
repository by a tool, not typed in, and any line the site adds to a sample
(to say that something was left out) is marked as such.

When the framework moves on:

1. Put the new commit, its date, the id of its GitHub Actions run and the
   number of jobs in that run in `site.config.mjs`. Check that every job
   passed. Other repositories the site quotes (today, Aratu's) are pinned
   under `related` in the same file.
2. Run `node tools/sync.mjs`. It reads the proofs and samples listed in
   `src/content/sources.mjs` from GitHub at that commit, and fails if a test
   was renamed or a sample no longer matches.
3. Read what changed in the framework's `README.md`, `docs/BEYOND_JUCE.md`,
   `ROADMAP.md` and `CHANGELOG.md`, and bring `src/content/` up to date, in
   both languages. Validator counts come from the CI log of that run.
4. Build, look at the result, commit.

## Images

The images in `src/assets/img` are made from the framework's
`assets/logo.png` and Aratu's `docs/images/aratu-mascot.png`:

```bash
python tools/make-images.py path/to/logo.png path/to/aratu-mascot.png
```

This needs Pillow. The results are committed, so building the site does
not.

## Deploying

See [deploy/README.md](deploy/README.md).

## Licences

The fonts are under the SIL Open Font License; the licence texts are next
to them in `src/assets/fonts`. The logo belongs to the Manguebyte project,
and Aratu's mascot to the Aratu project.
The licence of the site's own code and text has not been chosen yet.
