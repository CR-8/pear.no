// AUTO-SPLIT from the original bundle (engine region) -- module "footer".
// Renamed identifiers per the recovered naming key; anything not renamed
// keeps its original compact name (verified scope-unique before splitting).
import { _, clamp, outQuart, smoothstep } from './easing';
import { pointer } from './parallax';
import { Ae, I, Oe, ce, je, ke, oe, se } from './constants';
import { Fe, Ie, Le, Qe, Xe, Ye, Ze } from './scroll';
import { makeFilm } from './films';
import { At, jt } from './gl-main';
import { wireSubmit } from './contact';

var Nn, Pn, Fn, In = -1,
  Ln = null,
  Rn = 0,
  zn, Bn, Vn, Hn, Un, Wn, Gn = [],
  Kn = [],
  qn = -1,
  Jn = [],
  Yn = 0,
  Xn = [0, 0],
  Zn, Qn = !1,
  $n = !1,
  er = !1,
  tr, nr, rr, ir, ar, or, sr, cr, lr = -1,
  ur = null;

function dr(e, t) {
  (e.width !== t.naturalWidth || e.height !== t.naturalHeight) && (e.width = t.naturalWidth, e.height = t.naturalHeight), e.getContext(`2d`).drawImage(t, 0, 0)
}

var fr, pr = null,
  mr = null,
  hr = -1,
  gr = !1,
  _r = -1,
  vr = 0,
  yr = 0,
  br = !1,
  xr = null,
  Sr = [];

function Cr(e) {
  let t = e || 1,
    n = () => (t = t * 1103515245 + 12345 & 2147483647) / 2147483647;
  Sr = [];
  for (let e = 0; e < 4; e++) {
    let e = n() * Math.PI * 2,
      t = .35 + n() * .9;
    Sr.push({
      d: +(n() * .34).toFixed(3),
      r: +(.42 + n() * .58).toFixed(3),
      e: Math.floor(n() * _.length),
      ax: +(Math.cos(e) * t).toFixed(3),
      ay: +(Math.sin(e) * t * .6).toFixed(3),
      rz: +((n() - .5) * 7).toFixed(2)
    })
  }
}

function initFooterStack() {
  Cr(0), Nn = document.querySelector(`.fly`), Pn = document.querySelector(`.fly-w`), Fn = makeFilm(`./films/flysky`, 121, 2, 1 - ce - se - oe, 1), sr = document.querySelector(`.trans`), cr = makeFilm(`./films/trans`, 121, 2, 1 - ce, 1), Zn = document.querySelector(`.foot`), Zn.muted = !0, Zn.setAttribute(`muted`, ``);
  let e = () => {
    if (er) return;
    let t = document.documentElement.scrollHeight - innerHeight;
    if (t < 1 || scrollY / t < .5) return;
    er = !0, removeEventListener(`touchstart`, e);
    let n = Zn.play();
    n && n.then && n.then(() => {
      Qn || Zn.pause()
    }).catch(() => {})
  };
  if (addEventListener(`touchstart`, e, {
      passive: !0
    }), fr = document.querySelector(`.ftx`), tr = document.querySelector(`.ft`), nr = tr && tr.querySelector(`.ft-in`), rr = tr ? [...tr.querySelectorAll(`.ft-r`)] : [], ir = tr && tr.querySelector(`.ft-box rect`), ar = tr ? [...tr.querySelectorAll(`.ft-st,.ft-mark,.ft-tag,.ft-meta`)] : [], or = tr ? [...tr.querySelectorAll(`.ft-tag .ln i`)] : [], ir && (ir.style.strokeDasharray = 2 * 1442), zn = document.querySelector(`.cf`), Bn = document.querySelector(`.cf-lead`), Vn = zn && zn.querySelector(`.cf-in`), Hn = document.querySelector(`.cf-orb`), Un = Hn ? [...Hn.querySelectorAll(`ellipse`)] : [], Wn = document.querySelector(`.cf-gl`), Wn)
    for (let e = 0; e < ke.length; e++) {
      let t = document.createElement(`i`);
      t.style.setProperty(`--dur`, (1.9 + e % 7 * .42).toFixed(2) + `s`), t.style.setProperty(`--dl`, (-(e * .53) % 3.1).toFixed(2) + `s`), Wn.appendChild(t), Gn.push(t)
    }
  buildContactForm()
}

function buildContactForm() {
  if (!Vn) return;
  for (let e = 0; e < Oe.length; e++) {
    let [t, n, r, i, a, o, s, c] = Oe[e], l = document.createElement(`div`);
    l.className = r === `area` ? `cf-f` : `cf-f pill`, l.style.cssText = `left:${i}px;top:${a}px;width:${o}px;height:${s}px`, l.innerHTML = `<span class="rim"></span><span class="rim2"></span><span class="ic"><svg viewBox="0 0 24 24"><path d="${c}"/></svg></span>${r===`area`?`<textarea data-k="${t}" rows="4" placeholder="${n}"></textarea>`:`<input data-k="${t}" type="${r}" placeholder="${n}">`}`;
    let u = l.querySelector(`input,textarea`);
    l.addEventListener(`click`, () => u.focus()), l.addEventListener(`pointerenter`, () => {
      qn = e
    }), l.addEventListener(`pointerleave`, () => {
      qn === e && (qn = -1)
    }), Vn.appendChild(l), Kn.push(l)
  }
  let e = document.createElement(`button`);
  e.className = `cf-cta`, e.type = `button`, e.textContent = `Send the application`, e.style.cssText = `left:452px;top:486px;width:262px;height:40px`, e.addEventListener(`pointerenter`, () => {
    qn = Kn.length - 1
  }), e.addEventListener(`pointerleave`, () => {
    qn === Kn.length - 1 && (qn = -1)
  }), Vn.appendChild(e), Kn.push(e), Vn.addEventListener(`pointerdown`, e => {
    if (!(e.target.closest && e.target.closest(`input,textarea,button`)))
      for (let t of Kn) {
        let n = t.getBoundingClientRect();
        if (e.clientX < n.left || e.clientX > n.right || e.clientY < n.top || e.clientY > n.bottom) continue;
        let r = t.querySelector && t.querySelector(`input,textarea`);
        r ? (e.preventDefault(), r.focus()) : t.click && t.click();
        return
      }
  }), wireSubmit()
}

function Er(e, t) {
  let n = innerWidth,
    r = innerHeight,
    i = t === void 0 ? I.bgScale : t,
    a = e === void 0 ? innerWidth <= 720 ? 50 + (Ye.x - 50) * clamp((Rn - Ye.from) / Math.max(.02, Ye.span), 0, 1) : 50 + (I.bgX - 50) * smoothstep(clamp((Rn - .26) / .34, 0, 1)) : e,
    o = Math.max(n / 1280, r / 720),
    s = 1280 * o * i,
    c = 720 * o * i;
  return {
    dw: s,
    dh: c,
    ox: (n - s) * (a / 100),
    oy: (r - c) * (I.bgY / 100)
  }
}

function tickFly(e) {
  if (!Nn) return;
  if (Rn = e, e > 1e-4 && !er && (er = !0, Zn.load()), e <= 1e-4) {
    Nn.style.opacity = `0`, In = -1;
    return
  } {
    let t = Math.min(120, Math.round(e * 120));
    if (Fn.aim(t), Fn.ready && t !== In) {
      let e = Fn.near(t);
      e && (e !== Ln && (dr(Nn, e), Ln = e), In = t)
    }
  }
  Nn.style.opacity = smoothstep(clamp(e / .05, 0, 1)).toFixed(3), Pn.style.opacity = `0`;
  let t = Er();
  Nn.style.width = t.dw.toFixed(1) + `px`, Nn.style.height = t.dh.toFixed(1) + `px`, Nn.style.left = t.ox.toFixed(1) + `px`, Nn.style.top = t.oy.toFixed(1) + `px`
}

var Or = ``,
  kr = [];

function tickOrb(e) {
  if (!Hn || (Hn.style.opacity = e.toFixed(3), e < .002)) return;
  let t = Er(),
    n = `${e.toFixed(3)}|${t.ox.toFixed(1)}|${t.oy.toFixed(1)}|${t.dw.toFixed(1)}`,
    r = n !== Or;
  Or = n;
  for (let n = 0; n < Un.length; n++) {
    let [i, a, o, s, c] = Ae[n], l = Un[n], u = t.ox + i * t.dw, p = t.oy + a * t.dh, m = o * t.dw, h = s * t.dh;
    if (r) {
      l.setAttribute(`cx`, u.toFixed(1)), l.setAttribute(`cy`, p.toFixed(1)), l.setAttribute(`rx`, m.toFixed(1)), l.setAttribute(`ry`, h.toFixed(1));
      let t = (m - h) ** 2 / (m + h) ** 2,
        r = Math.PI * (m + h) * (1 + 3 * t / (10 + Math.sqrt(4 - 3 * t))),
        i = smoothstep(clamp((e - n * .16) / .52, 0, 1));
      l.style.strokeDasharray = `1.4 7`, l.style.strokeDashoffset = ((1 - i) * r).toFixed(1), l.style.opacity = i.toFixed(3), l.style.setProperty(`--adur`, (7.5 + n * 2.6).toFixed(1) + `s`), l.style.setProperty(`--adl`, (-(n * 3.1)).toFixed(1) + `s`)
    }
    let g = c + performance.now() / 1e3 * (n % 2 ? -.6 : .9),
      _ = (Math.round(g / .2) * .2).toFixed(1);
    (kr[n] !== _ || r) && (kr[n] = _, l.setAttribute(`transform`, `rotate(${_} ${u.toFixed(1)} ${p.toFixed(1)})`))
  }
}

var jr = ``;

function tickGlints(e) {
  if (!Wn || (Wn.style.opacity = e.toFixed(3), e < .002)) return;
  let t = Er(),
    n = `${t.ox.toFixed(1)}|${t.oy.toFixed(1)}|${t.dw.toFixed(1)}`;
  if (n !== jr) {
    jr = n;
    for (let e = 0; e < Gn.length; e++) {
      let [n, r, i] = ke[e], a = (i === 2 ? 78 : 46) * I.bgScale, o = Gn[e];
      o.style.left = (t.ox + n * t.dw).toFixed(1) + `px`, o.style.top = (t.oy + r * t.dh).toFixed(1) + `px`, o.style.width = a.toFixed(1) + `px`, o.style.height = a.toFixed(1) + `px`
    }
  }
}

var Nr = !1,
  Pr = null;

function tickContact(e, t) {
  if (!zn) return;
  if (e <= 5e-4 && Yn <= 5e-4 && t <= I.at) {
    if (Nr) return;
    Nr = !0
  } else Nr = !1;
  tickGlints(smoothstep(clamp((t - .9) / .1, 0, 1))), tickOrb(smoothstep(clamp((t - .8) / .2, 0, 1)));
  let n = clamp((t - I.at) / I.span, 0, 1),
    r = smoothstep(n);
  if (Bn) {
    let e = clamp((n - I.hold - .1) / .46, 0, 1),
      t = e * e * e * (e * (e * 6 - 15) + 10);
    Bn.style.opacity = t.toFixed(3), Bn.style.transform = `translateY(${((1-t)*11).toFixed(1)}px)`
  }
  zn.style.opacity = r > .001 || e > .001 ? `1` : `0`; {
    let t = e > .001 || n > .995;
    zn.classList.toggle(`live`, t), zn.inert = !t, zn.setAttribute(`aria-hidden`, String(!t))
  }
  zn.style.perspective = I.persp + `px`;
  let i = innerWidth,
    a = innerHeight,
    o = i <= 720,
    s = o ? Math.min(i * Ze.w / 496, (a - 240) / 378) / I.scale : Math.min(i / 1180, a / 900),
    c = o ? Ze.x - 210 * s * I.scale : I.px,
    l = s * I.scale,
    u = o ? 60 - a / 2 + 232 * l + Ze.y : I.py,
    p = Math.max(smoothstep(clamp((e - .06) / .4, 0, 1)), r),
    m = (1 - p) * I.ryIn + I.ry + pointer.x * 5.5,
    h = (1 - p) * I.rxIn + I.rx - pointer.y * 4,
    g = (1 - p) * I.rzIn + I.rz,
    v = Er(),
    y = v.ox + .3715 * v.dw,
    x = v.oy + .148 * v.dh,
    ee = clamp((n - I.hold) / Math.max(.02, I.run), 0, 1),
    S = 1 - _[I.ease | 0].f(ee),
    C = Yn > 5e-4 ? `translate3d(0,${(-Yn*innerHeight*1.22).toFixed(1)}px,0) scale(${(1+Yn*.1).toFixed(4)}) ` : ``,
    te = (e, t) => C + `translate(${(c+e+pointer.x*16).toFixed(1)}px, ${(u+t+(1-p)*90+pointer.y*12).toFixed(1)}px) scale(${(s*I.scale).toFixed(4)}) rotateX(${h.toFixed(2)}deg) rotateY(${m.toFixed(2)}deg) rotateZ(${g.toFixed(2)}deg)`;
  !Pr && Kn[0] && (Pr = Kn[0].querySelector(`.ic`));
  let w = S > .002 && Pr;
  if (w) {
    Vn.style.transform = te(0, 0);
    let e = w.getBoundingClientRect();
    Xn = [y - (e.left + e.width / 2), x - (e.top + e.height / 2)]
  }
  Vn.style.transform = te(Xn[0] * S, Xn[1] * S);
  for (let e = 0; e < Kn.length; e++) {
    let t = Sr[e % Sr.length],
      n = smoothstep(clamp((r - e * I.stagger) / I.each, 0, 1));
    Kn[e].style.opacity = n.toFixed(3);
    let i = qn < 0 ? 0 : e === qn ? I.pop : -I.push;
    Jn[e] = (Jn[e] || 0) + (i - (Jn[e] || 0)) * .12;
    let a = e === qn ? 1 : qn < 0 ? 0 : -1,
      o = (Kn.length - 1 - e) * 7,
      s = clamp((ee - t.d) / Math.max(.05, t.r), 0, 1),
      c = 1 - _[t.e].f(s),
      l = (t.ax * c * 90).toFixed(1),
      u = (t.ay * c * 90).toFixed(1);
    Kn[e].style.transform = `translate3d(${l}px, ${u}px, ${((1-n)*-180+o+Jn[e]).toFixed(1)}px) rotateZ(${(t.rz*c).toFixed(2)}deg)`, Kn[e].style.filter = a < 0 && innerWidth > 720 ? `brightness(${(1-.1*(-Jn[e]/Math.max(1,I.push))).toFixed(3)})` : ``;
    let p = Kn[e].style;
    p.setProperty(`--blur`, I.blur + `px`), p.setProperty(`--fill`, I.fill), p.setProperty(`--rim`, I.rim), p.setProperty(`--bev`, I.bev + `px`), p.setProperty(`--bev2`, I.bev2), p.setProperty(`--spec`, I.spec), p.setProperty(`--sat`, I.sat), p.setProperty(`--ins`, I.ins), p.setProperty(`--insB`, I.insB + `px`), p.setProperty(`--insY`, I.insY + `px`)
  }
}

function initFtxGL() {
  let e = fr.getContext(`webgl`);
  if (!e) return null;
  let t = (t, n) => {
      let r = e.createShader(t);
      return e.shaderSource(r, n), e.compileShader(r), e.getShaderParameter(r, e.COMPILE_STATUS) ? r : (console.warn(e.getShaderInfoLog(r)), null)
    },
    n = t(e.VERTEX_SHADER, At),
    r = t(e.FRAGMENT_SHADER, jt);
  if (!n || !r) return null;
  let i = e.createProgram();
  e.attachShader(i, n), e.attachShader(i, r), e.linkProgram(i), e.useProgram(i);
  let a = e.createBuffer();
  e.bindBuffer(e.ARRAY_BUFFER, a), e.bufferData(e.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), e.STATIC_DRAW);
  let o = e.getAttribLocation(i, `a`);
  e.enableVertexAttribArray(o), e.vertexAttribPointer(o, 2, e.FLOAT, !1, 0, 0), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !0);
  let s = t => {
      let n = e.createTexture();
      return e.activeTexture(e.TEXTURE0 + t), e.bindTexture(e.TEXTURE_2D, n), [
        [e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE],
        [e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE],
        [e.TEXTURE_MIN_FILTER, e.LINEAR],
        [e.TEXTURE_MAG_FILTER, e.LINEAR]
      ].forEach(([t, n]) => e.texParameteri(e.TEXTURE_2D, t, n)), n
    },
    c = s(0),
    l = s(1),
    u = new Uint8Array([11, 10, 9, 255]);
  for (let [t, n] of [
      [0, c],
      [1, l]
    ]) e.activeTexture(e.TEXTURE0 + t), e.bindTexture(e.TEXTURE_2D, n), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, u);
  let d = {};
  for (let t of [`progress`, `grade`, `scaleB`, `mode`, `radius`, `width`, `intensity`, `time`, `res`, `img`]) d[t] = e.getUniformLocation(i, t);
  let f = t => e.getUniformLocation(i, t);
  return e.uniform1i(f(`t1`), 0), e.uniform1i(f(`t2`), 1), e.uniform1f(d.scaleB, Fe.scaleB), e.uniform1f(d.mode, Fe.mode), e.uniform1f(d.radius, Fe.radius), e.uniform1f(d.width, Fe.width), e.uniform1f(d.intensity, Fe.noise), e.uniform2f(d.img, 1920, 1080), {
    g: e,
    loc: d,
    tA: c,
    tB: l
  }
}

var Lr = e => {
  let t = 1;
  for (; t < Ie.length - 1 && e > Ie[t];) t++;
  let n = (e - Ie[t - 1]) / (Ie[t] - Ie[t - 1]);
  return Le[t - 1] + (Le[t] - Le[t - 1]) * clamp(n, 0, 1)
};

function tickFtxGL(e, t) {
  if (pr ||= initFtxGL(), !pr) return 0;
  let n = clamp((e - Fe.at) / Fe.span, 0, 1);
  if (n <= 5e-4) return fr.style.opacity = `0`, br = !1, 0;
  fr.style.opacity = `1`, br = !0;
  let {
    g: r,
    loc: i
  } = pr, a = Math.min(devicePixelRatio, innerWidth <= 720 ? 1.5 : 2), o = Math.round(innerWidth * a), s = Math.round(innerHeight * a);
  (fr.width !== o || fr.height !== s) && (fr.width = o, fr.height = s), r.viewport(0, 0, fr.width, fr.height);
  let c = !1;
  if (t && t.complete && t.naturalWidth && t !== mr && (mr = t, c = !0, r.activeTexture(r.TEXTURE0), r.bindTexture(r.TEXTURE_2D, pr.tA), gr ? r.texSubImage2D(r.TEXTURE_2D, 0, 0, 0, r.RGBA, r.UNSIGNED_BYTE, t) : (r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, r.RGBA, r.UNSIGNED_BYTE, t), gr = !0)), Zn.readyState >= 2 && Zn.currentTime !== hr) {
    let e = hr < 0;
    hr = Zn.currentTime, c = !0, r.activeTexture(r.TEXTURE1), r.bindTexture(r.TEXTURE_2D, pr.tB), e ? r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, r.RGBA, r.UNSIGNED_BYTE, Zn) : r.texSubImage2D(r.TEXTURE_2D, 0, 0, 0, r.RGBA, r.UNSIGNED_BYTE, Zn)
  }
  if (n !== _r && (_r = n, c = !0), (fr.width !== vr || fr.height !== yr) && (vr = fr.width, yr = fr.height, c = !0), !c) return 1;
  let l = clamp(Zn.currentTime || 0, 0, 10);
  return r.uniform1f(i.progress, n), r.uniform1f(i.grade, .955 / Lr(l)), r.uniform1f(i.time, performance.now() / 1e3), r.uniform2f(i.res, fr.width, fr.height), r.drawArrays(r.TRIANGLES, 0, 3), 1
}

function tickFooterPanel(e) {
  if (!tr || (tr.style.opacity = e > .001 ? `1` : `0`, document.body.classList.toggle(`ft-on`, e > .02), e < .001)) return;
  let t = Math.min(innerWidth / 1920, innerHeight / 1080) * (innerWidth <= 720 ? Qe.k : 1);
  nr.style.transform = `scale(${t.toFixed(5)})`;
  for (let t = 0; t < rr.length; t++) {
    let n = smoothstep(clamp((e - t * .04) / .26, 0, 1));
    rr[t].style.transform = rr[t].classList.contains(`h`) ? `scaleX(${n.toFixed(3)})` : `scaleY(${n.toFixed(3)})`
  }
  let n = smoothstep(clamp((e - .1) / .42, 0, 1));
  ir.style.strokeDashoffset = (2884 * (1 - n)).toFixed(1);
  for (let t = 0; t < ar.length; t++) {
    let n = smoothstep(clamp((e - .14 - t * .045) / .26, 0, 1));
    ar[t].style.opacity = n.toFixed(3)
  }
  for (let t = 0; t < or.length; t++) {
    let n = outQuart(clamp((e - .2 - t * .075) / .34, 0, 1));
    or[t].style.transform = `translateY(${((1-n)*120).toFixed(1)}%)`
  }
}

function tickFooterChapter(e) {
  if (!Zn) return;
  if (!(e > 5e-4)) {
    tickFooterPanel(0), sr.style.opacity = `0`, Zn.style.opacity = `0`, fr.style.opacity = `0`, $n && ($n = !1, Yn = 0, zn && (zn.style.transform = ``, zn.style.filter = ``, zn.style.opacity = ``, zn.style.zIndex = ``), Vn && (Vn.style.filter = ``), Bn && (Bn.style.opacity = ``)), Qn && (Qn = !1, Zn.pause()), lr = -1;
    return
  }
  if (Qn = !0, Zn.paused && Zn.readyState >= 2) {
    let e = Zn.play();
    e && e.catch && e.catch(() => {})
  }
  let t = smoothstep(clamp(e / .34, 0, 1));
  $n = !0, Yn = t, zn && (zn.style.zIndex = `7`, zn.style.transform = ``, zn.style.filter = ``, zn.style.opacity = t > .99 ? `0` : `1`), Vn && (Vn.style.filter = t > .02 ? `blur(${(t*7).toFixed(2)}px)` : ``), Bn && (Bn.style.opacity = (1 - smoothstep(clamp(e / .28, 0, 1))).toFixed(3));
  let n = clamp(e / je, 0, 1); {
    let e = Math.min(120, Math.round(n * 120));
    if (cr.aim(e), cr.ready && e !== lr) {
      let t = cr.near(e);
      t && (t !== ur && (ur = t, br || (dr(sr, t), xr = t)), lr = e)
    }
  }
  let r = innerWidth <= 720,
    i = r ? 50 + (Ye.x - 50) * clamp((1 - Ye.from) / Math.max(.02, Ye.span), 0, 1) : I.bgX,
    a = smoothstep(clamp((n - (r ? Xe.at : .12)) / Math.max(.02, r ? Xe.span : .6), 0, 1)),
    o = Er(i + (50 - i) * a, I.bgScale + (1 - I.bgScale) * a);
  sr.style.width = o.dw.toFixed(1) + `px`, sr.style.height = o.dh.toFixed(1) + `px`, sr.style.left = o.ox.toFixed(1) + `px`, sr.style.top = o.oy.toFixed(1) + `px`;
  let s = tickFtxGL(n, lr >= 0 ? ur : null);
  !s && ur && xr !== ur && (dr(sr, ur), xr = ur), sr.style.opacity = lr >= 0 && !s ? `1` : `0`, Zn.style.opacity = !s && n >= 1 ? `1` : `0`, tickFooterPanel(smoothstep(clamp((e - je * .3) / (1 - je * .3), 0, 1)))
}

export { initFooterStack, tickContact, tickFly, tickFooterChapter };
