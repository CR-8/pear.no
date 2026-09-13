// FAQ content -- verbatim from the original bundle's `Te` data table
// (bundle line ~9655). Rendered statically by Faq.astro; previously built
// via innerHTML at runtime (buildFaq(), src/scripts/faq.ts) from the exact
// same array. The middle field (a short label, e.g. "The cost") is carried
// over from the source but is not used by the current UI -- kept for CMS
// parity in case that changes.
export interface FaqEntry {
  question: string;
  label: string;
  answer: string;
}

const raw: [string, string, string][] = [

    [`What does it cost to work with Pear?`, `The cost`, `Nothing upfront and nothing hourly. We fund the strategy, the software, the content and the link building ourselves. Our payment is an agreed percentage of the new revenue that work generates. If your revenue doesn’t grow, you owe us nothing.`],
    [`What share of the revenue do you take?`, `The share`, `It’s agreed per partnership before we start, and depends on how much building the opportunity needs. It applies only to growth above your existing baseline, never to the revenue you already had.`],
    [`Why revenue share instead of fees?`, `The model`, `Because hourly billing pays agencies for effort, not results. An agency on a retainer earns the same whether you grow or not. We removed the retainer, so the only way for us to get paid is to grow your revenue.`],
    [`How do you measure the revenue you create?`, `Measurement`, `Before we begin, we agree on a baseline from your existing numbers and on how new organic revenue is attributed: analytics, order data or bookings, depending on your business. Both sides see the same dashboard.`],
    [`How long before it pays off?`, `The timeline`, `Search compounds slowly, then quickly. Software and technical fixes land in weeks; rankings and revenue typically move within months. The model means the waiting costs you nothing: we’re the ones financing the ramp.`]
];

export const faq: FaqEntry[] = raw.map(([question, label, answer]) => ({ question, label, answer }));
