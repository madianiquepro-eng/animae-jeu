// ANIMAE — « Le dimanche de la Baie » : première aventure commune (V1, textes à valider avec Dina).
// Trois temps (matin, midi, soir), un fil par héros, des écrans partagés par la présence du salon.
// Les gestes de chaque joueur sont publiés dans _salon.me.d ; les autres joueurs les voient.

const DIM_TEMPS = [
  { k:"matin", titre:"Le matin", lieu:"Au marché", ambiance:"Les étals s'installent. Dans le quartier, on parle de la maison d'Éléonore et de ce qu'elle va devenir." },
  { k:"midi", titre:"Le midi", lieu:"Au centre social", ambiance:"Tout le monde se retrouve autour de la grande table. Chacun peut parler, poser une limite, offrir un appui, ou passer." },
  { k:"soir", titre:"Le soir", lieu:"Au bord de mer", ambiance:"La lumière baisse. On s'assoit en cercle et on revient sur la journée." }
];

// Gestes : ec écouter, di dire, ga garder pour soi, de demander, li limite, aj ajuster / confier, sh partager
const DIM_MATIN = {
  maela:   { t:"Au marché, on parle de la maison d'Éléonore. Toi, tu te sens déjà partagée entre deux maisons.",
    c:[ {k:"a", g:"ec", x:"Écouter d'abord ce que disent les autres."}, {k:"b", g:"di", x:"Dire ce que tu aimerais, même si ce n'est pas encore clair."}, {k:"c", g:"ga", x:"Rester en retrait, pour l'instant."} ] },
  milo:    { t:"Tu as quelque chose dans ta poche que tu ne veux pas montrer. Un grand te demande ce que c'est.",
    c:[ {k:"a", g:"li", x:"Dire « c'est à moi » et t'éloigner."}, {k:"b", g:"de", x:"Dire « j'ai besoin d'aide », sans tout raconter."}, {k:"c", g:"di", x:"Tout raconter d'un coup."} ] },
  inaya:   { t:"Tu as entendu deux versions du projet de maison : l'une dit qu'on la garde pour le quartier, l'autre qu'on la vend.",
    c:[ {k:"a", g:"sh", x:"Partager ce que tu as entendu avec Noé."}, {k:"b", g:"ga", x:"Le garder pour toi, pour l'instant."}, {k:"c", g:"de", x:"Demander à Milo ce qu'il a entendu de son côté."} ] },
  noe:     { t:"Gabriel te propose de prendre le relais au centre social, alors que tu penses à partir.",
    c:[ {k:"a", g:"di", x:"Dire que tu y réfléchis."}, {k:"b", g:"de", x:"Demander plus de détails sur ce que cela implique."}, {k:"c", g:"ga", x:"Changer de sujet."} ] },
  hana:    { t:"C'est toi qui coordonnes la rencontre de midi. Il y a beaucoup à faire.",
    c:[ {k:"a", g:"ga", x:"Tout prendre en charge toi-même."}, {k:"b", g:"aj", x:"Choisir une tâche précise et la confier à quelqu'un."}, {k:"c", g:"ga", x:"Remettre à plus tard."} ] },
  gabriel: { t:"Ton rôle au centre social s'achève bientôt. Tu y penses en traversant le marché.",
    c:[ {k:"a", g:"aj", x:"Noter ce que tu aimerais transmettre à la personne qui prendra le relais."}, {k:"b", g:"di", x:"En parler à Hana."}, {k:"c", g:"ga", x:"Faire comme si de rien n'était."} ] },
  eleonore:{ t:"Tu aimerais savoir ce que ta maison représente pour les autres avant de dire ce que toi, tu veux en faire.",
    c:[ {k:"a", g:"de", x:"Poser la question à quelqu'un."}, {k:"b", g:"ec", x:"Écouter les conversations, sans rien dire."}, {k:"c", g:"di", x:"Dire tout de suite ce que toi, tu veux."} ] }
};
const DIM_GESTE = { ec:"a écouté", di:"a dit ce qu'il ou elle pensait", ga:"a gardé quelque chose pour soi", de:"a demandé de l'aide ou une précision", li:"a posé une limite", aj:"a ajusté sa façon de faire (en confiant, en notant)", sh:"a partagé ce qu'il ou elle savait" };
const DIM_MIDI = [
  { k:"souhait", g:"di", x:"Exprimer un souhait." },
  { k:"limite", g:"li", x:"Poser une limite." },
  { k:"appui", g:"de", x:"Offrir un appui à quelqu'un." },
  { k:"passer", g:"ga", x:"Passer, sans rien dire." }
];
const DIM_MAISON = [
  { k:"quartier", x:"Qu'elle serve au quartier." },
  { k:"famille", x:"Qu'elle reste dans la famille." },
  { k:"vendre", x:"Qu'elle soit vendue." },
  { k:"pas_encore", x:"Je ne sais pas encore." }
];
const DIM_PALIERS = [
  { n:1, nom:"Remarquer", sens:"Tu as regardé ce qui se passe en toi." },
  { n:2, nom:"Discerner", sens:"Tu as pris un Moment de discernement." },
  { n:3, nom:"Ajuster", sens:"Tu as dosé ta force ou posé une limite." },
  { n:4, nom:"S'allier", sens:"Tu as demandé ou offert un appui." },
  { n:5, nom:"Transmettre", sens:"Tu as offert à quelqu'un une observation ou une question qu'il était libre d'accueillir." }
];


// ---------- Le basculement de midi (V3.22, à valider) ----------
// g : ref = réflexe (l'Ombre, une protection), aj = dit autrement (Lumière), pr = prise sur la scène, pass = passer
const DIM_DEB = {
  milo:    [ {k:"a", g:"ref", d:"a éclaté de rire", x:"Éclater de rire, de surprise (ça sort tout seul)."}, {k:"b", g:"aj", d:"a dit qu'il avait eu un peu peur", x:"Dire « j'ai eu un peu peur »."}, {k:"c", g:"pass", d:"n'a rien dit", x:"Ne rien dire."} ],
  hana:    [ {k:"a", g:"ref", d:"a coupé la parole un peu sèchement", x:"Couper la parole, un peu sèchement (le réflexe de celle qui tient la réunion)."}, {k:"b", g:"aj", d:"a laissé quelqu'un d'autre reprendre la réunion", x:"Laisser quelqu'un d'autre reprendre la réunion."}, {k:"c", g:"pass", d:"n'a rien dit", x:"Ne rien dire."} ],
  gabriel: [ {k:"a", g:"ref", d:"a décroché la banderole", x:"Décrocher la banderole, alors que le voisin la tient encore."}, {k:"b", g:"aj", d:"a demandé au voisin de la poser, en douceur", x:"Demander au voisin de la poser, en douceur."}, {k:"c", g:"pass", d:"n'a rien dit", x:"Ne rien dire."} ],
  inaya:   [ {k:"a", g:"pr", d:"a dit d'où venait la rumeur", x:"Dire d'où vient la rumeur."}, {k:"b", g:"ref", d:"s'est tue", x:"Te taire, et regarder tes chaussures."}, {k:"c", g:"pass", d:"n'a rien dit", x:"Ne rien dire."} ],
  noe:     [ {k:"a", g:"pr", d:"a demandé à Éléonore ce qu'elle voulait annoncer", x:"Demander à Éléonore ce qu'elle voulait annoncer."}, {k:"b", g:"ref", d:"a plaisanté pour détendre l'ambiance", x:"Plaisanter vite, pour détendre l'ambiance."}, {k:"c", g:"pass", d:"n'a rien dit", x:"Ne rien dire."} ],
  maela:   [ {k:"a", g:"ref", d:"a pris parti très vite", x:"Prendre parti tout de suite, pour que ça cesse."}, {k:"b", g:"aj", d:"a dit qu'elle se sentait partagée", x:"Dire que tu te sens partagée, et que tu as besoin d'entendre tout le monde."}, {k:"c", g:"pass", d:"n'a rien dit", x:"Ne rien dire."} ],
  eleonore:[ {k:"a", g:"ref", d:"a lâché une phrase ironique", x:"Lâcher : « Vous avez déjà choisi la couleur de ma chambre, aussi ? »"}, {k:"b", g:"aj", d:"a dit calmement qu'elle voulait seulement ouvrir la discussion", x:"Dire calmement que tu voulais seulement ouvrir la discussion."}, {k:"c", g:"pass", d:"n'a rien dit", x:"Ne rien dire."} ]
};
function dEleonoreJoue(){ return dJoueurs().some(j => j.hero === "eleonore"); }
function dToutLeMondePasse(){ const P = dPresents(); return P.length > 0 && P.every(j => { const e = dEtat(j.id), L = DIM_DEB[j.hero], c = e && L && L.find(x => x.k === e.c.deb); return c && c.g === "pass"; }); }
function dSceneMidi(){
  const nar = `<p>Au centre social, un voisin, Armand, entre avec une banderole peinte à la main : <strong>« La maison est à nous ! »</strong> Il a compris que la maison d'Éléonore allait devenir un lieu pour le quartier, et il l'a déjà annoncé au marché. Deux personnes applaudissent.</p>`;
  const el = dEleonoreJoue() ? `<p class="muted">Éléonore comptait simplement ouvrir la discussion.</p>` : `<p>Éléonore, qui comptait simplement ouvrir la discussion, lâche devant tout le monde : <em>« Vous avez déjà choisi la couleur de ma chambre, aussi ? »</em></p>`;
  return `<div class="card scene-bascule"><div class="eyebrow">La journée bascule</div>${nar}${el}<p class="muted tiny">Chacun réagit à sa manière. Un réflexe n'est pas une faute : c'est un geste qui protège quelque chose. Tu peux le laisser sortir, ou le dire autrement.</p></div>`;
}
function dDebordement(k){ dSon(); dPublier(d => { d.c.deb = k; }); }
function dDebHtml(j, e){
  let L = DIM_DEB[j.hero]; if(!L) return "";
  if(e.c.de >= 5) L = L.concat([{ k:"r", g:"aj", d:"a demandé un temps pour respirer", x:"Demander un temps pour respirer." }]);
  return `<div class="card"><div class="eyebrow">Toi, à cet instant</div><div class="d-choix">${L.map(c => `<button class="d-c ${e.c.deb === c.k ? "on" : ""}" aria-pressed="${e.c.deb === c.k}" onclick="dDebordement('${c.k}')">${c.x}</button>`).join("")}</div>
    ${e.c.deb && (L.find(c => c.k === e.c.deb) || {}).g === "ref" ? `<p class="muted tiny" style="margin-top:8px">Ce geste te protégeait de quelque chose. Sophia pourra t'aider à le regarder, sans jugement.</p>` : ""}</div>`;
}
function dFinDebordement(){
  if(dToutLeMondePasse()) return dEleonoreJoue() ? `<p>Le silence s'installe. Armand pose sa banderole sur une chaise. Une voix s'élève enfin : « Bon. Est-ce que je peux parler, maintenant ? »</p>` : `<p>Le silence s'installe. Éléonore plie elle-même la banderole, la pose sur une chaise : <em>« Bon. Est-ce que je peux parler, maintenant ? »</em></p>`;
  return "";
}


// ---------- Le quartier (carte), le dé, les jauges et le son (V3.24, à valider) ----------
const DIM_LIEUX = { matin:{ x:740, y:520, nom:"Le marché" }, midi:{ x:1170, y:560, nom:"Le centre social" }, soir:{ x:905, y:842, nom:"Le bord de mer" }, fin:{ x:905, y:842, nom:"Le bord de mer" } };
let _dPos = {};
function dPas(){ try{ if(typeof sonInit === "function"){ sonInit(); } if(typeof sonNote === "function" && typeof sonActif === "function" && sonActif()){ for(let i=0;i<5;i++) sonNote(150 + (i%2)*40, i*0.28, 0.1, 0.05, "triangle"); } }catch(e){} }
function dSon(k){ try{ if(typeof sonInit === "function") sonInit(); if(typeof sonActif === "function" && !sonActif()) return; if(k === "de" && typeof sonDe === "function") sonDe(); else if(typeof sonChoix === "function") sonChoix(); }catch(e){} }
function dCarte(){
  const J = dJoueurs(), W = 1447, H = 1087;
  const pins = Object.keys(DIM_LIEUX).filter(k => k !== "fin").map(k => { const L = DIM_LIEUX[k]; return `<div class="dm-pin" style="left:${L.x/W*100}%;top:${L.y/H*100}%">${L.nom}</div>`; }).join("");
  const marq = J.filter(j => j.id === (dMoi() || {}).id || (_salon && _salon.peers[j.id])).map((j, i) => {
    const e = dEtat(j.id) || { t:"matin" }, L = DIM_LIEUX[e.t] || DIM_LIEUX.matin;
    const cible = { x:(L.x + i*26 - 26)/W*100, y:(L.y + 40 + (i%2)*20)/H*100 };
    const av = _dPos[j.id] || cible; _dPos[j.id] = cible;
    const moi = j.id === (dMoi() || {}).id;
    return `<div class="dm-av ${moi ? "moi" : ""}" data-x="${cible.x}" data-y="${cible.y}" style="left:${av.x}%;top:${av.y}%" title="${escapeHtml(j.nom || dNom(j.hero))}">${salonFace(j.hero, 38)}</div>`;
  }).join("");
  setTimeout(() => { document.querySelectorAll(".dm-av").forEach(el => { const nx = el.getAttribute("data-x"), ny = el.getAttribute("data-y"); if(el.style.left !== nx + "%" || el.style.top !== ny + "%"){ el.style.left = nx + "%"; el.style.top = ny + "%"; dPas(); } }); }, 60);
  return `<div class="dm-carte"><img src="img/quartier.jpg" alt="Carte du Quartier de la Baie : le marché, le centre social et le bord de mer" loading="lazy">${pins}${marq}</div>`;
}
const DIM_FX = { ec:{liens:1}, di:{cap:1}, ga:{elan:-1}, de:{liens:1,elan:1}, li:{cap:1}, aj:{ouvrage:1,elan:1}, sh:{liens:1}, ref:{elan:-1}, pr:{liens:1}, pass:{} };
function dJaugesVal(e){
  const j = dMoi(), v = { cap:3, liens:3, ouvrage:3, elan:3 }; if(!j || !e) return v;
  const add = g => { const f = DIM_FX[g] || {}; for(const k in f) v[k] = Math.max(0, Math.min(6, v[k] + f[k])); };
  const m = DIM_MATIN[j.hero], cm = m && m.c.find(x => x.k === e.c.matin); if(cm) add(cm.g);
  const mid = { souhait:"di", limite:"li", appui:"de" }[e.c.midi]; if(mid) add(mid);
  const dl = DIM_DEB[j.hero], cd = dl && dl.find(x => x.k === e.c.deb); if(cd) add(cd.g);
  if(e.c.deb === "r") add("aj");
  return v;
}
function dRessenti(n){ return n <= 1 ? "à bout" : n === 2 ? "fragile" : n === 3 ? "stable" : n === 4 ? "porté·e" : "plein·e"; }
function dJaugesHtml(e){
  const v = dJaugesVal(e);
  return `<div class="card"><div class="eyebrow">Tes quatre secteurs</div><div class="dj-liste">${["cap","liens","ouvrage","elan"].map(k => `<div class="dj"><span class="dj-n">${H_JAUGES[k][0]}<span class="tiny muted"> · ${H_JAUGES[k][1]}</span></span><span class="dj-barre"><i style="width:${v[k]/6*100}%;background:${H_JAUGES[k][2]}"></i></span><span class="dj-v"><strong>${v[k]}</strong>/6 · ${dRessenti(v[k])}</span></div>`).join("")}</div></div>`;
}
function dLancerDe(){
  dSon("de"); const n = 1 + Math.floor(Math.random() * 6);
  const el = document.getElementById("dm_de"); if(el){ el.classList.add("rolling"); el.textContent = "…"; }
  setTimeout(() => dPublier(d => { d.c.de = n; }), 900);
}
function dDeHtml(e){
  const n = e.c.de;
  return `<div class="card"><div class="eyebrow">Le dé du moment</div>${n ? `<div class="row" style="align-items:center;gap:14px"><div id="dm_de" class="dm-de">${n}</div><p style="margin:0">${n <= 2 ? "Le geste monte vite, presque tout seul. Tu peux quand même choisir autre chose." : n <= 4 ? "Tu sens le réflexe, et tu as un peu de marge." : "Tu as de la marge : tu peux même demander un temps pour respirer."}</p></div>` : `<p class="muted">Lance le dé pour sentir ce qui monte en toi à cet instant. Il ne décide rien à ta place.</p><div class="row"><button class="or" onclick="dLancerDe()"><span id="dm_de" class="dm-de-mini">🎲</span> Lancer le dé</button></div>`}</div>`;
}

function dNom(h){ const x = (typeof SALON_HEROS !== "undefined") ? SALON_HEROS.find(y => y.k === h) : null; return x ? x.nom : h; }
function dJoueurs(){ return (state.table && state.table.joueurs) || []; }
function dMoi(){ return state.table && state.table.moi; }
function dEtat(id){ const s = _salon; if(!s) return null; if(id === s.me.id) return s.me.d || null; const p = s.peers[id]; return p && p.d ? p.d : null; }
function dPresents(){ const s = _salon; if(!s) return []; return dJoueurs().filter(j => j.id === s.me.id || s.peers[j.id]); }
function dPublier(maj){ const s = _salon; if(!s) return; s.me.d = Object.assign({ t:"matin", c:{}, ok:{}, disc:false }, s.me.d || {}); maj(s.me.d); salonSync(); dRafraichir(); }
function dRafraichir(){ if(state.phase !== "d_play") return; const app = document.getElementById("app"); if(app) app.innerHTML = `<div class="fade-in">${renderDimanche()}</div>`; }

function dDemarrer(){ _dSauve = false;
  state.phase = "d_play";
  const s = _salon; if(s){ s.me.d = { t:"matin", c:{}, ok:{}, disc:false }; salonSync(); }
  render();
}
function dChoisirMatin(k){ dSon(); dPublier(d => { d.c.matin = k; }); }
function dChoisirMidi(k){ dSon(); dPublier(d => { d.c.midi = k; if(k !== "appui") delete d.c.cible; }); }
function dCible(id){ dPublier(d => { d.c.cible = id; }); }
function dMaison(k){ dSon(); dPublier(d => { d.c.maison = k; }); }
function dDiscerner(){ dPublier(d => { d.disc = true; }); }
function dTerminer(t){ dPublier(d => { d.ok[t] = true; }); }
function dSuite(t){ dPas(); const i = DIM_TEMPS.findIndex(x => x.k === t); const n = DIM_TEMPS[i + 1]; dPublier(d => { d.t = n ? n.k : "fin"; }); }
function dSoirChoisir(id, type){ dPublier(d => { d.c.soir = { de:id, type:type }; }); }

function dGestesDe(id){
  const e = dEtat(id), j = dJoueurs().find(x => x.id === id); if(!e || !j) return [];
  const L = [], m = DIM_MATIN[j.hero], cm = m && m.c.find(x => x.k === e.c.matin);
  if(cm) L.push(`${dNom(j.hero)} ${DIM_GESTE[cm.g]} (${cm.x.replace(/\.$/, "")}).`);
  const dl = DIM_DEB[j.hero], cd = dl && dl.find(x => x.k === e.c.deb);
  if(cd && cd.g !== "pass") L.push(`À midi, ${dNom(j.hero)} ${cd.d}.`);
  const mi = DIM_MIDI.find(x => x.k === e.c.midi);
  if(mi && mi.k !== "passer") L.push(`${dNom(j.hero)} ${mi.k === "appui" && e.c.cible ? "a offert un appui à " + dNom((dJoueurs().find(x => x.id === e.c.cible) || {}).hero) : mi.k === "souhait" ? "a exprimé un souhait" : "a posé une limite"}.`);
  return L;
}
function dPaliers(e){
  const j = dMoi(), m = j && DIM_MATIN[j.hero], cm = m && e && m.c.find(x => x.k === e.c.matin);
  const g = [cm && cm.g, e && e.c.midi === "limite" ? "li" : (e && e.c.midi === "appui" ? "de" : null)];
  const p = [false, false, false, false, false];
  p[0] = !!(e && e.ok && e.ok.matin);
  p[1] = !!(e && e.disc);
  const dl = j && DIM_DEB[j.hero], cd = dl && e && dl.find(x => x.k === e.c.deb);
  p[2] = g.includes("aj") || g.includes("li") || !!(cd && cd.g === "aj");
  p[3] = g.includes("de") || !!(e && e.c.midi === "appui");
  p[4] = !!(e && e.c.soir && e.c.soir.de);
  return p;
}
function dAttente(t){
  const s = _salon; if(!s) return [];
  return dPresents().filter(j => { if(j.id === s.me.id) return false; const e = dEtat(j.id); return !(e && e.ok && e.ok[t]); });
}
function dEcho(){
  // L'écho d'Inaya vers Noé : son choix du matin change la scène de midi.
  const j = dMoi(); if(!j || j.hero !== "noe") return "";
  const ina = dJoueurs().find(x => x.hero === "inaya"), e = ina && dEtat(ina.id);
  if(!ina || !e || !e.c.matin) return "";
  return e.c.matin === "a" ? `<p class="echo"><strong>Écho · </strong>${escapeHtml(ina && dNom("inaya"))} t'a transmis ce qu'elle avait entendu : deux versions du projet de maison. Tu peux poser une question plus précise.</p>` : `<p class="echo"><strong>Écho · </strong>Tu n'as pas eu cette information. Tu peux la chercher auprès d'Éléonore.</p>`;
}

function dContexteSophia(){
  const c = state.table && state.table.couleur, L = [];
  if(c) L.push("Couleur de la partie : " + [couleurNom("axes", c.axe), couleurNom("themes", c.theme), couleurNom("contextes", c.contexte), couleurNom("envs", c.env)].join(" / ") + ".");
  dJoueurs().forEach(j => dGestesDe(j.id).forEach(g => L.push(g)));
  const maison = {}; dJoueurs().forEach(j => { const e = dEtat(j.id); if(e && e.c.maison) maison[e.c.maison] = (maison[e.c.maison] || 0) + 1; });
  const lib = { quartier:"servir au quartier", famille:"rester dans la famille", vendre:"être vendue", pas_encore:"ne pas encore décider" };
  Object.keys(maison).forEach(k => L.push(`${maison[k]} joueur(s) souhaitent que la maison d'Éléonore puisse ${lib[k]}.`));
  return L.join("\n");
}
async function dSophia(){
  const zone = document.getElementById("d_sophia"); if(!zone) return;
  zone.innerHTML = `<p class="muted">Sophia relit la journée…</p>`;
  try{
    const r = await fetch(SALON_URL + "/functions/v1/sophia", { method:"POST", headers:{ "content-type":"application/json" },
      body:JSON.stringify({ contexte:dContexteSophia(), question:"Relis cette journée de groupe : ce qui a été observé, ce qui peut être supposé, et ce qui reste à demander. Reste prudente, ne juge personne." }) });
    const d = await r.json(); if(!d.texte) throw new Error("vide");
    zone.innerHTML = `<div class="sophia-lecture">${escapeHtml(d.texte).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br>")}</div>`;
  }catch(e){
    zone.innerHTML = `<p class="muted">Sophia ne peut pas répondre pour l'instant. Voici simplement ce qui a été observé :</p><ul>${dJoueurs().flatMap(j => dGestesDe(j.id)).map(g => `<li>${escapeHtml(g)}</li>`).join("")}</ul>`;
  }
}

async function dSauver(e, p){
  if(typeof _compte === "undefined" || _dSauve) return;
  const z = document.getElementById("d_compte"); if(!z) return;
  if(!_compte.user){ z.innerHTML = typeof compteCarte === "function" ? compteCarte() : ""; return; }
  _dSauve = true; const j = dMoi();
  const ok = await compteSauverEpisode({ id:"dimanche", quand:new Date().toISOString(), hero:j && j.hero, couleur:state.table && state.table.couleur, traces:p, maison:e.c.maison || null, consequence:"banderole" });
  z.innerHTML = ok ? `<p class="muted">Cette journée est gardée dans ta mémoire de la série.</p>` : `<p class="muted">La sauvegarde n'a pas pu se faire cette fois.</p>`;
}
let _dSauve = false;
function dBandeau(t){
  const i = DIM_TEMPS.findIndex(x => x.k === t);
  return `<div class="d-temps" role="list">${DIM_TEMPS.map((x, n) => `<span role="listitem" class="d-t ${n === i ? "on" : n < i ? "fait" : ""}">${x.titre}</span>`).join("")}</div>`;
}
function dDiscernerHtml(e){
  if(e && e.disc) return `<div class="card terre"><div class="eyebrow">Moment de discernement</div><p><strong>Ce que je sais</strong> (les faits) · <strong>Ce que je suppose</strong> (mes hypothèses) · <strong>Ce que je pourrais demander</strong> (aux autres ou à moi).</p><p class="muted tiny">Tu peux le garder en tête pour la suite. Ce moment est libre.</p></div>`;
  return `<div class="row"><button class="ghost sm" onclick="dDiscerner()">Prendre un Moment de discernement (facultatif)</button></div>`;
}
function dAttenteHtml(t){
  const att = dAttente(t);
  if(!att.length) return "";
  return `<div class="card"><p class="muted">On attend ${att.map(j => escapeHtml(j.nom || dNom(j.hero))).join(", ")}…</p><div class="row"><button class="ghost sm" onclick="dSuite('${t}')">Continuer sans attendre</button></div></div>`;
}

function renderDimanche(){
  const j = dMoi(), s = _salon;
  if(!j) return `<div class="card"><button onclick="goTo('intro')">Retour à l'accueil</button></div>`;
  const e = dEtat(j.id) || { t:"matin", c:{}, ok:{}, disc:false }, t = e.t;
  const entete = (cle) => { const T = DIM_TEMPS.find(x => x.k === cle); return `<div class="hero slide-up"><div class="eyebrow">Le dimanche de la Baie · ${T.lieu}</div><h2 class="serif">${T.titre}</h2><p class="muted">${T.ambiance}</p>${dBandeau(cle)}</div>`; };
  const carte = dCarte();
  const moi = `<div class="card d-moi"><div class="sj-face">${salonFace(j.hero, 52)}</div><div><strong>${escapeHtml(j.nom || dNom(j.hero))}</strong><br><span class="tiny muted">tu joues ${dNom(j.hero)}</span></div></div>`;
  const couleur = state.table && state.table.couleur ? couleurHtml(state.table.couleur) : "";

  if(t === "matin"){
    const m = DIM_MATIN[j.hero], ch = e.c.matin;
    return entete("matin") + carte + moi + dJaugesHtml(e) + `<div class="card"><p>${m.t}</p><div class="d-choix">${m.c.map(c => `<button class="d-c ${ch === c.k ? "on" : ""}" aria-pressed="${ch === c.k}" onclick="dChoisirMatin('${c.k}')">${c.x}</button>`).join("")}</div></div>`
      + dDiscernerHtml(e)
      + (ch && !e.ok.matin ? `<div class="row"><button class="or lg" onclick="dTerminer('matin')">J'ai fait mon choix</button></div>` : "")
      + (e.ok.matin ? dAttenteHtml("matin") + (dAttente("matin").length ? "" : `<div class="row"><button class="or lg" onclick="dSuite('matin')">Aller au centre social</button></div>`) : "")
      + couleur;
  }
  if(t === "midi"){
    const autres = dJoueurs().filter(x => x.id !== j.id);
    return entete("midi") + carte + moi + dJaugesHtml(e) + dSceneMidi() + dDeHtml(e) + dDebHtml(j, e) + dEcho()
      + `<div class="card"><div class="eyebrow">Ce que tu fais à la grande table</div><div class="d-choix">${DIM_MIDI.map(c => `<button class="d-c ${e.c.midi === c.k ? "on" : ""}" aria-pressed="${e.c.midi === c.k}" onclick="dChoisirMidi('${c.k}')">${c.x}</button>`).join("")}</div>
        ${e.c.midi === "appui" ? `<div class="eyebrow" style="margin-top:12px">À qui ?</div><div class="d-choix">${autres.map(a => `<button class="d-c ${e.c.cible === a.id ? "on" : ""}" onclick="dCible('${a.id}')">${escapeHtml(a.nom || dNom(a.hero))} (${dNom(a.hero)})</button>`).join("") || `<p class="muted">Personne d'autre à cette table.</p>`}</div>` : ""}</div>`
      + `<div class="card"><div class="eyebrow">Une décision à tous</div><p>Que faire de la maison familiale d'Éléonore, et quelle place pourrait-elle garder dans la vie du quartier ?</p><div class="d-choix">${DIM_MAISON.map(c => `<button class="d-c ${e.c.maison === c.k ? "on" : ""}" aria-pressed="${e.c.maison === c.k}" onclick="dMaison('${c.k}')">${c.x}</button>`).join("")}</div></div>`
      + dDiscernerHtml(e)
      + (e.c.deb && e.c.midi && e.c.maison && !e.ok.midi ? `<div class="row"><button class="or lg" onclick="dTerminer('midi')">J'ai terminé</button></div>` : "")
      + (e.ok.midi ? dAttenteHtml("midi") + (dAttente("midi").length ? "" : `<div class="row"><button class="or lg" onclick="dSuite('midi')">Aller au bord de mer</button></div>`) : "")
      + couleur;
  }
  if(t === "soir"){
    const autres = dJoueurs().filter(x => x.id !== j.id && (_salon && (_salon.peers[x.id])));
    const recu = dJoueurs().filter(x => { const o = dEtat(x.id); return o && o.c.cible === j.id && o.c.midi === "appui"; });
    const sel = e.c.soir;
    return entete("soir") + carte + moi + dJaugesHtml(e)
      + (recu.length ? `<div class="card terre"><div class="eyebrow">Un appui t'a été offert</div><p>${recu.map(x => escapeHtml(x.nom || dNom(x.hero))).join(", ")} t'a offert un appui. Tu es libre de l'accueillir ou non.</p></div>` : "")
      + `<div class="card"><div class="eyebrow">Le cercle</div><p>Choisis une personne et un geste que tu as aperçu dans la journée. Tu peux lui offrir une observation ou une question : elle est libre de l'accueillir.</p>
        ${autres.length ? autres.map(a => { const gs = dGestesDe(a.id); return `<div class="d-cercle"><strong>${escapeHtml(a.nom || dNom(a.hero))}</strong><p class="tiny muted">${gs.length ? gs.map(escapeHtml).join(" ") : "Pas de geste visible."}</p>
          <div class="row"><button class="chip ${sel && sel.de === a.id && sel.type === "obs" ? "on" : ""}" onclick="dSoirChoisir('${a.id}','obs')">Lui offrir une observation</button><button class="chip ${sel && sel.de === a.id && sel.type === "q" ? "on" : ""}" onclick="dSoirChoisir('${a.id}','q')">Lui offrir une question</button></div></div>`; }).join("") : `<p class="muted">Tu es seul·e au cercle ce soir.</p>`}</div>`
      + `<div class="row"><button class="or lg" onclick="dTerminer('soir');dSuite('soir')">Terminer la journée</button></div>` + couleur;
  }
  // fin
  const p = dPaliers(e), maison = {};
  dJoueurs().forEach(x => { const o = dEtat(x.id); if(o && o.c.maison) maison[o.c.maison] = (maison[o.c.maison] || 0) + 1; });
  const atteint = p.filter(Boolean).length;
  setTimeout(dSophia, 0); setTimeout(() => dSauver(e, p), 0);
  return `<div class="hero slide-up"><div class="hero-mark">${typeof ensoMark === "function" ? ensoMark() : ""}</div><div class="eyebrow">Le dimanche de la Baie</div><h2 class="serif">La journée se termine</h2></div>`
    + couleur
    + `<div class="card"><div class="eyebrow">Tes traces</div><ul class="d-paliers">${DIM_PALIERS.map((x, n) => `<li class="${p[n] ? "ok" : ""}"><strong>${x.nom}</strong> · ${x.sens}</li>`).join("")}</ul><p class="tiny muted">Les paliers ne sont pas un classement : ils racontent ce que tu as expérimenté (${atteint} sur 5).</p></div>`
    + `<div class="card"><div class="eyebrow">La maison d'Éléonore</div>${Object.keys(maison).length ? Object.keys(maison).map(k => `<p>${maison[k]} joueur(s) · ${DIM_MAISON.find(x => x.k === k).x}</p>`).join("") : `<p class="muted">Aucune réponse.</p>`}</div>`
    + `<div class="card terre"><div class="eyebrow">Ce qui reste pour la suite</div>${dFinDebordement()}<p>Armand garde sa banderole. On la retrouvera dans un prochain épisode, peut-être retournée, avec autre chose peint au dos.</p></div>`
    + `<div class="card" id="d_compte"></div>`
    + `<div class="card"><div class="eyebrow">Sophia</div><div id="d_sophia"></div></div>`
    + `<div class="card"><div class="eyebrow">Et après ?</div><p class="muted">Les joueurs qui sont au même palier pourront continuer ensemble dans une suite, s'ils le souhaitent ; les autres pourront choisir une autre aventure ou quitter la table, sans aucune pénalité. Cette suite n'est pas encore écrite.</p><div class="row"><button class="ghost" onclick="salonQuitter()">Quitter la table</button></div></div>`;
}

if(typeof H_RENDER !== "undefined") H_RENDER.d_play = renderDimanche;
