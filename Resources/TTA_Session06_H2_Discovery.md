# Tedder Academy — Session 6, Prompt H-2
## Discover: Promo Code System
**Phase:** 2 — New Features
**Risk:** 🟡 DB schema change
**Results file:** `TTA_Session06_H2_Results.md`

---

## WHAT YOU ARE WORKING ON

H-2 was planned to build a promo code system — a new DB table, code
validation, and subscription upgrade on redemption. The March 4 audit
confirmed zero code and zero tables existed for this. This session
confirms whether anything has been built since then.

Before doing anything, read:
- `apps/web/src/prototype/engine.js`
- Any Supabase migration files in `supabase/migrations/`

Do not make any changes. This is discovery only.

---

## OUTPUT STANDARD

Every section requires verbatim code excerpts. Quote actual lines from the
files. The fix will be written from this output alone.

---

## PROMPT H-2 — DISCOVER PROMO CODE STATE (READ-ONLY)

### Section 1 — Promo code code search

Search the entire codebase for: `promo`, `promoCode`, `promo_code`,
`coupon`, `referral`, `redemption`, `redeemCode`.

**Required output:**
- Every match: file, line number, full line verbatim
- Group matches by file
- If any promo code function exists, quote it in full

### Section 2 — Supabase migrations

List all files in `supabase/migrations/`. For any migration file created
after March 4, 2026, read its contents and quote them verbatim.

**Required output:**
- Full file listing of `supabase/migrations/` with dates
- Contents of any migration file dated after March 4, 2026
- Whether any migration creates a promo_codes or related table

### Section 3 — Subscription upgrade mechanism

Find the existing subscription upgrade path. Search for
`__SUPABASE_UPDATE_TIER__`, `upgradeTier`, `updateSubscription`,
`subscription_tier`. Quote the upgrade mechanism verbatim so the
H-2 fix can use the same pattern.

**Required output:**
- The `__SUPABASE_UPDATE_TIER__` function or equivalent: file, line, full
  verbatim
- How does a tier upgrade currently happen — what DB tables are written?
- What does the UI do after a successful tier upgrade?

### Section 4 — Summary table

| Item | Current State | Needs to be Built |
|------|--------------|-------------------|
| Promo code table in DB | exists / does not exist | ... |
| Promo code validation function | exists / does not exist | ... |
| Promo code redemption UI | exists / does not exist | ... |
| Tier upgrade mechanism | exists — [describe] | ... |

---

## RESULTS FILE VERIFICATION

Before ending this session, run:
  cat TTA_Session06_H2_Results.md

Confirm all four sections are present with verbatim code. If any section
contains only prose without quoted code, rewrite it before finishing.
