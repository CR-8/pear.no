// AUTO-SPLIT from the original bundle (engine region) -- module "plate".
// Renamed identifiers per the recovered naming key; anything not renamed
// keeps its original compact name (verified scope-unique before splitting).
import { clamp, smoothstep } from './easing';
import { A, M } from './constants';
import { $e, et, nt, rt, tt } from './scroll';

var fi, pi, mi, hi = [],
  gi = [],
  _i = [],
  vi = [],
  yi = [],
  bi = [],
  xi = 0,
  Si = 0;

function initPlate() {
  fi = document.querySelector(`.pf`), pi = document.querySelector(`.pf-in`), mi = document.querySelector(`.pf-head`), hi = [...document.querySelectorAll(`.pf-g`)], gi = hi.map(e => [...e.querySelectorAll(`.pf-h .ln i`)]), _i = hi.map(e => [e.querySelector(`.pf-chip`), e.querySelector(`.pf-b`)]), yi = hi.map(() => 0), bi = hi.map(() => 0);
  let e = document.querySelector(`.pf-ticks`);
  if (vi = [], e)
    for (let t = 1; t < 34; t++) {
      let n = t * rt,
        r = t % 5 == 0,
        i = document.createElementNS(`http://www.w3.org/2000/svg`, `line`);
      i.setAttribute(`x1`, 818), i.setAttribute(`x2`, 818 + (r ? 13 : 6)), i.setAttribute(`y1`, n), i.setAttribute(`y2`, n), e.appendChild(i), vi.push({
        el: i,
        y: n,
        long: r
      })
    }
}

var wi = e => (Si ||= e, (e - Si) / 1e3);

function tickPlate(e, t, n, r, i) {
  if (!fi) return;
  if (t <= 0 || i <= .001) {
    fi.style.opacity !== `0` && (fi.style.opacity = `0`);
    return
  }
  fi.style.opacity = `1`;
  let a = innerWidth / et,
    o = innerWidth <= 720 ? innerWidth * .0475 - 818 * a : 0,
    s = innerHeight - innerHeight * t * (1 - n);
  pi.style.transform = `translate(${o.toFixed(2)}px,${s.toFixed(2)}px) scale(${a.toFixed(5)})`;
  let c = A.auto > .5 ? clamp(M() + A.lead, 0, 1) : A.ret,
    l = Math.min(.8, c + A.retLen * .85),
    u = smoothstep(clamp((i - l) / Math.max(.06, 1 - l), 0, 1));
  wi(r);
  let p = clamp((innerHeight * .92 - s) / a, 0, tt);
  if (mi) {
    mi.style.transform = `translateY(${p.toFixed(1)}px)`, mi.style.opacity = (u * smoothstep(clamp((1 - e) / .08, 0, 1))).toFixed(3);
    let t = Math.round(p / tt * 100);
    t !== mi._p && (mi._p = t, mi.firstChild.textContent = t + `%`)
  }
  let m = 0;
  for (let e = 0; e < nt.length; e++) p >= nt[e] && (m = e);
  let h = nt[m],
    g = m + 1 < nt.length ? nt[m + 1] : tt,
    _ = 0;
  for (let e of vi) e.j = e.y >= h && e.y < g ? _++ : -1;
  for (let e = 0; e < vi.length; e++) {
    let t = vi[e],
      n = clamp((p - t.y) / 60, 0, 1),
      r = Math.exp(-Math.abs(p - t.y) / 190),
      i = .5 + .5 * Math.sin(p * .011 + e * 1.7),
      a = t.long ? 15 : 7,
      o = 0;
    if (t.j >= 0) {
      let e = _ > 1 ? .62 / (_ - 1) : 0;
      o = smoothstep(clamp((yi[m] - t.j * e) / .34, 0, 1))
    }
    let s = a * (.55 + .75 * i + .9 * r) + o * (t.long ? 30 : 23);
    t.el.setAttribute(`x2`, (818 + s).toFixed(1)), t.el.style.opacity = (u * Math.max(n * ((t.long ? .62 : .38) + .38 * r), o * .96)).toFixed(3)
  }
  let v = xi ? Math.min(64, r - xi) : 16;
  xi = r;
  for (let t = 0; t < hi.length; t++) {
    let n = innerWidth <= 720,
      r = n ? e >= $e[t] : p >= nt[t],
      i = n && t + 1 < $e.length && e >= $e[t + 1],
      a = u > .1 && r && !i,
      o = t === 0 ? 340 : 0,
      s = v / 820;
    bi[t] = clamp(bi[t] + (a ? s : -s), 0, 1);
    let c = smoothstep(clamp(bi[t] + (a && o ? o / 820 : 0), 0, 1)),
      l = n ? 0 : (nt[t] - p) * .375;
    yi[t] = c;
    let m = c;
    hi[t].style.opacity = c.toFixed(3), hi[t].style.transform = `translateY(${(l+(1-m)*10).toFixed(1)}px)`;
    let h = gi[t];
    for (let e = 0; e < h.length; e++) {
      let t = clamp((m - e * .055) / .8, 0, 1);
      h[e].style.transform = `translateX(${((1-t)*115).toFixed(2)}%)`
    }
    let g = clamp(m / .42, 0, 1),
      _ = clamp((m - .3) / .7, 0, 1);
    _i[t][0] && (_i[t][0].style.opacity = g.toFixed(3), _i[t][0].style.transform = `translateY(${((1-g)*8).toFixed(1)}px)`), _i[t][1] && (_i[t][1].style.opacity = _.toFixed(3), _i[t][1].style.transform = `translateY(${((1-_)*10).toFixed(1)}px)`)
  }
}

function fadePlate(e) {
  fi && e > 0 && (fi.style.opacity = (1 - smoothstep(clamp(e / .16, 0, 1))).toFixed(3))
}

export { fadePlate, initPlate, tickPlate };
