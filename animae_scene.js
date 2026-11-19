/* ANIMAE V2.2 — décors immersifs : l'avatar avance dans le paysage de chaque Monde.
   © Dina Bus 2026. Topologie : 12 cases + Seuil par Monde (plateau V1.1), disposées en boucle. */

const AV_COLORS = { milo:"#C99A2E", inaya:"#6F8A66", noe:"#A88B62", hana:"#2D3B5E", maela:"#B85D3D", gabriel:"#3A4668", eleonore:"#6E3F5C" };
function avatarColor(){ return AV_COLORS[state.personnage] || "#2A1810"; }

function casePos(i){
  const a = (90 + i*360/13) * Math.PI/180;
  const x = 320 + 250*Math.cos(a), y = 252 + 96*Math.sin(a);
  return { x:+x.toFixed(1), y:+y.toFixed(1), s:+(0.72 + 0.28*((y-156)/192)).toFixed(3) };
}
function avatarSVG(p){
  const c = avatarColor();
  return `<g id="avatar" style="transform:translate(${p.x}px,${p.y}px) scale(${p.s})">
    <ellipse cx="0" cy="1" rx="15" ry="4.5" fill="#2A1810" opacity=".28"/>
    <g class="av-bob">
      <path d="M-11 0 Q-14 -24 0 -29 Q14 -24 11 0 Z" fill="${c}" stroke="#FDFAF3" stroke-width="1.6"/>
      <path d="M-8 -21 Q0 -16 8 -21" fill="none" stroke="#E0C48A" stroke-width="2.6" stroke-linecap="round"/>
      <circle cx="0" cy="-36" r="8.5" fill="#FDFAF3" stroke="${c}" stroke-width="2.6"/>
    </g>
  </g>`;
}
function palm(x,y,h,col){
  const t = y-h;
  return `<path d="M${x} ${y} Q${x+5} ${y-h/2} ${x+2} ${t}" stroke="${col}" stroke-width="3" fill="none" stroke-linecap="round"/>`
    + [[-22,-4],[-15,-14],[0,-18],[15,-13],[22,-3]].map(([dx,dy])=>`<path d="M${x+2} ${t} Q${x+2+dx/2} ${t+dy-6} ${x+2+dx} ${t+dy+8}" stroke="${col}" stroke-width="3" fill="none" stroke-linecap="round"/>`).join("");
}
function tree(x,y,r,trunk,leaf){
  return `<rect x="${x-2.5}" y="${y-r}" width="5" height="${r+4}" fill="${trunk}"/><circle cx="${x}" cy="${y-r-6}" r="${r}" fill="${leaf}"/><circle cx="${x-r*.6}" cy="${y-r}" r="${r*.7}" fill="${leaf}"/><circle cx="${x+r*.6}" cy="${y-r}" r="${r*.7}" fill="${leaf}"/>`;
}
function house(x,y,w,wall,roof){
  const h = w*.62;
  return `<rect x="${x}" y="${y-h}" width="${w}" height="${h}" fill="${wall}"/><path d="M${x-5} ${y-h} L${x+w/2} ${y-h-w*.42} L${x+w+5} ${y-h} Z" fill="${roof}"/><rect x="${x+w*.4}" y="${y-h*.55}" width="${w*.2}" height="${h*.55}" fill="${roof}"/><rect x="${x+w*.1}" y="${y-h*.7}" width="${w*.18}" height="${h*.3}" fill="#FDFAF3" opacity=".8"/><rect x="${x+w*.72}" y="${y-h*.7}" width="${w*.18}" height="${h*.3}" fill="#FDFAF3" opacity=".8"/>`;
}

const DECORS = {
  MOI(){ // crépuscule sur la mer, lac-miroir : l'intériorité
    let stars = ""; for(let i=0;i<34;i++){ stars += `<circle cx="${(i*97)%640}" cy="${(i*53)%130+6}" r="${i%3?0.9:1.5}" fill="#F7F0E3" opacity="${.35+(i%4)*.15}"/>`; }
    return `<defs><linearGradient id="skyM" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#141B2E"/><stop offset=".55" stop-color="#3B4A72"/><stop offset="1" stop-color="#D9A77A"/></linearGradient></defs>
    <rect width="640" height="400" fill="url(#skyM)"/>${stars}
    <circle cx="505" cy="72" r="27" fill="#F7F0E3"/><circle cx="495" cy="66" r="27" fill="#141B2E" opacity=".18"/>
    <path d="M0 178 Q90 138 190 170 T400 160 T640 172 V230 H0 Z" fill="#232E4C"/>
    <rect y="186" width="640" height="214" fill="#2D3B5E"/>
    <path d="M40 204 h70 M150 196 h50 M430 200 h80 M540 210 h60 M260 192 h40" stroke="#8D9BBD" stroke-width="1.4" opacity=".5"/>
    <ellipse cx="320" cy="262" rx="318" ry="134" fill="#1F2942"/>
    <ellipse cx="320" cy="246" rx="128" ry="42" fill="#5A6B8E"/><ellipse cx="320" cy="246" rx="128" ry="42" fill="none" stroke="#8D9BBD" stroke-width="1.5" opacity=".6"/>
    <ellipse cx="338" cy="244" rx="20" ry="6" fill="#F7F0E3" opacity=".75"/><path d="M300 258 h44 M312 266 h30" stroke="#F7F0E3" stroke-width="1.2" opacity=".4"/>
    ${palm(92,292,58,"#0F1526")}${palm(560,300,66,"#0F1526")}${palm(532,286,44,"#0F1526")}`;
  },
  RELATIONS(){ // le quartier, les cases, la chaleur humaine
    return `<defs><linearGradient id="skyR" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F6DCC6"/><stop offset="1" stop-color="#EDB79A"/></linearGradient></defs>
    <rect width="640" height="400" fill="url(#skyR)"/>
    <circle cx="128" cy="80" r="34" fill="#FBEBD3"/>
    <path d="M0 190 Q120 130 250 176 T470 160 T640 182 V240 H0 Z" fill="#D89478"/>
    <path d="M0 214 Q160 170 330 206 T640 200 V260 H0 Z" fill="#C97A5C"/>
    <ellipse cx="320" cy="266" rx="322" ry="138" fill="#EFD3B4"/>
    <ellipse cx="320" cy="250" rx="140" ry="46" fill="#E6C29E"/>
    ${house(232,262,52,"#FDFAF3","#B85D3D")}${house(296,254,60,"#F3D9A6","#7A3F2A")}${house(368,264,48,"#DDE6D6","#5C6E54")}
    ${tree(214,266,13,"#7A4A32","#6F8A66")}${tree(432,268,15,"#7A4A32","#5C6E54")}
    <path d="M250 262 h160" stroke="#C9A567" stroke-width="2" stroke-dasharray="2 7" stroke-linecap="round"/>
    ${palm(70,300,60,"#7A3F2A")}${palm(580,304,56,"#7A3F2A")}`;
  },
  ACTIVITES(){ // l'atelier (grande fenêtre en trois parties) et les champs
    let rows = ""; for(let i=0;i<7;i++){ rows += `<path d="M${60+i*12} ${330-i*4} Q320 ${372-i*3} ${580-i*12} ${330-i*4}" stroke="#B38F4C" stroke-width="1.3" fill="none" opacity=".45"/>`; }
    return `<defs><linearGradient id="skyA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FBF0D4"/><stop offset="1" stop-color="#EBCB86"/></linearGradient></defs>
    <rect width="640" height="400" fill="url(#skyA)"/>
    <circle cx="500" cy="86" r="38" fill="#FFF7E2"/>
    <path d="M0 196 Q140 150 290 186 T640 170 V250 H0 Z" fill="#D9B56E"/>
    <path d="M0 220 Q200 184 400 212 T640 206 V270 H0 Z" fill="#C9A057"/>
    <ellipse cx="320" cy="266" rx="322" ry="138" fill="#F0DEB0"/>${rows}
    <ellipse cx="320" cy="250" rx="140" ry="46" fill="#E6CF94"/>
    <rect x="262" y="206" width="116" height="56" fill="#FDFAF3"/><path d="M254 206 L320 176 L386 206 Z" fill="#9A4A2E"/>
    <rect x="278" y="218" width="84" height="26" fill="#5A6B8E"/><path d="M306 218 v26 M334 218 v26" stroke="#FDFAF3" stroke-width="3"/>
    <rect x="312" y="246" width="16" height="16" fill="#9A4A2E"/>
    ${tree(226,266,14,"#7A4A32","#8A9E80")}${tree(418,266,12,"#7A4A32","#6F8A66")}`;
  },
  CORPS(){ // la montagne, la rivière, le grand arbre : le vivant
    return `<defs><linearGradient id="skyC" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E4EEDD"/><stop offset="1" stop-color="#BFD0B4"/></linearGradient></defs>
    <rect width="640" height="400" fill="url(#skyC)"/>
    <circle cx="150" cy="74" r="30" fill="#F7F4E4"/>
    <path d="M150 210 L290 78 Q320 62 350 80 L500 210 Z" fill="#7F9477"/><path d="M290 78 Q320 62 350 80 L332 104 L318 92 L304 106 Z" fill="#E4EEDD" opacity=".7"/>
    <path d="M0 204 Q130 160 260 198 T520 186 T640 198 V260 H0 Z" fill="#6B8266"/>
    <ellipse cx="320" cy="266" rx="322" ry="138" fill="#CFDDC2"/>
    <ellipse cx="320" cy="250" rx="140" ry="46" fill="#BDD0AE"/>
    <path d="M318 150 Q300 200 330 232 Q356 258 318 292" stroke="#7FA7B5" stroke-width="12" fill="none" stroke-linecap="round" opacity=".85"/>
    <path d="M318 150 Q300 200 330 232 Q356 258 318 292" stroke="#DCEBEE" stroke-width="2" fill="none" stroke-dasharray="6 10" opacity=".8"/>
    <rect x="262" y="214" width="9" height="46" fill="#5E4330"/><circle cx="266" cy="200" r="30" fill="#4F6A49"/><circle cx="242" cy="214" r="20" fill="#5C7A55"/><circle cx="290" cy="212" r="21" fill="#5C7A55"/>
    <ellipse cx="386" cy="258" rx="15" ry="8" fill="#8A9484"/><ellipse cx="402" cy="262" rx="9" ry="5" fill="#9BA595"/>
    ${tree(76,300,16,"#5E4330","#4F6A49")}${tree(566,302,18,"#5E4330","#4F6A49")}${tree(540,290,11,"#5E4330","#5C7A55")}`;
  }
};

// Pictogrammes officiels de la couche de jeu (Cahier de reconstruction du plateau V1.1, §6)
const PICTOS = {
  CONTEXTE:`<path d="M-6 5 Q-7 -6 6 -6 Q7 5 -6 5 Z M-6 5 L3 -3" fill="#5C6E54" stroke="#3D4A3A" stroke-width="1" stroke-linejoin="round"/>`,
  DEFI:`<path d="M-9 5 L-2 -6 L2 -1 L5 -4 L10 5 Z" fill="#1A2338"/>`,
  RESSOURCE:`<rect x="-1.2" y="0" width="2.4" height="6" fill="#5E4330"/><circle cx="0" cy="-2" r="5" fill="#4F6A49"/>`,
  MIROIR:`<path d="M3 -6 A6.5 6.5 0 1 0 3 6 A5 5 0 1 1 3 -6 Z" fill="#2D3B5E"/>`,
  ALLIANCE:`<g fill="#2D3B5E"><circle cx="-6" cy="-2" r="2.2"/><circle cx="0" cy="-4" r="2.4"/><circle cx="6" cy="-2" r="2.2"/><path d="M-9 5 Q-6 0 -3 5 Z M-3.5 5 Q0 -1 3.5 5 Z M3 5 Q6 0 9 5 Z"/></g>`,
  BIFURCATION:`<path d="M0 6 V0 M0 0 L-6 -6 M0 0 L6 -6" stroke="#8A5A2B" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
  PASSAGE:`<path d="M-6 6 V-1 A6 6 0 0 1 6 -1 V6" stroke="#B38F4C" stroke-width="2.6" fill="none" stroke-linecap="round"/>`,
  MYSTERE:`<text x="0" y="5" text-anchor="middle" font-size="14" font-weight="700" font-family="Inter,sans-serif" fill="#4B3F7A">?</text>`,
  SEUIL:`<path d="M0 -6 L6 0 L0 6 L-6 0 Z" fill="#2A1810"/>`,
  NEUTRE:``
};
function pictoInline(c){ return `<svg width="20" height="16" viewBox="-11 -8 22 16" style="vertical-align:-3px" aria-hidden="true">${PICTOS[c]||""}</svg>`; }

function stationSVG(c, i){
  const p = casePos(i);
  const arch = /^A[123][LO]$/.test(c);
  let fill = "#FDFAF3", ink = "#2A1810", stroke = "#2A1810";
  if(c === "SEUIL"){ fill = "#C9A567"; }
  else if(arch && c[2] === "O"){ fill = "#2A1810"; ink = "#F7F0E3"; stroke = "#C9A567"; }
  else if(arch){ fill = "#F3E2B8"; stroke = "#B38F4C"; }
  else if(c === "NEUTRE"){ fill = "#FDFAF3"; stroke = "#B5A994"; }
  const inner = arch ? `<text x="0" y="4" text-anchor="middle" font-size="11" font-weight="700" font-family="Inter,sans-serif" fill="${ink}">${c.slice(0,2)}</text>` : `<g transform="scale(.82)">${PICTOS[c]||""}</g>`;
  return `<g transform="translate(${p.x},${p.y}) scale(${p.s})"><title>${CASE_LABELS[c]||c}</title>
    <ellipse cx="0" cy="5" rx="19" ry="7" fill="#2A1810" opacity=".18"/>
    <ellipse cx="0" cy="0" rx="19" ry="11" fill="${fill}" stroke="${stroke}" stroke-width="1.6"/>
    ${inner}</g>`;
}

function sceneMonde(m, idx){
  const pl = PLATEAU[m];
  const order = pl.map((c,i)=>i).sort((a,b)=>casePos(a).y - casePos(b).y);
  return `<div class="scene">
    <svg viewBox="0 0 640 400" role="img" aria-label="Décor du Monde ${MONDES[m].nom} : ton personnage est sur la case ${CASE_LABELS[pl[idx]]}">
      ${DECORS[m]()}
      <ellipse cx="320" cy="252" rx="250" ry="96" fill="none" stroke="#FDFAF3" stroke-width="20" opacity=".34"/>
      <ellipse cx="320" cy="252" rx="250" ry="96" fill="none" stroke="#2A1810" stroke-width="1.2" stroke-dasharray="3 9" opacity=".5"/>
      ${order.map(i=>stationSVG(pl[i], i)).join("")}
      ${avatarSVG(casePos(idx))}
    </svg>
    <div class="scene-title"><span>Monde</span>${MONDES[m].nom}</div>
    <div id="dice_float" class="dice dice-float" hidden></div>
  </div>`;
}

const ILES = { MOI:[320,82], RELATIONS:[128,206], ACTIVITES:[512,206], CORPS:[320,330] };
const ILE_COL = { MOI:"#2D3B5E", RELATIONS:"#B85D3D", ACTIVITES:"#C9A567", CORPS:"#5C6E54" };
function sceneCentre(){
  const iles = MONDE_ORDER.map(m=>{
    const [x,y] = ILES[m];
    return `<path d="M${x} ${y} L320 206" stroke="#2A1810" stroke-width="1.2" stroke-dasharray="3 8" opacity=".35"/>
      <ellipse cx="${x}" cy="${y+8}" rx="78" ry="34" fill="#FDFAF3" opacity=".55"/>
      <ellipse cx="${x}" cy="${y}" rx="70" ry="30" fill="#EFE4CE"/>
      <ellipse cx="${x}" cy="${y-4}" rx="56" ry="22" fill="${ILE_COL[m]}"/>
      ${palm(x-40,y-6,26,"#2A1810")}
      <text x="${x}" y="${y+1}" text-anchor="middle" font-family="Cormorant Garamond,serif" font-weight="600" font-size="14" letter-spacing=".5" fill="#FDFAF3">${MONDES[m].nom}</text>
      ${state.traces[m] ? `<text x="${x+46}" y="${y-18}" text-anchor="middle" font-size="18" fill="#C9A567" stroke="#2A1810" stroke-width=".5">❖</text>` : ""}`;
  }).join("");
  return `<div class="scene">
    <svg viewBox="0 0 640 400" role="img" aria-label="Carte des quatre Mondes autour du Centre ANIMAE">
      <defs><radialGradient id="sea"><stop offset="0" stop-color="#E6EFEA"/><stop offset="1" stop-color="#B9CFD0"/></radialGradient></defs>
      <rect width="640" height="400" fill="url(#sea)"/>
      <path d="M30 60 h60 M520 44 h70 M60 330 h80 M500 350 h90 M210 150 h40 M400 270 h50" stroke="#FDFAF3" stroke-width="2" opacity=".7" stroke-linecap="round"/>
      ${iles}
      <circle cx="320" cy="206" r="40" fill="#FDFAF3"/>
      <circle cx="320" cy="206" r="31" fill="none" stroke="#2A1810" stroke-width="4" stroke-linecap="round" stroke-dasharray="170 40" transform="rotate(-30 320 206)"/>
      ${avatarSVG({x:320,y:222,s:.9})}
    </svg>
    <div class="scene-title"><span>Tu es au</span>Centre ANIMAE</div>
  </div>`;
}
