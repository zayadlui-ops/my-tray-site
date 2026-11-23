(()=>{
"use strict";
const $=id=>document.getElementById(id),Q=s=>[...document.querySelectorAll(s)];
const EN={navAbout:"Platform",navModules:"Modules",navHow:"How it works",navDownload:"Download",skip:"Skip to catalog",eyebrow:"COMPACT. MODULAR. YOURS.",heroTitle:"Your toolkit.<br><span>Your rules.</span>",heroText:"My Tray is a compact platform extended with independent modules. Don’t install anything extra. Choose only what you need.",downloadButton:"Download My Tray",catalogButton:"Module catalog",point1:"Modular architecture",point2:"Nothing extra",point3:"Extensible",heroCaption:"CORE <b>+</b> MODULES <b>=</b> YOUR SYSTEM",aboutEyebrow:"01 / PLATFORM",aboutTitle:"One core.<br>Nothing extra.",aboutText:"My Tray is a shell for your tools. The core provides a shared environment, and modules add the functions you need.",feature1Title:"Modularity",feature1Text:"Extend functionality without overloading the core application.",feature2Title:"Compact",feature2Text:"Install only the tools you actually use.",feature3Title:"Flexible",feature3Text:"Modules can develop and update independently of the core.",feature4Title:"One place",feature4Text:"Catalog, description, versions and downloads in one place.",catalogEyebrow:"02 / MODULE STORE",catalogTitle:"Module catalog",catalogText:"Find add-ons and check description, compatibility and version. The catalog is built so that not only the web page but also My Tray can read it.",allCategories:"All categories",sortNew:"Newest first",sortName:"By name",emptyCatalog:"The catalog is still being prepared. New modules will appear here. Try changing your search.",catalogNoteTitle:"The catalog updates independently of the site.",catalogNoteText:"Module information is stored in a structured JSON file, a format intended for future integration with My Tray.",howEyebrow:"03 / HOW IT WORKS",howTitle:"From catalog<br>to tool.",howText:"The idea of the modular system is to reduce search, information, download and installation to one clear process.",step1Title:"Find",step1Text:"Browse the module catalog on the site or directly in the app.",step2Title:"Review",step2Text:"Read the description, version, compatibility, size, requirements and author.",step3Title:"Download",step3Text:"My Tray contacts the module’s source and downloads its package.",step4Title:"Install",step4Text:"The app verifies the package and runs the intended installation.",downloadEyebrow:"04 / GET MY TRAY",downloadTitle:"Start with the core.",downloadText:"Download My Tray and extend it with modules.",versionLabel:"Version",sizeLabel:"Size",notPublished:"File not published yet",faqEyebrow:"05 / FAQ",faqTitle:"The essentials",faq1q:"What is My Tray?",faq1a:"My Tray is a base application whose functionality is extended with additional modules.",faq2q:"Where is the catalog stored?",faq2a:"For now the web catalog uses a JSON file in the repository. In the future My Tray will be able to fetch the same file directly from the remote source.",faq3q:"Do I need to be online all the time?",faq3a:"The internet is needed to fetch the catalog and download updates. Already downloaded modules should not need constant access to the site unless their functionality requires it.",faq4q:"How are modules verified?",faq4a:"Checks of metadata, source, version, checksum and compatibility are planned. Downloading third-party modules must be transparent to the user.",footerText:"Official website and module catalog of the My Tray project."};
const EN_PH={searchPlaceholder:"Search by name or description…"};
const L={uk:{planned:"У розробці",available:"Доступний",new:"Новий",updated:"Оновлено",archived:"Архів",more:"Докладніше",get:"Завантажити модуль",getApp:"Завантажити My Tray",ver:"Версія",size:"Розмір",req:"Вимоги",lic:"Ліцензія",author:"Автор",cat:"Категорія",na:"не вказано",rel:"Реліз від ",noRel:"Реліз ще не опубліковано",err:"Не вдалося завантажити каталог. Відкрийте сайт через інтернет, а не як локальний файл.",feats:"Можливості",ph:"Пошук за назвою або описом…",aria:{art:"Анімація: модулі обертаються навколо ядра My Tray",search:"Пошук модулів",category:"Категорія",sort:"Сортування",close:"Закрити"}},
en:{planned:"In development",available:"Available",new:"New",updated:"Updated",archived:"Archived",more:"Details",get:"Download module",getApp:"Download My Tray",ver:"Version",size:"Size",req:"Requirements",lic:"License",author:"Author",cat:"Category",na:"not specified",rel:"Released ",noRel:"No release published yet",err:"Could not load the catalog. Open the site online rather than as a local file.",feats:"Features",ph:EN_PH.searchPlaceholder,aria:{art:"Animation: modules orbiting the My Tray core",search:"Search modules",category:"Category",sort:"Sort",close:"Close"}}};
const UK={};Q("[data-i]").forEach(e=>UK[e.dataset.i]=e.innerHTML);
let lang="uk",data={app:{},categories:[],modules:[]},failed=false;
try{lang=localStorage.getItem("lang")==="en"?"en":"uk"}catch(e){}
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const tx=(o,k)=>(lang==="en"&&o[k+"_en"])||o[k]||"";
const fmt=b=>b?(b>=1048576?(b/1048576).toFixed(1)+" "+(lang==="en"?"MB":"МБ"):Math.max(1,Math.round(b/1024))+" "+(lang==="en"?"KB":"КБ")):"";
const catName=id=>{const c=data.categories.find(c=>c.id===id);return c?tx(c,"name"):""};
const safeUrl=u=>/^(https?:\/\/|[\w./-]+$)/.test(u||"")?u:"";
const icon=m=>`<div class="mi" aria-hidden="true">${safeUrl(m.icon)?`<img src="${esc(m.icon)}" alt="">`:esc(m.name[0])}</div>`;

function renderApp(){
  const a=data.app||{},t=L[lang],l=$("appLink");
  $("appVersion").textContent=a.version||"—";$("appSystem").textContent=a.system||"—";$("appSize").textContent=fmt(a.size_bytes)||"—";
  $("appRelease").textContent=a.released?t.rel+new Date(a.released).toLocaleDateString(lang==="en"?"en-GB":"uk-UA"):t.noRel;
  $("appHash").textContent=a.sha256?"SHA-256: "+a.sha256:"";
  if(safeUrl(a.download_url)){l.href=a.download_url;l.classList.remove("disabled");l.removeAttribute("aria-disabled");l.textContent=t.getApp}
  else{l.removeAttribute("href");l.classList.add("disabled");l.setAttribute("aria-disabled","true")}
}
function renderCats(){
  const s=$("category"),v=s.value;
  s.querySelectorAll("option:not([value=''])").forEach(o=>o.remove());
  data.categories.forEach(c=>s.add(new Option(tx(c,"name"),c.id)));s.value=v;
}
function renderOrbit(){
  const ic=data.modules.filter(m=>safeUrl(m.icon));
  Q(".orbit").forEach((p,i)=>{if(ic[i])p.innerHTML=`<img src="${esc(ic[i].icon)}" alt="">`});
}
function render(){
  const t=L[lang],q=$("search").value.trim().toLowerCase(),c=$("category").value,s=$("sort").value;
  const list=data.modules.filter(m=>m.status!=="hidden"&&(!c||m.category===c)&&(!q||(m.name+" "+tx(m,"summary")+" "+tx(m,"description")).toLowerCase().includes(q)));
  list.sort(s==="name"?(a,b)=>a.name.localeCompare(b.name,lang):(a,b)=>String(b.updated||"").localeCompare(String(a.updated||"")));
  $("modulesGrid").innerHTML=list.map(m=>`<article class="card"><div class="row">${icon(m)}<div><h3>${esc(m.name)}</h3><span class="tag">${esc(t[m.status]||"")}</span></div></div><p>${esc(tx(m,"summary"))}</p><div class="meta">${esc(catName(m.category))} · ${m.version?"v"+esc(m.version):t.na}${m.size_bytes?" · "+fmt(m.size_bytes):""}</div><button class="btn secondary" type="button" data-id="${esc(m.id)}">${t.more}</button></article>`).join("");
  $("empty").hidden=list.length>0;
  if(failed&&!list.length)$("empty").textContent=t.err;
}
function open(id){
  const m=data.modules.find(x=>x.id===id);if(!m)return;const t=L[lang],d=$("moduleDialog");
  const row=(k,v)=>`<dt>${k}</dt><dd>${v?esc(v):t.na}</dd>`;
  const dl=safeUrl(m.download_url)?`<a class="btn primary" href="${esc(m.download_url)}" download>${t.get}</a>`:`<button class="btn" disabled>${esc(UK.notPublished&&lang==="uk"?UK.notPublished:EN.notPublished)}</button>`;
  $("dialogContent").innerHTML=`<div class="row" style="display:flex;gap:14px;align-items:center">${icon(m)}<div><h2>${esc(m.name)}</h2><span class="tag">${esc(t[m.status]||"")}</span></div></div><p style="margin-top:14px">${esc(tx(m,"description")||tx(m,"summary"))}</p>`+
  ((m.features||[]).length?`<h3 style="margin-top:14px">${t.feats}</h3><ul>${m.features.map(f=>`<li>${esc(f)}</li>`).join("")}</ul>`:"")+
  `<dl>${row(t.cat,catName(m.category))}${row(t.ver,m.version)}${row(t.size,fmt(m.size_bytes))}${row(t.req,m.requires)}${row(t.lic,m.license)}${row(t.author,m.author)}${row("SHA-256",m.sha256)}</dl>${dl}`;
  d.showModal?d.showModal():d.setAttribute("open","");
}
function apply(){
  document.documentElement.lang=lang;const t=L[lang];
  Q("[data-i]").forEach(e=>{const k=e.dataset.i,v=lang==="en"?EN[k]:UK[k];if(v!=null)e.innerHTML=v});
  $("search").placeholder=t.ph;
  Q("[data-i-aria]").forEach(e=>e.setAttribute("aria-label",t.aria[e.dataset.iAria]));
  $("languageToggle").textContent=lang==="en"?"UK":"EN";
  renderApp();renderCats();render();
}
$("languageToggle").onclick=()=>{lang=lang==="en"?"uk":"en";try{localStorage.setItem("lang",lang)}catch(e){}apply()};
["search","category","sort"].forEach(i=>$(i).addEventListener(i==="search"?"input":"change",render));
$("modulesGrid").onclick=e=>{const b=e.target.closest("[data-id]");if(b)open(b.dataset.id)};
$("closeDialog").onclick=()=>{const d=$("moduleDialog");d.close?d.close():d.removeAttribute("open")};
$("moduleDialog").addEventListener("click",e=>{if(e.target===e.currentTarget)$("closeDialog").click()});
apply();
fetch("catalog.json",{cache:"no-cache"}).then(r=>{if(!r.ok)throw 0;return r.json()}).then(j=>{data=j;renderOrbit();apply()}).catch(()=>{failed=true;render()});
})();
