// AUTO-SPLIT from the original bundle (engine region) -- module "hud".
// Renamed identifiers per the recovered naming key; anything not renamed
// keeps its original compact name (verified scope-unique before splitting).
import { mt } from './loader';

var Ai = new URLSearchParams(location.search),
  ji = Ai.has(`hud`),
  Mi = parseFloat(Ai.get(`drive`) || `0`),
  Ni = {
    nogl: Ai.has(`nogl`),
    nofin: Ai.has(`nofin`),
    noscrub: Ai.has(`noscrub`)
  },
  z = null,
  B = 0,
  Pi = 0,
  Fi = 0,
  Ii = 0,
  Li = 0,
  Ri = 0,
  zi = !1,
  Bi = 0,
  Vi = {};

function hudMark(e) {
  if (!ji) return;
  let t = performance.now();
  e && (Vi[e] = (Vi[e] || 0) + (t - Bi)), Bi = t
}

function hudFrame(e, t) {
  if (!ji && !Mi) return;
  if (!B) {
    B = e;
    return
  }
  let n = e - B;
  if (B = e, Mi) {
    let e = document.documentElement.scrollHeight - innerHeight;
    scrollY < e && scrollBy(0, e / (Mi * 1e3) * n)
  }
  if (ji && (z || (z = document.createElement(`div`), z.style.cssText = `position:fixed;top:70px;left:12px;z-index:99;padding:6px 10px;font:700 13px/1.4 monospace;color:#0f0;background:rgba(0,0,0,.72);pointer-events:none;white-space:pre-wrap;max-width:calc(100vw - 24px)`, document.body.appendChild(z)), Pi += n, Fi++, Ii = Math.max(Ii, n), Li < 150 && (Li++, n > 31 && n < 36 && Ri++, Li === 150 && (zi = Ri / Li > .8)), Pi >= 500)) {
    let e = Object.values(Vi).reduce((e, t) => e + t, 0),
      n = Object.entries(Vi).sort((e, t) => t[1] - e[1]).slice(0, 5).map(([e, t]) => `${e} ${(t/Fi).toFixed(1)}`);
    z.textContent = (zi ? `LPM? rAF is 30Hz-quantised
` : ``) + `${Math.round(Fi/(Pi/1e3))}fps worst ${Ii.toFixed(0)}ms\nroad ${(t*100).toFixed(1)}%\n` + n.join(`  `) + `  unacct ${((Pi-e)/Fi).toFixed(1)}\n` + mt.map(e => `${e.name} ${e.seq.loaded}/${e.count}`).join(` `);
    for (let e in Vi) delete Vi[e];
    Pi = 0, Fi = 0, Ii = 0
  }
}

export { Ni, hudFrame, hudMark };
