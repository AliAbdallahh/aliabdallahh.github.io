# Source and delivery notes

Prepared 8 September 2026. Reporting model data date: 1 April 2027. The latter is a simulated schedule date, not the website preparation date.

## Main presentation

The delivered PPTX is a byte-for-byte copy of the final 15-slide `Ali_Bayoumi_Project_Controls_Portfolio_2026.pptx`. The PDF was exported directly from that file using LibreOffice. The 15 PDF pages were rendered and visually inspected. Slide crops on this site come from the final Office slide renders.

| Website asset | Source |
|---|---|
| `presentation-cover.webp` | New PowerPoint, slide 1 |
| `finish-forecast.webp` | New PowerPoint, slide 5 |
| `critical-path.webp` | New PowerPoint, slide 9; selected structural sequence, not complete longest path |
| `schedule-audit.webp` | New PowerPoint, slide 12 |
| `resource-histogram.webp` | Original OFF-03 labor crew loading histogram, page 1 |
| `s-curve.webp` | Original OFF-05 PV/EV/AC report, page 1 |
| `lookahead.webp` | Original OFF-07 90-day lookahead, page 1 of 5 |
| `og.png` | Generated social preview; no project facts inferred from the artwork |

## Source limitations kept visible

- Original report images are not silently redrawn from inferred monthly figures. The S-curve and histogram retain the original source scale.
- Histogram report header contains a 02 Sep 2026 print date. Its resource units do not establish individual headcount.
- Original OFF-07 report has 186 activity rows. The audit's June 30 boundary correction adds three starts, producing the 189-row number in the new presentation. The website labels the selected original-report image accordingly; the raw report PDF is not a public download.
- The original ground-floor report ends at the pour; it is not the full structural handover or whole longest path. New presentation slide 9 provides the corrected milestone comparisons used on the website.
- Baseline handover, preserved early finish, and remaining/leveled finish are distinct. The website does not claim a fresh P6 calculation or recovered construction time.
- Earned value/actual cost use the simulation's assumptions. No commercial cash-flow, certified quantities or client invoices are implied.

## CV and contact

Used the latest supplied CV, modified 7 September 2026: `Ali_Bayoumi_Planning_Project_Controls_CV(1).pdf` (two pages). Email and LinkedIn URL come directly from that CV. No GitHub username or public website hostname has been inferred from them.

The CV retains the supplied content, font sizes and two-page format. Its former Google Drive portfolio hyperlink has been replaced by https://aliabdallahh.github.io/. The revised PDF was rendered, inspected and checked for the correct hyperlink target.

## Validation record

- New PowerPoint and PDF have 15 slides/pages; the PPTX identity matches the completed presentation.
- Employment dates, employer names, project exposure and contact details transcribed from the latest CV.
- Activity status counts: 276 + 9 + 921 = 1,206.
- Resource types: 19 + 4 + 10 = 33.
- PV $923,042.33; EV $927,476.92; AC $940,042.33.
- SPI = EV/PV = 1.0048; CPI = EV/AC = 0.9866.
- SV = +$4,434.59; CV = −$12,565.41.
- EAC $5,268,281.00 = AC $940,042.33 + ETC $4,328,238.67.
- VAC = BAC $5,251,281.00 − EAC $5,268,281.00 = −$17,000.
- One published project; four future topics remain unpublished data records.
- Static validation checks local references, anchors, metadata, image attributes and required downloads. Production deployment and browser QA remain separate checks and have not been claimed as completed.

## Hosting

The connected GitHub account is AliAbdallahh. The public repository is `AliAbdallahh/aliabdallahh.github.io`, created by the owner. The configured production origin is `https://aliabdallahh.github.io`. Deployment runs through the included GitHub Pages workflow, whose result must be verified before handoff.

## Public document scope

Public downloads comprise the updated CV and the explicitly requested new presentation in PPTX/PDF formats. The detailed internal audit and standalone original P6 report PDFs are excluded from the public repository. Selected report images are included as the requested project evidence.
