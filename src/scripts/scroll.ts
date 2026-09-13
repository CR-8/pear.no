// AUTO-SPLIT from the original bundle (engine region) -- module "scroll".
// Renamed identifiers per the recovered naming key; anything not renamed
// keeps its original compact name (verified scope-unique before splitting).
import { clamp } from './easing';
import { C, Me, ce, se, te, w } from './constants';

function roadFromPage(e, t) {
  if (!t) return e;
  for (let t = 1; t < Me.length; t++)
    if (e <= Me[t][0]) return Me[t - 1][1] + (e - Me[t - 1][0]) * (Me[t][1] - Me[t - 1][1]) / (Me[t][0] - Me[t - 1][0]);
  return 1
}

function pageFromRoad(e, t) {
  if (!t) return e;
  for (let t = 1; t < Me.length; t++)
    if (e <= Me[t][1]) return Me[t - 1][0] + (e - Me[t - 1][1]) * (Me[t][0] - Me[t - 1][0]) / (Me[t][1] - Me[t - 1][1]);
  return 1
}

var Fe = {
    mode: 1,
    at: .74,
    span: .18,
    noise: 74,
    scaleB: 1.018,
    radius: .9,
    width: .35
  },
  Ie = [0, 1, 4, 9, 10],
  Le = [.955, .757, .714, .533, .515],
  Re = [`At your service`, `Custom software`, `Search and links`, `Revenue share`],
  ze = 23.7,
  Be = 85.6,
  Ve = 1450,
  He = {
    v28: 100,
    v51: 85,
    v61: 90
  },
  Ue = {
    x: 0,
    from: 0,
    ramp: .12
  },
  We = {
    x: 0,
    y: 0,
    z: 1
  },
  Ge = {
    x: 5,
    y: -440,
    z: 2.5,
    at: 0,
    span: 1
  },
  Ke = {
    x: .5,
    y: .735,
    s: .78,
    join: .655
  },
  qe = 1.45,
  Je = .718,
  Ye = {
    x: 20,
    from: 0,
    span: 1
  },
  Xe = {
    at: .12,
    span: .6
  },
  Ze = {
    w: .905,
    x: 0,
    y: 0
  },
  Qe = {
    k: 3
  },
  $e = [0, .3, .6],
  et = 1328,
  tt = 3515,
  nt = [0, 1180, 2050],
  rt = tt / 34,
  it = (new URLSearchParams(location.search).get(`hero`) || ``).toLowerCase(),
  hero = w.find(e => e.id === it) || w[Math.floor(Math.random() * w.length)],
  scrollState = {
    target: scrollY,
    current: scrollY,
    velocity: 0,
    on: !C && !te
  },
  ot = -1,
  st = e => {
    ot = e
  },
  pageRange = () => document.documentElement.scrollHeight - innerHeight;

function initScroll() {
  initMenu(), initApplyLinks(), scrollState.on && (addEventListener(`wheel`, e => {
    if (e.ctrlKey) return;
    e.preventDefault();
    let t = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? innerHeight : 1;
    scrollState.target = clamp(scrollState.target + e.deltaY * t, 0, pageRange())
  }, {
    passive: !1
  }), addEventListener(`keydown`, e => {
    let t = e.target;
    if (t && (t.isContentEditable || t.tagName === `INPUT` || t.tagName === `TEXTAREA` || t.tagName === `SELECT`)) return;
    let n = {
      ArrowDown: 90,
      ArrowUp: -90,
      PageDown: innerHeight * .9,
      PageUp: -innerHeight * .9,
      " ": innerHeight * .9,
      Home: -1e7,
      End: 1e7
    }[e.key];
    n !== void 0 && (e.preventDefault(), scrollState.target = clamp(scrollState.target + n, 0, pageRange()))
  }), addEventListener(`scroll`, () => {
    Math.abs(scrollY - ot) > 2 && (scrollState.target = scrollState.current = scrollY)
  }, {
    passive: !0
  }))
}

function initApplyLinks() {
  for (let e of document.querySelectorAll(`.ov .apply, .ov .cta`)) e.addEventListener(`click`, e => {
    e.preventDefault();
    let t = clamp(pageFromRoad(1 - ce - se * .7, innerWidth <= 720) * pageRange(), 0, pageRange());
    st(t), scrollTo(0, t), scrollState.target = scrollState.current = t
  })
}

function initMenu() {
  let e = document.querySelector(`.ov .menu`),
    t = document.getElementById(`nvm`);
  if (!e || !t) return;
  let n = !1;

  function r(r) {
    n = r, document.body.classList.toggle(`nav-open`, r), t.setAttribute(`aria-hidden`, r ? `false` : `true`), e.setAttribute(`aria-expanded`, r ? `true` : `false`), e.setAttribute(`aria-label`, r ? `Close` : `Menu`), t.style.pointerEvents = r ? `auto` : `none`, document.documentElement.style.overflow = r ? `hidden` : ``, r && (scrollState.target = scrollState.current);
    let i = document.querySelector(`.nvs`),
      a = (e, t, n) => e && e.style.setProperty(t, n, `important`);
    a(i, `opacity`, r ? `1` : `0`), a(t, `opacity`, r ? `1` : `0`), a(t, `visibility`, r ? `visible` : `hidden`), t.querySelectorAll(`a`).forEach((e, t) => {
      e.style.transitionDelay = r ? (.05 + t * .07).toFixed(2) + `s` : `0s`, a(e, `opacity`, r ? `1` : `0`)
    })
  }
  r(!1), e.addEventListener(`click`, e => {
    e.preventDefault(), r(!n)
  }), addEventListener(`keydown`, e => {
    e.key === `Escape` && n ? r(!1) : n && /^(Arrow|Page|Home|End|Space| )/.test(e.key) && e.preventDefault()
  });
  let i = e => {
    n && (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), scrollState.target = scrollState.current)
  };
  addEventListener(`wheel`, i, {
    passive: !1,
    capture: !0
  }), addEventListener(`touchmove`, i, {
    passive: !1,
    capture: !0
  }), t.addEventListener(`click`, e => {
    e.target === t && r(!1)
  });
  for (let e of t.querySelectorAll(`a`)) e.addEventListener(`click`, t => {
    t.preventDefault(), scrollState.target = clamp(parseFloat(e.dataset.at || `0`) * pageRange(), 0, pageRange()), scrollState.on || (st(scrollState.target), scrollTo(0, scrollState.target), scrollState.current = scrollState.target), r(!1)
  })
}

export { $e, Be, Fe, Ge, He, Ie, Je, Ke, Le, Qe, Re, Ue, Ve, We, Xe, Ye, Ze, et, hero, initScroll, nt, pageRange, qe, roadFromPage, rt, scrollState, st, tt, ze };
