// AUTO-SPLIT from the original bundle (engine region) -- module "films".
// Renamed identifiers per the recovered naming key; anything not renamed
// keeps its original compact name (verified scope-unique before splitting).
import { mt, registerFeedWindow, xt } from './loader';

function makeFrameLoaderTask({
  order: e,
  count: t,
  url: n,
  land: r,
  want: i
}) {
  let a = new Uint8Array(t),
    o = new Uint8Array(t),
    s = 0;
  return () => {
    let c = -1,
      l = i();
    if (l >= 0) {
      scan: for (let e = 0; e <= xt && c < 0; e++)
        for (let n of e ? [l + e, l - e] : [l])
          if (n >= 0 && n < t && !a[n]) {
            c = n;
            break scan
          }
    }
    for (; c < 0 && s < e.length;) {
      let t = e[s++];
      a[t] || (c = t)
    }
    return c < 0 ? null : (a[c] = 1, t => {
      let i = new Image;
      i.decoding = `async`, i.onload = () => {
        r(c, i), t()
      }, i.onerror = i.onabort = () => {
        ++o[c] < 3 && (a[c] = 0, e.push(c)), t()
      }, i.src = n(c)
    })
  }
}

function dyadicOrder(e, t = 0) {
  let n = [],
    r = new Set;
  for (let i = 32; i >= 1; i >>= 1)
    for (let a = 0; a < e; a += i) {
      let e = t + a;
      r.has(e) || (r.add(e), n.push(e))
    }
  return n
}

function makeFilm(e, t, n = 2, r = 0, i = 1) {
  let a = matchMedia(`(max-width: 820px)`).matches ? `/768` : ``,
    o = {
      imgs: [],
      ready: !1,
      loaded: 0
    },
    s = -1,
    c = 0;
  mt.push({
    name: e.replace(`./films/`, ``),
    seq: o,
    count: t
  });
  let l = makeFrameLoaderTask({
    order: dyadicOrder(t),
    count: t,
    url: t => `${e}${a}/f_${String(t+1).padStart(3,`0`)}.webp?r=13`,
    land: (e, t) => {
      o.imgs[e] = t, ++o.loaded > n && (o.ready = !0)
    },
    want: () => s
  });
  return l.hot = () => c && performance.now() - c < 500, registerFeedWindow(r, i, l), o.aim = e => {
    c = performance.now(), e !== s && (s = e, warmDecode(o.imgs, e, t))
  }, o.near = e => {
    o.aim(e);
    for (let n = 0; n < t; n++) {
      let t = o.imgs[e - n],
        r = o.imgs[e + n];
      if (t && t.naturalWidth) return t;
      if (r && r.naturalWidth) return r
    }
    return null
  }, o
}

var Tt = new URLSearchParams(location.search).has(`nowarm`);

function warmDecode(e, t, n) {
  if (!Tt)
    for (let r = 1; r <= 3; r++)
      for (let i of [t + r, t - r]) {
        let t = i >= 0 && i < n && e[i];
        t && t.decode && t.decode().catch(() => {})
      }
}

function makeReel(e, t, n = 1) {
  let r = [{
      name: e,
      count: 121
    }, {
      name: `renaissance`,
      count: 362
    }],
    i = {
      N: r.reduce((e, t) => e + t.count, 0),
      frames: [],
      loaded: 0
    },
    a = -1,
    o = 0;
  mt.push({
    name: `reel`,
    seq: i,
    get count() {
      return i.N
    }
  });
  let s = e => {
    for (let n of r) {
      if (e < n.count) return `./films/model/${n.name}/${t}/f_${String(e+1).padStart(3,`0`)}.webp?r=13`;
      e -= n.count
    }
    return ``
  };

  function c() {
    i.N = r.reduce((e, t) => e + t.count, 0), i.frames = Array(i.N);
    let e = [],
      t = 0;
    for (let n of r) e = e.concat(dyadicOrder(n.count, t)), t += n.count;
    let c = makeFrameLoaderTask({
      order: e,
      count: i.N,
      url: s,
      land: (e, t) => {
        let n = () => {
          i.frames[e] = t, i.loaded++
        };
        t.decode ? t.decode().then(n, n) : n()
      },
      want: () => a
    });
    c.hot = () => o && performance.now() - o < 500, registerFeedWindow(.10010000000000001, n, c)
  }
  return Promise.all(r.map(e => fetch(`./films/model/${e.name}/manifest.json?r=13`).then(e => e.json()).then(n => {
    e.count = n.tiers[t].count
  }).catch(() => {}))).then(c), i.aim = e => {
    o = performance.now(), e !== a && (a = e, warmDecode(i.frames, e, i.N))
  }, i.frameNear = e => {
    i.aim(e);
    for (let t = 0; t < i.N; t++) {
      if (i.frames[e + t]) return i.frames[e + t];
      if (i.frames[e - t]) return i.frames[e - t]
    }
    return null
  }, i
}

export { makeFilm, makeReel };
