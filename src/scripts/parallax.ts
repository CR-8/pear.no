// AUTO-SPLIT from the original bundle (engine region) -- module "parallax".
// Renamed identifiers per the recovered naming key; anything not renamed
// keeps its original compact name (verified scope-unique before splitting).

var y = {
    x: 0
  },
  pointer = {
    x: 0,
    y: 0,
    tx: 0,
    ty: 0
  };

function initParallax() {
  addEventListener(`pointermove`, e => {
    pointer.tx = (e.clientX / innerWidth - .5) * 2, pointer.ty = (e.clientY / innerHeight - .5) * 2
  }, {
    passive: !0
  })
}

export { initParallax, pointer, y };
