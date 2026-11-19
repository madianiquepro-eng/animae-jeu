/* ANIMAE — ambiance sonore synthétisée (aucun fichier audio) : mer, notes de kalimba, battement de cœur. */
let _ac = null, _amb = null, _sonPret = false;
function sonActif(){ return state.son !== false; }
function sonInit(){
  if(_sonPret || typeof window === "undefined" || !(window.AudioContext || window.webkitAudioContext)) return;
  try{ _ac = new (window.AudioContext || window.webkitAudioContext)(); _sonPret = true; sonAmbiance(_ambVoulu); }catch(e){}
}
if(typeof window !== "undefined" && window.addEventListener) window.addEventListener("pointerdown", sonInit, { once:false });
function sonNote(freq, quand, duree, vol, type){
  if(!_ac || !sonActif()) return;
  const t = _ac.currentTime + (quand||0), o = _ac.createOscillator(), g = _ac.createGain();
  o.type = type || "sine"; o.frequency.value = freq;
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol||0.12, t+0.015); g.gain.exponentialRampToValueAtTime(0.0001, t+(duree||0.9));
  o.connect(g); g.connect(_ac.destination); o.start(t); o.stop(t+(duree||0.9)+0.05);
}
const GAMME = [392, 440, 523.25, 587.33, 659.25, 783.99];
function sonChoix(){ sonNote(GAMME[Math.floor(Math.random()*4)], 0, 0.8, 0.09); }
function sonResultat(fx, ombre, elan){
  const v = Object.values(fx||{}), plus = v.filter(x=>x>0).length, moins = v.filter(x=>x<0).length;
  if(ombre){ sonNote(98, 0, 1.8, 0.14); sonNote(146.8, 0.05, 1.8, 0.08); }
  else if(plus && !moins){ [0,2,4].forEach((n,i)=>sonNote(GAMME[n], i*0.13, 1.1, 0.1)); }
  else if(moins && !plus){ sonNote(293.7, 0, 0.9, 0.1); sonNote(220, 0.2, 1.2, 0.1); }
  else sonNote(GAMME[1], 0, 0.9, 0.09);
  if(elan <= 1){ [0.5, 0.78, 1.5, 1.78].forEach(t=>sonNote(58, t, 0.22, 0.3)); }
}
function sonDe(){ for(let i=0;i<6;i++) sonNote(300+Math.random()*500, i*0.09, 0.08, 0.06, "triangle"); }
let _ambVoulu = false;
function sonAmbiance(on){
  _ambVoulu = on;
  if(!_ac) return;
  const veut = on && sonActif();
  if(veut && !_amb){
    const n = _ac.sampleRate*4, buf = _ac.createBuffer(1, n, _ac.sampleRate), d = buf.getChannelData(0);
    for(let i=0;i<n;i++) d[i] = Math.random()*2-1;
    const src = _ac.createBufferSource(); src.buffer = buf; src.loop = true;
    const f = _ac.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = 520;
    const g = _ac.createGain(); g.gain.value = 0.035;
    const lfo = _ac.createOscillator(), lg = _ac.createGain(); lfo.frequency.value = 0.11; lg.gain.value = 0.028;
    lfo.connect(lg); lg.connect(g.gain); src.connect(f); f.connect(g); g.connect(_ac.destination); src.start(); lfo.start();
    _amb = { src, lfo, g };
  } else if(!veut && _amb){
    try{ _amb.g.gain.linearRampToValueAtTime(0.0001, _ac.currentTime+0.6); const a = _amb; setTimeout(()=>{ try{ a.src.stop(); a.lfo.stop(); }catch(e){} }, 800); }catch(e){}
    _amb = null;
  }
}
function sonBascule(){ state.son = !sonActif(); if(!sonActif()) sonAmbiance(false); else { sonInit(); sonAmbiance(_ambVoulu); sonChoix(); } render(); }
