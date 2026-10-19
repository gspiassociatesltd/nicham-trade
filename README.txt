NiChAm Trade – Final Clean Package – Ready for GitHub + Vercel
========================================================

This zip contains the production-ready Next.js page and placeholder solar images.

WHAT'S INSIDE:
- app/page.tsx = Full clean React code – 33 products
  - All 33
  - Solar Batteries 18 (MOTOMA 4: M68PW, M69PW, M87PW, M88PW + MUST 14: PV18-3224, PV18-3624, PV18-6048, PV19-10048EXP, PH11-10KL1, PH11-15KL3, LP16-24200, LP16-24300, LP16-48100 SE, LP16-48200, LP16-48300, HBP15-1012, HBP18-3024, HBP18-5548)
  - Industrial Chemical 15
  - No phone on page, No top button, No prices, DDP Lagos box only, Clean header
  - WhatsApp Request for Quote hidden to 2347050477950
- public/solar/ = 8 placeholder images (replace with real images from PDFs)
- README.txt = this file

DEPLOY IN 5 STEPS:
1. Unzip nicham-trade-final.zip on your computer
2. Go to your GitHub repo (nicham-trade) -> app folder
   - Optional backup: rename existing app/page.tsx to app/page-OLD.tsx
   - Upload new app/page.tsx and overwrite
3. Go to public/solar folder in GitHub
   - Upload the 8 PNGs from public/solar/ folder
   - IMPORTANT: Replace placeholders with real product images from your PDFs.
     Keep exact filenames:
     motoma-m68pw.png, motoma-m69pw.png, motoma-m87pw.png, motoma-m88pw.png,
     must-pv18-3224.png, must-pv18-6048.png, must-lp16-48100se.png, must-hbp18-5548.png
     You can add more images later, code already references them.
4. Commit changes to main branch (e.g., "Deploy final clean package – 33 products DDP Lagos")
5. Vercel auto-deploys in ~60-90 seconds. Check your Vercel dashboard -> Deployments.

NOTES:
- No backend needed. Pure Next.js App Router page.
- Tailwind already configured in your project.
- WhatsApp number is hidden in code (not displayed), but Request button works.
- To add real images: export from PDF as PNG 800x800, compress, upload with same names.

Support: If Vercel build fails, check that app/page.tsx starts with "use client".
