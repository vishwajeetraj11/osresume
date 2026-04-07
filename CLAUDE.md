# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run seed     # Seed the database via seeder.js
```

There is no test suite configured.

Linting uses ESLint with the Airbnb config + Prettier. Run manually with:
```bash
npx eslint .
```

## Environment Variables

Copy `.env.example` and fill in values:

```
NEXT_PUBLIC_CLERK_SIGN_IN=       # Clerk sign-in URL
MONGODB_URI=                      # MongoDB connection string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

Optional analytics (not required for local dev):
- `NEXT_PUBLIC_GOOGLE_ANALYTICS`
- `NEXT_PUBLIC_GOOGLE_TAG_MANAGER`

## Architecture

**OS Resume** is a Next.js 13 (Pages Router) app that lets authenticated users pick resume templates, fill in their details, and print to PDF.

### Auth
Clerk handles authentication. `_app.js` wraps everything in `<ClerkProvider>`. Non-public pages redirect unauthenticated users. API routes use `withAuth` from `@clerk/nextjs/api` — `req.auth.userId` is the authenticated user ID.

Public pages: `/`, `/sign-in/[[...index]]`, `/sign-up/[[...index]]`.

### Data layer
MongoDB via Mongoose. All API routes call `dbConnect()` (`shared/utils/dbConnect.js`) before any query. The connection is cached on `global.mongoose` to survive Next.js hot reloads.

**Resume document** (`models/Resume.js`) is the root entity. All section collections (Experience, Education, Extras, Project, Leadership, Personal) reference a `resumeId` and `userId`, and are stored as ObjectId refs on the Resume document. Fetching a resume with `.populate('experience education extras personal projects leadership')` hydrates everything in one query.

### API routes (`pages/api/`)
RESTful pattern: `index.js` handles list/create, `[id].js` handles get/update/delete. All routes enforce `userId` ownership — queries always filter by `{ _id: id, userId }`. Resume DELETE cascades: it manually deletes all child section documents before removing the Resume.

The `apiRequest` helper (`shared/utils/apiClient.js`) is used client-side for all fetch calls. It accepts a Clerk JWT token and sets the `Authorization: Bearer` header automatically.

### State management
Zustand store (`zustand/zustand/index.js`) holds all resume section data in memory during editing. The editor page (`pages/editor/[id].js`) fetches the resume once on mount, then populates the store. Form components read/write to the store; the store does not auto-save — each form save triggers its own API call.

### Editor layout
`pages/editor/[id].js` is desktop-only (redirects mobile users with a message). It renders:
- `LeftSideBar` — accordion nav between resume sections (Personal Data, Work Experience, Education, Projects, Leadership, Extras)
- Center — the live resume template preview (`ref={resumeRef}`) used for printing
- `RightSideBar` — font picker, title update, print button

Printing is handled by `react-to-print` via `handlePrint` passed to RightSideBar.

### Templates
Four built-in templates: **Onyx**, **Trical**, **Jake**, **ClassicAts**.

Templates are stored as MongoDB Resume documents with `{ template: true, userId: 'template_user' }`. `syncBuiltInTemplates()` in `shared/utils/templateCatalog.js` is called on every `GET /api/resumes?template=true` request to upsert built-in template data if stale. `mergeBuiltInTemplates()` ensures the canonical order of templates in the UI.

`ClassicAts` is the only template that supports Projects and Leadership sections. Its default font is `Computer Modern Serif`; others default to `Poppins`. Font is stored in `resume.customStyles.font` and injected into the `<head>` as a Google Fonts link via `addFontInHeadTag`.

### Drag & drop
Section item reordering uses `react-beautiful-dnd`. Components live in `components/drag&drop/`. After reorder, the new order is saved to MongoDB by PATCHing the parent resume's section array.

### Forms
Formik + Yup for validation. Each section (Experience, Education, etc.) has an edit form in `components/forms/`. Form submissions call the section's API route directly, then update Zustand store state to reflect the change without a full re-fetch.
