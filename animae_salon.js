// ANIMAE — Accueil multijoueur : tables, salon, choix des personnages, lancement.
// Transport : Supabase Realtime (en ligne) ; à défaut, BroadcastChannel (onglets d'un même appareil, mode test).
const SALON_URL = "https://bjndtclbxfdpbacoxzwg.supabase.co";
const SALON_KEY = "sb_publishable_67IT_SClZaAdETuxBtlR9Q_GefhVlyc";
const SALON_HEROS = [
  { k:"milo", nom:"Milo", age:9, jouable:false },
  { k:"inaya", nom:"Inaya", age:16, jouable:false },
  { k:"noe", nom:"Noé", age:24, jouable:false },
  { k:"hana", nom:"Hana", age:37, jouable:false },
  { k:"maela", nom:"Maëla", age:42, jouable:true },
  { k:"gabriel", nom:"Gabriel", age:52, jouable:false },
  { k:"eleonore", nom:"Éléonore", age:68, jouable:false }
];
const SALON_MAX = 7;
const SALON_FACES = { maela:"img/f_maela.jpg", inaya:"img/f_inaya.jpg", gabriel:"img/f_gabriel.jpg", eleonore:"img/f_eleonore.jpg", milo:"img/f_milo.jpg", noe:"img/f_noe.jpg", hana:"img/f_hana.jpg" };
let _salon = null; // { code, me, peers:{}, net, mode, notice, go }

function salonId(){ try{ let i = sessionStorage.getItem("animae_pid"); if(!i){ i = "p" + Math.random().toString(36).slice(2,10); sessionStorage.setItem("animae_pid", i); } return i; }catch(e){ return "p" + Math.random().toString(36).slice(2,10); } }
function salonCode(){ const L = "ABCDEFGHJKMNPQRSTUVWXYZ"; let c = ""; for(let i=0;i<4;i++) c += L[Math.floor(Math.random()*L.length)]; return c; }
function salonNom(){ try{ return sessionStorage.getItem("animae_nom") || localStorage.getItem("animae_nom") || ""; }catch(e){ return ""; } }
function salonFace(k, taille){
  const t = taille || 96;
  if(SALON_FACES[k]) return `<img src="${SALON_FACES[k]}" alt="" style="width:${t}px;height:${t}px;object-fit:cover;object-position:50% 20%;border-radius:50%">`;
  if(typeof mwSprDim === "function"){ const d = mwSprDim(k); return `<svg width="${t}" height="${t}" viewBox="${-d.dh*0.21} ${-d.dh*1.0} ${d.dh*0.42} ${d.dh*0.42}" aria-hidden="true" style="border-radius:50%;background:var(--papier-2)">${mwSpr(k, 0, "sl"+k+t)}</svg>`; }
  return `<div style="width:${t}px;height:${t}px;border-radius:50%;background:var(--papier-2)"></div>`;
}

// ---------- Transports ----------
function salonNetLocal(code, onPeers, onMsg){
  const bc = new BroadcastChannel("animae-salon-" + code), peers = {}; let me = null, tm = null;
  const emit = () => onPeers(Object.values(peers).map(x=>x.p));
  const beat = () => { if(me) bc.postMessage({ k:"p", p:me }); const n = Date.now(); let ch = false; for(const id in peers) if(n - peers[id].seen > 7000){ delete peers[id]; ch = true; } if(ch) emit(); };
  bc.onmessage = e => { const m = e.data || {}; if(m.k === "p" && me && m.p.id !== me.id){ const nouveau = !peers[m.p.id], change = nouveau || JSON.stringify(peers[m.p.id].p) !== JSON.stringify(m.p); peers[m.p.id] = { p:m.p, seen:Date.now() }; if(change) emit(); if(nouveau) bc.postMessage({ k:"p", p:me }); } else if(m.k === "bye"){ delete peers[m.id]; emit(); } };
  tm = setInterval(beat, 2000);
  return { mode:"local", track(p){ me = p; bc.postMessage({ k:"p", p }); }, leave(){ clearInterval(tm); try{ bc.postMessage({ k:"bye", id:me && me.id }); bc.close(); }catch(e){} } };
}
function salonNetOnline(code, meId, onPeers, onFail){
  return new Promise((ok, ko) => {
    if(typeof supabase === "undefined" || !supabase.createClient){ ko(new Error("lib")); return; }
    let done = false, me = null;
    const sb = supabase.createClient(SALON_URL, SALON_KEY, { realtime:{ params:{ eventsPerSecond:5 } } });
    const ch = sb.channel("animae:" + code, { config:{ presence:{ key:meId } } });
    const to = setTimeout(() => { if(!done){ done = true; try{ sb.removeChannel(ch); }catch(e){} ko(new Error("timeout")); } }, 5000);
    ch.on("presence", { event:"sync" }, () => { const st = ch.presenceState(), arr = []; for(const k in st){ const l = st[k]; if(l && l.length){ const p = l[l.length-1]; if(p && p.id && p.id !== meId) arr.push(p); } } onPeers(arr); });
    ch.subscribe(status => {
      if(status === "SUBSCRIBED" && !done){ done = true; clearTimeout(to); ok({ mode:"online", track(p){ me = p; ch.track(p); }, leave(){ try{ ch.untrack(); sb.removeChannel(ch); }catch(e){} } }); }
      else if((status === "CHANNEL_ERROR" || status === "TIMED_OUT" || status === "CLOSED") && !done){ done = true; clearTimeout(to); ko(new Error(status)); }
      else if((status === "CHANNEL_ERROR" || status === "TIMED_OUT") && done && onFail) onFail();
    });
  });
}

// ---------- Logique du salon ----------
function salonPlayers(){
  const s = _salon; if(!s) return [];
  const all = [s.me, ...Object.values(s.peers)];
  return all.sort((a,b)=> (a.t0 - b.t0) || (a.id < b.id ? -1 : 1));
}
function salonProprietaires(){
  const own = {}; const L = salonPlayers().filter(p=>p.hero).sort((a,b)=> (a.tp - b.tp) || (a.id < b.id ? -1 : 1));
  L.forEach(p => { if(!own[p.hero]) own[p.hero] = p.id; });
  return own;
}
function salonSync(){
  const s = _salon; if(!s) return;
  // Un conflit de choix simultané : le premier arrivé garde le personnage.
  const own = salonProprietaires();
  if(s.me.hero && own[s.me.hero] !== s.me.id){ const h = SALON_HEROS.find(x=>x.k===s.me.hero); s.me.hero = null; s.me.pret = false; s.notice = `${h ? h.nom : "Ce personnage"} vient d'être pris par quelqu'un d'autre. Choisis-en un autre.`; }
  const sig = JSON.stringify(s.me); if(s.net && sig !== s.sig){ s.sig = sig; s.net.track(s.me); }
  // Un autre joueur a lancé la partie ?
  const go = Object.values(s.peers).find(p => p.go);
  if(go && !s.parti) salonDemarrer(go.go);
  if(state.phase === "h_salon") salonRafraichir();
}
function salonRafraichir(){ const app = document.getElementById("app"); if(!app) return; const act = document.activeElement; if(act && act.id === "salon_nom") return; app.innerHTML = `<div class="fade-in">${renderSalon()}</div>`; }
async function salonOuvrir(code, creer){
  salonQuitter(true);
  code = (code || "").toUpperCase().replace(/[^A-Z]/g,"").slice(0,4);
  if(code.length !== 4){ salonDire("Le code d'une table a 4 lettres."); return; }
  const now = Date.now();
  _salon = { code, creer:!!creer, peers:{}, parti:false, notice:"", mode:"…",
    me:{ id:salonId(), nom:salonNom(), hero:null, pret:false, t0:now, tp:0 } };
  state.phase = "h_salon"; render();
  const onPeers = arr => { const m = {}; arr.forEach(p => m[p.id] = p); if(_salon){ _salon.peers = m; salonSync(); } };
  try{ _salon.net = await salonNetOnline(code, _salon.me.id, onPeers, () => { if(_salon){ _salon.notice = "Connexion perdue : reconnecte-toi en rouvrant la table."; salonRafraichir(); } }); _salon.mode = "en ligne"; }
  catch(e){ try{ _salon.net = salonNetLocal(code, onPeers, null); _salon.mode = "test"; }catch(e2){ _salon.net = null; _salon.mode = "hors ligne"; } }
  if(!_salon) return; _salon.sig = JSON.stringify(_salon.me); _salon.net && _salon.net.track(_salon.me); salonRafraichir();
}
function salonDire(t){ alert(t); }
function salonQuitter(silencieux){ if(_salon && _salon.net){ try{ _salon.net.leave(); }catch(e){} } _salon = null; if(!silencieux){ state.phase = "intro"; render(); } }
function salonNomSaisi(v){ if(!_salon){ try{ sessionStorage.setItem("animae_nom", String(v).slice(0,20)); localStorage.setItem("animae_nom", String(v).slice(0,20)); }catch(e){} return; } _salon.me.nom = v.slice(0,20); try{ sessionStorage.setItem("animae_nom", _salon.me.nom); localStorage.setItem("animae_nom", _salon.me.nom); }catch(e){} _salon.sig = JSON.stringify(_salon.me); if(_salon.net) _salon.net.track(_salon.me); }
function salonChoisir(k){
  const s = _salon; if(!s) return; const own = salonProprietaires();
  if(own[k] && own[k] !== s.me.id) return;
  if(!s.me.nom.trim()){ s.notice = "Écris d'abord ton prénom, pour que les autres sachent qui tu es."; salonRafraichir(); const el = document.getElementById("salon_nom"); if(el) el.focus(); return; }
  s.notice = ""; s.me.hero = (s.me.hero === k) ? null : k; s.me.pret = false; s.me.tp = Date.now(); salonSync();
}
function salonPret(){ const s = _salon; if(!s || !s.me.hero) return; s.me.pret = !s.me.pret; salonSync(); }
function salonHote(){ const L = salonPlayers(); return L.length ? L[0].id : null; }
function salonPeutLancer(){ const L = salonPlayers(); return L.length >= 1 && L.every(p => p.hero && p.pret); }
function salonLancer(){
  const s = _salon; if(!s || salonHote() !== s.me.id || !salonPeutLancer()) return;
  const go = { code:s.code, graine:Math.floor(Math.random()*1e9), joueurs:salonPlayers().map(p => ({ id:p.id, nom:p.nom, hero:p.hero })) };
  s.me.go = go; salonSync(); salonDemarrer(go);
}
function salonDemarrer(go){
  const s = _salon; if(!s || s.parti) return; s.parti = true;
  state.table = { code:go.code, joueurs:go.joueurs, moi:go.joueurs.find(j => j.id === s.me.id) || null };
  const moi = state.table.moi;
  if(moi && moi.hero === "maela"){ salonGarder(); hNew("maela_1"); } else { salonGarder(); state.phase = "h_table"; render(); }
}
function salonGarder(){ /* la table reste connectée pendant la partie : le lien se rouvre via la présence */ }

// ---------- Écrans ----------
function renderSalon(){
  const s = _salon; if(!s) return `<div class="card"><button onclick="goTo('intro')">Retour à l'accueil</button></div>`;
  const own = salonProprietaires(), L = salonPlayers(), hote = salonHote() === s.me.id, moi = s.me;
  const libres = SALON_HEROS.filter(h => !own[h.k] || own[h.k] === moi.id);
  const nomDe = id => { const p = L.find(x=>x.id===id); return p ? (p.nom || "Joueur") : ""; };
  const grille = libres.map(h => { const mien = own[h.k] === moi.id;
    return `<button class="salon-card ${mien?'mien':''}" onclick="salonChoisir('${h.k}')" aria-pressed="${mien}" aria-label="${h.nom}, ${h.age} ans${mien?', choisi':''}">
      <div class="sc-face">${salonFace(h.k, 104)}</div><div class="sc-nom">${h.nom}</div><div class="sc-age">${h.age} ans</div>${mien?`<div class="sc-tag">C'est toi</div>`:(h.jouable?"":`<div class="sc-bientot">aventure à venir</div>`)}</button>`; }).join("");
  const table = L.map(p => { const h = SALON_HEROS.find(x=>x.k===p.hero);
    return `<div class="salon-joueur ${p.id===moi.id?'moi':''}"><div class="sj-face">${h?salonFace(h.k,44):`<div class="sj-vide">?</div>`}</div><div class="sj-txt"><strong>${escapeHtml(p.nom||"Joueur")}</strong>${p.id===moi.id?" (toi)":""}${L[0].id===p.id?" · hôte":""}<br><span class="tiny">${h?`joue ${h.nom}`:"choisit son personnage…"}</span></div><div class="sj-etat ${p.pret?'ok':''}">${p.pret?"Prêt·e":""}</div></div>`; }).join("");
  const mode = s.mode === "en ligne" ? `<span class="salon-mode ok">En ligne</span>` : s.mode === "test" ? `<span class="salon-mode">Mode test : les joueurs sont les onglets ouverts sur cet appareil</span>` : `<span class="salon-mode">Connexion…</span>`;
  return `<div class="hero slide-up" style="padding-bottom:6px"><div class="eyebrow">Table</div><h1 class="serif salon-code" aria-label="Code de la table : ${s.code.split("").join(" ")}">${s.code}</h1>${mode}
      <p class="muted" style="margin-top:8px">Donne ce code aux autres joueurs. Chacun choisit son personnage : dès qu'il est pris, il disparaît pour les autres.</p></div>
    <div class="card"><label class="eyebrow" for="salon_nom">Ton prénom</label>
      <input id="salon_nom" class="salon-input" maxlength="20" autocomplete="given-name" value="${escapeHtml(moi.nom)}" placeholder="Comment les autres t'appellent ?" oninput="salonNomSaisi(this.value)" onchange="salonSync()"></div>
    ${s.notice ? `<div class="card terre" role="status"><p>${escapeHtml(s.notice)}</p></div>` : ""}
    <div class="card"><div class="eyebrow">Choisis ton personnage</div>
      ${libres.length ? `<div class="salon-grid">${grille}</div>` : `<p class="muted">Tous les personnages sont pris.</p>`}
      <div class="row" style="margin-top:14px">${moi.hero ? `<button class="${moi.pret?'ghost':'or'} lg" onclick="salonPret()">${moi.pret?"Je ne suis plus prêt·e":"Je suis prêt·e"}</button>` : `<span class="muted">Touche une carte pour jouer ce personnage.</span>`}</div></div>
    <div class="card"><div class="eyebrow">Autour de la table · ${L.length} joueur${L.length>1?"s":""}</div><div class="salon-table">${table}</div>
      <div class="row" style="margin-top:14px">${hote ? `<button class="or lg" ${salonPeutLancer()?"":"disabled"} onclick="salonLancer()">Lancer l'aventure</button>` : `<span class="muted">${nomDe(salonHote())} lance l'aventure quand tout le monde est prêt.</span>`}
        <button class="ghost" onclick="salonQuitter()">Quitter la table</button></div>
      ${hote && !salonPeutLancer() ? `<p class="tiny muted" style="margin-top:8px">Il faut que chaque joueur ait choisi un personnage et se soit déclaré prêt.</p>` : ""}</div>`;
}
function renderAccueil(){
  const enCours = state.h && !state.h.fin && state.h.v === 3;
  const plateauEnCours = !state.h && state.player && state.player.nom && state.archetypes.length === 3;
  const persos = SALON_HEROS.map(h => `<div class="acc-perso"><div>${salonFace(h.k, 84)}</div><div class="ap-nom">${h.nom}</div><div class="ap-age">${h.age} ans</div></div>`).join("");
  const cartes = (typeof D !== "undefined" && D.archetypes ? D.archetypes.filter(a=>a.rc) : []).sort(()=>Math.random()-.5).slice(0,3)
    .map(a => `<img class="acc-carte" src="${a.rc}" alt="Carte ${escapeHtml(a.nom)}, ${escapeHtml(a.titre)}" loading="lazy">`).join("");
  let q = ""; try{ q = (new URLSearchParams(location.search).get("table") || "").toUpperCase(); }catch(e){}
  return `<section class="acc-hero slide-up" aria-labelledby="acc_h1">
      <img class="acc-hero-img" src="img/mer.jpg" alt="Un banc face à la mer, sous un flamboyant, au coucher du soleil en Guadeloupe">
      <div class="acc-hero-voile"></div>
      <div class="acc-hero-txt">
        <div class="eyebrow acc-clair">Une création de Dina Bus</div>
        <h1 id="acc_h1" class="serif acc-titre">ANIMAE</h1>
        <p class="acc-tagline">Le jeu qui met la vie en mouvement</p>
        <p class="acc-motto">Tu n'es pas la carte. Tu es celui ou celle qui la joue.</p>
        <div class="acc-cta">
          <button class="or lg" onclick="document.getElementById('acc_table').scrollIntoView({behavior:'smooth'})">Jouer ensemble</button>
          ${enCours ? `<button class="acc-ghost lg" onclick="goTo('h_play')">Reprendre mon aventure</button>` : `<button class="acc-ghost lg" onclick="hNew('maela_1')">Jouer seule · Maëla</button>`}
        </div>
      </div>
    </section>
    <section class="card acc-gestes" aria-label="Trois gestes">
      <div class="acc-geste"><div class="ag-n">1</div><h3 class="serif">Marche</h3><p>Un quartier de Guadeloupe à parcourir : l'Atelier, le café, la plage, la maison d'Éléonore. Des habitants qui ont leur vie.</p></div>
      <div class="acc-geste"><div class="ag-n">2</div><h3 class="serif">Choisis</h3><p>Des dilemmes, un dé qui bouscule, des cartes qui t'accompagnent. Chaque choix a un prix, aucun n'est « le bon ».</p></div>
      <div class="acc-geste"><div class="ag-n">3</div><h3 class="serif">Comprends</h3><p>Sophia lit ton parcours, nomme tes épreuves et t'aide à voir ce que tu répètes. Toujours à ta demande.</p></div>
    </section>
    <section class="card acc-quartier" style="padding:0;overflow:hidden">
      <img src="img/quartier.jpg" alt="Carte illustrée du Quartier de la Baie : l'Atelier, chez Maëla, la maison d'Éléonore, le café-librairie et le bord de mer" loading="lazy" style="display:block;width:100%;height:auto">
      <div style="padding:22px 26px 26px"><div class="eyebrow">Le Quartier de la Baie</div><h2 class="serif" style="margin:4px 0 8px">Un samedi à construire</h2>
        <p>Tu marches dans le quartier, tu choisis où entrer, à qui parler, quoi porter et quoi lâcher. Tes choix ferment des portes et en ouvrent d'autres.</p></div>
    </section>
    <section class="card" aria-label="Les personnages"><div class="eyebrow">Sept personnages, de 9 à 68 ans</div>
      <p class="muted" style="margin:4px 0 14px">Chacun porte sa manière de vivre. À plusieurs, chaque joueur en incarne un, et leurs chemins se croisent.</p>
      <div class="acc-persos">${persos}</div></section>
    <section class="card acc-cartes-sec" aria-label="Les archétypes"><div class="eyebrow">Trente animaux t'accompagnent</div>
      <h2 class="serif" style="margin:4px 0 6px">Une force, et son Ombre</h2>
      <p class="muted">Le Lion, l'Abeille, la Tortue, le Renard… Chaque animal a sa Lumière et son Ombre. L'Ombre n'est pas une faute : c'est une réaction automatique qui protège quelque chose.</p>
      <div class="acc-cartes">${cartes}</div></section>
    <section class="card acc-mondes" aria-label="Quatre mondes"><div class="eyebrow">Quatre mondes de ta vie, toujours visibles</div>
      <div class="acc-m4"><div><strong>Moi</strong><br><span class="tiny">ce que tu veux</span></div><div><strong>Relations &amp; Famille</strong><br><span class="tiny">qui t'entoure</span></div><div><strong>Activités &amp; Projet</strong><br><span class="tiny">ce que tu construis</span></div><div><strong>Corps &amp; Équilibre</strong><br><span class="tiny">ce que ton corps dit</span></div></div></section>
    <section id="acc_table" class="card acc-choix" aria-label="Jouer à plusieurs"><div class="eyebrow">Jouer ensemble</div>
      <h2 class="serif" style="margin:4px 0 6px">Une table, un code, des amis</h2>
      <p class="muted">Crée une table et donne le code aux autres joueurs. Chacun choisit son personnage ; dès qu'il est pris, il disparaît pour les autres.</p>
      <div class="row" style="gap:12px;flex-wrap:wrap"><button class="or lg" onclick="salonOuvrir(salonCode(), true)">Créer une table</button></div>
      <div class="acc-rejoindre"><label class="tiny" for="acc_code">Tu as un code ? Rejoins une table</label>
        <div class="row" style="gap:8px"><input id="acc_code" class="salon-input salon-code-in" maxlength="4" autocomplete="off" autocapitalize="characters" placeholder="CODE" value="${escapeHtml(q)}" onkeydown="if(event.key==='Enter')salonOuvrir(this.value,false)"><button class="ghost" onclick="salonOuvrir(document.getElementById('acc_code').value,false)">Rejoindre</button></div></div></section>
    <section class="card" aria-label="Autres façons de jouer"><div class="eyebrow">Autre façon de jouer</div><p class="muted">Le parcours libre : ta propre situation, les 30 archétypes et le plateau des quatre Mondes.</p>
      <div class="row"><button class="ghost sm" onclick="startNew()">Parcours libre</button>${plateauEnCours ? `<button class="ghost sm" onclick="resumeGame()">Reprendre « ${escapeHtml(state.player.nom)} »</button>` : ""}<button class="ghost sm" onclick="goTo('tutorial')">Règles du parcours libre</button>${enCours ? `<button class="ghost sm" onclick="hNew('maela_1')">Recommencer Maëla</button>` : ""}</div></section>`;
}
if(typeof H_RENDER !== "undefined"){
  H_RENDER.h_salon = renderSalon;
  H_RENDER.h_table = function(){
    const t = state.table || { joueurs:[], moi:null }, moi = t.moi, h = moi && SALON_HEROS.find(x => x.k === moi.hero);
    return `<div class="hero slide-up"><div class="eyebrow">Table ${t.code || ""}</div><h2 class="serif">${h ? h.nom : "Ton personnage"}</h2></div>
      <div class="card center"><div style="display:flex;justify-content:center;margin-bottom:10px">${h ? salonFace(h.k, 120) : ""}</div>
      <p>L'aventure de ${h ? h.nom : "ton personnage"} est encore en écriture. Elle rejoindra la table dès qu'elle sera prête.</p>
      <p class="muted">En attendant, tu peux jouer l'aventure de Maëla, ou revenir à l'accueil.</p>
      <div class="row" style="justify-content:center"><button class="or" onclick="hNew('maela_1')">Jouer Maëla en attendant</button><button class="ghost" onclick="salonQuitter()">Retour à l'accueil</button></div></div>
      <div class="card"><div class="eyebrow">À cette table</div><div class="salon-table">${t.joueurs.map(p => { const x = SALON_HEROS.find(y => y.k === p.hero); return `<div class="salon-joueur"><div class="sj-face">${x ? salonFace(x.k, 44) : ""}</div><div class="sj-txt"><strong>${escapeHtml(p.nom || "Joueur")}</strong><br><span class="tiny">joue ${x ? x.nom : ""}</span></div></div>`; }).join("")}</div></div>`;
  };
}
