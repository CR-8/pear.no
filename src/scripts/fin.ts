// AUTO-SPLIT from the original bundle (engine region) -- module "fin".
// Renamed identifiers per the recovered naming key; anything not renamed
// keeps its original compact name (verified scope-unique before splitting).
import { clamp, outQuart, smoothstep, v } from './easing';
import { pointer } from './parallax';
import { Ce, F, P, _e, be, ee, ge, ve, we } from './constants';
import { Je, Ke, qe } from './scroll';

var Vr, Hr, Ur, Wr, Gr = [],
  Kr = [],
  qr = [],
  Jr = [],
  Yr, Xr, Zr, Qr, $r, ei = [],
  ti = [],
  ni = [],
  ri = 0,
  ii = !1,
  ai = -1,
  oi = 0,
  si = 0,
  ci = -1;

function initFin() {
  if (Vr = document.querySelector(`.fin`), Hr = [...document.querySelectorAll(`.fin-top, .fin-bot`)], Ur = document.querySelector(`.fin-g[data-f="1"] .fin-top`), Wr = document.querySelector(`.fin-g[data-f="1"] .fin-bot`), Gr = [...document.querySelectorAll(`.fin-g`)], Kr = Gr.map(e => [...e.querySelectorAll(`.fin-h .ln i`)]), qr = Gr.map(e => [...e.querySelectorAll(`.fin-l, .fin-chip, .fin-s`)]), Jr = Gr.map(e => [...e.querySelectorAll(`.fin-soak`)]), Yr = document.querySelector(`#inkf feDisplacementMap`), Xr = document.querySelector(`#inkf feFuncA`), innerWidth <= 720)
    for (let e of Jr)
      for (let t of e) t.style.filter = `none`;
  else
    for (let e of Jr[1] || []) e.style.filter = `none`;
  Zr = document.querySelector(`.sign`), Qr = Zr && Zr.querySelector(`.sg-a`), $r = Zr && Zr.querySelector(`.sg-b`), ei = $r ? [...$r.querySelectorAll(`path`)].map(e => {
    let t = e.getTotalLength();
    return e.style.strokeDasharray = t, e.style.strokeDashoffset = t, e.style.opacity = `0`, {
      el: e,
      a: +e.dataset.a,
      b: +e.dataset.b,
      len: t
    }
  }) : [], ti = [...document.querySelectorAll(`.ov .wob`)], ni = [...document.querySelectorAll(`.ov .gv, .ov .gh`)]
}

function tickFin(e, t, n) {
  if (!Vr) return ri;
  let r = innerWidth <= 720,
    i = innerWidth / 1516;
  r && Vr._join !== Ke.join && (Vr._join = Ke.join, Vr.style.setProperty(`--join`, (Ke.join * 100).toFixed(1) + `%`));
  for (let e of Hr) e === Ur || e === Wr || (e.style.transform = r ? `scale(1)` : `scale(${i.toFixed(5)})`);
  let a = clamp((v.plan - ge) / (1 - ge), 0, 1);
  ri = clamp((t - _e) / (1 - _e), 0, 1), v.ink = a;
  let o = clamp(e / ve, 0, 1),
    s = ri > .5 ? smoothstep(clamp((be(e) - Ce) / we, 0, 1)) : 0,
    c = [smoothstep(clamp(a / .22, 0, 1)), smoothstep(clamp(o / .02, 0, 1)) * (1 - s)];
  if (Ur) {
    let e = smoothstep(clamp(o / .78, 0, 1)),
      t = outQuart(clamp(r ? e : (e - .62) / .38, 0, 1)),
      n = 1 + ((r ? qe : P) - 1) * (1 - t);
    if (r && (n = Math.round(n * 100) / 100), Ur.style.transform = r ? `translate(0px,${((1-e)*520).toFixed(1)}px) scale(${n.toFixed(4)})` : `scale(${i.toFixed(5)}) translate(0px,${((1-e)*1190).toFixed(1)}px) scale(${n.toFixed(4)})`, Wr) {
      let t = smoothstep(clamp((e - .55) / .4, 0, 1));
      Wr.style.transform = r ? `translateY(${((1-t)*110).toFixed(1)}px)` : `scale(${i.toFixed(5)}) translateY(${((1-t)*230).toFixed(1)}px)`, Wr.style.opacity = t.toFixed(3)
    }
  }
  let l = a >= .999 || a <= .001;
  if (Yr && Math.abs(a - ai) > 5e-4 && (l || innerWidth > 720 || n - oi > 33)) {
    oi = n, ai = a;
    let e = smoothstep(a);
    if (r)
      for (let t of Jr[0]) t.style.filter = a >= .999 ? `none` : `blur(${((1-e)*3.4).toFixed(2)}px) contrast(${(1+(1-e)*6).toFixed(2)})`, t.style.opacity = clamp(a * 1.12, 0, 1).toFixed(3);
    else {
      Yr.setAttribute(`scale`, ((1 - e) * 34).toFixed(2)), Xr.setAttribute(`intercept`, (-7.4 + 8.4 * clamp(a * 1.12, 0, 1)).toFixed(3)), Xr.setAttribute(`slope`, (9 - 5 * e).toFixed(2));
      for (let t of Jr[0]) t.style.setProperty(`--soak`, ((1 - e) * 3.4).toFixed(2) + `px`), t.style.setProperty(`--bite`, (1 + (1 - e) * 6).toFixed(2)), t.style.filter = a >= .999 ? `none` : ``
    }
  } {
    let e = !!ee.lit * (1 - smoothstep(clamp((ri - .35) / .2, 0, 1)));
    if (e > .01 !== ii) {
      ii = e > .01;
      for (let e of ni) e.classList.toggle(`warp`, ii);
      for (let e of ti) e._L = void 0
    }
    if (ii && n - si > 32) {
      si = n;
      let t = n * .001;
      for (let n of ti) {
        let r = n.parentElement;
        if (n._L === void 0) {
          let e = r.getBoundingClientRect();
          n._L = Math.max(1, r.classList.contains(`gv`) ? e.height : e.width)
        }
        let i = r.classList.contains(`gv`),
          a = n._L,
          o = e * 7.5,
          s = ``;
        for (let e = 0; e <= 14; e++) {
          let n = e / 14,
            r = n * a,
            c = o * (Math.sin(n * 5.2 + t * 1.25) * .62 + Math.sin(n * 11.4 - t * .87) * .38);
          s += (e ? `L` : `M`) + (i ? `${(24+c).toFixed(1)},${r.toFixed(1)}` : `${r.toFixed(1)},${(24+c).toFixed(1)}`)
        }
        n.setAttribute(`viewBox`, i ? `0 0 49 ${a.toFixed(0)}` : `0 0 ${a.toFixed(0)} 49`), n.firstElementChild.setAttribute(`d`, s)
      }
    }
  }
  let u = r ? Math.round(s * 26) / 2 : s * 13;
  if (Gr[1].style.filter = u > .01 ? `blur(${u.toFixed(2)}px)` : ``, Math.abs(ri - ci) > 5e-4) {
    ci = ri;
    let e = (1.52 - 2.04 * ri) * 100;
    r ? (Gr[0].style.clipPath = ri > .001 ? `inset(0 0 ${clamp(100-e,0,100).toFixed(2)}% 0)` : ``, Gr[1].style.clipPath = ri > .001 && ri < .999 ? `inset(${clamp(e,0,100).toFixed(2)}% 0 0 0)` : ``) : (Gr[0].style.webkitMaskImage = Gr[0].style.maskImage = ri > .001 ? `linear-gradient(to top, rgba(0,0,0,0) ${(100-e-1.5).toFixed(1)}%, #000 ${(100-e+3).toFixed(1)}%)` : ``, Gr[1].style.webkitMaskImage = Gr[1].style.maskImage = ri > .001 && ri < .999 ? `linear-gradient(to top, #000 ${(100-e-1.5).toFixed(1)}%, rgba(0,0,0,0) ${(100-e+3).toFixed(1)}%)` : ``)
  }
  Vr.style.opacity = Math.max(c[0], c[1]) > .001 ? `1` : `0`;
  for (let e = 0; e < Gr.length; e++) {
    let t = c[e];
    Gr[e].style.opacity = t.toFixed(3);
    let n = Kr[e];
    for (let e = 0; e < n.length; e++) {
      let r = outQuart(clamp((t - e * .12) / .62, 0, 1));
      n[e].style.transform = `translateY(${((1-r)*120).toFixed(1)}%)`
    }
    for (let t of qr[e]) t.style.opacity = `1`, t.style.transform = `translateY(0px)`
  }
  return ri
}

function tickSign(e, t) {
  if (!Zr) return;
  let n = Math.round(t * 22) / 2;
  Zr.style.filter = n > .01 ? `blur(${n.toFixed(1)}px)` : ``;
  let r = clamp((e - F) / (1 - F), 0, 1),
    i = smoothstep(clamp((r - .3) / .7, 0, 1)),
    a = innerWidth <= 720 ? Je + (1 - Je) * i : 1 - (1 - Je) * i,
    o = Math.round(a * (1 + t * .06) * 100) / 100;
  Zr.style.transform = `translate(${(pointer.x*15).toFixed(1)}px,${(-i*innerHeight*.072+pointer.y*12-t*innerHeight*.09).toFixed(1)}px) scale(${o.toFixed(2)})`, Zr.style.opacity = (1 - t).toFixed(3), Qr && (Qr.style.opacity = smoothstep(clamp(r / .22, 0, 1)).toFixed(3));
  let s = smoothstep(clamp((r - .2) / .62, 0, 1));
  if ($r) {
    $r.style.opacity = s > .001 ? `1` : `0`;
    for (let e = 0; e < ei.length; e++) {
      let t = ei[e],
        n = clamp((s - t.a) / Math.max(1e-4, t.b - t.a), 0, 1);
      t.el.style.opacity = n > 0 ? `1` : `0`, t.el.style.strokeDashoffset = (t.len * (1 - n)).toFixed(2)
    }
  }
}

export { initFin, tickFin, tickSign };
