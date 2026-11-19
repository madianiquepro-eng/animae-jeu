// ANIMAE — Épisode 2 : « La banderole retournée » (textes à valider avec Dina).
// Le jeu se souvient de ce que le joueur a fait à l'épisode 1 (session en cours ou mémoire de la série).
const E2_CH = [
  { k:"a", g:"di", x:"Parler en premier.", d:"a parlé en premier" },
  { k:"b", g:"sh", x:"Proposer qu'Éléonore parle d'abord.", d:"a proposé qu'Éléonore parle d'abord" },
  { k:"c", g:"aj", x:"Proposer une règle simple : chacun parle à son tour, sans couper.", d:"a proposé une règle de parole" },
  { k:"d", g:"ec", x:"Écouter jusqu'au bout avant de répondre.", d:"a écouté jusqu'au bout avant de répondre" }
];
let _e2 = { c:null, fin:false };
function e2Mem(){
  const j = dMoi(); if(!j) return null;
  if(state.table && state.table.mem1 && state.table.mem1.hero === j.hero) return state.table.mem1;
  const eps = (typeof _compte !== "undefined" && _compte.data && _compte.data.episodes) || [];
  for(let i = eps.length - 1; i >= 0; i--){ const x = eps[i]; if(x.id === "dimanche" && x.hero === j.hero && x.deb){ const L = (DIM_DEB[j.hero] || []).concat([{k:"r",g:"aj",d:"a demandé un temps pour respirer"}]), c = L.find(y => y.k === x.deb); if(c) return { hero:j.hero, deb:c.d, g:c.g }; } }
  return null;
}
function e2Demarrer(hero){
  if(!dMoi() && hero){ state.table = { code:"SOLO", couleur:null, joueurs:[{ id:"solo", nom:(typeof salonNom === "function" ? salonNom() : "") || dNom(hero), hero }], moi:{ id:"solo", nom:dNom(hero), hero } }; }
  _e2 = { c:null, fin:false }; window._e2Amb = false; state.phase = "e2_play";
  if(typeof _salon !== "undefined" && _salon){ _salon.me.d2 = {}; salonSync(); }
  render();
}
function e2Choisir(k){ _e2.c = k; try{ dSon(); const c = E2_CH.concat([{k:"e",g:"aj"}]).find(x => x.k === k); if(c && c.g === "aj") ambCloche(); else ambRire(); }catch(e){} if(typeof _salon !== "undefined" && _salon){ _salon.me.d2 = { c:k }; salonSync(); } e2Rafraichir(); }
function e2Fin(){ _e2.fin = true; if(typeof dPas === "function") dPas(); if(typeof ambLieu === "function") ambLieu("soir"); e2Rafraichir(); }
function e2Rafraichir(){ if(state.phase !== "e2_play") return; const app = document.getElementById("app"); if(app) app.innerHTML = `<div class="fade-in">${renderEp2()}</div>`; }
function e2Texte(c){ const x = E2_CH.concat([{ k:"e", d:"a fait autrement que la dernière fois" }]).find(y => y.k === c); return x ? x.d : ""; }
async function e2Sophia(){
  const z = document.getElementById("e2_sophia"); if(!z) return;
  z.innerHTML = `<p class="muted">Sophia relit les deux épisodes…</p>`;
  const j = dMoi(), mem = e2Mem(), L = [];
  L.push("Épisode 2 : la banderole d'Armand revient, retournée ; au dos : « Qui veut parler en premier ? ».");
  if(mem && mem.deb) L.push(`À l'épisode 1, ${dNom(j.hero)} ${mem.deb}.`);
  L.push(`À l'épisode 2, ${dNom(j.hero)} ${e2Texte(_e2.c)}.`);
  dJoueurs().filter(x => x.id !== j.id).forEach(x => { const o = (_salon && _salon.peers[x.id] && _salon.peers[x.id].d2) || null; if(o && o.c) L.push(`${dNom(x.hero)} ${e2Texte(o.c)}.`); });
  try{
    const r = await fetch(SALON_URL + "/functions/v1/sophia", { method:"POST", headers:{ "content-type":"application/json" }, body:JSON.stringify({ contexte:L.join("\n"), question:"Compare ce que cette personne a fait d'un épisode à l'autre, sans la juger. Remarque ce qui a changé ou non, avec une pointe d'humour tendre, et pose une seule question ouverte." }) });
    const d = await r.json(); if(!d.texte) throw new Error("vide");
    z.innerHTML = `<div class="sophia-lecture">${escapeHtml(d.texte).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br>")}</div>`;
    if(typeof vxDire === "function") vxDire(d.texte);
  }catch(e){ z.innerHTML = `<ul>${L.map(g => `<li>${escapeHtml(g)}</li>`).join("")}</ul>`; }
}
function renderEp2(){
  const j = dMoi(); if(!j) return `<div class="card"><button onclick="goTo('intro')">Retour à l'accueil</button></div>`;
  const mem = e2Mem(), narr = "Quelques semaines plus tard, au centre social. Armand revient avec la même banderole, mais retournée. Au dos, une phrase peinte à la main, d'une écriture un peu penchée : Qui veut parler en premier ? Un silence. Quelqu'un tousse. Armand précise que la peinture n'est pas tout à fait sèche.";
  if(!window._e2Amb){ window._e2Amb = true; if(typeof ambLieu === "function") ambLieu("midi"); setTimeout(() => { if(typeof ambFrottement === "function") ambFrottement(); }, 900); }
  window._vxTexte = narr; if(typeof vxNarrer === "function") vxNarrer("e2" + j.hero, narr);
  const moi = `<div class="card d-moi"><div class="sj-face">${salonFace(j.hero, 52)}</div><div><strong>${escapeHtml(j.nom || dNom(j.hero))}</strong><br><span class="tiny muted">tu joues ${dNom(j.hero)}</span></div></div>`;
  const entete = `<div class="hero slide-up"><div class="eyebrow">Épisode 2 · Au centre social</div><h2 class="serif">La banderole retournée</h2><p class="muted">Quelques semaines plus tard.</p>${typeof vxBarre === "function" ? vxBarre() : ""}</div>`;
  if(!_e2.fin){
    const L = E2_CH.concat(mem && mem.g && mem.g !== "pass" ? [{ k:"e", x:"Faire autrement que la dernière fois.", g:"aj" }] : []);
    return entete + (typeof dCarte === "function" ? dCarte() : "") + moi
      + `<div class="card scene-bascule"><p>Armand revient au centre social avec la même banderole, mais <strong>retournée</strong>. Au dos, peinte à la main, d'une écriture un peu penchée : <strong>« Qui veut parler en premier ? »</strong></p><p>Un silence. Quelqu'un tousse. Armand précise que la peinture n'est pas tout à fait sèche.</p>
        ${mem && mem.deb ? `<p class="echo"><strong>Tu t'en souviens · </strong>La dernière fois, ${escapeHtml(dNom(j.hero))} ${escapeHtml(mem.deb)}.</p>` : ""}</div>`
      + `<div class="card"><div class="eyebrow">Toi, maintenant</div><div class="d-choix">${L.map(c => `<button class="d-c ${_e2.c === c.k ? "on" : ""}" aria-pressed="${_e2.c === c.k}" onclick="e2Choisir('${c.k}')">${c.x}</button>`).join("")}</div></div>`
      + (_e2.c ? `<div class="row"><button class="or lg" onclick="e2Fin()">Voir la suite</button></div>` : "");
  }
  setTimeout(e2Sophia, 0);
  const autres = dJoueurs().filter(x => x.id !== j.id).map(x => { const o = (_salon && _salon.peers[x.id] && _salon.peers[x.id].d2) || null; return o && o.c ? `<li>${escapeHtml(dNom(x.hero))} ${escapeHtml(e2Texte(o.c))}.</li>` : ""; }).join("");
  return entete + moi
    + `<div class="card terre"><p>Armand roule la banderole sous son bras. <em>« Je la garde. Il reste plein de murs vides au quartier. »</em></p><p class="muted tiny">Fin de l'épisode 2. La banderole reviendra peut-être, avec autre chose peint sur le devant.</p></div>`
    + (autres ? `<div class="card"><div class="eyebrow">Autour de la table</div><ul>${autres}</ul></div>` : "")
    + `<div class="card"><div class="eyebrow">Sophia</div><div id="e2_sophia"></div></div>`
    + `<div class="row"><button class="ghost" onclick="salonQuitter()">Quitter la table</button><button class="ghost" onclick="goTo('intro')">Retour à l'accueil</button></div>`;
}
if(typeof H_RENDER !== "undefined") H_RENDER.e2_play = renderEp2;
