# Shaurya Sharma Portfolio

A cinematic personal portfolio for Shaurya Sharma, built with Vinext, React, Framer Motion, and CSS-driven visual effects.

Live site: https://asqaure-design.rishh4work.chatgpt.site

## Sections

- Home: architectural hero scene, animated headline, ambient motion, and service positioning.
- Projects: live-style project cards for shipped web, AI, and full-stack work.
- Review: client testimonials with floating review cards.
- Pricing: service tiers and add-on offerings.
- Contact: email, WhatsApp, LinkedIn, and Instagram links.

## Motion And Performance

The site keeps the premium animated feel while avoiding heavy always-on work:

- Background movement uses lightweight CSS water/reflection layers.
- Floating visual details are CSS-driven.
- Project preview strips animate on desktop hover instead of running constantly.
- Mobile uses simplified previews and tighter layout rules to keep all content visible.
- The ambient canvas is limited to desktop-sized viewports and capped at a lower frame rate.

## Tech Stack

- Vinext
- React 19
- Framer Motion
- Tailwind CSS
- Cloudflare/Sites deployment output

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000 in the browser.

## Checks

```bash
npm run lint
npm test
npm run build
```

`npm test` builds the app and verifies that the rendered portfolio shell, navigation, and mobile performance safeguards are present.

## Project Structure

- `app/page.tsx`: main portfolio experience and section routing.
- `app/globals.css`: responsive layout, visual design, and motion rules.
- `app/components/LiveBackgroundCanvas.tsx`: desktop ambient canvas effect.
- `public/`: hero/background media and project preview images.
- `tests/rendered-html.test.mjs`: rendered HTML and source safeguard tests.

## Deployment

The project is configured for OpenAI Sites through `.openai/hosting.json`. Production builds are generated with:

```bash
npm run build
```
