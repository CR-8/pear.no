// AUTO-SPLIT from the original bundle (engine region) -- module "engine".
// Renamed identifiers per the recovered naming key; anything not renamed
// keeps its original compact name (verified scope-unique before splitting).
import { clamp, inSmoothstep, smootherstep, smoothstep, v } from './easing';
import { initParallax, pointer, y } from './parallax';
import { A, C, D, E, N, O, Se, T, ae, be, ce, de, ee, fe, he, ie, j, k, le, me, ne, oe, pe, re, se, ue, xe } from './constants';
import { Ge, He, Ke, Ue, We, hero, initScroll, roadFromPage, scrollState, st } from './scroll';
import { activateFeedsAt } from './loader';
import { makeFilm, makeReel } from './films';
import { initMainGL } from './gl-main';
import { drawLinesCanvas, initLinesCanvas } from './lines';
import { fn, initOverlay, tickOverlay } from './text';
import { buildFaq, faqExit, tickFaqCarousel } from './faq';
import { initFooterStack, tickContact, tickFly, tickFooterChapter } from './footer';
import { initFin, tickFin, tickSign } from './fin';
import { fadePlate, initPlate, tickPlate } from './plate';
import { initRail, tickRailActive } from './rail';
import { Ni, hudFrame, hudMark } from './hud';

var Wi = !1;

function startEngine() {
  if (Wi) return;
  Wi = !0, `scrollRestoration` in history && (history.scrollRestoration = `manual`), scrollTo(0, 0), scrollState.target = scrollState.current = 0, document.documentElement.style.overflow = `hidden`;
  let e = !1,
    t = document.querySelector(`.boot-note`),
    n = () => {
      e || (e = !0, document.documentElement.style.overflow = ``, t && (t.classList.add(`off`), setTimeout(() => t.remove(), 800)))
    };
  if (setTimeout(n, 4e3), initParallax(), initScroll(), initOverlay(), buildFaq(), initFooterStack(), initFin(), Ni.nofin) {
    let e = document.querySelector(`.fin`);
    e && e.style.setProperty(`display`, `none`, `important`)
  }
  initPlate(), initRail(), initLinesCanvas();
  let r = hero,
    i = document.querySelector(`.src`);
  i.src = r.src;
  // Deliberate difference from the original: `.boot`'s poster was set from
  // the picked hero (`r.poster`) as a React render prop, before first
  // paint. The static build can't know the pick at build time (it's
  // client-random unless ?hero= is given), so Stage.astro bakes a default
  // poster; this corrects it to the actual picked hero, right next to
  // where `.src` video's src was just set the same way above.
  document.querySelector(`.boot`)?.setAttribute(`src`, r.poster);
  let a = () => C ? 1 : 1.06,
    o = (e, t) => {
      if (!e || !t) return 0;
      let n = innerWidth / innerHeight,
        i = e / t;
      if (n >= i) return 0;
      let o = r.pos[innerWidth < 768 ? 0 : innerWidth < 1180 ? 1 : 2];
      return (1 - n / i / a()) * (o - .5)
    },
    s = document.querySelector(`.boot`),
    c = !1,
    l = !s,
    u = 0,
    m = 0,
    g = 0,
    _ = () => {
      try {
        i.duration && i.buffered.length && (u = Math.max(u, Math.min(.92, i.buffered.end(i.buffered.length - 1) / i.duration)))
      } catch {}
    };
  i.addEventListener(`progress`, _), i.addEventListener(`loadedmetadata`, _), i.addEventListener(`canplaythrough`, () => {
    u = 1
  }), i.addEventListener(`playing`, () => {
    u = 1
  });
  let S = () => {
      c || !s || (c = !0, s.classList.add(`off`), s.addEventListener(`transitionend`, () => {
        s.remove(), l = !0
      }, {
        once: !0
      }))
    },
    te = n => {
      if (!s || c) return;
      let r = g ? Math.min(.1, (n - g) / 1e3) : .016;
      g = n, m = Math.min(u, m + r * .55);
      let i = smoothstep(m);
      if (s.style.filter = `blur(${((1-i)*26).toFixed(1)}px) saturate(${(.62+.38*i).toFixed(3)}) brightness(${(.92+.08*i).toFixed(3)})`, s.style.transform = `scale(${(a()*(1.06-.06*i)).toFixed(4)})`, t && !e) {
        let e = Math.round(m * 100);
        t._p !== e && (t._p = e, t.lastElementChild.textContent = e + `%`)
      }
      if (s.naturalWidth) {
        let e = innerHeight * (s.naturalWidth / s.naturalHeight),
          t = innerWidth - e;
        if (t < -1) {
          let n = o(s.naturalWidth, s.naturalHeight),
            r = (t / 2 - n * e) / t * 100;
          s.style.objectPosition = `${r.toFixed(2)}% 50%`
        } else s.style.objectPosition = `50% 50%`
      }
    };
  i.muted = !0, i.setAttribute(`muted`, ``);
  let w = () => {
    let e = i.play();
    e && e.catch(() => {})
  };
  w(), i.addEventListener(`canplay`, w), i.addEventListener(`canplay`, n), i.addEventListener(`playing`, n), addEventListener(`pointerdown`, w, {
    once: !0
  });
  let M = matchMedia(`(max-width: 820px)`).matches ? `768` : `1440`,
    ge = makeReel(r.bridge, M, T + E),
    _e = makeFilm(`./films/plan`, 121, 2, T + E + ne, T + E + ne + re),
    ve = makeFilm(`./films/coda`, 89, 3, T + E, T + E + ne + re),
    ye = makeFilm(`./films/tree`, 121, 2, T + E + ne, 1 - ce - se - oe),
    {
      gl: P,
      canvas: Ce,
      tex: we,
      u: F,
      upload: Te,
      plate: Ee
    } = initMainGL(r),
    De = document.querySelector(`.stage`),
    I = () => Ee.naturalWidth ? Ee.naturalHeight * Ce.clientWidth / (Ee.naturalWidth * Ce.clientHeight) : 0,
    Oe = [`breathe`, `slice`, `halftone`, `displace`, `static`, `ring`],
    ke = (new URLSearchParams(location.search).get(`t`) || ``).toLowerCase(),
    Ae = Oe.indexOf(ke) >= 0 ? Oe.indexOf(ke) : Oe.indexOf(`ring`),
    je = [`none`, `slabs`, `halftone`, `warp`, `tear`, `fine`, `mosaic`, `dither`, `shred`, `ditherblock`],
    Me = {
      overlap: [.4, 1],
      after: [.7, 1]
    },
    Pe = document.querySelector(`.ov`),
    Fe = document.createElement(`canvas`);
  Fe.width = 8, Fe.height = 5;
  let Ie = Fe.getContext(`2d`, {
      willReadFrequently: !0
    }),
    Le = !1,
    Re = 0;

  function ze(e) {
    if (!e) return;
    let t = e.videoWidth || e.naturalWidth,
      n = e.videoHeight || e.naturalHeight;
    if (!(!t || !n)) try {
      innerWidth <= 720 ? Ie.drawImage(e, t * .3, n * .15, t * .4, n * .75, 0, 0, 8, 5) : Ie.drawImage(e, 0, n * .18, t * .58, n * .68, 0, 0, 8, 5);
      let r = Ie.getImageData(0, 0, 8, 5).data,
        i = 0;
      for (let e = 0; e < r.length; e += 4) i += .299 * r[e] + .587 * r[e + 1] + .114 * r[e + 2];
      let a = i / (r.length / 4),
        o = innerWidth <= 720 ? a > (Le ? 150 : 185) : a > (Le ? 132 : 168);
      o !== Le && (Le = o, Pe.classList.toggle(`on-light`, o))
    } catch {}
  }
  let Be = -1,
    Ve = null,
    qe = null,
    Je = null,
    Ye = 0,
    Xe = innerWidth <= 720 ? 1.5 : 2,
    Ze = Xe,
    Qe = 0,
    $e = 0,
    et = 0,
    tt = 0,
    nt = 0,
    rt = 0,
    it = !1,
    ot = performance.now();

  function R(t) {
    if (requestAnimationFrame(R), te(t), !e && scrollState.on && (scrollState.target = scrollState.current = 0), scrollState.on) {
      let e = scrollState.current;
      scrollState.current += (scrollState.target - scrollState.current) * .085, Math.abs(scrollState.target - scrollState.current) < .08 && (scrollState.current = scrollState.target), scrollState.velocity = scrollState.current - e, scrollState.current !== e && (st(scrollState.current), scrollTo(0, scrollState.current))
    } else scrollState.velocity = scrollY - scrollState.current, scrollState.target = scrollY, scrollState.current += (scrollState.target - scrollState.current) * .3, Math.abs(scrollState.target - scrollState.current) < .5 && (scrollState.current = scrollState.target);
    let c = I(),
      u = tt ? t - tt : 16.7;
    tt = t, innerWidth <= 720 && (u > 26 ? (Qe++, $e = 0) : ($e++, Qe = Math.max(0, Qe - 1)), Qe > 150 && Ze > 1 && t - et > 4e3 ? (Ze = Math.max(1, Ze - .25), Qe = 0, et = t) : $e > 900 && Ze < Xe && t - et > 4e3 && (Ze = Math.min(Xe, Ze + .25), $e = 0, et = t));
    let g = Math.min(devicePixelRatio || 1, Ze),
      _ = 1,
      x = Math.round(Ce.clientWidth * g),
      C = Math.round(Ce.clientHeight * g);
    (Ce.width !== x || Ce.height !== C) && (Ce.width = x, Ce.height = C, P.viewport(0, 0, x, C));
    let M = Math.max(1, De.offsetHeight - innerHeight),
      Oe = e => roadFromPage(e, innerWidth <= 720),
      ke = Oe(clamp(scrollState.current / M, 0, 1));
    activateFeedsAt(Oe(clamp(scrollState.target / M, 0, 1))), hudFrame(t, ke), hudMark(), pointer.x += (pointer.tx - pointer.x) * .055, pointer.y += (pointer.ty - pointer.y) * .055;
    let Fe = clamp(ke / T, 0, 1),
      Ie = clamp((ke - T) / E, 0, 1),
      at = clamp((ke - T - E) / ne, 0, 1),
      ct = clamp((ke - T - E - ne) / re, 0, 1),
      lt = re * .25,
      ut = clamp((ke - T - E - ne - re + lt) / (ie + lt), 0, 1),
      dt = clamp((ke - (T + E + ne + re + ie)) / ae, 0, 1);
    nt = smootherstep(clamp(dt / .85, 0, 1));
    let ft = clamp(Fe / D, 0, 1),
      pt = clamp((Fe - D) / (O - D), 0, 1),
      mt = clamp((Fe - k.at) / k.len, 0, 1),
      ht = Ie;
    v.pan = ht, v.raw = ke;
    let gt = ft * ft * (3 - 2 * ft);
    i.readyState >= 2 && (gt < .999 ? (Te(0, we.A, i), P.uniform2f(F.uResA, i.videoWidth, i.videoHeight), i.paused && w(), n(), m > .99 && S()) : i.paused || i.pause()), gt >= .999 && S();
    let _t = Math.round(pt * (ge.N - 1)),
      vt = ge.frameNear(_t);
    vt && vt !== Be && (Be = vt, Te(1, we.B, vt), P.uniform2f(F.uResB, vt.naturalWidth, vt.naturalHeight)), P.uniform2f(F.uRes, x, C);
    let bt = innerWidth <= 720,
      xt = i.videoWidth ? o(i.videoWidth, i.videoHeight) : s && s.naturalWidth ? o(s.naturalWidth, s.naturalHeight) : 0,
      St = e => e / 1179 * x,
      Ct = e => e / 2556 * C,
      wt = smoothstep(clamp((_t + 1 - (He[r.bridge] || 100)) / 8, 0, 1)),
      Tt = 0;
    if (xt && i.videoWidth) {
      let e = x / C,
        t = i.videoWidth / i.videoHeight;
      Tt = xt * x * (t / e)
    }
    P.uniform1f(F.uPanPx, Tt + (St(-20) - Tt) * wt), P.uniform1f(F.uPanY, 0), P.uniform1f(F.uZoom, a() + (1 - a()) * wt), P.uniform1f(F.uZoomE, bt ? We.z : 1), P.uniform1f(F.uPanE, bt ? St(We.x) : 0), P.uniform1f(F.uPanEY, bt ? Ct(We.y) : 0);
    let Et = smoothstep(clamp((ht - Ge.at) / Math.max(.05, Ge.span), 0, 1));
    P.uniform3f(F.uPlateFit, bt ? St(Ge.x) * Et : 0, bt ? Ct(Ge.y) * Et : 0, bt ? 1 + (Ge.z - 1) * Et : 1), P.uniform1f(F.uPanG, bt ? St(Ue.x) * smoothstep(clamp((be(ut) - Ue.from) / Math.max(.001, Ue.ramp), 0, 1)) : 0), hudMark(`film`), drawLinesCanvas(i, ft, t, xt, a(), l ? null : {
      el: s,
      p: smoothstep(m)
    }), hudMark(`mask`), P.uniform1f(F.uT, gt), P.uniform1f(F.uTime, t / 1e3), P.uniform1i(F.uMode, Ae);
    let Dt = Me.overlap,
      Ot = clamp((gt - Dt[0]) / (Dt[1] - Dt[0]), 0, 1);
    P.uniform1i(F.uMode2, je.indexOf(`fine`));
    let kt = clamp((mt - k.fxAt) / Math.max(.001, k.fxLen), 0, 1),
      At = Math.sin(Math.PI * Ot),
      jt = mt > 0 && mt < 1 ? Math.sin(Math.PI * kt) * k.fx : 0;
    P.uniform1f(F.uT2, Math.max(At, jt)), P.uniform1f(F.uBurn, mt), le.x = k.x + k.dx / innerWidth, le.y = k.y + k.dy / innerHeight, P.uniform1f(F.uBurnX, le.x), P.uniform1f(F.uBurnY, le.y), P.uniform2f(F.uBurnAB, k.ax, k.ay), P.uniform4f(F.uBurnFld, k.noise, k.grain, k.dither, k.hash), P.uniform4f(F.uBurnChr, k.char, k.charW, k.glowW, k.glowH), P.uniform1f(F.uSplit, j.part * smoothstep(clamp(mt / j.lag, 0, 1))), P.uniform2f(F.uBurnE, k.e0, k.e1);
    let Mt = k.at + A.over * k.len - A.len * (1 - inSmoothstep(j.at)),
      Nt = clamp((Fe - Mt) / Math.max(1e-4, k.at + k.len - Mt), 0, 1),
      Pt = Nt * (j.lin + (1 - j.lin) * Nt * Nt);
    v.push = Pt, P.uniform1f(F.uReelZ, 1 + j.zoom * Pt), P.uniform2f(F.uDrift, ue.driftX * Pt, ue.driftY * Pt), P.uniform1f(F.uMBlur, ue.mblur * Pt), P.uniform1f(F.uSpin, j.spin * Pt), P.uniform1f(F.uEdgeBl, ue.edgeBl * smoothstep(clamp((mt - ue.edgeAt) / Math.max(.02, 1 - ue.edgeAt), 0, 1))), P.uniform1f(F.uSeam, k.seam * smoothstep(clamp(mt / .55, 0, 1)) * (1 - smoothstep(clamp((mt - .55) / .4, 0, 1)))), P.uniform2f(F.uSeamWH, k.seamW, k.seamH), P.uniform3f(F.uSeamCol, .898, .882, .839), P.uniform1f(F.uSeamSoft, Math.max(.002, k.seamSoft));
    let Ft = k.at + k.zoomAt * k.len,
      It = smoothstep(clamp((Fe - Ft) / Math.max(1e-4, 1 - Ft), 0, 1)),
      Lt = 1 + k.zoom * (1 - smoothstep(mt)) + k.zoomPan * It;
    y.x = innerWidth * (818 / 1328), P.uniform1f(F.uPlateZ, Lt), P.uniform1i(F.uShape, k.shape | 0);
    let Rt = c > 0 ? (1 - 1 / c) * (1 - ht) : 0;
    if (c > 0 && P.uniform1f(F.uPan, Rt), hudMark(`uni`), at <= .2 && tickPlate(ht, c, Rt, t, mt), hudMark(`plate`), at > 0 && rt < .999) {
      let e = Math.min(88, Math.round(at * 88));
      if (ve.aim(e), ve.ready && !Ni.noscrub) {
        let t = ve.near(e);
        t && t !== Ve && _ > 0 && (_--, Ve = t, Te(3, we.E, t), P.uniform2f(F.uResE, t.naturalWidth, t.naturalHeight))
      }
    }
    if (Ye = ve.ready ? Math.min(1, Ye + .055) : 0, P.uniform1f(F.uCoda, smoothstep(clamp(at / xe, 0, 1)) * Ye), P.uniform1f(F.uFlat, smoothstep(clamp((at - Se) / (1 - Se), 0, 1))), v.coda = at, v.end = ct, ct > 0 && ke < .7489719626168224) {
      let e = be(ut),
        t = Math.max(0, Math.min(120, Math.round(e * 120) - Math.round(nt * 36)));
      if (ye.aim(t), ye.ready && !Ni.noscrub) {
        let e = ye.near(t);
        e && e !== qe && _ > 0 && (_--, qe = e, Te(4, we.G, e), P.uniform2f(F.uResG, e.naturalWidth, e.naturalHeight))
      }
    }
    hudMark(`tex`), rt = tickFin(ut, ct, t), hudMark(`fin`), ee.lit = at > .44 && rt < .55, P.uniform3f(F.uPaperC, N.r / 255, N.g / 255, N.b / 255), P.uniform4f(F.uRay1, N.speed, N.drift, N.jiggle, N.scale), P.uniform4f(F.uRay2, N.depth, N.breathe, N.rake, N.cycle), P.uniform4f(F.uPap, N.pulp, N.fibre, N.tooth, N.fleck), P.uniform3f(F.uDrag, N.lag, N.lagD, N.smear);
    let zt = clamp((ke - (T + E + ne)) / fe, 0, 1);
    if (v.plan = zt, ke > .3725233644859813 && rt < .999) {
      let e = clamp((ke - (T + E + ne)) / (fe * pe), 0, 1),
        t = Math.min(120, Math.round(e * 120));
      if (_e.aim(t), _e.ready && !Ni.noscrub) {
        let e = _e.near(t);
        e && e !== Je && _ > 0 && (_--, Je = e, Te(5, we.P, e), P.uniform2f(F.uResP, e.naturalWidth, e.naturalHeight))
      }
    }
    P.uniform4f(F.uPlan2, Je ? smoothstep(clamp(zt / he, 0, 1)) : 0, 0, 0, 0), P.uniform4f(F.uPlan3, N.zoom, N.panX, N.panY, 0), P.uniform4f(F.uPlan, smoothstep(clamp((zt - me[0]) / me[1], 0, 1)), bt ? Ke.x : N.keyX, bt ? Ke.y : N.keyY, bt ? Ke.s : N.keyS), tickFaqCarousel(dt), hudMark(`faq`);
    let Bt = faqExit(dt),
      Vt = clamp((ke - (T + E + ne + re + ie + ae)) / oe, 0, 1);
    tickFly(Vt), tickContact(clamp((ke - (T + E + ne + re + ie + ae + oe)) / se, 0, 1), Vt), tickFooterChapter(clamp((ke - (T + E + ne + re + ie + ae + oe + se)) / ce, 0, 1)), tickSign(ut, Bt), hudMark(`sky`), P.uniform1f(F.uEnd, qe ? rt >= .94 ? 1 : rt : 0), P.uniform1f(F.uScrim, .18 * smoothstep(clamp((Fe - .26) / .08, 0, 1))), P.uniform4f(F.uEndF, de.noise, de.grain, de.dither, de.hash), P.uniform4f(F.uEndC, de.charW, de.charBack, de.char, de.glowW), fadePlate(at), !Ni.nogl && Vt <= .06 && P.drawArrays(P.TRIANGLES, 0, 3), hudMark(`gl`), !it && (scrollState.current > 6 || t - ot > 620) && (it = !0, fn(t, 425)), tickOverlay(Fe, t), tickRailActive(ke), hudMark(`ov`), t - Re > 160 && (Re = t, ee.lit ? Pe.classList.contains(`on-light`) || (Le = !0, Pe.classList.add(`on-light`)) : ze(mt > .5 ? Ee.naturalWidth ? Ee : null : gt < .5 ? i.readyState >= 2 ? i : null : vt))
  }
  requestAnimationFrame(R)
}

// Originally invoked from a React `useEffect(() => startEngine(), [])` on
// mount. There is no React root anymore -- the markup is already in the
// static HTML by the time this (deferred, type="module") script runs, so
// call it directly.
startEngine();
