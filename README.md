# BuildDispatch

BuildDispatch is a multi-tenant SaaS operations platform for HVAC contractors and small construction service companies. It helps office teams and field crews manage work orders, job sites, material usage, photo evidence, and client-ready service reports from one web and mobile-friendly application.

## Problem

Small HVAC and construction service companies often coordinate field work through phone calls, spreadsheets, text messages, and scattered photos. This creates slow dispatching, incomplete job history, weak material tracking, and delayed client reporting.

BuildDispatch focuses on one core operational problem: crews complete work in the field, but the office does not receive clean, structured, report-ready information fast enough.

## Goal

The goal of BuildDispatch is to provide a production-style SaaS application that demonstrates:

- Multi-tenant organization architecture
- Role-based access control
- Technician job workflows
- Inventory tracking
- PDF service reports
- Dashboard analytics
- AI-ready report generation
- Secure tenant-level data isolation

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Prisma
- SQLite for local development
- PostgreSQL for production deployment
- Auth.js
- React PDF
- Playwright / Vitest

## Planned MVP

- Organization onboarding
- User roles and memberships
- Client and job site management
- Work order creation and assignment
- Technician / crew mobile workflow
- Field notes and photo evidence
- Material usage tracking
- PDF service report generation
- Dashboard metrics
- Audit logs

## Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="file:./dev.db"
SEED_DEMO_PASSWORD="your-demo-password"
```

`DATABASE_URL` points Prisma to the local SQLite database.

`SEED_DEMO_PASSWORD` is used only when generating local demo users with `npm run db:seed`. Do not commit real passwords or production secrets.


## Development

Install dependencies:

```bash
npm install
```
Run the development server:

```bash
npm run dev
```
Run linting:

```bash
npm run lint
```
Seed the local demo database:

```bash
npm run db:seed
```


Open the app:
```text
http://localhost:3000
```


## Project Status

Foundation in progress.


