// contact -- ported from the original `An`/`jn`/`Mn` (bundle line ~11581).
//
// Deliberate difference from the original: this used to POST to
// `/api/apply` with a Cloudflare Turnstile token, verified by a backend
// that does not exist in this static build. Turnstile (loadTurnstile /
// getTurnstileToken) is removed entirely -- there is no server left to
// verify its token, so keeping it would only add a third-party script
// load for no protection. FormSubmit (https://formsubmit.co) replaces the
// endpoint; its own spam filtering plus the pre-existing `fax` honeypot
// (renamed to FormSubmit's `_honey` convention) stand in for it.
//
// FormSubmit note: the first submission to a new address triggers a
// one-time confirmation email FormSubmit sends to that inbox -- activate
// it once, then this can switch from the email-based endpoint to the
// hashed form endpoint FormSubmit issues, so the address isn't sitting in
// client JS. See MIGRATION_REPORT.md.
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/yashtiwarit67@gmail.com`;

function wireSubmit() {
  let e = document.querySelector(`.cf-cta`);
  if (!e) return;
  let t = e => document.querySelector(`.cf-in [data-k="${e}"]`),
    n = e.textContent,
    r = !1,
    i = !1;
  e.addEventListener(`click`, async () => {
    if (r || i) return;
    let a = t(`name`).value.trim(),
      o = t(`email`).value.trim(),
      s = t(`grow`).value.trim();
    if (!a) return t(`name`).focus();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o)) return t(`email`).focus();
    if (!s) return t(`grow`).focus();
    r = !0, e.textContent = `Sending —`;
    try {
      let n = await (await fetch(FORMSUBMIT_ENDPOINT, {
          method: `POST`,
          headers: {
            "content-type": `application/json`,
            accept: `application/json`
          },
          body: JSON.stringify({
            name: a,
            email: o,
            message: s,
            _honey: ``,
            _subject: `New application -- Pear`
          })
        })).json().catch(() => ({
          success: `false`
        }));
      if (n.success !== `true`) throw Error(n.message || `send`);
      i = !0, e.textContent = `Application sent.`, e.style.cursor = `default`
    } catch {
      r = !1, e.textContent = `Send failed — email info@pear.no`, setTimeout(() => {
        !i && !r && (e.textContent = n)
      }, 4e3)
    } finally {
      i || (r = !1)
    }
  })
}

export { wireSubmit };
