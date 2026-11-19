// ANIMAE — Ambiances sonores par lieu, bruitages d'événements et voix off (voix du navigateur).
// Tout est synthétisé : aucun fichier audio. La voix off utilise la voix française du navigateur (qualité variable selon l'appareil).
let _ambL = null, _ambTimer = null, _ambBruit = null;
function ambBruit(){
  if(!_ac) return null; if(_ambBruit) return _ambBruit;
  const n = _ac.sampleRate * 3, b = _ac.createBuffer(1, n, _ac.sampleRate), d = b.getChannelData(0);
  for(let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
  return (_ambBruit = b);
}
function ambStop(){ if(_ambTimer){ clearInterval(_ambTimer); _ambTimer = null; } if(_ambL){ const a = _ambL; _ambL = null; try{ a.g.gain.linearRampToValueAtTime(0.0001, _ac.currentTime + 0.8); setTimeout(() => { try{ a.src.stop(); if(a.lfo) a.lfo.stop(); }catch(e){} }, 1000); }catch(e){} } }
function ambLieu(k){
  try{
    if(typeof sonInit === "function") sonInit();
    ambStop(); if(!_ac || !sonActif() || !k) return;
    const P = { matin:{ f:"bandpass", hz:900, v:0.05, lfo:0.3 }, midi:{ f:"lowpass", hz:420, v:0.045, lfo:0.2 }, soir:{ f:"lowpass", hz:560, v:0.07, lfo:0.12 } }[k] || { f:"lowpass", hz:500, v:0.04, lfo:0.1 };
    const src = _ac.createBufferSource(); src.buffer = ambBruit(); src.loop = true;
    const f = _ac.createBiquadFilter(); f.type = P.f; f.frequency.value = P.hz; if(P.f === "bandpass") f.Q.value = 0.7;
    const g = _ac.createGain(); g.gain.value = 0.0001; g.gain.linearRampToValueAtTime(P.v, _ac.currentTime + 1.5);
    const lfo = _ac.createOscillator(), lg = _ac.createGain(); lfo.frequency.value = P.lfo; lg.gain.value = P.v * 0.6; lfo.connect(lg); lg.connect(g.gain);
    src.connect(f); f.connect(g); g.connect(_ac.destination); src.start(); lfo.start();
    _ambL = { src, lfo, g };
    _ambTimer = setInterval(() => { if(!sonActif()) return;
      if(k === "matin"){ const b = 220 + Math.random() * 180; sonNote(b, 0, 0.25, 0.03, "triangle"); sonNote(b * 1.2, 0.12, 0.25, 0.025, "triangle"); }
      else if(k === "midi"){ sonNote(110 + Math.random() * 40, 0, 0.5, 0.025, "sine"); }
      else { const m = 1300 + Math.random() * 300; sonNote(m, 0, 0.18, 0.03, "sine"); sonNote(m * 0.7, 0.16, 0.3, 0.025, "sine"); }
    }, k === "soir" ? 4200 : 2200);
  }catch(e){}
}
function ambRafale(duree, hz, vol){
  if(!_ac || !sonActif()) return;
  const t = _ac.currentTime, src = _ac.createBufferSource(); src.buffer = ambBruit();
  const f = _ac.createBiquadFilter(); f.type = "highpass"; f.frequency.value = hz || 1500;
  const g = _ac.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || 0.1, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + (duree || 0.12));
  src.connect(f); f.connect(g); g.connect(_ac.destination); src.start(t); src.stop(t + (duree || 0.12) + 0.05);
}
function ambApplaudir(){ try{ sonInit(); for(let i = 0; i < 14; i++) setTimeout(() => ambRafale(0.07, 1800 + Math.random() * 1500, 0.07), i * (70 + Math.random() * 90)); }catch(e){} }
function ambRire(){ try{ sonInit(); for(let i = 0; i < 5; i++) sonNote(420 + i * 40 - (i % 2) * 60, i * 0.11, 0.1, 0.08, "triangle"); }catch(e){} }
function ambFrottement(){ try{ sonInit(); ambRafale(0.5, 600, 0.06); }catch(e){} }
function ambCloche(){ try{ sonInit(); [880, 1318.5, 1760].forEach((f, i) => sonNote(f, i * 0.05, 2.2, 0.06)); }catch(e){} }
function ambSoupir(){ try{ sonInit(); ambRafale(0.8, 400, 0.04); }catch(e){} }

// ---------- Voix off ----------
let _vxDernier = "", _vxVoix = null;
function vxPossible(){ return typeof window !== "undefined" && "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined"; }
function vxActive(){ try{ return localStorage.getItem("animae_voix") === "1"; }catch(e){ return false; } }
function vxVoix(){
  if(_vxVoix) return _vxVoix; const L = speechSynthesis.getVoices() || [];
  const fr = L.filter(v => /^fr/i.test(v.lang));
  _vxVoix = fr.find(v => /(amélie|amelie|audrey|marie|google.*fran|thomas|hortense|denise|julie)/i.test(v.name)) || fr[0] || null; return _vxVoix;
}
function vxDire(texte){
  if(!vxPossible() || !vxActive()) return;
  const t = String(texte || "").replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/g, " ").replace(/\s+/g, " ").trim(); if(!t) return;
  speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t); u.lang = "fr-FR"; u.rate = 0.93; u.pitch = 1;
  const v = vxVoix(); if(v) u.voice = v; speechSynthesis.speak(u);
}
function vxBascule(){
  if(!vxPossible()){ alert("La voix off n'est pas disponible sur ce navigateur."); return; }
  const on = !vxActive(); try{ localStorage.setItem("animae_voix", on ? "1" : "0"); }catch(e){}
  if(!on){ speechSynthesis.cancel(); } else { _vxDernier = ""; vxDire("La voix off est activée."); }
  if(typeof dRafraichir === "function") dRafraichir(); if(typeof e2Rafraichir === "function") e2Rafraichir();
}
function vxNarrer(cle, texte){ if(cle === _vxDernier) return; _vxDernier = cle; setTimeout(() => vxDire(texte), 400); }
function vxBarre(texte){
  if(!vxPossible()) return "";
  return `<div class="row" style="gap:8px;margin:6px 0"><button class="ghost sm" onclick="vxBascule()" aria-pressed="${vxActive()}">${vxActive() ? "🎙 Voix off : activée" : "🎙 Activer la voix off"}</button>${vxActive() ? `<button class="ghost sm" onclick="_vxDernier='';vxDire(window._vxTexte||'')">↻ Réécouter</button>` : ""}</div>`;
}
if(vxPossible()){ try{ speechSynthesis.onvoiceschanged = () => { _vxVoix = null; }; }catch(e){} }
