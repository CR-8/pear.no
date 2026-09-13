// AUTO-SPLIT from the original bundle (engine region) -- module "lines".
// Renamed identifiers per the recovered naming key; anything not renamed
// keeps its original compact name (verified scope-unique before splitting).
import { clamp } from './easing';
import { C, S } from './constants';

var Pt = 320,
  Ft = new Path2D(`M12 0Q13.1 10.9 24 12Q13.1 13.1 12 24Q10.9 13.1 0 12Q10.9 10.9 12 0Z`),
  It, Lt, Rt, zt, Bt = 0,
  Vt = null,
  Ht = 0,
  Ut, Wt, Gt, Kt, qt, Jt = () => Ht;

function initLinesCanvas() {
  It = document.querySelector(`.ov .lines`), It && (Lt = It.getContext(`2d`), Rt = document.createElement(`canvas`), zt = Rt.getContext(`2d`, {
    willReadFrequently: !0
  }), Ut = document.querySelector(`.ov .gv:not(.gv--r)`), Wt = document.querySelector(`.ov .gv--r`), Gt = document.querySelector(`.ov .gh[data-out="u"]`), Kt = document.querySelector(`.ov .gh[data-out="d"]`), qt = [...document.querySelectorAll(`.ov .gx:not(.gx--lock)`)])
}

var Xt = e => 1 - (1 - clamp(e, 0, 1)) ** 3,
  Zt = [
    [0, 0, 2.6],
    [.4, 1, .78],
    [.62, .15, 1.14],
    [1, 1, 1]
  ];

function Qt(e) {
  for (let t = 1; t < Zt.length; t++)
    if (e <= Zt[t][0]) {
      let [n, r, i] = Zt[t - 1], [a, o, s] = Zt[t], c = (e - n) / (a - n);
      return {
        a: r + (o - r) * c,
        s: i + (s - i) * c
      }
    }
  return {
    a: 1,
    s: 1
  }
}

function drawLinesCanvas(e, t, n, r, i, a) {
  if (!It) return;
  let o = 1 - clamp(t / .08, 0, 1),
    s = e.readyState >= 2 && e.videoWidth,
    c = a && a.el && a.el.complete && a.el.naturalWidth,
    l = s ? e : c ? a.el : null;
  if (Ht = l ? o : 0, Ht <= .001) {
    It.style.opacity !== `0` && (It.style.opacity = `0`, Lt.clearRect(0, 0, It.width, It.height));
    return
  }
  It.style.opacity = Ht.toFixed(3);
  let u = l.videoWidth || l.naturalWidth,
    f = l.videoHeight || l.naturalHeight,
    p = Math.min(devicePixelRatio || 1, 2),
    m = Math.round(innerWidth * p),
    h = Math.round(innerHeight * p);
  (It.width !== m || It.height !== h) && (It.width = m, It.height = h);
  let g = m / innerWidth,
    _ = S.t0 < 0 ? -1 : C ? 10 : (n - S.t0) / 1e3;
  if (Lt.clearRect(0, 0, m, h), _ < 0) return;
  let v = document.querySelector(`.ov`).classList.contains(`on-light`),
    y = v ? `rgba(29,28,25,0.165)` : `rgba(255,255,255,0.225)`,
    b = v ? `rgb(29,28,25)` : `#fff`;
  Lt.fillStyle = y;
  let x = (e, t, n) => {
    if (!e) return;
    let r = e.getBoundingClientRect();
    if (!r.width && !r.height) return;
    let i = Xt((_ - t) / 1.15);
    i <= 0 || (n ? Lt.fillRect(r.left * g, r.top * g, g, r.height * g * i) : Lt.fillRect(r.left * g, r.top * g, r.width * g * i, g))
  };
  if (x(Ut, .2, !0), x(Wt, .3, !0), x(Gt, .25, !1), x(Kt, .4, !1), Lt.fillStyle = b, qt.forEach((e, t) => {
      let n = e.getBoundingClientRect();
      if (!n.width) return;
      let r = clamp((_ - (t ? 1.18 : 1.05)) / .72, 0, 1);
      if (r <= 0) return;
      let {
        a: i,
        s: a
      } = Qt(r), o = n.width * g * a, s = (n.left + n.width / 2) * g, c = (n.top + n.height / 2) * g;
      Lt.globalAlpha = i, Lt.setTransform(o / 24, 0, 0, o / 24, s - o / 2, c - o / 2), Lt.fill(Ft), Lt.setTransform(1, 0, 0, 1, 0, 0), Lt.globalAlpha = 1
    }), n - Bt > 40 || l !== Vt) {
    Bt = n, Vt = l;
    let e = Pt,
      t = Math.max(1, Math.round(Pt * f / u));
    (Rt.width !== e || Rt.height !== t) && (Rt.width = e, Rt.height = t);
    try {
      zt.drawImage(l, 0, 0, e, t);
      let n = zt.getImageData(0, 0, e, t),
        r = n.data;
      for (let e = 0; e < r.length; e += 4) {
        let t = (r[e + 2] - Math.max(r[e], r[e + 1]) - 8) / 34;
        r[e + 3] = t <= 0 ? 0 : t >= 1 ? 255 : Math.round(t * 255)
      }
      zt.putImageData(n, 0, 0)
    } catch {
      return
    }
  }
  let ee = Math.max(m / u, h / f),
    te = u * ee,
    w = f * ee,
    T = (m - te) / 2 - (r || 0) * te,
    E = (h - w) / 2; {
    let e = (i || 1) * (a ? 1.06 - .06 * a.p : 1),
      t = m / 2,
      n = h / 2;
    T = t + (T - t) * e, E = n + (E - n) * e, te *= e, w *= e
  }
  Lt.globalCompositeOperation = `destination-in`, Lt.drawImage(Rt, T, E, te, w), Lt.globalCompositeOperation = `source-over`
}

export { Jt, drawLinesCanvas, initLinesCanvas };
