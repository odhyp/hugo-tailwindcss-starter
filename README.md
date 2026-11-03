# Hugo Tailwind CSS Starter

Minimal Hugo starter with Tailwind CSS v4 and Prettier, ready to deploy on Cloudflare Workers.

## Scope

This starter is minimal but opinionated: Hugo, Tailwind CSS v4, Prettier with a pre-commit hook, and a Cloudflare Workers deploy. It has no theme, no components, and no JavaScript build step. The aim is a clean base you build on, not a site you strip down.

Deployment targets Cloudflare Workers only. Other hosts (Netlify, Vercel, GitHub Pages) will likely work with `pnpm build`, but they aren't documented or supported here.

## Requirements

- [Hugo](https://gohugo.io/installation/) v0.168.0 or later
- [Node.js](https://nodejs.org/) v20 or later
- [pnpm](https://pnpm.io/installation)

## Getting started

1. Click **Use this template** on GitHub and clone your new repository.
2. Install dependencies and start the dev server:

   ```sh
   pnpm install
   pnpm dev
   ```

3. Open <http://localhost:1313>.

Set `baseURL`, `title`, and `params.description` in `hugo.toml` to your own values. A page's `description` front matter overrides the site description.

## Scripts

| Command             | Description                                    |
| ------------------- | ---------------------------------------------- |
| `pnpm dev`          | Dev server, including drafts and future posts  |
| `pnpm build`        | Production build to `public/`                  |
| `pnpm preview`      | Dev server with production settings            |
| `pnpm new <path>`   | Create content, e.g. `pnpm new posts/hello.md` |
| `pnpm run deploy`   | Build and deploy to Cloudflare Workers         |
| `pnpm format`       | Format all files with Prettier                 |
| `pnpm format:check` | Check formatting without writing               |

A [Lefthook](https://lefthook.dev/) pre-commit hook, installed by `pnpm install`, formats staged files with Prettier on every commit. Skip it once with `git commit --no-verify`.

## Deploy to Cloudflare Workers

The site deploys as a Worker with [static assets](https://developers.cloudflare.com/workers/static-assets/), configured in `wrangler.jsonc`. Set `name` there to your project name before the first deploy.

### From Git (Workers Builds)

1. In the Cloudflare dashboard, go to **Workers & Pages** > **Create** > **Import a repository** and select your repository.
2. Leave **Build command** blank and set **Deploy command** to `pnpm exec wrangler deploy`. If builds for non-production branches are enabled, set **Non-production branch deploy command** to `pnpm exec wrangler versions upload`. Don't keep the `npx` defaults, which npm refuses to run because `devEngines` requires pnpm. Wrangler runs `pnpm build` itself, from `build.command` in `wrangler.jsonc`.
3. Under **Advanced settings**, add build variables `HUGO_VERSION` = `0.168.0` (or newer) and `LEFTHOOK` = `0` (skips installing the Git hook during the build).

`HUGO_VERSION` is required: the Hugo preinstalled in the build image is too old for this template. pnpm is picked up from `packageManager` in `package.json`.

When upgrading Hugo, update `HUGO_VERSION` in the Cloudflare dashboard and `hugo-version` in `.github/workflows/ci.yml`.

### From your machine

```sh
pnpm run deploy
```

This builds the site and uploads `public/`. The first run asks you to log in to Cloudflare.

## Contributing

Bug fixes and version bumps are welcome. Please open an issue before adding a feature, since most additions are out of [scope](#scope) on purpose.

Before opening a PR:

1. Make sure `pnpm build` passes. Formatting is handled by the pre-commit hook. CI runs `pnpm format:check` and `pnpm build` on every PR.
2. Use [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`), matching the existing history.

### Top contributors

<a href="https://github.com/odhyp/hugo-tailwindcss-starter/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=odhyp/hugo-tailwindcss-starter" alt="contrib.rocks image" />
</a>

## License

Distributed under the MIT License. See [LICENSE](https://github.com/odhyp/hugo-tailwindcss-starter/blob/main/LICENSE) for more information.