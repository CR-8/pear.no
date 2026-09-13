// AUTO-SPLIT from the original bundle (engine region) -- module "constants".
// Renamed identifiers per the recovered naming key; anything not renamed
// keeps its original compact name (verified scope-unique before splitting).
import { clamp } from './easing';

var ee = {
    lit: !1
  },
  S = {
    t0: -1
  },
  C = matchMedia(`(prefers-reduced-motion: reduce)`).matches,
  te = matchMedia(`(pointer: coarse)`).matches,
  w = [{
    id: `signal`,
    src: `./films/signal.mp4`,
    poster: `./films/signal-poster.jpg`,
    origin: [.707, .926],
    pos: [.72, .72, 1],
    bridge: `v28`
  }, {
    id: `colossus`,
    src: `./films/colossus.mp4`,
    poster: `./films/colossus-poster.jpg`,
    origin: [.732, .54],
    pos: [.72, .6, 1],
    bridge: `v51`
  }, {
    id: `reveal`,
    src: `./films/reveal.mp4`,
    poster: `./films/reveal-poster.jpg`,
    origin: [.84, .63],
    pos: [.72, .62, 1],
    bridge: `v61`
  }],
  T = 1200 / 5350,
  E = 600 / 5350,
  ne = 300 / 5350,
  re = 900 / 5350,
  ie = 300 / 5350,
  ae = 600 / 5350,
  oe = 500 / 5350,
  se = 250 / 5350,
  ce = 700 / 5350,
  D = .04,
  O = .76,
  k = {
    at: .775,
    len: .14,
    x: .48,
    y: .57,
    ax: 2.35,
    ay: 1.1,
    noise: .295,
    grain: .125,
    dither: .052,
    hash: .15,
    char: 0,
    charW: .31,
    glowW: .0104,
    glowH: 5,
    split: .4,
    e0: -.16,
    e1: 1.3,
    fx: 1,
    fxAt: 0,
    fxLen: .75,
    zoom: 0,
    zoomPan: .34,
    zoomAt: .25,
    shape: 1,
    dx: 20,
    dy: 75,
    seam: .85,
    seamW: .2,
    seamH: .62,
    seamSoft: .055,
    reelZ: .6,
    zAt: .8,
    zLin: .38
  },
  A = {
    over: .1,
    len: .105,
    w: 6.45,
    h: 15.7,
    hold: .45,
    fade: .55,
    ret: .26,
    retLen: .82,
    e: 0,
    auto: 0,
    lead: -.04,
    ease: 2.25
  },
  le = {
    x: .48,
    y: .57
  },
  ue = {
    driftX: .03,
    driftY: -.018,
    mblur: .012,
    edgeBl: .01,
    edgeAt: .55
  },
  j = {
    zoom: 2,
    at: .59,
    lin: .96,
    spin: .13,
    part: .05,
    lag: .58
  },
  M = () => {
    let e = A.w / 100 * k.ax,
      t = A.h / 100 * k.ay;
    return clamp(((k.shape === 2 ? e + t : k.shape === 0 ? Math.hypot(e, t) : k.shape === 3 ? (e ** 4 + t ** 4) ** .25 : Math.max(e, t)) - k.e0) / Math.max(1e-4, k.e1 - k.e0), 0, 1)
  },
  N = {
    speed: 2.6,
    drift: 1.65,
    jiggle: 2.25,
    scale: 2.6,
    depth: .085,
    breathe: 2.5,
    rake: .35,
    cycle: 1.85,
    pulp: .115,
    fibre: .055,
    tooth: .038,
    fleck: .55,
    lag: .055,
    lagD: .16,
    smear: .3,
    keyX: .255,
    keyY: .5,
    keyS: .46,
    zoom: 1,
    panX: 0,
    panY: 0,
    r: 226,
    g: 208,
    b: 177
  },
  de = {
    noise: .06,
    grain: .17,
    dither: .01,
    hash: .1,
    charW: .055,
    charBack: 1.5,
    char: .62,
    glowW: .01
  },
  fe = 420 / 5350,
  pe = 1.26,
  me = [.4, .3],
  he = .425,
  ge = .72,
  _e = 420 * 1 / 900,
  ve = .45,
  ye = .12,
  be = e => e < .45 ? e / ve * ye : ye + (e - ve) / (1 - ve) * (1 - ye),
  xe = .1,
  Se = .42,
  P = 1.62,
  Ce = .26,
  we = .24,
  F = .62,
  Te = [
    [`What does it cost to work with Pear?`, `The cost`, `Nothing upfront and nothing hourly. We fund the strategy, the software, the content and the link building ourselves. Our payment is an agreed percentage of the new revenue that work generates. If your revenue doesn’t grow, you owe us nothing.`],
    [`What share of the revenue do you take?`, `The share`, `It’s agreed per partnership before we start, and depends on how much building the opportunity needs. It applies only to growth above your existing baseline, never to the revenue you already had.`],
    [`Why revenue share instead of fees?`, `The model`, `Because hourly billing pays agencies for effort, not results. An agency on a retainer earns the same whether you grow or not. We removed the retainer, so the only way for us to get paid is to grow your revenue.`],
    [`How do you measure the revenue you create?`, `Measurement`, `Before we begin, we agree on a baseline from your existing numbers and on how new organic revenue is attributed: analytics, order data or bookings, depending on your business. Both sides see the same dashboard.`],
    [`How long before it pays off?`, `The timeline`, `Search compounds slowly, then quickly. Software and technical fixes land in weeks; rankings and revenue typically move within months. The model means the waiting costs you nothing: we’re the ones financing the ramp.`]
  ],
  Ee = [
    [.26, .534],
    [.709, .354],
    [.259, .907],
    [.718, .815],
    [.27, .236]
  ],
  De = [1920, 1080],
  I = {
    at: .69,
    span: .3,
    stagger: .18,
    each: .34,
    blur: 9.5,
    fill: .1,
    rim: .41,
    bev: 2.5,
    bev2: .35,
    spec: .4,
    sat: 1.1,
    px: -8,
    py: -128,
    scale: .95,
    hold: .35,
    run: .65,
    ease: 0,
    rx: 6,
    ry: 9,
    rz: 1.6,
    rxIn: 9,
    ryIn: 22,
    rzIn: 4,
    persp: 1700,
    ins: .475,
    insB: 6,
    insY: 1,
    pop: 64,
    push: 26,
    bgScale: 1,
    bgX: 0,
    bgY: 50
  },
  Oe = [
    [`name`, `Your name`, `text`, 452, 148, 236, 62, `M12 12a4 4 0 100-8 4 4 0 000 8zM4.5 20a7.5 7.5 0 0115 0`],
    [`email`, `Work email`, `email`, 712, 148, 236, 62, `M2.5 6.5h19v11h-19zM2.5 7l9.5 6.5L21.5 7`],
    [`grow`, `What do you want to grow?`, `area`, 452, 226, 496, 226, `M3 5.5h18v11H9l-5 4v-4H3z`]
  ],
  ke = [
    [.3802, .1662, 2],
    [.6047, .1131, 2],
    [.434, .4782, 1],
    [.3876, .3921, 1],
    [.3392, .5292, 1],
    [.2582, .256, 1],
    [.4235, .3413, 1],
    [.7883, .2255, 1],
    [.5515, .2254, 1],
    [.4043, .2556, 1],
    [.5566, .1053, 1],
    [.6594, .2556, 1],
    [.7957, .1049, 1],
    [.491, .3812, 1],
    [.8971, .2551, 1],
    [.7497, .5906, 1],
    [.5081, .5907, 1]
  ],
  Ae = [
    [.56, .36, .18, .105, -14],
    [.545, .395, .245, .15, 9],
    [.59, .345, .135, .195, -32]
  ],
  je = .62,
  Me = (() => {
    let e = fe * pe,
      t = [
        [D * T, D * T],
        [(O - D) * T, .19149532710280373],
        [(1 - O) * T, (1 - O) * T],
        [E, E],
        [ne, ne],
        [e, e - .008],
        [.12538317757009346, .11438317757009346],
        [ae, ae - .003],
        [oe, oe - .008],
        [se, se],
        [je * ce, je * ce]
      ],
      n = [
        [(.8 - je) * ce, .005],
        [.2 * ce, .012]
      ],
      r = .983 / t.reduce((e, t) => e + t[1], 0),
      i = [
        [0, 0]
      ],
      a = 0,
      o = 0;
    for (let [e, n] of t) o += e, a += n * r, i.push([a, o]);
    for (let [e, t] of n) o += e, a += t, i.push([a, o]);
    return i[i.length - 1] = [1, 1], i
  })();

export { A, Ae, C, Ce, D, De, E, Ee, F, I, M, Me, N, O, Oe, P, S, Se, T, Te, _e, ae, be, ce, de, ee, fe, ge, he, ie, j, je, k, ke, le, me, ne, oe, pe, re, se, te, ue, ve, w, we, xe };
