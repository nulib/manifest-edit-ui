# AGENTS.md

## Project purpose

This repository contains the React workbench for curating the Maktaba IIIF collection. Authenticated editors import source manifests from Northwestern University Libraries and the University of Illinois Urbana-Champaign, edit collection metadata, hide canvases, and save Arabic transcriptions, English translations, and internal notes. Admin users can start the backend publication workflow.

The companion AWS backend is `../manifest-edit-backend`. Review it whenever changing API calls, authentication, DynamoDB-backed data, IIIF parsing, canvas identifiers, or publishing. The workbench edits source-manifest records; it does not directly edit the derived public manifests.

## Application map

- `src/components/Layouts/Collection.tsx`: metadata list and collection-level workflow.
- `src/components/Layouts/Manifest.tsx`: fetches and displays a source manifest and renders its canvases.
- `src/components/UI/Manifest/Header.tsx`: manifest metadata and public/private state.
- `src/components/UI/Table/ManifestItemsRow.tsx`: extracts the per-canvas resource identifier and connects canvas rows to editing controls.
- `src/components/UI/Table/AnnotationCell.tsx` and `src/components/UI/Dialog.tsx`: load and save transcription/translation/note records.
- `src/components/UI/Table/HideCell.tsx`: loads and saves per-canvas visibility.
- `src/lib/getApiResponse.ts`: authenticated backend route wrapper.
- `src/lib/iiif-helpers.ts`: source-manifest validation and Presentation 2-to-3 conversion.
- `src/context/AppContext.tsx`: authentication token and screen/collection state.
- `README.md`: editor workflow and Markdown guidance.

## Canvas and annotation identifier contract

The backend DynamoDB table uses the source manifest ID as `uri`. Per-canvas records use sort keys shaped as:

- `CANVAS#<resource-id>`
- `TRANSCRIPTION#<resource-id>`
- `TRANSLATION#<resource-id>`
- `NOTE#<resource-id>`

`<resource-id>` is a persisted cross-repository join key. It must be derived identically here and in `../manifest-edit-backend/lambdas/writeManifest/index.js`. Source providers expose different IIIF shapes: Image API 2 services commonly use `@id`, while Image API 3 services use `id`. Do not unconditionally overwrite a valid body ID with a missing service `@id`, and do not introduce frontend-only normalization. Never change stored key semantics without compatible backend reads or a planned data migration.

Translations and transcriptions are published as annotations on newly identified canvases. Notes are internal and must remain unpublished. Verify changes with representative manifests from both providers, not just one provider or one IIIF version.

When adding a manifest, the UI must send the validated, normalized provider manifest as `sourceManifest` in the metadata `POST`. The backend stores it at `sources/<publishKey>.json` before publication. Do not remove this payload or replace it with a Maktaba-published manifest: publication intentionally avoids repeated requests to external providers, while image and Image API service IDs remain provider-hosted.

## Local setup and checks

Use the committed npm lockfile:

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Required Vite settings are:

- `VITE_REGION`
- `VITE_USER_POOL_ID`
- `VITE_USER_POOL_APP_CLIENT_ID`
- `VITE_API_GATEWAY_ENDPOINT`
- `VITE_IIIF_BASE_URL` (injected by the backend CDK stack; add it locally when collection links are needed)

The editor loads an imported manifest from
`<VITE_IIIF_BASE_URL>/sources/<publishKey>.json`. That cached manifest must
identify itself with the same local URL; otherwise IIIF viewers may follow its
internal ID and fetch the provider again. The original provider `uri` remains
the DynamoDB partition key and provenance identifier, so keep it separately in
editor state and use it for all item, canvas, and annotation API operations.
Provider manifests are fetched only by the import flow and are cached by the
metadata API before the metadata record is created.

Before handing off changes, run:

```sh
npm test -- --run
npm run typecheck
npm run build
```

Pull requests and pushes to `main` or `deploy/staging` run the same checks through `.github/workflows/test.yml`.

`npm run build` runs Vite with the ESLint plugin and emits `dist/`. Tests use Vitest, jsdom, Testing Library, and `src/setupTests.ts`. Add focused tests beside the affected module with a `.test.ts` or `.test.tsx` suffix. Mock authentication, network calls, and browser APIs rather than contacting deployed services in unit tests.

## Code conventions

- Use TypeScript and functional React components. Keep strict compiler checks enabled and prefer accurate types over new `@ts-ignore` or `@ts-nocheck` directives.
- Use the existing absolute imports rooted at `src/`.
- Keep API route types in `src/lib/getApiResponse.ts` synchronized with every caller and with the backend API Gateway resources.
- Preserve right-to-left rendering for Arabic transcription and left-to-right rendering for translations and notes.
- Keep Markdown storage as source text; rendering belongs in the existing Markdown helper/hook path.
- Follow the existing Radix Themes and Clover IIIF component patterns. Keep changes narrowly scoped and avoid unrelated formatting churn.
- Surface failed API requests to the editor. Do not treat a missing record, a network failure, and a validation failure as the same successful empty state.

## Authentication and deployment safety

- Cognito sign-in is required; publishing is shown only to users in the `Admin` group.
- Never commit `.env`, `.env.local`, tokens, credentials, `node_modules`, or `dist`.
- Do not publish the collection, alter Amplify branches, or change deployed AWS resources unless the user explicitly requests it.
- The backend stack owns Amplify environment variables and production infrastructure. Coordinate deployment-facing changes in `../manifest-edit-backend/cdk/lib/cdk-stack.ts`.

## Cross-repository verification

For any canvas or annotation change, trace this complete path:

1. A source manifest is normalized for display.
2. `ManifestItemsRow.tsx` derives the resource ID.
3. the dialog/API writes a DynamoDB sort key.
4. `writeManifest/index.js` derives the same resource ID when publishing.
5. the generated AnnotationPage is attached to the intended derived canvas, and each annotation target equals that canvas ID.

A UI-only fix is incomplete if existing DynamoDB records remain unreadable or the publisher still derives a different lookup key.
