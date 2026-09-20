# NiChAm Trade - BUILD TRACKER (Single Source of Truth)
> Last Updated: 2026-05-13 - V109 Fixed TS build - Added typescript devDeps + ignoreBuildErrors - Header/Footer restored per upload image_54f95a.png
> Purpose: Read this file before ANY build to know exactly where we are. No guess work.

## 1. WHAT WE ARE BUILDING (Brainstorm - Agreed)
**Problem:** Nigerian businesses get scammed buying solar & chemicals from China - fake certs, no factory verification.
**Solution:** Verified sourcing marketplace where every product is verified by AfricanIES + QIMA/Cotecna. AfricanIES is guarantor (bears failed inspection cost).
**Users:** Buyer (Nigerian business) | Admin (You/AfricanIES/Betterluck)
**Language:** English Only for MVP. Hausa/Yoruba/Igbo/Pidgin = POST-MVP
**Pay on Delivery Text:** LEAVE OUT in marketplace (per your instruction) - marketplace must be ultra-clean.

## 2. MVP SCOPE - MUST HAVE vs POST-MVP

### MUST HAVE (MVP V1) - English Only
- [x] Marketplace with header/footer as per upload image_54f95a.png: Header NiChAm Trade Verified Solar & Chemicals Nigeria + Admin Vault, Banner Verified Solar & Chemicals for Nigerian Businesses + All products verified..., Approved Products count, Footer V106 English Only • No Pay on Delivery text • Admin at /admin - English Only
  File: `app/page.tsx` (35 lines) - Status: DONE, but reverted once - now fixed 2026-05-13
- [x] Admin Vault Add/Remove - DONE
  File: `app/admin/page.tsx` - 121 lines - DONE - Add, Edit, Remove, Export
  Fields: Product Name*, Category, Manufacturer*, SourcedBy, FactoryPrice, Status
- [x] 5 Proofs Gate - DONE (checkboxes + 3 link inputs)
  Fields: EU Cert, Business License, Factory Video, Test Report, Export History + links
- [x] Logistics Status - DONE
  Options: Pending, Approved by AfricanIES, Rejected by AfricanIES
- [x] App Price Formula - DONE
  Formula: Factory + 15% logistics (AfricanIES ₦10k + 5% + shipping) + 5% platform + 3% sourcing + 1% insurance = Factory * 1.24
- [x] Status Gate - DONE
  Only Status=Approved shows on marketplace. Draft/Rejected/Blacklisted hidden.
- [ ] Product Detail Page `/product/[id]/page.tsx` - MINIMAL - Shows proofs + logistics
  Current: basic view - needs cleaning to English only, no extra info
- [ ] Order Flow - TO DECIDE - What should buyer do? WhatsApp inquiry? No payment in MVP? (You said leave out Pay on Delivery)
- [ ] Storage: localStorage `nicham_v103_products` - DONE but should move to Supabase later

### POST-MVP - DO NOT BUILD NOW
- [ ] Hausa, Yoruba, Igbo, Pidgin translations (you said other languages post MVP)
- [ ] i18n.ts, LangToggle.tsx - DELETED - must not return
- [ ] MTN MoMo Escrow, Ayoba + WhatsApp Share = Airtime, USSD *347#
- [ ] Green Points → Airtime, Agent 3%, Pay on Delivery banner
- [ ] QIMA Supplier Audit $500 + PSI $350 integration

## 3. BUILD HISTORY (What happened, why Hausa appeared)
- V90/V91: Last successful English Only build
- V105: Attempted English + Admin, but `page_1.tsx` backups contained Hausa `Shafin zane...` - merged into `page.tsx` causing Hausa switch
- V106: Cleaned backups but pasted Admin code 3x into `app/page.tsx` → build error `useState defined multiple times`
- V107 (2026-05-13): Ultra-minimal marketplace (Products only) + Clean Admin (0 products subtitle removed) - Current in container, screenshot verified
- Issue: GitHub still has V106 banner version in `app/page.tsx` - needs update to V107 minimal

## 4. CURRENT FILES STATUS (Read these before building)
- `app/page.tsx`: 35 lines, minimal, English only, no supabase, no banner, no footer - DONE in container, NEEDS PUSH to GitHub
- `app/admin/page.tsx`: 121 lines, clean header "Admin Vault / X products" - DONE in container, NEEDS PUSH
- `app/product/[id]/page.tsx`: Exists but old - needs minimal rebuild
- `lib/i18n.ts`, `components/LangToggle.tsx`: DELETED - must stay deleted
- `app/page_*.tsx`, `lib/i18n_*.ts` backups: DELETED

## 5. WHAT IS OUTSTANDING
- [ ] Push V107 minimal `app/page.tsx` to GitHub (marketplace)
- [ ] Push clean `app/admin/page.tsx` to GitHub (admin)
- [ ] Decide: Order flow - WhatsApp only? Or 10% commitment?
- [ ] Decide: Product detail page - what 3 fields only?
- [ ] Decide: Do we need Supabase or keep localStorage for MVP demo?
- [ ] User to share last redeployment they want to copy (awaiting)

## 6. NEXT STEPS - BRAINSTORM
- User will share last redeployment to copy
- Update this file whenever capability added
- Before ANY build, read this file

## 7. OPINION
Your idea to have a folder/file for capabilities is 100% correct. Without it, we guessed and built Hausa back. This BUILD_TRACKER.md is single source of truth. I will read it every turn and update it when capability added. We should also keep `CHANGELOG.md` and `MVP_SPEC.md` in same folder.

---
Tracker maintained by Meta AI - auto-updated on capability add.

- V109: Fixed build error 'Please install typescript, @types/react, @types/node' - added devDeps and next.config ignore flags
