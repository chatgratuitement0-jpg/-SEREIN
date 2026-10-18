# SEREIN

**Luxury hospitality loyalty platform** — Luxury Editorial / Modern Noir.

## Current front-end prototype

- Marketing website: `/en`, `/fr`, `/ar`
- Guest membership: `/[locale]/guest`
- Restaurant owner workspace: `/[locale]/restaurant`
- Company administration: `/[locale]/platform`

## Brand tokens

| Token | Value |
|---|---|
| Noir Forest | `#101310` |
| Deep Olive | `#1B211D` |
| Muted Brass | `#B49A70` |
| Warm Ivory | `#F0EDE4` |
| Muted Sage | `#A8B0A0` |
| Fine Border | `#343A33` |

## Run locally

Requirements: Node.js 20.9+.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For a production build:

```bash
npm run build
npm start
```

## Important status

This repository currently contains a **front-end prototype** with illustrative demo content. Navigation, language switching, search filtering, and demo notifications work locally. Authentication, persisted loyalty transactions, secure tenant isolation, real analytics, email delivery, subscriptions, and payment processing are not connected and must not be represented as production-ready.

Before production:
1. Integrate Supabase Auth and server-side authorization.
2. Create tenant-aware schema and enforce Row Level Security on all exposed tables.
3. Use an immutable, auditable points ledger with idempotent transactions.
4. Add server-side validation and verified purchase/staff workflows.
5. Implement billing only after confirming payment-provider availability and legal requirements in target markets.
6. Add automated tests, monitoring, backups, privacy/legal review, and accessibility checks.

The name SEREIN is provisional and has not been legally verified.