// ANIMAE — Compte et mémoire de la série : connexion par e-mail (lien magique) et sauvegarde sur Supabase.
// Rien n'est enregistré sans connexion. Chaque joueur ne lit et n'écrit que sa propre sauvegarde.
let _compte = { client:null, user:null, data:null, msg:"", envoye:false };
function compteClient(){
  if(_compte.client) return _compte.client;
  if(typeof supabase === "undefined" || !supabase.createClient) return null;
  _compte.client = supabase.createClient(SALON_URL, SALON_KEY, { auth:{ persistSession:true, detectSessionInUrl:true, autoRefreshToken:true } });
  return _compte.client;
}
async function compteInit(){
  const c = compteClient(); if(!c) return;
  try{
    const { data } = await c.auth.getSession(); _compte.user = data && data.session ? data.session.user : null;
    c.auth.onAuthStateChange((ev, ses) => { const avant = _compte.user && _compte.user.id; _compte.user = ses ? ses.user : null; if((_compte.user && _compte.user.id) !== avant){ compteCharger().then(compteRafraichir); } });
    if(_compte.user) await compteCharger();
    compteRafraichir();
  }catch(e){}
}
function compteRafraichir(){ if(state && (state.phase === "intro")){ const app = document.getElementById("app"); const act = document.activeElement; if(app && !(act && act.id === "compte_mail")) app.innerHTML = `<div class="fade-in">${renderIntro()}</div>`; } }
async function compteConnecter(){
  const el = document.getElementById("compte_mail"); const mail = el ? el.value.trim() : "";
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail)){ _compte.msg = "Écris une adresse e-mail valide."; compteRafraichir2(); return; }
  const c = compteClient(); if(!c){ _compte.msg = "La connexion n'est pas disponible pour l'instant."; compteRafraichir2(); return; }
  _compte.msg = "Envoi du lien…"; compteRafraichir2();
  const { error } = await c.auth.signInWithOtp({ email:mail, options:{ emailRedirectTo: location.origin + location.pathname } });
  _compte.envoye = !error; _compte.msg = error ? "Le lien n'a pas pu être envoyé (" + (error.message || "erreur") + "). Réessaie dans quelques minutes." : "C'est parti ! Ouvre l'e-mail reçu et clique sur le lien : tu reviendras ici, connecté·e. Pense à regarder tes courriers indésirables.";
  compteRafraichir2();
}
function compteRafraichir2(){ const z = document.getElementById("compte_zone"); if(z) z.innerHTML = compteZone(); }
async function compteDeconnecter(){ const c = compteClient(); if(c) await c.auth.signOut(); _compte.user = null; _compte.data = null; compteRafraichir(); }
async function compteCharger(){
  const c = compteClient(); if(!c || !_compte.user) { _compte.data = null; return; }
  const { data } = await c.from("animae_saves").select("data").eq("user_id", _compte.user.id).maybeSingle();
  _compte.data = data && data.data ? data.data : { episodes:[] };
}
async function compteSauverEpisode(ep){
  const c = compteClient(); if(!c || !_compte.user) return false;
  await compteCharger();
  const d = _compte.data || { episodes:[] }; d.episodes = (d.episodes || []).concat([ep]).slice(-20);
  const { error } = await c.from("animae_saves").upsert({ user_id:_compte.user.id, data:d, updated_at:new Date().toISOString() });
  if(!error) _compte.data = d; return !error;
}
function compteZone(){
  if(_compte.user){
    const eps = (_compte.data && _compte.data.episodes) || [];
    const dern = eps[eps.length - 1];
    return `<p class="tiny muted">Connecté·e : ${escapeHtml(_compte.user.email || "")}</p>
      ${dern ? `<p>Ta dernière partie : <strong>Le dimanche de la Baie</strong>. Armand garde sa banderole : on la retrouvera dans un prochain épisode.</p><p class="tiny muted">${eps.length} épisode${eps.length > 1 ? "s" : ""} gardé${eps.length > 1 ? "s" : ""} en mémoire.</p>` : `<p class="muted">Rien en mémoire pour l'instant : à la fin de ta prochaine journée à plusieurs, elle sera gardée ici.</p>`}
      <div class="row">${dern && dern.hero && typeof e2Demarrer === "function" ? `<button class="or sm" onclick="e2Demarrer('${dern.hero}')">Épisode 2 · La banderole retournée</button>` : ""}<button class="ghost sm" onclick="compteDeconnecter()">Me déconnecter</button></div>`;
  }
  return `<p class="muted">Garde la mémoire de tes parties : ce qui s'est passé au quartier te sera rappelé dans les prochains épisodes. Tu reçois un lien par e-mail, sans mot de passe.</p>
    <div class="row" style="gap:8px"><input id="compte_mail" type="email" class="salon-input" autocomplete="email" placeholder="ton adresse e-mail" onkeydown="if(event.key==='Enter')compteConnecter()"><button class="ghost" onclick="compteConnecter()">Recevoir le lien</button></div>
    ${_compte.msg ? `<p class="tiny" role="status" style="margin-top:8px">${escapeHtml(_compte.msg)}</p>` : ""}`;
}
function compteCarte(){ return `<section class="card" aria-label="Mémoire de la série"><div class="eyebrow">Ma mémoire de la série</div><div id="compte_zone">${compteZone()}</div></section>`; }
if(typeof window !== "undefined") window.addEventListener("load", () => setTimeout(compteInit, 300));
