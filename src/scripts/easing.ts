// AUTO-SPLIT from the original bundle (engine region) -- module "easing".
// Renamed identifiers per the recovered naming key; anything not renamed
// keeps its original compact name (verified scope-unique before splitting).

var   clamp = (e, t, n) => Math.min(Math.max(e, t), n),
  smoothstep = e => e * e * (3 - 2 * e),
  smootherstep = e => e * e * e * (e * (e * 6 - 15) + 10),
  outQuart = e => 1 - (1 - e) ** 4,
  inSmoothstep = e => .5 - Math.sin(Math.asin(1 - 2 * clamp(e, 0, 1)) / 3),
  gain = (e, t) => {
    if (t <= 1.001) return e;
    let n = e ** +t;
    return n / (n + (1 - e) ** t)
  },
  _ = [{
    n: `smooth`,
    f: e => e * e * (3 - 2 * e)
  }, {
    n: `smoother`,
    f: e => e * e * e * (e * (e * 6 - 15) + 10)
  }, {
    n: `out-quart`,
    f: e => 1 - (1 - e) ** 4
  }, {
    n: `out-expo`,
    f: e => e >= 1 ? 1 : 1 - 2 ** (-9 * e)
  }, {
    n: `out-back`,
    f: e => {
      let t = 1 - e;
      return 1 - t * t * t * (2.7 * t - 1.7)
    }
  }, {
    n: `in-out`,
    f: e => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2
  }, {
    n: `linear`,
    f: e => e
  }],
  v = {
    plan: 0,
    p: 0,
    g: 0,
    off: 0,
    lockEnd: 0,
    push: 0,
    burn: 0,
    coda: 0,
    end: 0,
    ink: 0,
    pan: 0
  };

window.__READOUT = v;

export { _, clamp, gain, inSmoothstep, outQuart, smootherstep, smoothstep, v };
