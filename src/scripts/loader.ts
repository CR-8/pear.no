// AUTO-SPLIT from the original bundle (engine region) -- module "loader".
// Renamed identifiers per the recovered naming key; anything not renamed
// keeps its original compact name (verified scope-unique before splitting).

var dt = 8,
  ft = [],
  pt = 0,
  mt = [];

function enqueueFeed(e) {
  ft.push(e), pumpLoaderQueue()
}

function pumpLoaderQueue() {
  for (let e = 0; pt < dt && e < ft.length;) {
    let t = ft.shift(),
      n = t.hot && t.hot() ? 2 : 1,
      r = 0;
    for (let e = 0; e < n && pt < dt; e++) {
      let e = t();
      if (!e) break;
      r++, pt++, e(() => {
        pt--, pumpLoaderQueue()
      })
    }
    ft.push(t), r ? e = 0 : e++
  }
}

var _t = .1,
  vt = [];

function activateFeedsAt(e) {
  for (let t = vt.length - 1; t >= 0; t--) e >= vt[t].from && e <= vt[t].to && enqueueFeed(vt.splice(t, 1)[0].feed)
}

function registerFeedWindow(e, t, n) {
  vt.push({
    from: Math.max(0, e - _t),
    to: Math.min(1, t) + _t,
    feed: n
  })
}

var xt = 24;

export { activateFeedsAt, mt, registerFeedWindow, xt };
