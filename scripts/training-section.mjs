export function renderTraining({training,model,table,esc,eyebrow}) {
  const p=training.progress,t=training.tia,m=model;
  const date=value=>new Date(value+'T00:00:00Z').toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric',timeZone:'UTC'});
  return `<section id="training" class="training-section" aria-labelledby="training-title">
    ${eyebrow('08 / CONSULTANT REVIEW TRAINING')}
    <h2 id="training-title">Programme review,<br>progress and delay.</h2>
    <p class="lead">Three exercises covering the review of a contractor programme, evidence-based progress reporting and a simple prospective time-impact model.</p>
    <aside class="source-note"><strong>${esc(training.disclosure)}</strong> Slides 16–18 of the full presentation. The illustrative quantities and delay model are separate from the original P6 results.</aside>
    ${renderProgrammeReview({training,model,table,esc})}
    ${renderProgressVerification({training,model,table,esc})}
    ${renderTIA({training,model,table,esc})}
  </section>`;
}

export function renderProgrammeReview({training,model,table,esc}) {
  const p=training.progress,t=training.tia,m=model;
  const date=value=>new Date(value+'T00:00:00Z').toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric',timeZone:'UTC'});
  return `    <article class="training-example"><h3>Contractor Programme Review — Practice Exercise</h3>
      <p><strong>C-01: calendar exceptions.</strong> The existing portfolio audit found no holiday exceptions for 2026–2028. This is a query to resolve with the contractor before accepting working-time assumptions.</p>
      ${table(['Review item','Comment / required action'],[
        ['Potential effect','Activities could fall on dates when crews are unavailable. The completion impact has not been quantified.'],
        ['Review comment','Submit the agreed holiday and shutdown calendar. Explain any continuous-work calendars, including curing.'],
        ['Required response','The planner updates a copy, recalculates CPM and compares the same handover milestone. Retain the response and calculation log.'],
        ['Training action record','Owner: contractor planner. Due: 02 Apr 2027. Status: open pending evidence.']
      ],'Programme review comment C-01')}
      <p class="fine-print">Source finding: existing portfolio slide 12 and its notes. The review wording and response deadline are assumed. No full P6 rerun or quantified calendar delay is claimed.</p>
    </article>`;
}

export function renderProgressVerification({training,model,table,esc}) {
  const p=training.progress,t=training.tia,m=model;
  const date=value=>new Date(value+'T00:00:00Z').toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric',timeZone:'UTC'});
  return `    <article class="training-example"><h3>Progress Verification &amp; Reporting</h3>
      <p>Assumed slab package: <strong>${p.scope} ${p.unit}</strong>. Reporting cut: ${p.dataDate}. Progress recognises installed and accepted concrete against the same defined scope.</p>
      ${table(['Basis','Quantity','Progress','Training evidence'],[
        ['Planned to date',`${p.planned} ${p.unit}`,`${m.progress.planned}%`,'Assumed quantity plan'],
        ['Contractor reported',`${p.reported} ${p.unit}`,`${m.progress.reported}%`,'Assumed daily report'],
        ['Verified in exercise',`${p.verified} ${p.unit}`,`${m.progress.verified}%`,'Mock measurement Q-001 and inspection release IR-001']
      ],'Illustrative package progress: quantity / 400 m³')}
      <p class="callout-line">Verified progress is ${Math.abs(m.progress.variancePoints)} percentage points below plan: a ${m.progress.shortfall} ${p.unit} shortfall. A further ${m.progress.unverified} ${p.unit} reported by the contractor remains unverified.</p>
      ${table(['Log','Finding','Action / owner','Due','Status'],[
        ['D-01',`${m.progress.shortfall} ${p.unit} below plan`,'Site manager: submit a production recovery plan','02 Apr 2027','Open'],
        ['V-01',`${m.progress.unverified} ${p.unit} unverified`,'Site engineer: reconcile measurements and inspection records','02 Apr 2027','Open']
      ],'Training delay and verification action register')}
      <details class="method-details"><summary>Measurement basis and evidence limits</summary><p>Q-001 and IR-001 are assumed record references, not supplied signed evidence. In practice, check location-tagged daily reports, delivery tickets, measured quantities and inspection releases against one reporting cut-off. Unverified work is not automatically rejected work.</p><p>This 40% applies only to the training slab package. Whole-project progress needs documented package weights. It does not replace the original duration-based P6 EV or prove a delay to handover.</p></details>
    </article>`;
}

export function renderTIA({training,model,table,esc}) {
  const p=training.progress,t=training.tia,m=model;
  const date=value=>new Date(value+'T00:00:00Z').toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric',timeZone:'UTC'});
  return `    <article class="training-example"><h3>Delay Analysis — Illustrative TIA</h3>
      <p>An assumed design clarification blocks installation for ${t.eventDays} working days. The model starts from a pre-event update at <strong>${date(t.dataDate)}, 08:00</strong>, with prior enabling work assumed complete and remaining work unstarted.</p>
      <p><strong>Inserted fragnet and controlling sequence</strong></p>
      <ol class="training-flow" aria-label="Impacted controlling sequence, finish-to-start links with zero lag">
        <li>Release<span>0-day milestone</span></li><li>Design clarification<span>${t.eventDays} working days, inserted event</span></li><li>Installation<span>${t.installationDays} working days</span></li><li>Testing<span>${t.testingDays} working days</span></li><li>Handover<span>${esc(t.milestone)}, 0 days</span></li>
      </ol>
      <p class="fine-print">Before the event, release links directly to installation. All links are finish-to-start with zero lag. A parallel 8-day documentation activity also precedes handover and remains unchanged.</p>
      ${table(['Activity','Pre-event update','With inserted event'],[
        ['Installation',`${date(m.before.installStart)} – ${date(m.before.installFinish)}`,`${date(m.after.installStart)} – ${date(m.after.installFinish)}`],
        ['Testing',`${date(m.before.testStart)} – ${date(m.before.testFinish)}`,`${date(m.after.testStart)} – ${date(m.after.testFinish)}`],
        ['Documentation',`${date(m.before.documentationFinish)} finish`,`${date(m.after.documentationFinish)} finish`],
        ['Training handover',`${date(m.before.handover)}, 17:00`,`${date(m.after.handover)}, 17:00`]
      ],'Independent training CPM: before and after event insertion')}
      <p class="callout-line">Modelled handover impact: <strong>+${m.workingImpact} working days / +${m.calendarImpact} calendar days.</strong></p>
      <details class="method-details"><summary>Calculation, assumptions and interpretation</summary><p>Pre-event remaining duration = max(10 + 3, 8) = ${m.before.duration} working days. Impacted duration = max(4 + 10 + 3, 8) = ${m.after.duration} working days. Difference = ${m.workingImpact}. Documentation float changes from ${m.before.documentationFloat} to ${m.after.documentationFloat} working days. The weekend makes the calendar-date difference ${m.calendarImpact} days.</p><p>Calendar: Monday–Friday, 08:00–12:00 and 13:00–17:00, without holidays. No date constraints, resource leveling, concurrent events, mitigation or acceleration. These are explicit teaching assumptions, not findings about an actual contract.</p><p>This is an independently calculated miniature CPM model. It is not a native P6 run, an analysis of all 1,206 activities, or a revision to the original HO-023 forecast. A four-day event need not cause four days of completion delay when float or other controlling paths exist.</p></details>
      <h4 class="training-contract-title">EOT and contract procedure context</h4>
      <p>The time-impact result can support an EOT review. Entitlement still requires the governing contract, event responsibility and supporting records. Compensation requires a separate assessment.</p>
      <p class="fine-print"><strong>Learning scope:</strong> Introductory knowledge of FIDIC-based contract procedures. Identify the form, edition and Particular Conditions before checking notices and assessment procedures. No clause number, notice period or contractual entitlement is assumed.</p>
      <p class="fine-print">Method references: ${training.sources.map(s=>`<a class="training-source" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)}</a>`).join('; ')}.</p>
    </article>`;
}
