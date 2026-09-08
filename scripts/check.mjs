import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
const projects=JSON.parse(fs.readFileSync(path.join(root,'content/projects.json'),'utf8'));
const failures=[];
const must=(condition,message)=>{if(!condition)failures.push(message)};
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const files=walk(dist);
const pages=files.filter(p=>p.endsWith('.html'));
const idsByFile=new Map();
for(const file of pages){
 const html=fs.readFileSync(file,'utf8');
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 idsByFile.set(file,new Set(ids));
 must(new Set(ids).size===ids.length,`${file}: duplicate IDs`);
 must((html.match(/<h1[ >]/g)||[]).length===1,`${file}: expected one H1`);
 must(/<html lang="en">/.test(html),`${file}: language missing`);
 must(/name="viewport"/.test(html),`${file}: viewport missing`);
 must(/name="description" content="[^"]{30,}"/.test(html),`${file}: description missing`);
 for(const m of html.matchAll(/<img\b[^>]*>/g)){
   must(/\balt="[^"]+"/.test(m[0]),`${file}: image alt missing`);
   must(/width="\d+"/.test(m[0])&&/height="\d+"/.test(m[0]),`${file}: image dimensions missing`);
 }
 for(const m of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g))must(/rel="noopener noreferrer"/.test(m[0]),`${file}: external link protection missing`);
}
let checkedLinks=0;
for(const file of pages){
 const html=fs.readFileSync(file,'utf8');
 // A 404 document must resolve unknown request paths from deployment root; validate
 // its root references against the actual deployment prefix, not its disk folder.
 const canonical=html.match(/rel="canonical" href="([^"]+)"/);
 let prefix='';
 if(canonical&&file.endsWith('/404.html')) prefix=new URL(canonical[1]).pathname.replace(/\/404\/$/,'');
 for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  const ref=m[1].replace(/&amp;/g,'&');
  if(/^(https?:|mailto:|data:)/.test(ref))continue;
  const [pathAndQuery,fragment]=ref.split('#');
  const pathname=pathAndQuery.split('?')[0];
  const normalized=pathname.startsWith('/')&&prefix&&pathname.startsWith(prefix+'/')?pathname.slice(prefix.length):pathname;
  let target=normalized?path.resolve(normalized.startsWith('/')?dist:path.dirname(file),normalized.replace(/^\//,'')):file;
  if(fs.existsSync(target)&&fs.statSync(target).isDirectory())target=path.join(target,'index.html');
  must(target.startsWith(dist+path.sep),`${file}: link escapes site output: ${ref}`);
  must(fs.existsSync(target),`${file}: missing target ${ref}`);
  if(fragment&&target.endsWith('.html'))must(idsByFile.get(target)?.has(fragment),`${file}: missing anchor ${ref}`);
  checkedLinks++;
 }
}
for(const p of projects){
 const exists=fs.existsSync(path.join(dist,'projects',p.slug,'index.html'));
 must(exists===(p.status==='published'),`Publication status mismatch: ${p.slug}`);
 if(p.status==='draft')for(const file of pages)must(!fs.readFileSync(file,'utf8').includes(p.slug),`Draft project leaked: ${p.slug}`);
}
const p=projects.find(x=>x.slug==='primavera-p6-project-controls');
const m=p.metrics,f=p.financials;
const near=(a,b)=>Math.abs(a-b)<0.015;
must(m.complete+m.inProgress+m.notStarted===m.activities,'Activity status totals do not reconcile');
must(m.laborCrews+m.equipment+m.materials===m.resources,'Resource categories do not reconcile');
must(near(f.ac+f.etc,f.eac),'EAC must equal AC + ETC');
must(near(f.ev-f.pv,f.sv),'SV must equal EV - PV');
must(near(f.ev-f.ac,f.cv),'CV must equal EV - AC');
must(near(f.bac-f.eac,f.vac),'VAC must equal BAC - EAC');
for(const [file,min] of [['Ali_Bayoumi_CV.pdf',10000],['Ali_Bayoumi_Project_Controls_Case_Study.pdf',10000],['Ali_Bayoumi_Project_Controls_Case_Study.pptx',10000]]){
 const loc=path.join(dist,'downloads',file);
 must(fs.existsSync(loc)&&fs.statSync(loc).size>min,`Download missing or incomplete: ${file}`);
}
must(fs.statSync(path.join(dist,'assets/site.js')).size<10000,'Unexpected client script size');
if(failures.length){console.error(failures.join('\n'));process.exit(1)}
console.log(`PASS: ${pages.length} HTML pages; ${checkedLinks} local links/anchors; draft exclusion; financial/resource/status reconciliation; required downloads.`);
console.log(`Public output: ${(files.reduce((n,p)=>n+fs.statSync(p).size,0)/1024/1024).toFixed(2)} MB including all downloadable reports and full presentations.`);
