/* ANIMAE V3.1 — le quartier explorable. Le joueur dirige son héros (toucher/clic ou flèches) ;
   les scènes de l'aventure se déclenchent en entrant dans les lieux. CONTENU NOUVEAU à valider :
   plan du quartier, figurants (la marchande, le coq) et caméo de Milo. */

const MW = { W:1447, H:1087, VW:780, VH:488, vitesse:210, xmin:40, xmax:1405, ymin:110, ymax:1062 };
// Positions des portes sur la carte illustrée « Le Quartier de la Baie » (image fournie par Dina, 1447 × 1087)
const MW_LIEUX = {
  ATELIER:{ x:352, y:292, nom:"L'Atelier" },
  ELEONORE:{ x:1128, y:212, nom:"Maison d'Éléonore" },
  CAFE:{ x:1168, y:548, nom:"Café-librairie" },
  CARNET:{ x:318, y:752, nom:"Chez Maëla" },
  DEHORS:{ x:905, y:842, nom:"Bord de mer" }
};
Object.assign(H_PNJ, {
  milo:{ nom:"Milo", peau:"#E9C7A5", habit:"#C99A2E", cheveux:"#7A5230", coiffe:"boucles", accessoire:"" },
  marchande:{ nom:"Solange", peau:"#7A4E36", habit:"#E8D28A", cheveux:"#9A9A9A", coiffe:"court", accessoire:"" }
});
const MW_RENCONTRES = {
  solange:{ x:800, y:742, qui:"Solange, au kiosque", pnj:"solange", carte:"img/c_solange.jpg", rel:"solange",
    texte:"« Sorbet coco ! Goyave ! Maracudja ! … Eh, Maëla. Toi, tu passes devant mon kiosque depuis un mois en regardant ta montre. Viens goûter, je ne mords pas. »",
    choix:[
      { t:"Prendre un sorbet coco et t'asseoir deux minutes sur le muret.", fx:{elan:1}, rel:1, r:"C'est froid, c'est sucré, ça goûte l'enfance. « Mon coco, je le fais comme on me l'a appris, dit Solange. Les mêmes gestes que ma mère. » Elle regarde la manivelle, un instant trop longtemps. Deux minutes. Le monde a tenu sans toi." },
      { t:"« Qu'est-ce que tu mettrais dedans, si personne ne te regardait ? »", fx:{cap:1}, rel:2, r:"Solange s'arrête de servir. « Personne ne m'a jamais demandé ça. » Elle baisse la voix : « Du piment doux, avec la mangue. Je l'ai fait une fois, pour moi. Ma mère aurait fait la tête. Mais elle n'est plus là pour la faire, la tête, et c'est ça qui me tient. » Elle te tend une cuillère : « Tu ne dis rien à personne. »" },
      { t:"« Pas le temps, merci ! »", fx:{}, rel:0, r:"« Le temps, doudou, c'est toi qui le fais ! » Elle a déjà servi le client suivant. Elle ne t'en veut pas. Elle te voit, c'est tout." }
    ],
    suite:{ texte:"Solange t'attend, les bras croisés sur le tablier. « Alors, ton samedi ? Je te garde un sorbet. Dis-moi : toi qui construis des choses, tu crois qu'on peut changer une recette sans trahir ceux qui l'ont faite ? »",
      choix:[
        { t:"« Oui. Ceux qui l'ont faite l'avaient eux-mêmes changée. »", fx:{cap:1}, rel:3, r:"Solange rit, fort. « Ma grand-mère mettait du clou de girofle, ma mère l'a enlevé. Voilà ! Personne n'a trahi personne. » Elle sort un petit carnet graisseux. « Je note la piment-mangue. Tu seras la première à goûter. » (À valider : cette suite d'histoire est proposée par Claude.)" },
        { t:"« Je ne sais pas. Moi aussi, je me pose la question. »", fx:{liens:1}, rel:2, r:"« Ça, c'est une vraie réponse. » Elle te met une deuxième boule sans demander. « On cherche ensemble, alors. »" },
        { t:"« Il faut la garder telle qu'elle est. »", fx:{}, rel:1, r:"« Hm. » Elle hoche la tête, mais son regard est parti vers la sorbetière à manivelle. Tu n'as pas dit ce qu'elle espérait entendre, et vous le savez toutes les deux." }
      ]}},
  coq:{ x:520, y:470, qui:"le coq",
    texte:"Un coq est planté au milieu de la rue. Il te regarde. Il ne bougera pas.",
    choix:[
      { t:"Le contourner dignement.", fx:{}, r:"Il te suit des yeux. Tu as l'impression d'avoir perdu quelque chose, sans savoir quoi." },
      { t:"Lui expliquer que tu as une ouverture samedi et que tu es pressée.", fx:{liens:1}, r:"Il t'écoute jusqu'au bout. Puis il chante, très fort. Trois volets s'ouvrent : tout le quartier sait maintenant pour samedi." }
    ]},
  milo:{ x:655, y:575, qui:"Milo", pnj:"milo",
    texte:"Un garçon est accroupi au bord du chemin, une petite loupe à la main. Il observe une colonne de fourmis. Sans lever la tête : « Madame, pourquoi tu marches toujours vite ? »",
    choix:[
      { t:"« Parce que j'ai beaucoup de choses à faire. »", fx:{}, r:"« Les fourmis aussi. Mais elles, elles sont plein. » Il retourne à sa loupe." },
      { t:"« Je ne sais pas. Montre-moi ce que tu regardes. »", fx:{cap:1}, r:"Tu t'accroupis. Une fourmi porte une miette trois fois plus grosse qu'elle. Une autre arrive et prend l'autre bout. Milo te regarde : « Tu vois ? »" }
    ]}
};

const MW_MER = { x:770, y:1015, r:125 };
const MW_BAIN = {
  texte:"L'eau est tiède et turquoise, exactement comme quand tu avais dix ans. Personne ne te regarde. Personne ne t'attend ici.",
  choix:[
    { t:"Entrer tout habillée. Foulard compris.", fx:{elan:2}, r:"Le foulard flotte autour de toi comme une méduse orange. Tu ris toute seule, la tête en arrière. Depuis combien de temps tu n'avais pas ri comme ça ?" },
    { t:"Nager loin. Jusqu'à ne plus entendre le quartier.", fx:{elan:1, cap:1}, r:"Tu te retournes. De là-bas, l'Atelier est tout petit. Ta liste de vingt-trois lignes aussi. Tu fais la planche, et pendant une minute tu ne construis rien." },
    { t:"Juste les pieds, cinq minutes, le téléphone à la main.", fx:{}, ombre:true, r:"Tu réponds à deux messages. Une vague mouille le téléphone ; il survit. Toi, tu n'as pas vraiment été là." }
  ]};
function mwJour(){ const m = (hAdv().moments[state.h.i]||"").match(/Jour (\d)/); return m ? +m[1] : 4; }
// Planches de marche illustrées (12 images par héros : face 0-3, profil 4-7, dos 8-11)
const MW_SPR = { maela:1, gabriel:1, eleonore:.93, inaya:.95, milo:.7, nadege:.98, solange:.9, hana:.95, noe:1 };
function mwSprDim(hero){ const dh = 112*(MW_SPR[hero]||1); return { dh, cw: dh*190/200 }; }
function mwSpr(hero, f, uid){
  const d = mwSprDim(hero);
  return `<clipPath id="c_${uid}"><rect x="${-d.cw/2}" y="${-d.dh-1}" width="${d.cw}" height="${d.dh+2}"/></clipPath><g clip-path="url(#c_${uid})"><image id="i_${uid}" href="img/sp_${hero}.png" x="${-d.cw/2-f*d.cw}" y="${-d.dh}" width="${d.cw*12}" height="${d.dh}" preserveAspectRatio="none"/></g>`;
}
const MW_BOUTIQUE = { x:985, y:425, nom:"Les Allures" };
const MW_TENUE = {
  maison:"Tu fouilles le tiroir du bas. Le vieux maillot bleu est là, sous des dossiers. Celui d'avant l'Atelier. Il te va encore. Tu le glisses dans ton sac avec une serviette.",
  boutique:{ texte:"Une clochette tinte. Nadège relève ses lunettes écaille sur ses cheveux gris et bouclés, un mètre de couturière autour du cou. « Maëla ! Depuis le temps que tu passes devant sans entrer. Alors : tu veux que je te trouve quelque chose qui te va, ou quelque chose qui plaît aux autres ? Parce que ce n'est pas toujours la même chose ! »",
    choix:[
      { t:"« Quelque chose qui me va. »", rel:1, r:"Nadège sourit comme on gagne un pari. Elle sort un maillot orange du fond de la boutique : « Celui-là, il t'attendait. Il est de moi. Je le mets au fond. Personne ne les demande, mes pièces. » Tu ressors avec un petit sac en papier et un sourire que tu n'avais pas prévu." },
      { t:"« Ce qui plaît : j'ai une ouverture samedi. Le noir, simple. »", rel:1, r:"« Le noir, toujours le noir, soupire Nadège. Tu me rappelles moi. » Trois minutes, montre en main. Elle glisse quand même un paréo dans le sac : « Cadeau. Tu me le rendras en venant plus souvent. »" },
      { t:"Rien. Tu regardes l'heure et tu ressors.", rien:true, r:"« La mer ne ferme pas, tu sais », lance Nadège dans ton dos. La clochette tinte encore." }
    ],
    apres:{ t:"Regarder le portant au fond : « Ces pièces-là, c'est de toi ? »", fx:{liens:1}, rel:2, r:"Nadège se fige, le mètre entre les doigts. « Vingt ans que j'habille les envies des autres. Je sais exactement ce que chacune veut avant qu'elle entre. Moi, ma collection… elle tient sur ce portant, et si elle rate, c'est la boutique qui paie. » Elle sourit, mais tout de travers. « Dis-moi pas que c'est joli. Dis-moi si ça te donne envie. »" },
    suite:{ texte:"Nadège t'attend derrière le comptoir, un carnet de croquis ouvert qu'elle ne referme pas cette fois. « J'ai pensé à ce que tu as dit. Ton ouverture de samedi. Je ne te demande rien, hein. Mais si je mettais trois pièces à moi sur ta table, tu en ferais quoi ? »",
      choix:[
        { t:"« Je te laisserais la table un quart d'heure, avec ton nom dessus. »", fx:{liens:1, ouvrage:1}, rel:3, r:"Nadège ne dit rien. Elle ouvre une chemise cartonnée : un défilé dessiné, douze silhouettes. « Premier essai. En face de chez toi, samedi. Un seul passage, pas de risque pour la boutique. » Elle rit, la voix cassée. « Oh là, je viens de le dire à voix haute. » (À valider : suite proposée par Claude.)" },
        { t:"« Garde-les pour plus tard. Tu n'es pas obligée samedi. »", fx:{}, rel:2, r:"« Pour plus tard », répète Nadège. Elle referme le carnet doucement. Tu te demandes si tu viens de la protéger ou de lui redonner une excuse." }
      ]}
  }
};
function mwTenueMaison(){ const h = state.h; h.tenue = "maison"; h.log.push({ ou:"Chez Maëla", quoi:"Prendre sa tenue de plage" }); saveState(); if(_mw) _mw.proche = null;
  showModal(`<div class="eyebrow">Chez toi</div><p class="serif" style="font-size:1.2rem">${escapeHtml(MW_TENUE.maison)}</p><button class="or" onclick="closeModal();mwProximite()">Repartir</button>`); }
function mwRel(k){ const h = state.h; h.rel = h.rel || {}; return h.rel[k]||0; }
function mwRelSet(k, v){ const h = state.h; h.rel = h.rel || {}; if(v > (h.rel[k]||0)) h.rel[k] = v;
  if(v >= 3 && typeof hRessGagne === "function") hRessGagne(k === "nadege" ? "Nadège" : "Solange", k === "nadege" ? "Une collaboration est lancée" : "Une confiance s'est nouée"); }
function mwSuiteOK(k){ const h = state.h; h.rencI = h.rencI || {}; return h.rencI[k] != null && h.i > h.rencI[k] && !h.renc[k+"2"] && mwRel(k) > 0; }
function mwBoutique(){ const b = MW_TENUE.boutique, h = state.h;
  if(h.tenue && mwSuiteOK("nadege")){ const sx = b.suite;
    showModal(`<img src="img/c_nadege.jpg" alt="Nadège Létang, vendeuse de la boutique Les Allures" style="display:block;width:100%;max-height:260px;object-fit:cover;object-position:50% 30%;border-radius:10px;margin-bottom:14px"><div class="eyebrow">Les Allures · Nadège</div><p class="serif" style="font-size:1.2rem">${escapeHtml(sx.texte)}</p>
      <div class="voies">${sx.choix.map((c,i)=>`<button class="voie" onclick="mwNadegeSuite(${i})"><div class="vq">${escapeHtml(c.t)}</div></button>`).join("")}</div>`); return; }
  showModal(`<img src="img/c_nadege.jpg" alt="Nadège Létang, vendeuse de la boutique Les Allures" style="display:block;width:100%;max-height:260px;object-fit:cover;object-position:50% 30%;border-radius:10px;margin-bottom:14px"><div class="eyebrow">Les Allures · Nadège</div><p class="serif" style="font-size:1.2rem">${escapeHtml(b.texte)}</p>
    <div class="voies">${b.choix.map((c,i)=>`<button class="voie" onclick="mwBoutiqueFait(${i})"><div class="vq">${escapeHtml(c.t)}</div></button>`).join("")}</div>`); }
function mwBoutiqueFait(i){ const h = state.h, c = MW_TENUE.boutique.choix[i];
  if(!c.rien){ h.tenue = "boutique"; h.log.push({ ou:"Les Allures (Nadège)", quoi:c.t }); h.rencI = h.rencI || {}; h.rencI.nadege = h.i; mwRelSet("nadege", c.rel||1); if(typeof sonChoix === "function") sonChoix(); }
  closeModal(); saveState(); if(_mw) _mw.proche = null;
  const ap = MW_TENUE.boutique.apres;
  showModal(`<p class="serif" style="font-size:1.2rem">${escapeHtml(c.r)}</p>` + (c.rien ? "" : `<button class="voie" style="margin-bottom:10px" onclick="mwNadegeApres()"><div class="vq">${escapeHtml(ap.t)}</div></button>`) + `<button class="or" onclick="closeModal();mwProximite()">Sortir</button>`); }
function mwNadegeApres(){ const h = state.h, ap = MW_TENUE.boutique.apres;
  hAppliquer(ap.fx); h.mwFx = ap.fx; mwRelSet("nadege", ap.rel); h.log.push({ ou:"Les Allures (Nadège)", quoi:ap.t }); if(typeof sonChoix === "function") sonChoix(); closeModal(); saveState();
  showModal(`<p class="serif" style="font-size:1.2rem">${escapeHtml(ap.r)}</p><button class="or" onclick="closeModal();mwProximite()">Sortir</button>`); }
function mwNadegeSuite(i){ const h = state.h, c = MW_TENUE.boutique.suite.choix[i];
  h.renc.nadege2 = true; hAppliquer(c.fx); h.mwFx = c.fx; mwRelSet("nadege", c.rel); if(c.rel === 3) h.collabNadege = true; h.log.push({ ou:"Les Allures (Nadège)", quoi:c.t }); if(typeof sonChoix === "function") sonChoix(); closeModal(); saveState(); if(_mw) _mw.proche = null;
  showModal(`<p class="serif" style="font-size:1.2rem">${escapeHtml(c.r)}</p><button class="or" onclick="closeModal();mwProximite()">Sortir</button>`); }
function mwBainChoix(){
  const h = state.h, c = MW_BAIN.choix.slice();
  if(h.tenue) c[0] = { t:"Te changer derrière les rochers, et y aller vraiment.", fx:{elan:2, cap:1}, r: h.tenue === "maison"
    ? "Le vieux maillot bleu, l'eau tiède, le même geste qu'avant. Tu plonges. Quand tu ressors la tête, tu sais de nouveau pourquoi tu as ouvert l'Atelier."
    : "Le maillot neuf sent encore le magasin. Tu plonges. Tu as pris vingt minutes pour toi, exprès, et le monde tient toujours debout." };
  return c;
}
function mwBain(){
  showModal(`<div class="eyebrow">La mer</div><p class="serif" style="font-size:1.2rem">${escapeHtml(MW_BAIN.texte)}</p>
    <div class="voies">${mwBainChoix().map((c,i)=>`<button class="voie" onclick="mwBainFait(${i})"><div class="vq">${escapeHtml(c.t)}</div></button>`).join("")}</div>${state.h.tenue ? "" : `<p class="muted" style="margin-top:10px">Tu n'as pas de maillot sur toi. Il y en a un chez toi, et la boutique en vend.</p>`}`);
}
function mwBainFait(i){
  const h = state.h, c = mwBainChoix()[i];
  h.bain = mwJour(); hAppliquer(c.fx); h.mwFx = c.fx; if(c.ombre) h.ombre++;
  if(!c.ombre && typeof hTension === "function"){ if(h.tension > 0) hTension(-1); if(!h.traces.CORPS) h.traces.CORPS = true; }
  h.log.push({ ou:"La mer", quoi:c.t, ombre:!!c.ombre });
  if(typeof sonResultat === "function") sonResultat(c.fx, c.ombre, h.j.elan);
  closeModal(); saveState();
  showModal(`<p class="serif" style="font-size:1.2rem">${escapeHtml(c.r)}</p><button class="or" onclick="closeModal();render()">Sortir de l'eau</button>`);
}
// Le téléphone de Maëla : un message arrive pendant qu'elle marche
function mwMessage(){
  const h = state.h, type = hAdv().plan[h.i];
  if(type === "final") return ["Téléphone", "14 messages non lus. Tu ne les ouvres pas."];
  if(h.j.elan <= 1) return ["Éléonore", "Tu as mangé aujourd'hui, ma fille ?"];
  if(type === "gabriel") return ["Numéro connu", "« J'ai appris pour samedi. Si tu as besoin… » Tu n'as toujours pas répondu à Gabriel."];
  if(h.f.gabriel && Math.random() < .5) return ["Gabriel", "Tables livrées. Ne t'occupe de rien."];
  if(h.f.inaya === 2) return ["Inaya", "J'ai une idée pour l'accueil !! Tu vas voir."];
  if(h.f.inaya === 0) return ["Téléphone", "Aucun message d'Inaya depuis hier."];
  return pick([["Inaya", "Je suis à l'Atelier. Tu passes ?"], ["Un partenaire", "On peut ajouter un petit temps samedi ? Trois fois rien."], ["Éléonore", "J'ai fait du poisson. Il y en a pour deux."], ["La mairie", "Rappel : samedi, pensez au registre de sécurité."]]);
}
function mwActifs(){
  const h = state.h, a = hAdv(), type = a.plan[h.i];
  if(type === "gabriel") return ["CAFE"];
  if(type === "final") return ["ATELIER"];
  return Object.keys(a.lieux).filter(k => (h.visites[k]||0) < a.scenes[k].length);
}
function mwObjectif(){
  const h = state.h, a = hAdv(), type = a.plan[h.i];
  if(type === "gabriel") return "Tôt le matin. Un café au Café-librairie avant d'attaquer la journée ?";
  if(type === "final") return "Samedi, sept heures. L'Atelier t'attend.";
  const reste = a.plan.slice(h.i).filter(x=>x==="lieu").length;
  return `Où vas-tu ? Il te reste ${reste} moment${reste>1?"s":""} avant le grand jour. Tu ne pourras pas être partout.`;
}

function mwVue(p){ return [Math.max(0, Math.min(MW.W-MW.VW, p.x-MW.VW/2)), Math.max(0, Math.min(MW.H-MW.VH, p.y-MW.VH/2-40))]; }
function mondeSVG(){
  const h = state.h, actifs = mwActifs(), p = h.pos, [vx,vy] = mwVue(p);
  const marq = Object.entries(MW_LIEUX).map(([k,L])=> actifs.includes(k) ? `<g transform="translate(${L.x},${L.y})"><g class="mw-pulse"><circle cy="-58" r="19" fill="#FDFAF3" stroke="#2A1810" stroke-width="2"/><path d="M0 -71 L11 -58 L0 -45 L-11 -58 Z" fill="#C9A567" stroke="#2A1810" stroke-width="1.5"/></g><ellipse cx="0" cy="6" rx="34" ry="12" fill="none" stroke="#FDFAF3" stroke-width="3" stroke-dasharray="5 6"/></g>` : "").join("");
  const R = MW_RENCONTRES;
  const figs = [
    h.renc.milo ? "" : `<g transform="translate(${R.milo.x},${R.milo.y})"><ellipse cx="0" cy="2" rx="14" ry="4" fill="#2A1810" opacity=".3"/>${mwSpr("milo", 0, "milo")}</g>`,
    `<g transform="translate(${R.solange.x},${R.solange.y})"><title>Solange</title><ellipse cx="0" cy="2" rx="22" ry="5" fill="#2A1810" opacity=".3"/>${mwSpr("solange", 0, "sol")}</g><path d="M${R.solange.x+34} ${R.solange.y} v-112" stroke="#6B4A2E" stroke-width="3.5"/><path d="M${R.solange.x-12} ${R.solange.y-110} q46 -40 92 0 Z" fill="#D4826A" stroke="#2A1810" stroke-width="1.2"/><g transform="translate(${R.solange.x+20},${R.solange.y+22})"><rect x="-58" y="-12" width="116" height="24" rx="12" fill="#F3E3BE" stroke="#8A6A3A" stroke-width="2"/><text y="5" text-anchor="middle" font-family="Cormorant Garamond,serif" font-weight="700" font-size="16" fill="#2A1810">Chez Solange</text></g>`,
    `<g transform="translate(${MW_BOUTIQUE.x+78},${MW_BOUTIQUE.y+52})"><title>Nadège</title><ellipse cx="0" cy="2" rx="20" ry="5" fill="#2A1810" opacity=".3"/>${mwSpr("nadege", 0, "nad")}</g>`,
    h.renc.coq ? "" : `<g transform="translate(${R.coq.x},${R.coq.y}) scale(1.3)"><title>Un coq</title><ellipse cx="0" cy="2" rx="12" ry="3" fill="#2A1810" opacity=".3"/><ellipse cx="0" cy="-9" rx="11" ry="8" fill="#9A4A2E" stroke="#FDFAF3" stroke-width="1"/><path d="M-9 -12 q-12 -10 -6 -22 q4 8 10 10 Z" fill="#2A1810"/><circle cx="9" cy="-18" r="5.5" fill="#B85D3D" stroke="#FDFAF3" stroke-width="1"/><path d="M6 -23 l2 -5 l2 4 l2 -5 l2 6 Z" fill="#C0392B"/><path d="M14 -18 l6 2 l-6 2 Z" fill="#C9A567"/></g>`
  ].join("");
  return `<svg id="monde" viewBox="${vx.toFixed(0)} ${vy.toFixed(0)} ${MW.VW} ${MW.VH}" role="application" aria-label="Le Quartier de la Baie. Touche un endroit pour y aller." style="touch-action:none;cursor:pointer;aspect-ratio:${MW.VW}/${MW.VH}">
    <image href="img/quartier.jpg" x="0" y="0" width="${MW.W}" height="${MW.H}" preserveAspectRatio="none"/>
    <g transform="translate(${MW_BOUTIQUE.x},${MW_BOUTIQUE.y+34})"><rect x="-62" y="-14" width="124" height="28" rx="14" fill="#F3E3BE" stroke="#8A6A3A" stroke-width="2"/><text y="6" text-anchor="middle" font-family="Cormorant Garamond,serif" font-weight="700" font-size="19" fill="#2A1810">Les Allures</text></g>
    ${[[1010,905,0],[1180,960,1.3],[640,1040,2.1],[1300,880,.7],[900,1000,2.8]].map(([x,y,d])=>`<path d="M${x} ${y} q14 -9 28 0 q14 9 28 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity="0"><animate attributeName="opacity" values="0;.85;0" dur="3.4s" begin="${d}s" repeatCount="indefinite"/><animateTransform attributeName="transform" type="translate" values="0 0;-16 5" dur="3.4s" begin="${d}s" repeatCount="indefinite"/></path>`).join("")}
    ${[[0,150,26],[400,90,34]].map(([d,y,dur],i)=>`<g opacity=".9"><path d="M-10 0 q5 -7 10 0 q5 -7 10 0" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"><animate attributeName="d" values="M-10 0 q5 -7 10 0 q5 -7 10 0;M-10 -3 q5 4 10 3 q5 1 10 -3;M-10 0 q5 -7 10 0 q5 -7 10 0" dur=".7s" repeatCount="indefinite"/></path><animateMotion dur="${dur}s" begin="${i*7}s" repeatCount="indefinite" path="M-60 ${y} C 400 ${y-90}, 900 ${y+160}, 1520 ${y+20}"/></g>`).join("")}
    <g opacity=".55"><ellipse cx="0" cy="60" rx="120" ry="26" fill="#fff"/><ellipse cx="70" cy="48" rx="80" ry="22" fill="#fff"/><animateTransform attributeName="transform" type="translate" values="-260 0;1700 0" dur="90s" repeatCount="indefinite"/></g>
    ${marq}${figs}
    <g id="mw_cible" opacity="0"><circle r="12" fill="none" stroke="#FDFAF3" stroke-width="3"/><circle r="12" fill="none" stroke="#2A1810" stroke-width="1.5" stroke-dasharray="3 4"/></g>
    <g id="mw_av" transform="translate(${p.x},${p.y})">${MW_SPR[hAdv().heros] ? `<ellipse cx="0" cy="2" rx="${(18*MW_SPR[hAdv().heros]).toFixed(0)}" ry="5" fill="#2A1810" opacity=".3"/><g id="mw_flip">${mwSpr(hAdv().heros, 0, "av")}</g>` : figure(hAdv().heros, 0, 0, 1.7, true)}</g>
  </svg>`;
}

function mondeEcran(){
  const h = state.h, a = hAdv();
  if(!h.pos || h.carte !== 2){ h.pos = { x:700, y:610 }; h.carte = 2; }
  if(!h.renc) h.renc = {};
  const direct = mwActifs().map(k=>`<button class="ghost sm" onclick="mwEntrer('${k}')">${MW_LIEUX[k].nom}</button>`).join("");
  setTimeout(mwStart, 0);
  return `${hJauges(h.mwFx)}
  <div class="scene">${mondeSVG()}<div id="mw_tel" class="mw-tel" hidden></div><div class="scene-title" style="top:auto;bottom:12px"><span>${a.moments[h.i]||""}</span>Le Quartier de la Baie</div></div>
  <div class="card">
    <p style="margin-bottom:10px"><strong>${mwObjectif()}</strong></p>
    <div id="mw_action"><p class="muted" style="margin:0">Touche un endroit du quartier pour y marcher (ou utilise les flèches du clavier). Les losanges dorés t'attendent. Rien ne t'empêche d'aller jusqu'à la mer.</p></div>
    <details class="legende"><summary>Y aller directement, sans marcher</summary><div class="row" style="margin-top:8px">${direct}</div></details>
  </div>${hFooter()}`;
}

// ---------- Boucle de déplacement ----------
let _mw = null;
function mwStart(){
  const svg = document.getElementById("monde"); if(!svg || !svg.getBoundingClientRect) return;
  const h = state.h; h.mwFx = null;
  if(_mw && _mw.raf) cancelAnimationFrame(_mw.raf);
  _mw = { svg, spr:document.getElementById("i_av"), dim:mwSprDim(hAdv().heros), flip:document.getElementById("mw_flip"), av:document.getElementById("mw_av"), cible:document.getElementById("mw_cible"), tx:null, ty:null, last:performance.now(), keys:{}, proche:"" };
  svg.addEventListener("pointerdown", e=>{
    const r = svg.getBoundingClientRect(), vb = svg.viewBox.baseVal;
    _mw.tx = Math.max(MW.xmin, Math.min(MW.xmax, vb.x + (e.clientX-r.left)/r.width*vb.width));
    _mw.ty = Math.max(MW.ymin, Math.min(MW.ymax, vb.y + (e.clientY-r.top)/r.height*vb.height));
    _mw.cible.setAttribute("transform", `translate(${_mw.tx},${_mw.ty})`); _mw.cible.setAttribute("opacity", ".7");
  });
  if(!window._mwKeys){ window._mwKeys = true;
    window.addEventListener("keydown", e=>{ if(_mw && /^Arrow/.test(e.key) && document.getElementById("monde")){ _mw.keys[e.key] = true; e.preventDefault(); } });
    window.addEventListener("keyup", e=>{ if(_mw) delete _mw.keys[e.key]; });
  }
  mwProximite();
  if(h.telVu !== h.i){ const vu = h.i; setTimeout(()=>{ const el = document.getElementById("mw_tel"); if(!el || state.h.i !== vu) return; const [qui, quoi] = mwMessage(); state.h.telVu = vu; el.innerHTML = `<b>${qui}</b>${escapeHtml(quoi)}`; el.hidden = false; if(typeof sonNote === "function"){ sonNote(880,0,.12,.07,"triangle"); sonNote(880,.18,.12,.07,"triangle"); } setTimeout(()=>{ el.hidden = true; }, 6500); }, 2200); }
  _mw.raf = requestAnimationFrame(mwTick);
}
function mwTick(t){
  if(!_mw || !document.body.contains(_mw.svg)) { _mw = null; return; }
  const h = state.h, p = h.pos, dt = Math.min(.05, (t-_mw.last)/1000); _mw.last = t;
  let dx = 0, dy = 0;
  const k = _mw.keys;
  if(k.ArrowLeft||k.ArrowRight||k.ArrowUp||k.ArrowDown){ dx = (k.ArrowRight?1:0)-(k.ArrowLeft?1:0); dy = (k.ArrowDown?1:0)-(k.ArrowUp?1:0); _mw.tx = null; _mw.cible.setAttribute("opacity","0"); }
  else if(_mw.tx != null){ dx = _mw.tx-p.x; dy = _mw.ty-p.y; const d = Math.hypot(dx,dy); if(d < 4){ _mw.tx = null; dx = dy = 0; _mw.cible.setAttribute("opacity","0"); saveState(); } }
  const n = Math.hypot(dx,dy);
  if(n > 0){
    p.x = Math.max(MW.xmin, Math.min(MW.xmax, p.x + dx/n*MW.vitesse*dt));
    p.y = Math.max(MW.ymin, Math.min(MW.ymax, p.y + dy/n*MW.vitesse*dt));
    if(_mw.spr){
      const im = Math.floor(t/130);
      let f, flip = 1, saut = 0;
      if(Math.abs(dx) >= Math.abs(dy)){ f = 4 + im%4; flip = dx<0 ? -1 : 1; }
      else if(dy < 0){ f = 8 + im%4; }
      else { f = im%4; saut = Math.abs(Math.sin(t/110))*5; }
      _mw.spr.setAttribute("x", -_mw.dim.cw/2-f*_mw.dim.cw);
      _mw.flip.setAttribute("transform", `scale(${flip},1)`);
      _mw.av.setAttribute("transform", `translate(${p.x.toFixed(1)},${(p.y-saut).toFixed(1)})`);
      _mw.marche = true;
    } else _mw.av.setAttribute("transform", `translate(${p.x.toFixed(1)},${(p.y - Math.abs(Math.sin(t/95))*5).toFixed(1)}) rotate(${(Math.sin(t/95)*5).toFixed(1)}) scale(${dx<0?-1:1},1)`);
    const [vx,vy] = mwVue(p);
    _mw.svg.setAttribute("viewBox", `${vx.toFixed(1)} ${vy.toFixed(1)} ${MW.VW} ${MW.VH}`);
    mwProximite();
  } else if(_mw.marche && _mw.spr){ _mw.marche = false; _mw.spr.setAttribute("x", -_mw.dim.cw/2); _mw.flip.setAttribute("transform", "scale(1,1)"); _mw.av.setAttribute("transform", `translate(${p.x.toFixed(1)},${p.y.toFixed(1)})`); }
  _mw.raf = requestAnimationFrame(mwTick);
}
function mwPres(){
  const h = state.h, p = h.pos, actifs = mwActifs();
  if(Math.hypot(MW_MER.x-p.x, MW_MER.y-p.y) < MW_MER.r) return { t:h.bain === mwJour() ? "baigne" : "mer", k:"" };
  if(Math.hypot(MW_BOUTIQUE.x-p.x, MW_BOUTIQUE.y-p.y) < 62) return { t:(h.tenue && !mwSuiteOK("nadege")) ? "boutiquevue" : "boutique", k:"" };
  for(const k of actifs){ const L = MW_LIEUX[k]; if(Math.hypot(L.x-p.x, L.y-p.y) < 70) return { t:"lieu", k }; }
  for(const [k,R] of Object.entries(MW_RENCONTRES)){ if((!h.renc[k] || (R.suite && mwSuiteOK(k))) && Math.hypot(R.x-p.x, R.y-p.y) < 58) return { t:"renc", k }; }
  for(const [k,L] of Object.entries(MW_LIEUX)){ if(!actifs.includes(k) && Math.hypot(L.x-p.x, L.y-p.y) < 70) return { t:"ferme", k }; }
  return null;
}
function mwProximite(){
  const pr = mwPres(), id = pr ? pr.t+pr.k+(state.h.tenue||"")+(state.h.renc[pr.k]?"b":"") : "";
  if(!_mw || id === _mw.proche) return; _mw.proche = id;
  const el = document.getElementById("mw_action"); if(!el) return;
  if(!pr) el.innerHTML = `<p class="muted" style="margin:0">Touche un endroit du quartier pour y marcher. Les lieux marqués d'un losange doré t'attendent.</p>`;
  else if(pr.t === "lieu") el.innerHTML = `<button class="or lg block" onclick="mwEntrer('${pr.k}')">Entrer · ${MW_LIEUX[pr.k].nom}</button>` + (pr.k === "CARNET" && !state.h.tenue ? `<button class="ghost block" style="margin-top:8px" onclick="mwTenueMaison()">Prendre ta tenue de plage</button>` : "");
  else if(pr.t === "ferme" && pr.k === "CARNET" && !state.h.tenue) el.innerHTML = `<button class="indigo lg block" onclick="mwTenueMaison()">Passer prendre ta tenue de plage</button>`;
  else if(pr.t === "boutique") el.innerHTML = `<button class="indigo lg block" onclick="mwBoutique()">Entrer · Les Allures (Nadège)</button>`;
  else if(pr.t === "boutiquevue") el.innerHTML = `<p class="muted" style="margin:0">Les Allures. Nadège te fait un petit signe derrière la vitre : tu as déjà ce qu'il te faut dans ton sac.</p>`;
  else if(pr.t === "mer") el.innerHTML = `<button class="indigo lg block" onclick="mwBain()">Te baigner</button>`;
  else if(pr.t === "baigne") el.innerHTML = `<p class="muted" style="margin:0">Tu t'es déjà baignée aujourd'hui. Le sel tire encore un peu sur ta peau.</p>`;
  else if(pr.t === "renc") el.innerHTML = `<button class="indigo lg block" onclick="mwParler('${pr.k}')">S'approcher · ${MW_RENCONTRES[pr.k].qui}</button>`;
  else el.innerHTML = `<p class="muted" style="margin:0">${MW_LIEUX[pr.k].nom} : rien de nouveau ici pour l'instant.</p>`;
}
function mwEntrer(k){
  const h = state.h, type = hAdv().plan[h.i], L = MW_LIEUX[k];
  if(!mwActifs().includes(k)) return;
  h.pos = { x:L.x, y:L.y+30 }; if(_mw && _mw.raf && typeof cancelAnimationFrame === "function") cancelAnimationFrame(_mw.raf); _mw = null;
  if(type === "lieu") { hAller(k); return; }
  h.sub = type === "final" ? "final" : "scene"; render();
}
function mwParler(k){
  const R = MW_RENCONTRES[k], h = state.h, deux = !!h.renc[k], T = deux ? R.suite : R;
  const img = k==="milo" ? `<img src="img/c_milo.jpg" alt="Milo, accroupi sous un arbre, observe le sol avec sa loupe" style="display:block;width:100%;max-height:300px;object-fit:cover;object-position:50% 30%;border-radius:10px;margin-bottom:14px">`
    : R.carte ? `<img src="${R.carte}" alt="${escapeHtml(R.qui)}" style="display:block;width:100%;max-height:260px;object-fit:cover;object-position:50% 30%;border-radius:10px;margin-bottom:14px">` : "";
  showModal(`${img}<div class="eyebrow">${deux ? "Tu repasses" : "Sur le chemin"}</div><p class="serif" style="font-size:1.2rem">${escapeHtml(T.texte)}</p>
    <div class="voies">${T.choix.map((c,i)=>`<button class="voie" onclick="mwRepondre('${k}',${i})"><div class="vq">${escapeHtml(c.t)}</div></button>`).join("")}</div>`);
}
function mwRepondre(k, i){
  const h = state.h, R = MW_RENCONTRES[k], deux = !!h.renc[k], c = (deux ? R.suite : R).choix[i];
  if(deux) h.renc[k+"2"] = true; else { h.renc[k] = true; h.rencI = h.rencI || {}; h.rencI[k] = h.i; }
  hAppliquer(c.fx); h.mwFx = c.fx; if(R.rel) mwRelSet(R.rel, c.rel||0);
  h.log.push({ ou: R.rel==="solange" ? "Chez Solange" : "Sur le chemin", quoi:c.t });
  closeModal(); saveState();
  showModal(`<p class="serif" style="font-size:1.2rem">${escapeHtml(c.r)}</p><button class="or" onclick="closeModal();render()">Reprendre la route</button>`);
}
