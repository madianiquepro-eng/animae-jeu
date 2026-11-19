/* ANIMAE — moteur d'aventures narratives (V3). Générique : une aventure = un objet dans AVENTURES.
   Un héros peut avoir plusieurs aventures. État dans state.h (sauvegardé avec le reste). */

const H_JAUGES = { cap:["Cap","MOI","var(--m-moi)"], liens:["Liens","RELATIONS","var(--m-relations)"], ouvrage:["Ouvrage","ACTIVITÉS","var(--or-terre-2)"], elan:["Élan","CORPS","var(--m-corps)"] };
const H_VOIES = { C:"Conscience", A:"Action", L:"Alliance", D:"Adaptation" };
const H_PNJ = {
  maela:{ nom:"Maëla", peau:"#8A5A3C", habit:"#B85D3D", cheveux:"#2A1810", coiffe:"boucles", accessoire:"foulard" },
  inaya:{ nom:"Inaya", peau:"#A9744F", habit:"#6F8A66", cheveux:"#2A1810", coiffe:"tresses", accessoire:"ecouteurs" },
  eleonore:{ nom:"Éléonore", peau:"#6B4530", habit:"#6E3F5C", cheveux:"#C9C4BC", coiffe:"court", accessoire:"broche" },
  gabriel:{ nom:"Gabriel", peau:"#E3B99A", habit:"#3A4668", cheveux:"#8C8780", coiffe:"court", accessoire:"barbe" }
};
const H_IMG = {
  decor:{ ATELIER:"img/atelier.jpg", ELEONORE:"img/eleonore.jpg", DEHORS:"img/mer.jpg", CARNET:"img/chezmoi.jpg", gabriel:"img/cafe.jpg", nuit:"img/chezmoi.jpg", imprevu0:"img/chezmoi.jpg", imprevu1:"img/atelier.jpg", stop:"img/mer.jpg", final:"img/atelier_ext.jpg" },
  carte:{ ELEONORE0:"img/c_eleonore_photo.jpg", ELEONORE1:"img/c_eleonore_buffet.jpg", CARNET0:"img/c_maela_ecrit.jpg", gabriel:"img/c_debat.jpg", ATELIER0:"img/c_inaya_seuil.jpg", CARNET1:"img/c_maela_carnet.jpg", nuit:"img/c_corde.jpg" },
  alt:{ ATELIER:"L'Atelier : de grandes tables, la fenêtre en trois parties ouverte sur les collines", ELEONORE:"Le salon d'Éléonore, avec son fauteuil vert", DEHORS:"Le sentier du bord de mer, un banc sous un flamboyant", CARNET:"Chez Maëla : le salon, le bureau, le foulard sur le mannequin", gabriel:"Le café-librairie", nuit:"Chez Maëla, la nuit", final:"L'Atelier vu de dehors, portes ouvertes" }
};
function hSceneImg(cle, cleCarte, lieuNom, moment, nuit){
  const d = H_IMG.decor[cle]; if(!d) return null;
  const c = cleCarte && H_IMG.carte[cleCarte];
  return `<div class="scene ${nuit?'nuit':''}"><img class="decor" src="${d}" alt="${H_IMG.alt[cle]||lieuNom}">${c?`<img class="scene-carte" src="${c}" alt="">`:""}
    <div class="scene-title"><span>${moment}</span>${lieuNom}</div></div>`;
}
const clampJ = v => Math.max(0, Math.min(6, v));
function hAdv(){ return AVENTURES[state.h.adv]; }

// ---------- Démarrage ----------
function hNew(advId){
  const a = AVENTURES[advId];
  state = newState();
  state.personnage = a.heros; state.mode = "personnage"; state.player.nom = H_PNJ[a.heros].nom;
  state.h = { adv:advId, i:0, sub:"scene", j:{...a.depart}, f:{...a.flags}, voies:{C:0,A:0,L:0,D:0}, ombre:0, vues:[], visites:{}, cur:null, res:null, log:[], joker:false, imprevu:null, protege:null, fin:null, choixFaits:0, tension:0, tmax:0, ress:[], traces:{}, zeros:{}, vp:{C:0,A:0,L:0,D:0}, ctxN:{}, pos:{x:700,y:610}, carte:2, renc:{}, v:3, arch:[], archUse:[], archSel:null };
  state.phase = "h_play";
  render();
}
function hQuitter(){ showModal(`<h2 class="serif">Quitter l'aventure ?</h2><p class="muted">Ta progression est gardée : tu pourras reprendre depuis l'accueil.</p><div class="row"><button class="or" onclick="closeModal();goTo('intro')">Retour à l'accueil</button><button class="ghost" onclick="closeModal()">Continuer</button></div>`); }

// ---------- Illustration des scènes ----------
function figure(id, x, y, s, sansNom){
  const p = H_PNJ[id]; let extra = "", hair = "";
  if(p.coiffe === "boucles") hair = [[-9,-40],[9,-40],[-12,-33],[12,-33],[0,-45],[-6,-46],[6,-46],[-13,-26],[13,-26]].map(([a,b])=>`<circle cx="${a}" cy="${b}" r="6.5" fill="${p.cheveux}"/>`).join("");
  else if(p.coiffe === "tresses") hair = `<path d="M-9 -38 Q0 -48 9 -38 L9 -33 L-9 -33 Z" fill="${p.cheveux}"/><path d="M-8 -34 Q-12 -18 -9 -4 M8 -34 Q12 -18 9 -4" stroke="${p.cheveux}" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-dasharray="3 1.5"/>`;
  else hair = `<path d="M-8.6 -36 A8.6 8.6 0 0 1 8.6 -36 Z" fill="${p.cheveux}"/>`;
  if(p.accessoire === "foulard") extra = `<path d="M-9 -24 Q0 -17 9 -24 L11 -19 Q0 -12 -11 -19 Z" fill="#D4826A"/><path d="M6 -19 Q12 -8 9 4" stroke="#D4826A" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  if(p.accessoire === "ecouteurs") extra = `<path d="M-8 -25 Q0 -19 8 -25" stroke="#FDFAF3" stroke-width="2.4" fill="none"/><circle cx="-8" cy="-25" r="2.6" fill="#FDFAF3"/><circle cx="8" cy="-25" r="2.6" fill="#FDFAF3"/>`;
  if(p.accessoire === "broche") extra = `<circle cx="-5" cy="-17" r="2.6" fill="#C9A567" stroke="#FDFAF3" stroke-width=".8"/>`;
  if(p.accessoire === "barbe") extra = `<path d="M-7 -32 A7.4 7.4 0 0 0 7 -32 Q0 -29 -7 -32 Z" fill="${p.cheveux}"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"><title>${p.nom}</title>
    <ellipse cx="0" cy="1" rx="15" ry="4" fill="#2A1810" opacity=".25"/>
    <path d="M-11 0 Q-14 -24 0 -28 Q14 -24 11 0 Z" fill="${p.habit}" stroke="#FDFAF3" stroke-width="1.2"/>
    ${p.coiffe==="court"?"":hair}<circle cx="0" cy="-35" r="8" fill="${p.peau}"/>${p.coiffe==="court"?hair:""}${extra}
    ${sansNom ? "" : `<rect x="-17" y="6" width="34" height="10" rx="5" fill="#FDFAF3" opacity=".92"/><text x="0" y="13.4" text-anchor="middle" font-size="6.4" font-family="Inter,sans-serif" font-weight="600" fill="#2A1810">${p.nom}</text>`}</g>`;
}
function hScene(monde, lieuNom, moment, pnj){
  const hero = hAdv().heros;
  const figs = figure(hero, 225, 340, 2.7) + (pnj||[]).map((id,k)=>figure(id, 400 + k*95, 336, 2.5)).join("");
  return `<div class="scene"><svg viewBox="0 0 640 400" role="img" aria-label="${lieuNom}">${DECORS[monde]()}${figs}</svg>
    <div class="scene-title"><span>${moment}</span>${lieuNom}</div></div>`;
}

// ---------- Jauges ----------
const H_MOTS = {
  cap:["Brouillard","Brumeux","Flou","Assez net","Net","Limpide","Lumineux"],
  liens:["Seule","Isolée","À distance","Entourée","Proches","Soutenue","Reliée"],
  ouvrage:["À l'arrêt","Esquissé","En chantier","Avance","Solide","Presque prêt","Prêt"],
  elan:["À bout","Épuisée","Fatiguée","Correct","Vive","En forme","Rayonnante"] };
const H_MONDES_TR = { MOI:"Moi", RELATIONS:"Relations", ACTIVITES:"Activités", CORPS:"Corps" };
function hJaugesMode(){ return (state && state.jMode) === "ressenti" ? "ressenti" : "chiffres"; }
function hJaugesBascule(){ state.jMode = hJaugesMode() === "ressenti" ? "chiffres" : "ressenti"; saveState(); render(); }
function hEtat(){
  const h = state.h; if(!h || h.tension == null) return "";
  const tr = Object.keys(H_MONDES_TR).map(m=>`<span class="pill ${h.traces[m]?'or':''}" style="opacity:${h.traces[m]?1:.45}">${h.traces[m]?"●":"○"} ${H_MONDES_TR[m]}</span>`).join(" ");
  const rs = [0,1,2].map(n=>h.ress[n] ? `<span class="pill indigo" title="${escapeHtml(h.ress[n].de)}">◆ ${escapeHtml(h.ress[n].nom)}</span>` : `<span class="pill" style="opacity:.4">◇</span>`).join(" ");
  const te = [0,1,2].map(n=>n<h.tension?"●":"○").join("");
  return `<div class="row tiny" style="gap:10px;margin:6px 0 10px;flex-wrap:wrap"><span title="Tension : la pression que Maëla porte. À 3, elle doit réguler.">Tension ${te}</span><span>Ressources ${rs}</span><span>Traces ${tr}</span></div>`;
}
function hJauges(delta){
  const h = state.h;
  return `<div class="hj">${Object.entries(H_JAUGES).map(([k,[nom,monde,col]])=>{
    const d = delta && delta[k] ? delta[k] : 0;
    return `<div class="hj-item ${d>0?'up':d<0?'down':''}"><div class="hj-top"><b>${nom}</b><span>${monde}</span></div>
      <div class="hj-bar">${[0,1,2,3,4,5].map(n=>`<i style="${n<h.j[k]?`background:${col}`:''}"></i>`).join("")}</div>
      <div class="hj-mot" style="font-family:'Cormorant Garamond',serif;font-size:1rem;line-height:1.1;margin-top:2px;color:${col}">${h.j[k]}/6 · ${H_MOTS[k][h.j[k]]}</div>
      ${d?`<div class="hj-d">${d>0?'+':''}${d}</div>`:""}</div>`;
  }).join("")}</div>${hEtat()}`;
}
function hCarteCanon(sc){
  const c = sc.ctx ? D.contextes.find(x=>x.n===sc.ctx) : null, d = sc.defi ? D.defis.find(x=>x.n===sc.defi) : null;
  if(!c && !d) return "";
  return `<div class="row" style="margin-bottom:12px">${c?`<button class="pill" style="cursor:pointer" onclick="hVoirCarte('c',${c.n})">${pictoInline('CONTEXTE')} Contexte · ${c.titre}</button>`:""}${d?`<button class="pill indigo" style="cursor:pointer" onclick="hVoirCarte('d',${d.n})">${pictoInline('DEFI')} Défi · ${d.titre}</button>`:""}</div>`;
}
function hVoirCarte(t, n){
  if(t === 'c'){ const c = D.contextes.find(x=>x.n===n); showModal(`<div class="eyebrow">Carte Contexte ${c.n}</div><h2 class="serif">${c.titre}</h2><p>${escapeHtml(c.quoi)}</p><button class="or" onclick="closeModal()">Fermer</button>`); }
  else { const d = D.defis.find(x=>x.n===n); showModal(`<div class="eyebrow">Carte Défi ${d.n}</div><h2 class="serif">${d.titre}</h2><p class="italic muted">${escapeHtml(d.sous)}</p><p>${escapeHtml(d.quoi)}</p><button class="or" onclick="closeModal()">Fermer</button>`); }
}

// ---------- Scène courante ----------
function hSceneCourante(){
  const h = state.h, a = hAdv(), type = a.plan[h.i];
  if(h.sub === "stop") return { ...a.stop, type:"stop", choix:[] };
  if(type === "prologue") return { ...a.prologue, type, monde:"RELATIONS" };
  if(type === "gabriel") return { ...a.gabriel, type };
  if(type === "nuit") return { ...a.nuit, type };
  if(type === "imprevu" && h.imprevu != null) return { ...a.imprevus[h.imprevu], type };
  if(type === "lieu" && h.cur){ const L = a.lieux[h.cur.lieu]; return { ...a.scenes[h.cur.lieu][h.cur.idx](h), type, lieu:L.nom, monde:L.monde }; }
  return null;
}
function hTexte(t){ return `<div class="narr">` + escapeHtml(t).split("\n").map(p=>`<p>${p}</p>`).join("") + `</div>`; }
function hFooter(){
  const h = state.h;
  return `<div class="footer-actions">
    <button class="ghost sm" onclick="toggleSophia()">${state.sophiaOn?"✦ Sophia":"○ Sophia"}</button>
    <button class="ghost sm" onclick="sonBascule()">${sonActif()?"♪ Son":"Son coupé"}</button>
    <button class="ghost sm" onclick="hVoirConstellation()">Constellation</button>
    <button class="ghost sm" onclick="hQuitter()">Quitter</button>
  </div>`;
}

const H_RENDER = {
  h_play(){
    const h = state.h, a = hAdv(), type = a.plan[h.i], moment = a.moments[h.i] || "";
    if(typeof sonAmbiance === "function") sonAmbiance(h.sub === "carte" || (h.cur && h.cur.lieu === "DEHORS"));
    if(typeof document !== "undefined" && document.body && document.body.classList) document.body.classList.toggle("fatigue", h.j.elan <= 1);
    // Résultat d'un choix
    if(h.sub === "res"){
      const r = h.res;
      return `${hJauges(r.fx)}
      <div class="card ${r.ombre?'indigo':'or'}">
        <div class="eyebrow">${r.issue ? r.issue : r.voie ? "Voie · "+H_VOIES[r.voie] : "Ce qui se passe"}${r.ombre?" · Ombre":""}</div>
        ${hTexte(r.r)}
        ${r.archRev?hRevele(r.archRev):(r.arch?`<p class="tiny"><strong>${r.arch}</strong> a marché avec toi dans ce choix.</p>`:"")}
        ${r.cout?`<p class="tiny">${r.cout}</p>`:""}
        ${(r.notes||[]).map(n=>`<p class="tiny">${escapeHtml(n)}</p>`).join("")}
        ${(h.ress.length && h.ressUse !== h.choixFaits) ? `<div class="row" style="gap:8px;margin:10px 0">${h.tension>0?`<button class="ghost sm" onclick="hUtiliserRess('stab')">Mobiliser ${escapeHtml(h.ress[h.ress.length-1].nom)} : stabiliser (−1 tension)</button>`:""}${Object.values(r.fx||{}).some(v=>v<0)?`<button class="ghost sm" onclick="hUtiliserRess('amortir')">Mobiliser ${escapeHtml(h.ress[h.ress.length-1].nom)} : amortir la perte</button>`:""}</div>`:""}
        ${state.sophiaOn && r.s ? `<div class="sophia"><span class="who">Sophia</span>${escapeHtml(r.s)}</div>`:""}
        ${state.sophiaOn && hDiscNotable(r) && !r.discProp ? `<div class="sophia" style="margin-top:10px"><span class="who">Sophia · si tu veux</span>Il s'est passé quelque chose d'ambigu dans ce choix : une chose a avancé, une autre a reculé. Je te propose un moment pour le regarder. Tu peux aussi continuer.<div class="row" style="margin-top:8px"><button class="indigo sm" onclick="hDisc('apres')">Prendre ce moment</button><button class="ghost sm" onclick="hDiscRefus()">Pas maintenant</button></div></div>` : ""}
        ${state.sophiaOn && !(hDiscNotable(r) && !r.discProp) ? `<button class="ghost sm" style="margin-bottom:8px" onclick="hDisc('apres')">✦ Moment de discernement</button>`:""}
        <button class="or lg block" onclick="hSuite()">Continuer</button>
      </div>${hFooter()}`;
    }
    // Tirage des trois archétypes
    if(type === "archetypes"){
      if(!h.arch.length) hTirer(false);
      return `${hJauges()}<div class="card"><div class="eyebrow-line"><span>${state.sophiaOn?"Sophia tire pour toi":"Tirage"}</span><div class="line"></div></div>
        <h2 class="serif">Trois archétypes marchent avec Maëla</h2>
        <p class="muted">Dans chaque scène, tu pourras faire appel à l'un d'eux pour appuyer ton choix : une fois chacun. Retourne les cartes pour lire leur Lumière et leur Ombre. Selon la situation, ton choix et la manière dont chaque animal fonctionne, il s'exprimera dans sa Lumière ou dans son Ombre. L'Ombre n'est pas une faute : c'est une réaction automatique qui protège quelque chose. Tu le sauras juste après ton choix.</p></div>
      <div class="grid c3">${h.arch.map((a,k)=>hCarteHtml(a,k,true)).join("")}</div>
      <div class="card"><p class="tiny">Touche une carte pour en faire A1, la manière la plus spontanée de Maëla dans cette aventure.</p>
        <div class="row between"><button class="ghost" onclick="hTirer(true)">↺ Tirer à nouveau</button><button class="or lg" onclick="hSuite()">Reprendre la route →</button></div></div>${hFooter()}`;
    }
    // Le quartier explorable (choix du lieu, café, grand jour)
    if(h.sub === "carte") return mondeEcran();
    // Dé de la vie
    if(type === "imprevu" && h.imprevu == null){
      return `${hJauges()}<div class="card center"><div class="eyebrow">${moment}</div><h2 class="serif">Le dé de la vie</h2>
        <p class="muted">Tout ne dépend pas de toi. Quelque chose arrive ce matin.</p>
        <div id="h_de" class="dice">?</div><div><button class="or lg" id="h_de_btn" onclick="hLancerDe()">Lancer le dé</button></div></div>${hFooter()}`;
    }
    // Choix final
    if(type === "final"){
      h.sub = "final"; hCalcFinal();
      if(h.forceCorps) return `${hJauges()}<div class="card terre"><div class="eyebrow">${moment}</div><h2 class="serif">Ce matin, ton corps décide</h2><p>Tu as tout donné, seule, et il ne reste rien. Tu n'as pas le choix de la forme que prendra cette journée.</p><button class="or lg block" onclick="hFinir('corps')">Ouvrir la porte</button></div>${hFooter()}`;
      const opts = a.finals.map(f=>{
        const ok = f.cond(h), note = ok && f.note ? f.note(h) : "";
        return `<button class="voie" ${ok?"":"disabled style='opacity:.5;cursor:default'"} onclick="hFinir('${f.id}')"><div class="vname">${f.t}</div>${ok?(note?`<div class="vef">${note}</div>`:""):`<div class="vef">Fermé — ${f.verrou}</div>`}</button>`;
      }).join("");
      return `${hJauges()}
      ${hSceneImg("final", null, "L'Atelier", moment)}
      <div class="card"><h2 class="serif">Samedi. Sept heures.</h2>
        <p>Tu es devant la porte de l'Atelier, la clé dans la main. Ce que tu as fait de ces trois jours décide de ce qui est possible maintenant.</p>
        <div class="voies">${opts}</div></div>${hFooter()}`;
    }
    // Scène
    const sc = hSceneCourante();
    if(h.sub === "stop"){
      return `${hJauges()}${hSceneImg("stop", null, sc.lieu, moment)}
      <div class="card terre"><h2 class="serif">${sc.titre}</h2>${hTexte(sc.texte)}<button class="or lg block" onclick="hStopSuite()">Laisser faire</button></div>${hFooter()}`;
    }
    const illu = sc.image ? `<div class="scene"><img src="${sc.image}" alt="Maëla remonte une rue, un carton sous le bras, son foulard terracotta au cou" style="display:block;width:100%;max-height:520px;object-fit:cover;object-position:50% 20%"><div class="scene-title"><span>${hAdv().titre}</span>${sc.lieu}</div></div>`
      : (hSceneImg(sc.type==="lieu"?h.cur.lieu:sc.type==="imprevu"?"imprevu"+h.imprevu:sc.type, sc.type==="lieu"?h.cur.lieu+h.cur.idx:sc.type, sc.lieu, moment, sc.type==="nuit") || hScene(sc.monde, sc.lieu, moment, sc.pnj));
    let corps;
    if(sc.type === "nuit" && !h.protege){
      corps = `<h3 class="serif">Que cherche-t-elle à protéger ?</h3><div class="voies">${sc.protege.map(p=>`<button class="voie" onclick="hProtege('${p.k}')"><div class="vq">${p.t}</div></button>`).join("")}</div>`;
    } else {
      const dispo = h.arch.some(a=>!a.used) && sc.type !== "prologue";
      corps = `${dispo ? `<div class="arch-bar"><span>Faire appel à</span><button class="ghost sm" onclick="hCartesVoir()" aria-label="Voir mes cartes">🂠 Cartes</button>${h.arch.map((a,k)=>`<button class="${h.archSel===k?'or':'ghost'} sm" ${a.used?"disabled":""} onclick="hArchSel(${k})">${a.nom.replace(/^(L’|LA |LE )/,"")}</button>`).join("")}</div>${h.archSel!=null?`<p class="tiny" style="margin:6px 0 0">${h.arch[h.archSel].nom} — ${h.arch[h.archSel].titre} — appuiera ton prochain choix.</p>`:""}` : ""}
      <div class="voies">${sc.choix.map((c,k)=>`<button class="voie" onclick="hChoisir(${k})"><div class="vq">${escapeHtml(c.t)}</div></button>`).join("")}
        ${!h.joker && sc.type!=="prologue" ? `<button class="voie je-passe" onclick="hJoker()"><div class="vq"><strong>Joker « Je passe »</strong> — une seule fois dans l'aventure. Ce moment passe sans toi.</div></button>`:""}</div>`;
    }
    return `${hJauges()}${illu}
    <div class="card">${hCarteCanon(sc)}<h2 class="serif">${sc.titre||""}</h2>${hTexte(sc.texte)}
      ${sc.type==="nuit" && h.protege ? `<p class="tiny">Tu l'as nommé. Maintenant, que fais-tu de cette voix ?</p>`:""}
      ${state.sophiaOn && sc.type!=="prologue" && !(sc.type==="nuit" && !h.protege) ? `<button class="ghost sm" style="margin:4px 0 10px" onclick="hDisc('avant')">✦ Moment de discernement</button>`:""}
      ${corps}</div>${hFooter()}`;
  },

  h_fin(){
    const h = state.h, a = hAdv(), e = a.epilogues[h.fin];
    const fins = hFinsVues();
    const vuesTot = Object.values(a.scenes).reduce((n,l)=>n+l.length,0);
    setTimeout(hIAInit, 0);
    return `<div class="hero"><div class="hero-mark">${ensoMark()}</div><div class="eyebrow">${a.titre} · ${e.statut}</div>
      <h2 class="serif" style="margin-top:12px">${e.titre}</h2></div>${typeof couleurHtml==="function"&&h.couleur?couleurHtml(h.couleur,"Couleur de cette partie"):""}
    ${hJauges()}
    ${hSceneImg(h.fin==="report"||h.fin==="corps"?"DEHORS":h.fin==="relais"||h.fin==="partage"?"final":"ATELIER", null, e.titre, "Le grand jour") || ""}
    ${h.fin==="partage" ? `<div class="card" style="padding:0;overflow:hidden"><img src="img/c_atelier_equipe.jpg" alt="Maëla à l'Atelier, entourée de deux personnes qui l'aident" style="display:block;width:100%;max-height:420px;object-fit:cover;object-position:50% 25%"></div>`:""}
    <div class="card">${hTexte(e.texte(h))}</div>
    ${state.sophiaOn ? `<div class="card sauge"><div class="eyebrow">Sophia · diagnostic systémique du parcours</div><h3 class="serif">Ce que je lis dans ces trois jours</h3>${hDiagnostic()}</div>
    <div class="card"><div class="eyebrow">Sophia · constellation</div><h3 class="serif">Le système de Maëla, ce samedi</h3>${hConstellation()}${hLectureConstellation()}</div>` : `<div class="card sauge"><p class="muted">Active Sophia (en bas) pour lire son diagnostic et la constellation.</p></div>`}
    ${state.sophiaOn && h.partiePrev ? `<div class="card sauge"><div class="eyebrow">Sophia · deux parties côte à côte</div><h3 class="serif">Ta partie d'avant et celle-ci</h3>${hComparer()}</div>` : ""}
    <div class="card indigo" id="h_ia_card" hidden><div class="eyebrow">Sophia · lecture approfondie par intelligence artificielle</div>
      <p class="muted">Sophia peut rédiger une lecture personnelle de ton parcours, puis répondre à tes questions. Ton parcours de jeu est alors envoyé à l'IA Claude.</p>
      <label class="toggle" style="margin-bottom:12px"><input type="checkbox" id="h_ia_perso"><span class="sw"></span>Inclure aussi ce que j'ai écrit dans « Et toi ? »</label>
      <div id="h_ia_out" class="sophia" ${h.iaTexte?"":"hidden"}>${h.iaTexte?hTexte(h.iaTexte):""}</div>
      <div class="row"><button class="indigo" id="h_ia_btn" onclick="hSophiaIA()">${h.iaTexte?"Demander une nouvelle lecture":"Demander sa lecture à Sophia"}</button></div>
      <div class="field" style="margin-top:16px"><label>Poser une question à Sophia</label><textarea id="h_ia_q" placeholder="Par exemple : pourquoi Maëla a-t-elle tant de mal à confier ?"></textarea></div>
      <div id="h_ia_rep" class="sophia" hidden></div>
      <button class="ghost" onclick="hSophiaQuestion()">Envoyer ma question</button></div>
    <div class="card or"><div class="eyebrow">Ton histoire, en ${h.log.length} moments</div>
      <ol style="padding-left:1.2em">${h.log.map(l=>`<li><strong>${l.ou}</strong> — ${escapeHtml(l.quoi)}</li>`).join("")}</ol></div>
    <div class="card"><div class="eyebrow">Et toi ? — facultatif</div>
      <blockquote>${a.retour}</blockquote>
      <textarea id="h_retour" placeholder="Tu peux écrire ici. Cela reste sur ton appareil." oninput="state.h.retour=this.value;saveState()">${escapeHtml(h.retour||"")}</textarea></div>
    <div class="card center"><p class="muted">Tu as vécu ${h.vues.length} scènes sur ${vuesTot}, et découvert ${fins.length} fin${fins.length>1?"s":""} sur ${Object.keys(a.epilogues).length}. D'autres choix mènent ailleurs.</p>
      <div class="row center"><button class="or lg" onclick="hNew('${h.adv}')">Rejouer autrement</button><button class="ghost" onclick="goTo('intro')">Accueil</button></div></div>${hFooter()}`;
  }
};

// ---------- Actions ----------
function hAppliquer(fx){ const h = state.h; Object.entries(fx||{}).forEach(([k,v])=>{ h.j[k] = clampJ(h.j[k]+v); }); }
function hAller(k){
  const h = state.h, a = hAdv(), idx = h.visites[k]||0;
  if(idx >= a.scenes[k].length) return;
  h.cur = { lieu:k, idx }; h.visites[k] = idx+1; h.vues.push(k+idx); h.sub = "scene";
  h.coutLieu = a.lieux[k].monde !== "CORPS";
  render();
}
// ---------- Règles de contexte (ajout de conception : une même décision n'a pas toujours les mêmes conséquences) ----------
function hRessGagne(nom, de){ const h = state.h; if(h.ress.length >= 3 || h.ress.some(r=>r.nom===nom)) return false; h.ress.push({ nom, de }); return true; }
const H_USURE = { pas:1, seuil:4, plafond:16 };
function hPlafond(fx, notes){
  // On ne tient pas tout au sommet en même temps : la somme des quatre jauges est plafonnée.
  const h = state.h, K = ["cap","liens","ouvrage","elan"], nom = { cap:"Le Cap", liens:"Les Liens", ouvrage:"L'Ouvrage", elan:"L'Élan" };
  const proj = k => Math.max(0, Math.min(6, h.j[k] + (fx[k]||0)));
  let somme = K.reduce((t,k)=>t+proj(k),0), garde = 0;
  while(somme > H_USURE.plafond && garde++ < 3){
    const c = K.filter(k=>!(fx[k] > 0) && proj(k) > 0).sort((x,y)=>proj(y)-proj(x))[0] || K.filter(k=>proj(k) > 0).sort((x,y)=>proj(y)-proj(x))[0];
    fx[c] = (fx[c]||0) - 1; somme--; h.ctxN.plafond = (h.ctxN.plafond||0)+1;
    notes.push(`Tu ne peux pas tout tenir au sommet en même temps : ${nom[c].toLowerCase()} cède 1.`);
  }
}
function hUsure(sc, fx, notes){
  // Ce qu'on ne nourrit pas s'use : après chaque choix, la jauge la plus haute parmi celles que ce choix n'a pas nourries perd 1.
  const h = state.h; if(sc.type === "prologue") return;
  const nom = { cap:"Le Cap", liens:"Les Liens", ouvrage:"L'Ouvrage", elan:"L'Élan" };
  const neg = ["cap","liens","ouvrage","elan"].filter(k=>!(fx[k] > 0) && h.j[k] + (fx[k]||0) >= H_USURE.seuil);
  if(!neg.length) return;
  neg.sort((x,y)=>(h.j[y]+(fx[y]||0))-(h.j[x]+(fx[x]||0)));
  const k = neg[0]; fx[k] = (fx[k]||0) - H_USURE.pas; h.ctxN.usure = (h.ctxN.usure||0)+1;
  notes.push(`Ce que tu n'as pas nourri s'use : ${nom[k].toLowerCase()} baisse de ${H_USURE.pas}.`);
}
function hContexte(c, fx){
  const h = state.h, notes = [], cnt = id => { h.ctxN[id] = (h.ctxN[id]||0)+1; };
  if(h.j.elan <= 2 && fx.ouvrage > 0){ fx.ouvrage--; notes.push("Épuisée, tu avances moins vite : l'Ouvrage gagne 1 de moins."); cnt("fatigue"); }
  if(fx.elan < 0){
    if(h.j.elan >= 5){ fx.elan++; notes.push("Reposée, tu encaisses mieux : l'Élan baisse de 1 de moins."); cnt("reposee"); }
    else if((h.f.inaya === 2 || h.f.gabriel) && h.j.elan >= 3){ fx.elan++; notes.push("Quelqu'un porte une part avec toi : l'Élan baisse de 1 de moins."); cnt("soutien"); }
  }
  if(h.ombre >= 3 && fx.liens > 0){ fx.liens--; notes.push("Ceux qui t'ont vue tout porter seule osent moins s'approcher : les Liens gagnent 1 de moins."); cnt("isolement"); }
  if(h.tension >= 2 && fx.cap > 0){ fx.cap--; notes.push("La pression brouille ta clarté : le Cap gagne 1 de moins."); cnt("pression"); }
  return notes;
}
function hTension(d){ const h = state.h; h.tension = Math.max(0, Math.min(3, h.tension + d)); h.tmax = Math.max(h.tmax, h.tension); }
function hTraceMonde(monde, c, fx){
  const h = state.h, m = monde && H_MONDES_TR[monde] ? monde : null; if(!m || h.traces[m] || c.ombre) return null;
  const net = Object.values(fx).reduce((x,y)=>x+y,0); if(net < 0 && !(c.voie==="C"||c.voie==="L")) return null;
  h.traces[m] = true; return H_MONDES_TR[m];
}
function hUtiliserRess(mode){
  const h = state.h, r = h.res; if(!h.ress.length || h.ressUse === h.choixFaits) return;
  const rs = h.ress.pop();
  if(mode === "stab" && h.tension > 0) hTension(-1);
  else if(mode === "amortir" && r){ const k = Object.entries(r.fx||{}).filter(([x,v])=>v<0).sort((a,b)=>a[1]-b[1])[0]; if(k){ h.j[k[0]] = Math.min(6, h.j[k[0]]+1); r.fx[k[0]] += 1; } }
  h.ressUse = h.choixFaits; h.log.push({ ou:"Ressource", quoi:`Mobiliser ${rs.nom} (${mode==="stab"?"stabiliser":"amortir"})` }); saveState(); render();
}
const H_ZERO = {
  cap:{ nom:"Le brouillard", t:"Ce soir, tu relis ta liste et tu ne sais plus pourquoi tu fais tout ça. Les mots sont là, le sens est ailleurs." },
  liens:{ nom:"Le silence", t:"Personne n'a écrit aujourd'hui. Ni demandé, ni proposé. Tu réalises que ce silence, tu l'as construit petit à petit." },
  ouvrage:{ nom:"Le chantier à l'arrêt", t:"Rien n'a avancé. Rien n'est prêt, et chaque heure qui passe te le rappelle." }
};
function hZero(k){
  const h = state.h; h.zeros[k] = true; h._zero = k; const z = H_ZERO[k];
  showModal(`<div class="sophia" style="margin-bottom:14px"><span class="who">Un seuil</span><strong>${z.nom}</strong></div><p class="serif" style="font-size:1.15rem">${escapeHtml(z.t)}</p>
    <div class="voies"><button class="voie" onclick="hZeroRep(0)"><div class="vq">L'affronter maintenant, même fatiguée.</div></button>
    <button class="voie" onclick="hZeroRep(1)"><div class="vq">La laisser mûrir. Tu ne peux pas tout regarder ce soir.</div></button></div>`);
}
function hZeroRep(i){
  const h = state.h, k = h._zero; if(!k){ closeModal(); return; } h._zero = null;
  if(i === 0){ h.j[k] = Math.min(6, h.j[k]+1); h.j.elan = Math.max(0, h.j.elan-1); h.log.push({ ou:"Un seuil ("+H_ZERO[k].nom+")", quoi:"L'affronter maintenant" }); }
  else { hTension(1); h.log.push({ ou:"Un seuil ("+H_ZERO[k].nom+")", quoi:"La laisser mûrir" }); }
  saveState(); closeModal(); if(typeof render === "function") render(); hApresModal();
}
function hSaturation(){
  const h = state.h; h._sat = true;
  showModal(`<div class="sophia" style="margin-bottom:14px"><span class="who">Saturation</span><strong>La tension est au plus haut.</strong></div><p class="serif" style="font-size:1.15rem">Tu ne peux pas repartir comme si de rien n'était. Il faut réguler avant d'avancer.</p>
    <div class="voies"><button class="voie" onclick="hSatRep(0)"><div class="vq">Temporiser : t'arrêter dix minutes, vraiment.</div></button>
    <button class="voie" onclick="hSatRep(1)"><div class="vq">T'allier : appeler quelqu'un et lui dire que ça serre.</div></button>
    <button class="voie" onclick="hSatRep(2)"><div class="vq">Adapter : changer ta manière de t'y prendre.</div></button>
    ${h.ress.length ? `<button class="voie" onclick="hSatRep(3)"><div class="vq">Mobiliser ${escapeHtml(h.ress[h.ress.length-1].nom)} et continuer.</div></button>` : ""}</div>`);
}
function hSatRep(i){
  const h = state.h; if(!h._sat){ closeModal(); return; } h._sat = false; h.tension = 2;
  const t = ["Temporiser","T'allier","Adapter"][i]; if(i === 3){ const r = h.ress.pop(); h.log.push({ ou:"Saturation", quoi:"Mobiliser "+r.nom }); } else h.log.push({ ou:"Saturation", quoi:t });
  if(i === 1) h.vp.L++; if(i === 2) h.vp.D++;
  saveState(); closeModal(); if(typeof render === "function") render(); hApresModal();
}
function hApresChoix(){
  const h = state.h; if(h.tension >= 3 && !h._sat){ hSaturation(); return true; }
  const z = ["cap","liens","ouvrage"].find(k=>h.j[k] <= 0 && !h.zeros[k]); if(z){ hZero(z); return true; }
  return false;
}
function hApresModal(){ const h = state.h; if(h._jourAttente){ const n = h._jourAttente; h._jourAttente = null; hSophiaJour(n); } }
function hChoisir(k){
  const h = state.h, sc = hSceneCourante(), c = sc.choix[k], avant = {...h.j};
  const fx = {...(c.fx||{})}; let cout = "";
  if(sc.type === "lieu" && h.coutLieu){ fx.elan = (fx.elan||0) - 1; cout = "Cette demi-journée t'a pris 1 Élan."; }
  const notes = hContexte(c, fx); hUsure(sc, fx, notes); hPlafond(fx, notes);
  let archNom = null, archRev = null;
  if(h.archSel != null && h.arch[h.archSel] && !h.arch[h.archSel].used){
    // Règlement V1.0 : en Lumière, +1 sur la voie choisie (aucun bonus de jauge) ; en Ombre, l'issue dépend de la réponse donnée.
    const a = h.arch[h.archSel], dec = hOmbreDeclenchee(a, c, fx), pol = dec ? "O" : "L";
    if(pol === "L"){ if(c.voie) h.vp[c.voie]++; }
    else if(c.voie === "C" || c.voie === "D") h.vp.D++;
    else if(c.voie === "L") h.vp.L++;
    else { hTension(1); notes.push("Le réflexe a pris le dessus : la tension monte d'un cran."); }
    a.used = true; archNom = a.nom; archRev = { nom:a.nom, titre:a.titre, pol, txt: pol==='L' ? a.lum : a.omb, q: pol==='L' ? a.ql : a.qo, raison: dec || '' };
    h.archUse.push({ k:h.archSel, pol, ou: sc.lieu || sc.titre, quoi:c.t, raison: dec || "", pos: h.archSel, voie: c.voie || "" });
  }
  const trace = hTraceMonde(sc.monde, c, fx);
  const avF = {...h.f};
  h.archSel = null;
  let r = typeof c.r === "function" ? c.r(h) : c.r;
  Object.assign(h.f, c.set||{});
  if(h.f.inaya === 2 && avF.inaya !== 2 && hRessGagne("Inaya","Une vraie part du projet lui est confiée")) notes.push("Inaya devient une Ressource : tu peux compter sur elle.");
  if(h.f.gabriel && !avF.gabriel && hRessGagne("Gabriel","Il a repris la logistique")) notes.push("Gabriel devient une Ressource : tu peux compter sur lui.");
  if(h.f.verite && !avF.verite && hRessGagne("Éléonore","Tu lui as dit la vérité")) notes.push("Éléonore devient une Ressource : un refuge.");
  if(trace) notes.push(`Trace obtenue : ${trace}. Elle est permanente.`);
  if(typeof c.apres === "function") c.apres(h, fx);
  hAppliquer(fx);
  if(c.voie) h.voies[c.voie]++; if(c.ombre) h.ombre++;
  h.choixFaits++;
  h.log.push({ ou: sc.lieu || sc.titre, quoi: c.t, voie:c.voie, ombre:!!c.ombre });
  h.res = { r, s:c.s, fx, voie:c.voie, ombre:!!c.ombre, issue:c.issue, cout, arch:archNom, archRev, notes, avant, ou: sc.lieu || sc.titre };
  h.sub = "res"; if(typeof sonResultat === "function") sonResultat(fx, c.ombre, h.j.elan); render();
}
// L'Ombre d'un archétype se déclenche quand le choix fait ressembler la situation à ce que cet animal protège (déclencheurs « pat » : extension à valider).
const H_PATRONS = {
  SOLO:{ nom:"tout porter seule", test:(c,fx)=> !!c.ombre || (fx.liens||0) < 0 },
  SURMENAGE:{ nom:"donner plus que ce que le corps peut", test:(c,fx)=> (fx.ouvrage||0) > 0 && (fx.elan||0) < 0 },
  FLOU:{ nom:"perdre le fil de ce qu'elle veut", test:(c,fx)=> (fx.cap||0) < 0 },
  EVITE:{ nom:"s'éloigner de ce qui est à faire", test:(c,fx)=> (fx.ouvrage||0) < 0 && (fx.elan||0) >= 0 },
  FORCE:{ nom:"avancer sans les autres, par la force du faire", test:(c,fx)=> c.voie === "A" && (fx.liens||0) <= 0 && (fx.ouvrage||0) > 0 },
  OUBLI:{ nom:"se donner aux autres en s'oubliant", test:(c,fx)=> (fx.liens||0) > 0 && (fx.elan||0) < 0 }
};
function hOmbreDeclenchee(a, c, fx){
  const pats = (a && a.pat) || [];
  for(const k of pats){ if(H_PATRONS[k] && H_PATRONS[k].test(c, fx||{})) return k; }
  return "";
}
function hRevele(x){
  const L = x.pol === "L";
  const cause = L ? "Ton choix n'a pas touché ce que cet animal protège : la force s'est ajustée à la situation." : `Ton choix ressemblait à ce que cet animal protège : ${H_PATRONS[x.raison] ? H_PATRONS[x.raison].nom : "son réflexe"}. Sa réaction automatique s'est mise en route. Ce n'est pas une faute.`;
  return `<div class="card ${L?'or':'indigo'}" style="margin:10px 0;padding:12px"><div class="eyebrow">${escapeHtml(x.nom)} · ${L?"Lumière":"Ombre"}</div><p class="serif" style="margin:4px 0">Ici, ${escapeHtml(x.nom)} se montre dans sa <strong>${L?"Lumière":"Ombre"}</strong> : ${escapeHtml(String(x.txt||"").replace(/\.$/,"").toLowerCase())}.</p><p class="tiny">${cause}</p>${x.q?`<p class="tiny"><em>${escapeHtml(x.q)}</em></p>`:""}</div>`;
}
function hTirer(redraw){ const h = state.h; h.arch = shuffleArray(D.archetypes.filter(a=>a.rc)).slice(0,3).map(a=>({ id:a.id, nom:a.nom, titre:a.titre, famille:a.famille, lum:a.lum, omb:a.omb, ql:a.ql, qo:a.qo, adj:a.adj, lk:a.lk, ok:a.ok, rc:a.rc, vs:a.vs, pat:a.pat, used:false })); if(redraw) render(); }
const H_POS = ["A1 · fonctionnement spontané, ce qui vient en premier.", "A2 · ressource mobilisable, ce sur quoi tu peux t'appuyer.", "A3 · manière moins familière, un décalage qui peut ouvrir une autre possibilité."];
function hCarteHtml(a, k, assignable){
  return `<div class="arch-card ${k===0?'assigned':''}" style="padding:12px"><div class="slot-badge">A${k+1}</div>
    <div class="flipc" id="fc${k}" onclick="hFlip(${k})" role="button" aria-label="Retourner la carte ${escapeHtml(a.nom)}"><div class="flipi"><img class="flipf" src="${a.rc}" alt="${escapeHtml(a.nom)}, ${escapeHtml(a.titre)} : face avant de la carte"><img class="flipf flipb" src="${a.vs}" alt="${escapeHtml(a.nom)} : Lumière et Ombre, face arrière"></div></div>
    <p class="tiny" style="margin:8px 0 6px">${H_POS[k]} Ces positions ne sont pas des étiquettes de personnalité.</p>
    <div class="row" style="gap:6px"><button class="ghost sm" onclick="hFlip(${k})">↻ Retourner</button>${assignable && k>0?`<button class="ghost sm" onclick="hA1(${k})">En faire A1</button>`:""}</div></div>`;
}
function hFlip(k){ const el = document.getElementById("fc"+k); if(el) el.classList.toggle("f"); }
function hCartesVoir(){
  const h = state.h; if(!h.arch.length) return;
  showModal(`<div class="eyebrow">Tes trois archétypes</div><div class="grid c3">${h.arch.map((a,k)=>hCarteHtml(a,k,false)).join("")}</div><button class="or" onclick="closeModal()">Fermer</button>`);
}
function hA1(k){ const h = state.h; if(k>0){ [h.arch[0],h.arch[k]] = [h.arch[k],h.arch[0]]; render(); } }
function hArchSel(k){ const h = state.h; h.archSel = h.archSel === k ? null : k; render(); }
function hProtege(k){ state.h.protege = k; render(); }
function hJoker(){
  const h = state.h, sc = hSceneCourante();
  h.joker = true; h.log.push({ ou: sc.lieu || sc.titre, quoi:"Joker « Je passe » : ce moment est passé sans toi." });
  h.res = { r:"Tu laisses passer. Rien n'est gagné, rien n'est perdu. Le temps, lui, a avancé.", s:"C'était ton seul Joker. Tu as choisi où le poser.", fx:{} };
  h.sub = "res"; render();
}
function hLancerDe(){
  const h = state.h, a = hAdv();
  const ctx = a.imprevus.map((e,i)=>({e,i})).filter(x=>x.e.cond && x.e.cond(h));
  const libres = a.imprevus.map((e,i)=>({e,i})).filter(x=>!x.e.cond);
  const n = ctx.length ? ctx[Math.floor(Math.random()*ctx.length)].i : libres[Math.floor(Math.random()*libres.length)].i;
  h.imprevuCtx = ctx.length > 0;
  const de = document.getElementById("h_de"), btn = document.getElementById("h_de_btn");
  h.imprevu = n; saveState();
  if(!de || !de.classList){ render(); return; }
  if(btn) btn.disabled = true; de.textContent = h.imprevuCtx ? "✦" : n+1; de.classList.add("rolling"); if(typeof sonDe === "function") sonDe();
  setTimeout(render, 900);
}
function hSuite(){
  const h = state.h, a = hAdv();
  h.i++; h.res = null; h.cur = null; h.sub = "scene";
  if(h.i >= a.plan.length){ h.i = a.plan.length-1; }
  const type = a.plan[h.i];
  if(type === "lieu"){ h.sub = h.j.elan <= 0 ? "stop" : "carte"; }
  if(type === "gabriel" || type === "final") h.sub = "carte";
  render();
  const montre = hApresChoix();
  const jp = hJourDe(a.moments[h.i-1]), jn = hJourDe(a.moments[h.i]);
  if(h.i > 1 && jp && jp !== jn && state.sophiaOn){ if(montre) h._jourAttente = jp; else hSophiaJour(jp); }
}
function hStopSuite(){
  const h = state.h, a = hAdv();
  h.j.elan = 2; h.stops = (h.stops||0)+1; if(h.tension > 0) hTension(-1);
  h.log.push({ ou:"Le corps dit stop", quoi:"Une demi-journée perdue. Ton corps a posé la limite à ta place." });
  h.res = { r:a.stop.r, s:a.stop.s, fx:{elan:2}, ombre:false, issue:"Le corps" };
  h.sub = "res"; render();
}
function hCalcFinal(){
  const h = state.h; const aide = h.f.inaya===2 || !!h.f.gabriel;
  h.ouvrageEff = h.j.ouvrage + (h.f.inaya===2?1:0) + (h.f.gabriel?1:0);
  h.forceCorps = h.j.elan <= 1 && !aide;
}
function hFinir(id){
  const h = state.h; hCalcFinal(); const aide = h.f.inaya===2 || !!h.f.gabriel;
  let fin = id;
  if(id === "prevu") fin = (aide && h.j.liens >= 3) || h.j.liens >= 5 ? "partage" : "seule";
  if(id === "relais") h.f.foulard = "transmis";
  h.fin = fin; h.log.push({ ou:"Le grand jour", quoi: hAdv().epilogues[fin].titre });
  try{ const k = "animae_fins_"+h.adv, v = JSON.parse(localStorage.getItem(k)||"[]"); if(!v.includes(fin)){ v.push(fin); localStorage.setItem(k, JSON.stringify(v)); } }catch(e){}
  hPartieNote();
  state.phase = "h_fin"; render();
}
function hPartieNote(){
  const h = state.h;
  const R = { fin:h.fin, titre:hAdv().epilogues[h.fin].titre, voies:{...h.voies}, ombre:h.ombre, j:{...h.j}, tmax:h.tmax||0, n:h.choixFaits, inaya:h.f.inaya===2, gabriel:!!h.f.gabriel, verite:!!h.f.verite, stops:h.stops||0,
    sol:(h.rel&&h.rel.solange)||0, nad:(h.rel&&h.rel.nadege)||0, archL:(h.archUse||[]).filter(u=>u.pol==="L").length, archO:(h.archUse||[]).filter(u=>u.pol==="O").length, disc:(h.disc||[]).length };
  try{ const k = "animae_parties_"+h.adv, v = JSON.parse(localStorage.getItem(k)||"[]"); v.push(R); h.partieN = v.length; localStorage.setItem(k, JSON.stringify(v.slice(-6))); h.partiePrev = v.length > 1 ? v[v.length-2] : null; h.partieCur = R; }catch(e){}
}
function hComparer(){
  const h = state.h, A = h.partiePrev, B = h.partieCur; if(!A || !B) return "";
  const P = [], dom = o => Object.entries(o).sort((a,b)=>b[1]-a[1])[0][0];
  P.push(A.fin === B.fin ? `Les deux parties se terminent de la même façon : « ${escapeHtml(B.titre)} ». Ce qui change, c'est le chemin.` : `La première partie finissait par « ${escapeHtml(A.titre)} », celle-ci par « ${escapeHtml(B.titre)} ». Ni l'une ni l'autre n'est meilleure : ce sont deux manières de tenir un même samedi.`);
  if(dom(A.voies) !== dom(B.voies)) P.push(`Ta première voie a changé : <strong>${H_VOIES[dom(A.voies)]}</strong> d'abord, puis <strong>${H_VOIES[dom(B.voies)]}</strong>. Quand on change de réflexe, c'est qu'on a vu autre chose.`);
  else P.push(`Ta première voie est restée la même : <strong>${H_VOIES[dom(B.voies)]}</strong>. C'est ta manière d'entrer dans les situations, avec ou sans pression.`);
  if(B.ombre !== A.ombre) P.push(B.ombre < A.ombre ? `Tu as choisi de porter seule ${A.ombre} fois, puis ${B.ombre}. Ce réflexe a moins parlé.` : `Tu as choisi de porter seule ${A.ombre} fois, puis ${B.ombre}. Ce réflexe a davantage parlé cette fois : regarde ce qui pesait.`);
  const bouge = Object.keys(B.j).map(k=>[k, B.j[k]-A.j[k]]).sort((a,b)=>Math.abs(b[1])-Math.abs(a[1]))[0];
  if(bouge && bouge[1] !== 0) P.push(`L'écart le plus net entre les deux fins : <strong>${H_JAUGES[bouge[0]][0]}</strong> (${H_JAUGES[bouge[0]][1]}), ${A.j[bouge[0]]} puis ${B.j[bouge[0]]}.`);
  const rA = +A.inaya + +A.gabriel, rB = +B.inaya + +B.gabriel;
  if(rA !== rB) P.push(rB > rA ? "Cette fois, plus de monde porte le projet avec toi." : "Cette fois, moins de monde porte le projet avec toi.");
  if((B.sol + B.nad) !== (A.sol + A.nad)) P.push((B.sol + B.nad) > (A.sol + A.nad) ? "Tu es allée plus loin avec les habitants du quartier." : "Tu es restée plus loin des habitants du quartier.");
  if(B.tmax !== A.tmax) P.push(`La tension est montée jusqu'à ${A.tmax}, puis ${B.tmax}.`);
  P.push("Ce que tu as refait pareil, c'est peut-être ce qui te ressemble. Ce que tu as fait autrement, c'est ce que tu peux déjà bouger.");
  return P.map(x=>`<p>${x}</p>`).join("");
}
function hFinsVues(){ try{ return JSON.parse(localStorage.getItem("animae_fins_"+state.h.adv)||"[]"); }catch(e){ return [state.h.fin]; } }

// ---------- Moment de discernement : avant et après une décision (activation volontaire, sans pénalité, sans bonne réponse) ----------
const H_ENJEUX = { cap:"ce que tu veux vraiment", liens:"les soutiens autour de toi", ouvrage:"l'avancement de ton projet", elan:"ton énergie" };
const H_ANGLES = { A:"Prendre les choses en main", L:"Partager, accepter de l'aide", D:"Revoir ses priorités, renoncer à une exigence", C:"Prendre le temps de comprendre avant d'agir" };
function hDiscNotable(r){ const v = Object.values((r&&r.fx)||{}); return v.some(x=>x>=1) && v.some(x=>x<=-1); }
function hDiscRefus(){ const r = state.h.res; if(r) r.discProp = true; render(); }
function hDisc(mode){
  const h = state.h; if(!state.sophiaOn){ showModal(`<p>Active Sophia pour ouvrir un moment de discernement.</p><button class="or" onclick="closeModal()">OK</button>`); return; }
  const pied = `<p class="tiny">Ce moment est libre : tu peux le quitter à tout instant, sans effet sur tes jauges. Il n'y a pas de bonne réponse.</p>`;
  if(mode === "avant"){
    const sc = hSceneCourante(), j = h.j;
    const pool = [ j.elan<=3 ? "préserver ton énergie" : null, j.liens<=3 ? "prendre soin d'un lien" : null, j.cap<=3 ? "rester fidèle à ce que tu veux vraiment" : null, "garder la maîtrise", "faire confiance" ].filter(Boolean).slice(0,3);
    const enjeux = Object.entries(H_JAUGES).map(([k,[nom]])=>`<li><strong>${nom}</strong> (${H_MOTS[k][j[k]].toLowerCase()}) : ${H_ENJEUX[k]}</li>`).join("");
    const voies = [...new Set(sc.choix.map(c=>c.voie).filter(Boolean))].map(v=>H_ANGLES[v]).filter(Boolean);
    const ar = h.arch.find((a,k)=>k===h.archSel && !a.used) || h.arch.find(a=>!a.used);
    h._discA = { k:h.choixFaits, lieu: sc.lieu || sc.titre, pool, rep:null };
    showModal(`<div class="sophia" style="margin-bottom:12px"><span class="who">Sophia · Avant le choix</span><strong>Anticiper</strong></div>
      <p class="serif" style="font-size:1.1rem">Avant de décider, qu'est-ce qui compte le plus pour toi ici : ${pool.slice(0,-1).join(", ")} ou ${pool[pool.length-1]} ?</p>
      <div class="voies">${pool.map((t,i)=>`<button class="voie" onclick="hDiscAv(${i})"><div class="vq">${escapeHtml(t[0].toUpperCase()+t.slice(1))}</div></button>`).join("")}<button class="voie" onclick="hDiscAv(-1)"><div class="vq">Je préfère ne pas me prononcer.</div></button></div>
      <p class="tiny" style="margin-top:14px"><strong>Ce qui peut être en jeu</strong> (sans que tu saches d'avance comment) :</p><ul class="tiny">${enjeux}</ul>
      ${voies.length ? `<p class="tiny"><strong>Manières d'aborder la situation</strong> : ${voies.join(" · ")}.</p>`:""}
      ${ar ? `<p class="tiny"><strong>${ar.nom}</strong> peut s'exprimer de deux manières ici. Je ne te dis pas laquelle.<br>Lumière : ${escapeHtml(ar.ql)}<br>Ombre : ${escapeHtml(ar.qo)}</p>`:""}${pied}`);
  } else {
    const r = h.res; if(!r){ closeModal(); return; }
    const K = Object.entries(H_JAUGES), av = r.avant || h.j;
    const lignes = K.map(([k,[nom]])=>`<li><strong>${nom}</strong> : ${av[k]} → ${h.j[k]} (${H_MOTS[k][av[k]].toLowerCase()} → ${H_MOTS[k][h.j[k]].toLowerCase()})</li>`).join("");
    const gain = K.map(([k,[nom]])=>[nom,h.j[k]-av[k]]).sort((a,b)=>b[1]-a[1])[0], perte = K.map(([k,[nom]])=>[nom,h.j[k]-av[k]]).sort((a,b)=>a[1]-b[1])[0];
    const da = h.discAv && h.discAv.k === h.choixFaits-1 ? h.discAv : null;
    const lecture = (gain[1] > 0 && perte[1] < 0) ? `Tu as gagné du côté de <strong>${gain[0]}</strong>, et <strong>${perte[0]}</strong> a reculé.` : gain[1] > 0 ? `Ce choix a surtout nourri <strong>${gain[0]}</strong>. Que devient le reste ?` : perte[1] < 0 ? `Ce choix a surtout coûté du côté de <strong>${perte[0]}</strong>.` : "Ce choix a peu bougé les jauges. Ce qui a changé est peut-être ailleurs.";
    h._discP = { k:h.choixFaits, lieu:r.ou || "ce moment", gain:gain[1]>0?gain[0]:null, perte:perte[1]<0?perte[0]:null, rep:null };
    showModal(`<div class="sophia" style="margin-bottom:12px"><span class="who">Sophia · Après le choix</span><strong>Comprendre</strong></div>
      ${da && da.rep ? `<p class="serif" style="font-size:1.05rem">Avant de choisir, tu disais que ce qui comptait le plus était : <em>${escapeHtml(da.rep)}</em>.</p>`:""}
      <p class="serif" style="font-size:1.1rem">${lecture} Qu'observes-tu entre ce que tu voulais obtenir et ce qui s'est réellement produit ?</p>
      <ul class="tiny">${lignes}</ul>
      <p class="serif" style="font-size:1.05rem">Quel mécanisme pourrait être à l'œuvre ? Qu'aimerais-tu en faire ?</p>
      <div class="voies"><button class="voie" onclick="hDiscAp(0)"><div class="vq">Le conserver : c'était juste.</div></button><button class="voie" onclick="hDiscAp(1)"><div class="vq">Le modifier : faire autrement la prochaine fois.</div></button><button class="voie" onclick="hDiscAp(2)"><div class="vq">Le réparer : quelque chose a besoin d'être remis en lien.</div></button><button class="voie" onclick="hDiscAp(-1)"><div class="vq">Je préfère ne pas répondre.</div></button></div>${pied}`);
  }
}
function hDiscAv(i){ const h = state.h, a = h._discA; if(a){ a.rep = i >= 0 ? a.pool[i] : null; h.discAv = a; h._discA = null; h.disc = h.disc || []; h.disc.push({ lieu:a.lieu, phase:"avant", rep:a.rep }); } saveState(); closeModal(); }
function hDiscAp(i){ const h = state.h, p = h._discP; if(p){ p.rep = i >= 0 ? ["Conserver","Modifier","Réparer"][i] : null; h._discP = null; h.disc = h.disc || []; h.disc.push({ lieu:p.lieu, phase:"apres", rep:p.rep, gain:p.gain, perte:p.perte, avant:(h.discAv && h.discAv.k === p.k-1) ? h.discAv.rep : null }); } saveState(); closeModal(); }
// ---------- Sophia pendant la partie : fin de journée (nomme l'épreuve, éclaire, conseille, interroge) ----------
function hJourDe(m){ const x = (m||"").match(/Jour (\d)/); return x ? +x[1] : 0; }
const H_EPREUVES = [
  { id:"seule", nom:"tout porter seule", cond:h=>h.ombre>=2,
    lum:"Tu as dit « je gère » plus d'une fois. Ce n'est pas une faute, c'est une manière de tenir. Mais ce qu'on porte seule, personne ne peut ni le partager ni le comprendre.",
    conseil:"Si tu veux : demain, confie une seule chose, même petite, et regarde ce que ça change.",
    q:"Ce soir, qui aurait pu prendre une part de ce que tu portes ?", rep:["Inaya","Gabriel","Éléonore","Personne, et ça pèse"] },
  { id:"corps", nom:"un corps qui s'épuise", cond:h=>h.j.elan<=2,
    lum:"Ton élan est bas. Le corps ne négocie pas : il finit par poser la limite à ta place, souvent au pire moment.",
    conseil:"Si tu veux : fixe d'avance un moment de repos, et protège-le comme un rendez-vous.",
    q:"Qu'est-ce que tu serais prête à lâcher demain pour t'arrêter vraiment vingt minutes ?", rep:["Une tâche de la liste","Un message","Rien, impossible","Je ne sais pas"] },
  { id:"lien", nom:"le temps contre le lien", cond:h=>h.j.liens<=2 && h.j.ouvrage>=3,
    lum:"L'ouvrage avance et les liens reculent. Souvent, on ne s'en aperçoit que quand quelqu'un cesse de proposer son aide.",
    conseil:"Si tu veux : offre à une personne un moment sans rien lui demander.",
    q:"Qui, dans ce quartier, a arrêté de te proposer de l'aide ?", rep:["Gabriel","Éléonore","Inaya","Je ne l'avais pas vu"] },
  { id:"flou", nom:"ne plus savoir ce que tu veux", cond:h=>h.j.cap<=2,
    lum:"Tu avances vite, mais la direction s'efface. Faire beaucoup peut cacher qu'on n'a pas choisi.",
    conseil:"Si tu veux : écris en une phrase ce que tu veux, pas ce que tu dois.",
    q:"Si tu retirais le mot « devoir » de ta journée, que resterait-il ?", rep:["Presque rien","Quelque chose de précis","Du soulagement","De la peur"] },
  { id:"attentes", nom:"répondre aux attentes des autres", cond:h=>(h.rel&&(h.rel.nadege||h.rel.solange)) ,
    lum:"Nadège habille les envies des autres, Solange garde une recette qu'on lui a transmise. Chacune se demande ce qui est à elle. Tu te poses peut-être la même question.",
    conseil:"Si tu veux : repère une chose que tu fais parce qu'on l'attend de toi, et une que tu ferais pour toi.",
    q:"Dans ton projet, qu'est-ce qui est vraiment à toi ?", rep:["Presque tout","Une partie","Je ne sais plus","Ce n'est pas la bonne question"] },
  { id:"present", nom:"faire ou être là", cond:h=>true,
    lum:"Tu tiens le rythme. La question n'est peut-être pas ce que tu fais, mais où tu es pendant que tu le fais.",
    conseil:"Si tu veux : choisis un moment de demain où tu ne fais rien d'autre que ce que tu fais.",
    q:"À quel moment, aujourd'hui, étais-tu entièrement là ?", rep:["Avec une personne","Seule, au calme","Nulle part","Je ne sais pas"] }
];
function hSophiaJour(n){
  const h = state.h; h.sq = h.sq || [];
  const deja = h.sq.map(x=>x.id);
  const ok = H_EPREUVES.filter(e=>e.cond(h));
  const e = ok.find(x=>!deja.includes(x.id)) || ok[0];
  h._sq = { jour:n, id:e.id, nom:e.nom, q:e.q, rep:null };
  const mot = n === 1 ? "Fin du premier jour" : n === 2 ? "Fin du deuxième jour" : "Fin du troisième jour";
  showModal(`<div class="sophia" style="margin-bottom:14px"><span class="who">Sophia · ${mot}</span><strong>L'épreuve que je vois ce soir : ${e.nom}.</strong></div>
    <p class="serif" style="font-size:1.15rem">${escapeHtml(e.lum)}</p>
    <p class="muted">${escapeHtml(e.conseil)}</p>
    <p class="serif" style="font-size:1.15rem"><em>${escapeHtml(e.q)}</em></p>
    <div class="voies">${e.rep.map((r,i)=>`<button class="voie" onclick="hSophiaRep(${i})"><div class="vq">${escapeHtml(r)}</div></button>`).join("")}</div>
    <button class="ghost block" style="margin-top:8px" onclick="hSophiaRep(-1)">Je préfère ne pas répondre ce soir</button>
    <p class="tiny">C'est une hypothèse, pas un diagnostic. Tu peux la contredire.</p>`);
}
function hSophiaRep(i){
  const h = state.h, e = h._sq; if(!e) { closeModal(); return; }
  const def = H_EPREUVES.find(x=>x.id===e.id);
  e.rep = i >= 0 ? def.rep[i] : null; h.sq.push(e); h._sq = null; saveState(); closeModal();
  if(typeof sonChoix === "function") sonChoix();
}
// ---------- Sophia : diagnostic systémique (calculé sur les choix réellement faits) ----------
function hLectureHabitants(){
  const h = state.h, R = h.rel || {}, P = [];
  const rs = R.solange || 0, rn = R.nadege || 0, vuS = !!h.renc.solange, vuN = !!(h.renc.nadege || h.tenue);
  if(vuS){
    const t = ["Chez <strong>Solange</strong>, tu es passée sans t'arrêter. Elle t'a vue quand même.", "Chez <strong>Solange</strong>, tu as pris un sorbet. Elle t'a servie, mais la vraie question est restée dans le kiosque.", "Chez <strong>Solange</strong>, tu as demandé ce qu'elle mettrait dans sa recette si personne ne la regardait. Elle n'avait jamais entendu cette question.", "Chez <strong>Solange</strong>, tu as ouvert la porte à ce qui se transmet : une recette qu'on change n'est pas trahie, elle continue."][rs] || "";
    P.push(t + (h.renc.solange2 ? " Tu es repassée, ce qui compte plus que ce que tu as dit." : ""));
  }
  if(vuN){
    const t = ["", "Aux <strong>Allures</strong>, <strong>Nadège</strong> t'a habillée. Tu es repartie avec une tenue, sans avoir parlé d'elle.", "Aux <strong>Allures</strong>, tu as vu ce que <strong>Nadège</strong> dessine pour elle et qu'elle n'ose pas montrer.", "Aux <strong>Allures</strong>, tu as laissé <strong>Nadège</strong> proposer quelque chose à faire ensemble. Tu as accepté d'être aidée autant que d'aider."][rn] || "";
    if(t) P.push(t + (h.renc.nadege2 ? " Tu es revenue le lendemain." : ""));
  }
  if(vuS && vuN && rs >= 2 && rn >= 2) P.push("Tu as demandé à deux femmes ce qu'elles voulaient pour elles, pas seulement ce qu'elles font. Chacune garde ce qu'on lui a confié avant de se demander ce qui est à elle. La question est peut-être aussi la tienne.");
  else if((vuS || vuN) && h.ombre >= 3 && Math.max(rs, rn) <= 1) P.push("Même devant des gens bienveillants, tu es restée à la surface. Porter seule, ça commence aussi par ne pas se laisser demander.");
  else if(!vuS && !vuN) P.push("Tu n'as croisé ni Nadège ni Solange. Le quartier a continué sans toi. Je ne lis pas ce que je n'ai pas vu, mais je note que le projet t'a pris tout le chemin.");
  else if(!vuS || !vuN) P.push(`Tu n'es pas allée voir ${vuS ? "Nadège" : "Solange"}. Je ne lis pas ce que je n'ai pas vu.`);
  return P;
}
function hDiagnostic(){
  const h = state.h, v = h.voies, tri = Object.entries(v).sort((a,b)=>b[1]-a[1]);
  const dom = tri[0][0], faible = tri[3][0], P = [];
  const txtDom = { C:"Maëla a d'abord cherché à <strong>comprendre</strong>. Elle regarde, elle nomme, elle relit.", A:"Maëla a d'abord <strong>agi</strong>. Devant chaque difficulté, sa première réponse a été de faire.", L:"Maëla s'est d'abord <strong>appuyée sur les autres</strong>. Elle a demandé, confié, reçu.", D:"Maëla a d'abord <strong>ajusté</strong>. Elle a changé la forme plutôt que de forcer." };
  const txtFaible = { C:"prendre le temps de comprendre", A:"passer à l'acte", L:"s'appuyer sur quelqu'un", D:"changer sa manière de faire" };
  P.push(`${txtDom[dom]} La voie qu'elle a le moins empruntée : ${txtFaible[faible]} (${v[faible]} fois sur ${h.choixFaits}).`);
  if(h.ombre === 0) P.push("Pas une seule fois elle n'a choisi de porter seule. Son Ombre a parlé, la nuit ; elle ne lui a pas obéi.");
  else if(h.ombre <= 2) P.push(`${h.ombre} fois, elle a choisi de porter seule. C'est son réflexe de secours : il revient quand la pression monte.`);
  else P.push(`<strong>${h.ombre} fois</strong>, elle a choisi de porter seule. Ce n'est plus un réflexe de secours, c'est sa façon de tenir. Chaque fois, l'Ouvrage a avancé et autre chose a reculé : son corps, ou un lien.`);
  const prot = { place:"Elle a nommé ce que son Ombre protège : <strong>sa place</strong>. Tant qu'être indispensable sera sa manière d'exister dans le projet, déléguer lui semblera disparaître.", projet:"Elle a nommé ce que son Ombre protège : <strong>le projet</strong>. Elle le tient comme on tient un enfant. Mais un projet que personne d'autre ne peut porter ne lui survivra pas.", autres:"Elle a nommé ce que son Ombre protège : <strong>les autres</strong>, qu'elle ne veut pas décevoir. Elle se sacrifie pour eux sans leur avoir demandé s'ils le souhaitaient." };
  if(h.protege) P.push(prot[h.protege]);
  if(h.arch.length){
    if(!h.archUse.length) P.push("Trois archétypes marchaient avec elle (" + h.arch.map(a=>a.nom).join(", ") + "). Elle n'a fait appel à aucun. Elle a traversé ces trois jours sans s'appuyer sur ses propres manières de faire.");
    h.archUse.forEach(u=>{ const a = h.arch[u.k];
      P.push(u.pol === "L"
        ? `<strong>${a.nom}</strong> (A${u.k+1}), appelé devant « ${u.ou} », s'est exprimé dans sa <strong>Lumière</strong> : ${a.lum.toLowerCase()}. Le choix n'a pas touché ce que cet animal protège : la force s'est ajustée à la situation.`
        : `<strong>${a.nom}</strong> (A${u.k+1}), appelé devant « ${u.ou} », s'est exprimé dans son <strong>Ombre</strong> : ${a.omb.toLowerCase()}. Le choix « ${escapeHtml(u.quoi)} » ressemblait à ce que cet animal protège${H_PATRONS[u.raison]?" ("+H_PATRONS[u.raison].nom+")":""} : c'est une réaction automatique, pas une faute. ${a.qo}`); });
  }
  const j = Object.entries(h.j).sort((a,b)=>b[1]-a[1]), haut = j[0], bas = j[3];
  P.push(`Dans ses quatre Mondes, le plus nourri est <strong>${H_JAUGES[haut[0]][0]}</strong> (${H_JAUGES[haut[0]][1]}), le plus pauvre <strong>${H_JAUGES[bas[0]][0]}</strong> (${H_JAUGES[bas[0]][1]}).`);
  const aide = h.f.inaya===2 || h.f.gabriel;
  if(!aide) P.push("<strong>Lecture du système :</strong> tout passe par une seule personne. C'est un système sans relais. Il peut réussir un samedi ; il ne peut pas durer, parce que sa solidité est celle d'un seul corps.");
  else if(h.f.inaya===2 && h.f.gabriel) P.push("<strong>Lecture du système :</strong> deux relais existent, de deux générations — Inaya devant, Gabriel à côté. Le projet a commencé à tenir par des liens, et non plus par une personne.");
  else P.push(`<strong>Lecture du système :</strong> un relais existe (${h.f.inaya===2?"Inaya":"Gabriel"}). Un seul appui, c'est encore fragile, mais la structure a changé : Maëla n'est plus le seul point de passage.`);
  if(h.f.verite) P.push("Avec Éléonore, elle a dit « je ne sais plus ». Dans une lignée où l'on tient, c'est une phrase qui autorise la suivante à ne pas tout savoir non plus.");
  if(h.stops) P.push("Son corps l'a arrêtée. Dans un système où personne ne pose de limite, c'est le corps qui finit par le faire.");
  const hyp = h.ombre >= 3 ? "Mon hypothèse : Maëla confond être engagée et être chargée. Elle mesure sa valeur à ce qu'elle porte."
    : aide ? "Mon hypothèse : Maëla est en train de passer de « je construis » à « nous faisons tenir ». Ce passage coûte une identité avant d'en donner une autre."
    : "Mon hypothèse : Maëla voit clair, mais elle reste seule avec ce qu'elle voit. La lucidité sans appui devient une charge de plus.";
  const piste = bas[0]==="elan" ? "Une piste : décider d'une limite avant que le corps ne la décide." : bas[0]==="liens" ? "Une piste : confier une chose entière à quelqu'un, et ne pas la reprendre." : bas[0]==="cap" ? "Une piste : relire la première page du carnet avant d'ajouter une ligne à la liste." : "Une piste : accepter qu'une chose soit moins prête, et regarder si quelqu'un s'en aperçoit.";
  if(h.disc && h.disc.length){
    const ap = h.disc.filter(x=>x.phase==="apres" && x.avant);
    if(ap.length){ const x = ap[0]; P.push(`À <strong>${x.lieu}</strong>, avant de choisir, tu disais que ce qui comptait le plus était « ${x.avant} ». Après, tu as vu ${x.gain ? "que <strong>"+x.gain+"</strong> avait avancé" : "que ce choix avait peu avancé les jauges"}${x.perte ? " et que <strong>"+x.perte+"</strong> avait reculé" : ""}${x.rep ? ", et tu as voulu le <strong>"+x.rep.toLowerCase()+"</strong>" : ""}. L'écart entre ce qu'on veut protéger et ce qu'on produit est souvent là où se joue l'apprentissage.`); }
    else P.push(`Tu as ouvert ${h.disc.length} moment${h.disc.length>1?"s":""} de discernement. Prendre le temps de regarder, avant ou après, est déjà une manière de choisir autrement.`);
  }
  if(h.sq && h.sq.length){
    const noms = h.sq.map(x=>`<strong>${x.nom}</strong>`).join(", puis ");
    const reps = h.sq.filter(x=>x.rep).map(x=>`« ${x.rep} »`);
    const silence = h.sq.filter(x=>!x.rep).length;
    P.push(`Chaque soir, j'ai nommé une épreuve : ${noms}. ` + (reps.length ? `À mes questions, tu as répondu : ${reps.join(", ")}. Ce que tu écris de toi-même vaut plus que ce que je déduis.` : "Tu n'as pas voulu répondre à mes questions. Ce silence aussi dit quelque chose : il est parfois une manière de se protéger, et parfois une manière de dire non, ce qui est ton droit.") + (silence && reps.length ? ` Il y a eu ${silence} soir${silence>1?"s":""} où tu as préféré ne pas répondre.` : ""));
  }
  hLectureHabitants().forEach(t=>P.push(t));
  P.push(`${hyp} ${piste}`);
  return P.map(p=>`<p>${p}</p>`).join("") + `<p class="tiny">Ce diagnostic porte sur le parcours que tu viens de jouer avec Maëla. Il est calculé à partir de tes choix, pas tiré au hasard.</p>`;
}

// ---------- Sophia : constellation ----------
function hProches(){
  const h = state.h;
  return [
    { k:"projet", nom:"Le projet", v:h.j.ouvrage, ang:-90, col:"#B38F4C" },
    { k:"inaya", nom:"Inaya", v:[1,3,5.5][h.f.inaya], ang:-30, col:"#6F8A66" },
    { k:"corps", nom:"Son corps", v:h.j.elan, ang:30, col:"#5C6E54" },
    { k:"gabriel", nom:"Gabriel", v:h.f.gabriel?5:1, ang:90, col:"#3A4668" },
    { k:"cap", nom:"Ce qu'elle veut", v:h.j.cap, ang:150, col:"#2D3B5E" },
    { k:"eleonore", nom:"Éléonore", v:Math.min(6, 2 + (h.visites.ELEONORE||0)*1.2 + (h.f.verite?1:0)), ang:210, col:"#6E3F5C" },
    ...((h.rel&&h.rel.nadege) ? [{ k:"nadege", nom:"Nadège", v:Math.min(5, 1.5 + h.rel.nadege*1.2), ang:130, col:"#B0613A" }] : []),
    ...((h.rel&&h.rel.solange) ? [{ k:"solange", nom:"Solange", v:Math.min(5, 1.5 + h.rel.solange*1.2), ang:-5, col:"#2F4E8F" }] : [])
  ].map(e=>({ ...e, d: 178 - 18.5*e.v }));
}
const H_FACE = { inaya:"img/f_inaya.jpg", gabriel:"img/f_gabriel.jpg", eleonore:"img/f_eleonore.jpg", nadege:"img/f_nadege.jpg", solange:"img/f_solange.jpg" };
function hConstellation(){
  const els = hProches(), near = [...els].sort((a,b)=>a.d-b.d)[0];
  const pos = e => { const r = e.ang*Math.PI/180; return [320+e.d*1.35*Math.cos(r), 200+e.d*Math.sin(r)]; };
  const [nx,ny] = pos(near);
  return `<div class="scene" style="background:var(--papier-2)"><svg viewBox="0 0 640 400" role="img" aria-label="Constellation : distance de chaque élément par rapport à Maëla">
    <rect width="640" height="400" fill="#FBF5E8"/><ellipse cx="320" cy="200" rx="232" ry="172" fill="none" stroke="#2A1810" stroke-width="1" stroke-dasharray="2 8" opacity=".3"/>
    <ellipse cx="320" cy="200" rx="116" ry="86" fill="none" stroke="#2A1810" stroke-width="1" stroke-dasharray="2 8" opacity=".3"/>
    ${els.map(e=>{ const [x,y] = pos(e); return `<line x1="320" y1="200" x2="${x.toFixed(0)}" y2="${y.toFixed(0)}" stroke="${e.col}" stroke-width="${(0.6+e.v*0.5).toFixed(1)}" opacity=".5"/>
      ${H_FACE[e.k] ? `<clipPath id="fc_${e.k}"><circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="23"/></clipPath><image href="${H_FACE[e.k]}" x="${(x-23).toFixed(0)}" y="${(y-23).toFixed(0)}" width="46" height="46" clip-path="url(#fc_${e.k})" preserveAspectRatio="xMidYMid slice"/><circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="23" fill="none" stroke="${e.col}" stroke-width="3.5"/>` : `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="17" fill="${e.col}"/>`}<text x="${x.toFixed(0)}" y="${(y+39).toFixed(0)}" text-anchor="middle" font-size="13" font-family="Cormorant Garamond,serif" font-weight="600" fill="#2A1810">${e.nom}</text>`; }).join("")}
    <line x1="320" y1="200" x2="${(320+(nx-320)*.45).toFixed(0)}" y2="${(200+(ny-200)*.45).toFixed(0)}" stroke="#2A1810" stroke-width="3" stroke-linecap="round"/>
    <clipPath id="fc_maela"><circle cx="320" cy="200" r="30"/></clipPath><image href="img/f_maela.jpg" x="290" y="170" width="60" height="60" clip-path="url(#fc_maela)" preserveAspectRatio="xMidYMid slice"/><circle cx="320" cy="200" r="30" fill="none" stroke="#B85D3D" stroke-width="4"/><circle cx="320" cy="200" r="33" fill="none" stroke="#FDFAF3" stroke-width="2"/><text x="320" y="248" text-anchor="middle" font-size="14" font-family="Cormorant Garamond,serif" font-weight="700" fill="#2A1810">Maëla</text>
  </svg></div>`;
}
function hLectureConstellation(){
  const els = hProches().sort((a,b)=>a.d-b.d), n1 = els[0], n2 = els[1], l1 = els[els.length-1], l2 = els[els.length-2];
  const P = [`Plus un élément est proche du centre, plus Maëla lui a donné de place. Le trait noir montre vers quoi elle est tournée.`,
    `Au plus près : <strong>${n1.nom}</strong>, puis <strong>${n2.nom}</strong>. Au plus loin : <strong>${l1.nom}</strong>, puis <strong>${l2.nom}</strong>.`];
  const loin = [l1.k,l2.k], pres = [n1.k,n2.k];
  if(pres.includes("projet") && loin.includes("corps")) P.push("Elle est tournée vers son projet et son corps est derrière elle, hors de son champ. Dans une constellation, ce qui est laissé derrière finit toujours par se rappeler.");
  if(pres.includes("projet") && !pres.some(k=>["inaya","gabriel","eleonore"].includes(k))) P.push("Aucune personne n'est aussi proche d'elle que son projet. Le projet a pris la place d'un lien.");
  if(loin.includes("cap")) P.push("« Ce qu'elle veut » est loin. Elle avance vite, mais elle ne sait plus très bien vers quoi.");
  if(pres.includes("inaya")) P.push("Inaya est tout près. La génération suivante a une place : le projet a un avenir qui ne dépend pas d'elle.");
  if(pres.includes("eleonore")) P.push("Éléonore est tout près : celle qui l'a élevée la soutient encore. Maëla n'a pas coupé avec d'où elle vient pour construire.");
  if(loin.includes("gabriel") && !state.h.f.gabriel) P.push("Gabriel est resté à la lisière. Ce qui n'a pas été dit entre eux tient encore la distance.");
  if(pres.includes("corps") && pres.includes("cap")) P.push("Son corps et ce qu'elle veut sont proches d'elle : elle est revenue à elle-même. Tout le reste peut se réorganiser à partir de là.");
  const hab = hLectureHabitants(); if(state.h.rel && (state.h.rel.nadege || state.h.rel.solange)) hab.forEach(t=>P.push(t));
  return P.map(p=>`<p>${p}</p>`).join("");
}
function hVoirConstellation(){
  if(!state.sophiaOn){ showModal(`<p>Active Sophia pour voir la constellation.</p><button class="or" onclick="closeModal()">OK</button>`); return; }
  showModal(`<div class="eyebrow">Sophia · constellation en cours</div><h2 class="serif">Où en est le système ?</h2>${hConstellation()}${hLectureConstellation()}<button class="or" onclick="closeModal()">Reprendre</button>`);
}

// ---------- Sophia par IA (capacité « sample » de la page ; absente = la carte reste cachée) ----------
let _sample = null;
async function hIAInit(){
  try{
    if(typeof claude === "undefined" || !claude.use) return;
    _sample = _sample || await claude.use("sample");
    const card = document.getElementById("h_ia_card");
    if(_sample && card) card.hidden = false;
  }catch(e){}
}
function hIAContexte(){
  const h = state.h, a = hAdv(), e = a.epilogues[h.fin];
  const proches = hProches().sort((x,y)=>x.d-y.d).map(x=>x.nom).join(" > ");
  const perso = document.getElementById("h_ia_perso")?.checked && h.retour ? `\nCe que le joueur a écrit de lui-même en réponse à « ${a.retour} » : ${h.retour}` : "";
  return `Tu es Sophia, la facilitatrice du jeu ANIMAE créé par Dina Bus. Tu pratiques la lecture systémique, les constellations et le coaching. Tu tutoies le joueur. Tu es chaleureuse, précise, sans jargon et sans flatterie.
Le joueur vient de jouer l'aventure « ${a.titre} » en incarnant Maëla, 42 ans, qui a créé un projet et le porte presque seule. Proches : Éléonore (sa tante, 68 ans, qui l'a élevée), Inaya (16 ans, rencontrée à l'Atelier), Gabriel (52 ans, ancien associé, brouille ancienne).
RÈGLES : appuie-toi uniquement sur les données ci-dessous. Présente tes lectures comme des hypothèses. Tu peux poser un diagnostic systémique (dynamique, places, loyautés, relais) mais jamais de diagnostic médical ou psychologique, ni de promesse. Si le joueur exprime une détresse personnelle, invite-le simplement à en parler à un proche ou à un professionnel. Écris en français, en texte simple, sans titres ni listes à puces ni astérisques.
DONNÉES DU PARCOURS
Fin obtenue : ${e.titre} (${e.statut}).
Jauges finales sur 6 — Cap (Moi) ${h.j.cap}, Liens (Relations) ${h.j.liens}, Ouvrage (Activités) ${h.j.ouvrage}, Élan (Corps) ${h.j.elan}.
Voies choisies — Conscience ${h.voies.C}, Action ${h.voies.A}, Alliance ${h.voies.L}, Adaptation ${h.voies.D}. Choix « porter seule » (Ombre de Maëla) : ${h.ombre}.
Ce que son Ombre protège, selon le joueur : ${h.protege||"non nommé"}.
Relais : Inaya ${["écartée","aide ponctuelle","s'est vu confier une vraie part"][h.f.inaya]} ; Gabriel ${h.f.gabriel?"a repris la logistique":"n'a pas été accepté"} ; vérité dite à Éléonore : ${h.f.verite?"oui":"non"} ; le corps a dit stop : ${h.stops||0} fois.
Constellation, du plus proche au plus loin de Maëla : ${proches}.
Archétypes : ${h.arch.map((x,k)=>`A${k+1} ${x.nom} (${x.titre}) — Lumière : ${x.lum} ; Ombre : ${x.omb}`).join(" | ")}.
Archétypes activés : ${h.archUse.length ? h.archUse.map(u=>`${h.arch[u.k].nom} en ${u.pol==="L"?"Lumière":"Ombre"} devant « ${u.ou} »`).join(" ; ") : "aucun"}.
Rencontres du quartier : ${(h.rel&&h.rel.nadege) ? `Nadège, 43 ans, vendeuse de la boutique Les Allures, qui rêve de créer sa collection et n'ose pas (lien ${["","léger","confiance","collaboration proposée"][h.rel.nadege]||"léger"})` : "Nadège non rencontrée"} ; ${(h.rel&&h.rel.solange) ? `Solange, 59 ans, vendeuse de sorbet, tiraillée entre la recette familiale et l'envie d'inventer (lien ${["","léger","confiance","transmission évoquée"][h.rel.solange]||"léger"})` : "Solange non rencontrée"}.
Moments de discernement ouverts par le joueur : ${(h.disc&&h.disc.length) ? h.disc.map(x=>`[${x.lieu}] ${x.phase==="avant"?"avant, ce qui compte le plus : ":"après, "+(x.gain?"gain "+x.gain+" ":"")+(x.perte?"perte "+x.perte+" ":"")+"souhait : "}${x.rep||"pas de réponse"}`).join(" ; ") : "aucun"}.
Épreuves nommées par Sophia chaque soir et réponses du joueur : ${(h.sq&&h.sq.length) ? h.sq.map(x=>`Jour ${x.jour} — ${x.nom} : ${x.rep ? "« "+x.rep+" »" : "pas de réponse"}`).join(" ; ") : "aucune"}.
Déroulé des choix : ${h.log.map(l=>`[${l.ou}] ${l.quoi}`).join(" / ")}.${perso}`;
}
async function hSophiaIA(){
  const out = document.getElementById("h_ia_out"), btn = document.getElementById("h_ia_btn"); if(!_sample || !out) return;
  btn.disabled = true; out.hidden = false; out.textContent = "Sophia réfléchit…";
  try{
    const r = await _sample(hIAContexte() + `\n\nÉcris maintenant ta lecture, en quatre paragraphes courts (280 mots au plus) : ce que tu vois dans la manière dont Maëla a traversé ces trois jours ; ce que montre la constellation ; ce que disent ses archétypes, en Lumière ou en Ombre ; puis une seule question à emporter et un petit pas concret.`, { modelTier:"default", cache:false, onText:({text})=>{ out.textContent = text; } });
    state.h.iaTexte = r.text; out.innerHTML = hTexte(r.text); saveState(); btn.textContent = "Demander une nouvelle lecture";
  }catch(e){ out.textContent = e && e.code === "rate_limited" ? "Sophia est très demandée. Réessaie dans un moment." : "Sophia n'est pas joignable pour l'instant. Son diagnostic écrit ci-dessus reste valable."; }
  btn.disabled = false;
}
async function hSophiaQuestion(){
  const q = document.getElementById("h_ia_q").value.trim(), rep = document.getElementById("h_ia_rep"); if(!_sample || !q) return;
  rep.hidden = false; rep.textContent = "Sophia réfléchit…";
  try{
    const r = await _sample(hIAContexte() + (state.h.iaTexte?`\n\nTa lecture précédente : ${state.h.iaTexte}`:"") + `\n\nLe joueur te pose cette question : « ${q} »\nRéponds en 120 mots au plus.`, { modelTier:"default", cache:false, onText:({text})=>{ rep.textContent = text; } });
    rep.innerHTML = hTexte(r.text);
  }catch(e){ rep.textContent = "Sophia n'est pas joignable pour l'instant."; }
}
