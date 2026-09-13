// AUTO-SPLIT from the original bundle (engine region) -- module "rail".
// Renamed identifiers per the recovered naming key; anything not renamed
// keeps its original compact name (verified scope-unique before splitting).
import { clamp } from './easing';
import { pageRange, scrollState, st } from './scroll';

var Di = [];

function initRail() {
  Di = [...document.querySelectorAll(`.rail a`)].map(e => ({
    el: e,
    at: parseFloat(e.dataset.at || `0`)
  }));
  for (let e of Di) e.el.addEventListener(`click`, t => {
    t.preventDefault(), scrollState.target = clamp(e.at * pageRange(), 0, pageRange()), scrollState.on || (st(scrollState.target), scrollTo(0, scrollState.target), scrollState.current = scrollState.target)
  })
}

function tickRailActive(e) {
  let t = -1;
  for (let n = 0; n < Di.length; n++) e >= Di[n].at - .002 && (t = n);
  for (let e = 0; e < Di.length; e++) {
    let n = e === t;
    n !== Di[e].on && (Di[e].on = n, Di[e].el.classList.toggle(`on`, n))
  }
}

export { initRail, tickRailActive };
