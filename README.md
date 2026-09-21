# Ali Bayoumi — Planning & Project Controls Portfolio

A complete static portfolio for Ali Bayoumi, with six public pages, a reusable project catalogue, a detailed Primavera P6 case study and locally hosted CV/presentation downloads. No browser framework, backend, paid service, API keys, trackers or external font requests are required.

## Current delivery status

Source repository: [AliAbdallahh/aliabdallahh.github.io](https://github.com/AliAbdallahh/aliabdallahh.github.io).

Production homepage: [Ali Bayoumi portfolio](https://aliabdallahh.github.io/). The included GitHub Actions workflow publishes `dist/`; verify the latest successful deployment in the repository's Actions tab before sharing a new version.

The updated **18-slide PowerPoint** is the main presentation. The PDF was exported from that same final PPTX. Both are under `dist/downloads/` and linked throughout the case study. The previous nine-slide deck is not served.

## Routes

| Route | Content |
|---|---|
| `/` | Hero, P6 project and two companion studies, about, career timeline, skills, CV and contact |
| `/projects/` | Published project cards |
| `/projects/primavera-p6-project-controls/` | Full illustrated case study |
| `/projects/contractor-schedule-review/` | Programme review register, evidence and progress verification |
| `/projects/illustrative-time-impact-analysis/` | Before/after CPM comparison, fragnet, assumptions and EOT context |
| `/cv/` | Latest CV viewer and download |

Trailing slashes provide clean directory URLs on GitHub Pages and Netlify. A dedicated `404.html` is included. No catch-all SPA rewrite is needed.

## Content updates

- `content/profile.json`: name, title, contact, career timeline and skill groups.
- `content/projects.json`: published/draft projects, case-study metrics and download names.
- `content/site.json`: description, latest CV filename and optional permanent HTTPS site URL.
- `scripts/build.mjs`: shared page layout, project card, figure, table and case-study components.
- `scripts/study-pages.mjs`: dedicated contractor-review and TIA page layouts; generated SVG teaching-model cover.
- `scripts/training-section.mjs`: shared evidence sections, reused by the P6 appendix and companion pages.
- `content/training.json`: disclosed assumptions for the progress and miniature CPM examples.
- `dist/assets/site.css`: shared visual theme and responsive styles.
- `dist/assets/site.js`: small progressive enhancement for mobile navigation.
- `dist/assets/`: local report images, favicon and Open Graph image.
- `dist/downloads/`: public PDF and PPTX assets.

Use Node.js 22 or newer. There are no dependencies to install.

```sh
node scripts/build.mjs
node scripts/check.mjs
```

The generated HTML is committed alongside the content and renderer. The build regenerates HTML in `dist/projects/`, retaining authored assets/downloads. Do not edit generated pages directly; update content or the renderer, then rebuild.

### Add a future project

Cost Control & EVM Dashboard (04), Excel & Power BI Dashboard (05), and Technical Office Coordination (06) exist as **draft records only**. They produce no cards, pages or sitemap entries. To publish one:

1. Add the actual project assets and presentation under `dist/assets/` and `dist/downloads/`.
2. Fill in its record in `content/projects.json`: `summary`, `type`, `image`, `tags`, `presentation`, and `sections`.
3. Keep `template` as `standard` or add a specialised renderer.
4. Change `status` to `published`, rebuild and run the check.

Each standard section supports `title`, `text`, optional `image`, `caption`, `alt`, and `report`. Example structure (write only genuine project content):

```json
{
  "title": "Project summary",
  "text": "Verified summary of the completed work.",
  "image": "your-actual-chart.webp",
  "caption": "Source and reporting date.",
  "alt": "A useful description of the chart."
}
```

### Update the CV

Replace `dist/downloads/Ali_Bayoumi_CV.pdf` with the revised PDF and rebuild. The CV now links to the permanent homepage. Keep this single portfolio link in future CV editions:

`Project Controls Portfolio: https://aliabdallahh.github.io/`

For future revisions, export the edited PDF, replace the website download, and redeploy. Use the **homepage URL** everywhere, so future projects remain accessible without changing the link in applications.

## Deployment option A: GitHub Pages

For this fully static site, GitHub Pages meets the requirements with one account and no additional hosting service. A workflow is already included at `.github/workflows/pages.yml`.

1. Create a public GitHub repository, then push the complete project with `main` as the branch.
2. In the repository's **Settings → Pages**, select **GitHub Actions** as the source.
3. Run **Publish portfolio to GitHub Pages**, or push a change to `main`.
4. Wait for the deployment to succeed. Use the URL emitted by the deploy step.
5. Check the public homepage, project route, CV and presentation downloads while signed out.

The workflow uses the real Pages `base_url` to build canonical links, Open Graph image URLs and the sitemap. Relative internal links work both at a user-site root and under a project repository path. The Pages workflow needs the repository's Pages feature enabled before its first run.

Official reference: [Using custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Deployment option B: GitHub + Netlify

1. Push this project to GitHub.
2. In Netlify choose **Add new project → Import an existing project → GitHub** and select the repository.
3. The included `netlify.toml` sets the build command and `dist` publish directory.
4. Publish and confirm the resulting project is publicly accessible; some account settings can make a new project private by default.
5. Confirm the final production URL. Set `SITE_URL` to that exact URL if it differs from Netlify's `URL` build variable, then redeploy.

No functions, forms or paid features are used. Netlify account quotas and plan settings remain subject to that provider's current terms.

Official references: [Deploy from your repository](https://docs.netlify.com/start/quickstarts/deploy-from-repository/) and [Build configuration](https://docs.netlify.com/build/configure-builds/overview/).

### Manual upload fallback

The contents of `dist/` are ready for a static host and can be uploaded as-is. For an initial Netlify drag-and-drop deployment, drop the **dist folder**, or upload the separate deploy-ready ZIP. This creates a website but does not create the requested GitHub repository.

For full SEO metadata after the first manual deployment, set `siteUrl` in `content/site.json` to the exact live URL, rebuild and upload the regenerated `dist/`. Do not invent an origin. Until a deployment URL is known, the build intentionally omits canonical, sitemap and absolute social-image URLs while preserving the Open Graph title and description.

## Evidence and scope

The P6 project is an **independent simulated portfolio case study**, not client delivery. The website explicitly separates professional employment from the simulated project. Model dates are 2027/2028 and are not represented as current real construction dates.

Source hierarchy:

1. The new `Ali_Bayoumi_Project_Controls_Portfolio_2026.pptx` (18 slides).
2. The reconciled portfolio audit and corrected presentation values.
3. Selected images extracted from original P6 reports for source visuals. Their scales, print dates and limitations are retained and captioned. Original source-report PDFs and the internal audit are not public downloads.
4. The latest supplied two-page CV for all professional background, job titles, dates, contact details and skill levels.

Key distinctions preserved in the website:

- 1,206 activities; 1,876 original relationships; 195 WBS nodes including root.
- Data date 01 Apr 2027; CPM early finish 15 Aug 2028; leveled handover 16 Aug 2028; baseline handover 22 Aug 2028.
- SPI 1.0048 is driven entirely by reporting LOE and does not establish construction ahead of plan.
- EAC = AC + ETC = $5,268,281; $17,000 completed-work overrun remains in the forecast.
- 31 direct resource delays and 222 differing stored activity dates are distinct measures.
- Corrected lookahead has 189 rows; the selected image of the original 186-row report remains clearly labelled as the original source.
- Power BI remains “basic dashboards,” matching the CV. PMP is not presented as an earned certification.

See `SOURCE_NOTES.md` for asset provenance and detailed validation scope.

## Accessibility, performance and validation

Semantic HTML; one H1 per page; skip link; keyboard focus states; labelled navigation and PDF viewer; mobile menu with Escape support; reduced-motion preference; textual equivalents for data; image alt text; fixed image dimensions; local WebP figures; native lazy loading; no analytics or cookies. Contact uses email and LinkedIn links, not an inactive form.

`scripts/check.mjs` checks generated routes, local links/anchors, file existence, document metadata, draft exclusion and the key numerical reconciliations. It is also run in both deployment configurations. JavaScript syntax was checked, and static checks passed both without a configured host and with a GitHub project-path origin. Browser visual/responsive QA was not run in this environment; responsive breakpoints are implemented in source. The PDF export was rendered and visually reviewed.

## Ownership

Portfolio content and source documents belong to Ali Bayoumi. No employer logos or client-owned project photographs are used. The generated Open Graph image is a branding asset, not project evidence. No open-source licence is applied to private professional documents by default.

## Consultant review training appendix

Slides 16–18 add a programme calendar review, an assumed quantity-progress verification example and an illustrative prospective TIA. All three carry the training disclaimer. Their website counterparts are two standalone companion case studies, also retained at `#training` on the P6 page so existing links still work.

`content/training.json` contains assumed quantities and durations. `scripts/training-model.mjs` calculates package progress and a weekday-only miniature CPM model. `scripts/training-section.mjs` renders the evidence and interpretation. The model is separate from the 1,206-activity P6 schedule and does not revise HO-023. The contractor review and TIA pages share the existing 18-slide presentation. They are explicitly labelled as companion training studies, not separate client engagements. Three future project records remain unpublished drafts.

Training calendar: Monday–Friday, 08:00–12:00 and 13:00–17:00, no holidays. Inserting a four-working-day clarification before the controlling installation/test chain changes training handover from 21 to 27 April 2027: four working days and six calendar days. No contractual entitlement or compensation is inferred.

## Publishing sequence and evidence required

The published navigation follows **P6 Project Controls → Contractor Schedule Review → Delay Analysis / TIA**. The homepage shows all three, while explaining that they comprise one simulated programme and two companion training studies. Do not use the page count to imply three client projects.

Next: **Cost Control & EVM Dashboard**, then **Excel & Power BI Dashboard**. Publish only after an actual, clearly scoped case study is complete:

- Cost control: inspectable input data, reporting cut, WBS/cost mapping, reconciled PV/EV/AC and forecast, variance drivers, management actions, assumptions and checks. The current P6 EVM section alone is not a new independent dashboard project.
- Power BI: an actual working report and its source model, measures, refresh instructions, reconciled totals and readable screenshots. Use the existing “basic” skill description until stronger evidence exists.
- Each new published entry needs a substantive HTML case-study page as well as supporting downloads. No empty cards or “coming soon” projects are shown.

`scripts/verify-public.py` derives published project routes and their cover assets from the catalogue and checks unauthenticated HTTP 200 responses and byte-for-byte SHA-256 equality after deployment. PPTX downloads are checked directly, not inferred from whether a text-only browsing tool can open them.
