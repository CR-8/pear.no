// AUTO-SPLIT from the original bundle (engine region) -- module "faq".
// Renamed identifiers per the recovered naming key; anything not renamed
// keeps its original compact name (verified scope-unique before splitting).
import { clamp, smoothstep } from './easing';
import { pointer } from './parallax';
import { Ee, De } from './constants';

var gn, _n, vn, yn, bn = [];

// Deliberate difference from the original: the five `.fq` cards used to be
// built here via `innerHTML` from the same data (Te, now src/data/faq.ts)
// -- invisible to crawlers despite the page shipping FAQPage JSON-LD that
// describes them. Faq.astro pre-renders them instead, so this just wires
// up handles to the elements that already exist; the carousel/exit math
// below (tickFaqCarousel, faqExit) is unchanged.
function buildFaq() {
  gn = document.querySelector(`.faq`), _n = gn && gn.querySelector(`.faq-lead`), vn = _n && _n.querySelector(`line`), yn = _n && _n.querySelector(`rect`), bn = gn ? [...gn.querySelectorAll(`.fq`)] : []
}

var Sn = !1;

function tickFaqCarousel(e) {
  if (!gn) return;
  if (gn.style.opacity = e > .001 ? `1` : `0`, e <= .001) {
    if (Sn) return;
    Sn = !0
  } else Sn = !1;
  let t = innerWidth,
    n = innerHeight,
    r = bn.length,
    i = Math.max(t / De[0], n / De[1]),
    a = De[0] * i,
    o = De[1] * i,
    s = (t - a) / 2,
    c = (n - o) / 2,
    l = clamp(e / .85, 0, 1),
    u = .22,
    p = clamp((l - u) / (1 - u), 0, 1),
    m = 360 / r,
    h = -p * (360 - m),
    g = 0,
    _ = -2;
  for (let e = 0; e < r; e++) {
    let t = Math.cos(((e * m + h) % 360 + 360) % 360 * Math.PI / 180);
    t > _ && (_ = t, g = e)
  }
  let v = t <= 720,
    y = v ? t * .36 : Math.min(360, t * .26),
    x = v ? Math.min(1, t / 560) : 1;
  for (let e = 0; e < r; e++) {
    let t = bn[e],
      r = smoothstep(clamp((l - .04 - e * .05) / .22, 0, 1)),
      i = ((e * m + h) % 360 + 360) % 360,
      a = i * Math.PI / 180,
      o = (Math.cos(a) + 1) / 2,
      s = e === g && o > .9 && r > .92;
    s !== t.classList.contains(`on`) && t.classList.toggle(`on`, s), t.style.left = `50%`, t.style.top = (n * .602).toFixed(0) + `px`, t.style.transform = `translate(${(-50+pointer.x*2.4).toFixed(2)}%,${(-50+pointer.y*2).toFixed(2)}%) rotateY(${i.toFixed(2)}deg) translateZ(${y}px) rotateY(${(-i).toFixed(2)}deg) translateY(${(Math.sin(a)*26-(1-r)*34).toFixed(1)}px) scale(${(Math.round(r*x*(.58+.42*o**1.4)*100)/100).toFixed(2)})`;
    let c = Math.round((1 - o) * 8.4) / 2;
    t.style.filter = c > .05 ? `blur(${c.toFixed(1)}px)` : ``, t.style.zIndex = Math.round(o * 100)
  }
  let [ee, S] = Ee[g], C = s + ee * a, te = c + S * o, w = bn[g].getBoundingClientRect(), T = C < t / 2 ? w.left - 34 : w.right + 34, E = w.top + 26, ne = smoothstep(clamp(((_ + 1) / 2 - .9) / .055, 0, 1));
  yn.setAttribute(`x`, (T - 4).toFixed(1)), yn.setAttribute(`y`, (E - 4).toFixed(1)), vn.setAttribute(`x1`, C.toFixed(1)), vn.setAttribute(`y1`, te.toFixed(1)), vn.setAttribute(`x2`, T.toFixed(1)), vn.setAttribute(`y2`, E.toFixed(1)), _n.style.opacity = ne.toFixed(3)
}

function faqExit(e) {
  if (!gn) return 0;
  let t = smoothstep(clamp((e - .8) / .2, 0, 1));
  return gn.classList.toggle(`out`, t > .001), t > .001 ? (gn.style.setProperty(`--go`, Math.round((80 - t * 80) / 2) * 2 + `%`), gn.style.filter = `blur(${(Math.round(t*18)/2).toFixed(1)}px)`, gn.style.transform = `translateY(${(-t*innerHeight*.06).toFixed(1)}px) scale(${(Math.round((1+t*.05)*100)/100).toFixed(2)})`) : (gn.style.filter = ``, gn.style.transform = ``), t
}

export { buildFaq, faqExit, tickFaqCarousel };
