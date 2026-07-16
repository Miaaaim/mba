<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/32640dbd-d9a3-4386-9b87-e67f839a6145

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Product Documentation

- PRD: [docs/PRD.md](docs/PRD.md)

## Data Normalization (Summary)

The classmates data in [src/data/classmates.ts](src/data/classmates.ts) keeps a small set of normalization rules so the UI can show cleaner place names.

- Current city normalization:
   - Maps common Hangzhou variants to Hangzhou
   - Maps common Wenzhou variants to Wenzhou
   - Maps common Ningbo variants to Ningbo
   - For other Zhejiang-prefixed values, removes `浙江` or `浙江省` prefix as fallback
- Hometown normalization:
   - Maps Hangzhou variants to Hangzhou
   - Keeps non-matching values unchanged

For complete product requirements, interaction flows, acceptance criteria, and full normalization rules, see [docs/PRD.md](docs/PRD.md).

