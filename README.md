# Tedder Engineering Website

Static website for [tedderengineering.com](https://tedderengineering.com).

## Setup

1. Add the company logo to `assets/images/logo.png`
2. Update the Formspree endpoint in `index.html` (search for `formspree.io/f/xcontact`)

## Deploy to GitHub Pages

1. Create a GitHub repo named `tedderengineering.github.io` (or any repo with Pages enabled)
2. Push this directory to the `main` branch
3. Enable GitHub Pages in repo Settings > Pages > Source: `main` branch
4. The `CNAME` file configures the custom domain `tedderengineering.com`

## DNS Configuration

Add these DNS records for `tedderengineering.com`:

| Type  | Name | Value                        |
|-------|------|------------------------------|
| A     | @    | 185.199.108.153              |
| A     | @    | 185.199.109.153              |
| A     | @    | 185.199.110.153              |
| A     | @    | 185.199.111.153              |
| CNAME | www  | tedderengineering.github.io  |

## Local Development

Open `index.html` in a browser, or use a local server:

```bash
npx serve .
```
