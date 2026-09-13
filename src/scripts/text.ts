// AUTO-SPLIT from the original bundle (engine region) -- module "text".
// Renamed identifiers per the recovered naming key; anything not renamed
// keeps its original compact name (verified scope-unique before splitting).
import { clamp, gain, outQuart, smoothstep, v } from './easing';
import { y } from './parallax';
import { A, M, S, ee, k, le } from './constants';
import { Be, Re, Ve, ze } from './scroll';
import { Jt } from './lines';

var en, tn, nn, rn = [],
  an = [],
  on = -1,
  sn = -1;

function splitTextNode(e) {
  let t = [],
    n = [];
  return [...e.childNodes].forEach(e => {
    if (e.nodeType !== 3) return;
    let r = document.createDocumentFragment();
    e.nodeValue.split(/(\s+)/).forEach(e => {
      if (!e) return;
      if (/^\s+$/.test(e)) {
        r.appendChild(document.createTextNode(e));
        return
      }
      let i = document.createElement(`span`);
      i.className = `wd`;
      for (let t of e) {
        let e = document.createElement(`span`);
        e.className = `ch`, e.textContent = t, e.dataset.c = t, i.appendChild(e), n.push(e)
      }
      t.push(i), r.appendChild(i)
    }), e.parentNode.replaceChild(r, e)
  }), {
    words: t,
    chars: n
  }
}

function splitElement(e) {
  let t = e.textContent;
  e.textContent = ``;
  let n = [];
  return t.split(/(\s+)/).forEach(t => {
    if (!t) return;
    if (/^\s+$/.test(t)) {
      e.appendChild(document.createTextNode(t));
      return
    }
    let r = document.createElement(`span`);
    r.className = `wd`;
    for (let e of t) {
      let t = document.createElement(`span`);
      t.className = `ch`, t.textContent = e, r.appendChild(t), n.push(t)
    }
    e.appendChild(r)
  }), n
}

function initOverlay() {
  en = document.querySelector(`.ov`), tn = document.querySelector(`.ov .fill`), nn = document.querySelector(`.ov .tag`), rn = [
    [0, .045],
    [.26, .4],
    [.44, .55],
    [.56, .65]
  ].map(([e, t], n) => {
    let r = [...document.querySelectorAll(`.bk[data-beat="${n}"]`)];
    return {
      a: e,
      b: t,
      els: r,
      lines: r.flatMap(e => [...e.querySelectorAll(`.ln i`)]),
      stand: r.map(e => e.querySelector(`.stand`)).filter(Boolean),
      chars: r.flatMap(e => [...e.querySelectorAll(`.stand`)].flatMap(splitElement)),
      heads: [...r.flatMap(e => [...e.querySelectorAll(`.ln i`)])].map(e => ({
        i: e,
        ...splitTextNode(e)
      })),
      shown: !1
    }
  }), an = [...document.querySelectorAll(`.ov [data-out]`)].map(e => ({
    el: e,
    role: e.dataset.out,
    base: parseFloat(getComputedStyle(e).opacity) || 1,
    x0: 0,
    y0: 0
  })), addEventListener(`resize`, dn), requestAnimationFrame(dn)
}

function dn() {
  for (let e of an) {
    e.el.style.transform = ``;
    let t = e.el.getBoundingClientRect();
    e.x0 = t.left + t.width / 2, e.y0 = t.top + t.height / 2, e.el.classList.contains(`gv--r`) && (e.el.style.top = ``, e.top0 = e.el.getBoundingClientRect().top)
  }
}

function fn(e, t) {
  en.classList.add(`go`), sn = e + t, S.t0 = e
}

function animateHeadLines(e, t) {
  e.heads.forEach((e, n) => {
    let r = outQuart(clamp((t - n * .115) / .6, 0, 1));
    e.i.style.transform = `translate(var(--exitX, 0px), calc(${((1-r)*175).toFixed(2)}% + var(--exitY, 0px)))`
  })
}

function tickOverlay(e, t) {
  let n = v.pan,
    r = !1;
  for (let n of rn) {
    let i = n.b - n.a,
      a = clamp((e - n.a) / i, 0, 1),
      o = e > n.a - .02 && e < n.b + .02;
    if (o !== n.shown && (n.shown = o, n.els.forEach(e => {
        e.style.visibility = o ? `visible` : `hidden`
      })), !o) continue;
    r = !0;
    let s = n === rn[0],
      c = s ? smoothstep(clamp((1 - a) / .28, 0, 1)) : Math.min(smoothstep(clamp(a / .16, 0, 1)), smoothstep(clamp((1 - a) / .2, 0, 1)));
    if (s) {
      let e = 1 - c,
        t = e * e;
      n.els.forEach(e => {
        e.style.opacity = c.toFixed(3)
      }), n.heads.forEach((e, n) => {
        let r = t * (1 + n * .16);
        e.i.style.setProperty(`--exitX`, `${(-r*54).toFixed(2)}px`), e.i.style.setProperty(`--exitY`, `${(-r*7).toFixed(2)}px`)
      }), n.els.forEach(n => {
        n.style.transform = `translate3d(${(-t*86).toFixed(1)}px,${(-t*14).toFixed(1)}px,0) scale(${(1-t*.04).toFixed(4)})`, n.style.filter = e > .02 ? `blur(${(t*5).toFixed(2)}px)` : ``
      })
    } else n.els.forEach(e => {
      e.style.opacity = c.toFixed(3), e.style.transform = ``, e.style.filter = ``
    });
    let l = s ? sn < 0 ? 0 : clamp((t - sn) / Ve, 0, 1) : clamp((a - .03) / .3, 0, 1);
    if (animateHeadLines(n, l), s) {
      let e = outQuart(clamp((l - .34) / .3, 0, 1)),
        t = outQuart(clamp((l - .52) / .22, 0, 1));
      n.els.forEach(n => {
        let r = n.querySelector(`.cta`);
        if (!r) return;
        r.style.opacity = e.toFixed(3), r.style.transform = `translateY(${((1-e)*14).toFixed(1)}px)`;
        let i = r.querySelector(`.flood`);
        i && (i.style.clipPath = `inset(${((1-t)*100).toFixed(2)}% 0 0 0)`)
      })
    }
    if (nn) {
      let e = rn.indexOf(n);
      e !== on && (on = e, nn.textContent = Re[e] || Re[0]);
      let t = outQuart(clamp((l - (s ? .8 : .35)) / .2, 0, 1)) * c;
      nn.style.opacity = t.toFixed(3), nn.style.transform = `translateY(${((1-t)*10).toFixed(1)}px)`
    }
    let u = clamp(s ? (l - .56) / .36 : (a - .14) / .26, 0, 1) * (n.chars.length + 4);
    n.chars.forEach((e, t) => {
      e.style.opacity = clamp((u - t) * 2.4, 0, 1).toFixed(2)
    })
  }
  nn && !r && on !== -1 && (on = -1, nn.style.opacity = `0`); {
    let t = k.at + A.over * k.len;
    v.p = e, v.lockEnd = t;
    let r = smoothstep(clamp((e - (t - A.len)) / A.len, 0, 1)),
      i = innerWidth * le.x,
      a = innerHeight * (1 - le.y),
      o = A.e > 0 ? innerWidth * (A.e / k.ax) : innerWidth * A.w / 100,
      s = A.e > 0 ? innerHeight * (A.e / k.ay) : innerHeight * A.h / 100,
      c = {
        l: i - o,
        r: i + o,
        ld: i - o,
        rd: i + o,
        lu: i - o,
        ru: i + o
      },
      l = {
        u: a - s,
        d: a + s,
        ld: a + s,
        rd: a + s,
        lu: a - s,
        ru: a - s
      },
      u = clamp((e - k.at) / k.len, 0, 1),
      p = gain(clamp((u - (A.auto > .5 ? clamp(M() + A.lead, 0, 1) : A.ret)) / A.retLen, 0, 1), A.ease),
      m = smoothstep(clamp((u - (A.ret - .18)) / .18, 0, 1)),
      h = 1 + .85 * Math.max(0, Math.sin(Math.PI * clamp((r - .55) / .45, 0, 1)));
    for (let e of an) {
      if (n > 0 && e.el.classList.contains(`fill`)) continue;
      let t = e.el.classList.contains(`gx`),
        i = t ? r : r * (1 - p),
        a = c[e.role] === void 0 ? 0 : (c[e.role] - e.x0) * i,
        o = l[e.role] === void 0 ? 0 : (l[e.role] - e.y0) * i,
        s = e.el.classList.contains(`gh`) && e.role === `d`,
        u = e.el.classList.contains(`gv--r`);
      if (s && (o += p * (innerHeight + 24 - e.y0)), u) {
        let t = innerWidth <= 720 ? 1 - smoothstep(clamp((v.burn - .1) / .25, 0, 1)) : 1;
        a += p * t * (y.x - e.x0)
      }
      let g = t ? ` scale(${h.toFixed(3)})` : ``;
      if (u) {
        let t = innerWidth <= 720 ? 0 : smoothstep(clamp((v.coda - .42) / .3, 0, 1));
        e.el.style.top = (e.top0 * (1 - Math.max(i, p)) + t * innerHeight).toFixed(1) + `px`
      }
      e.el.style.transform = `translate(${a.toFixed(1)}px,${o.toFixed(1)}px)${g}`;
      let _ = e.el.classList.contains(`fill`) ? 1 - r : 1,
        b = e.el.classList.contains(`gx--lock`) ? smoothstep(clamp(r / .5, 0, 1)) : 1,
        x = t ? 1 - m : s ? 1 - p : 1,
        ee = 1 - Jt();
      e.el.style.opacity = (e.base * _ * b * x * ee).toFixed(3)
    }
    if (v.g = r, v.off = p, ee.lit) en.style.getPropertyValue(`--rule`) && (en.style.removeProperty(`--rule`), en.style.removeProperty(`--cross`), en.style.removeProperty(`--mark`));
    else if (r > .001) {
      let e = (e, t) => e + (t - e) * p,
        t = [e(29, 255), e(28, 255), e(25, 255)].map(Math.round).join(` `);
      en.style.setProperty(`--rule`, `rgb(${t} / ${e(.165+.5*r,.225).toFixed(3)})`), en.style.setProperty(`--cross`, `rgb(${t} / ${e(.34+.6*r,.525).toFixed(3)})`), en.style.setProperty(`--mark`, p > .5 ? `#fff` : `var(--ink)`)
    } else en.style.getPropertyValue(`--rule`) && (en.style.removeProperty(`--rule`), en.style.removeProperty(`--cross`), en.style.removeProperty(`--mark`))
  }
  if (v.burn = clamp((e - k.at) / k.len, 0, 1), tn)
    if (n > 0) tn.style.opacity = `0`;
    else {
      let t = ze * (1 - smoothstep(clamp((e - .052) / .09, 0, 1)));
      tn.style.left = t.toFixed(2) + `%`, tn.style.width = ((Be - t) * smoothstep(e)).toFixed(2) + `%`
    }
}

export { fn, initOverlay, tickOverlay };
