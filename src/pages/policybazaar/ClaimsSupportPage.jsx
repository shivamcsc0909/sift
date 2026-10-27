import { BellRing, ClipboardCheck, MessagesSquare, RefreshCw, ShieldCheck } from "lucide-react";

const serviceCards = [
  {
    icon: RefreshCw,
    title: "Renew before expiry",
    text: "See premium movement, no-claim bonus impact, and insurer alternatives before you renew.",
  },
  {
    icon: ClipboardCheck,
    title: "Document readiness",
    text: "Keep ID proofs, RC, and medical history details ready with guided checklists.",
  },
  {
    icon: MessagesSquare,
    title: "Advisor callbacks",
    text: "Request a callback for complex cases like porting, reimbursement claims, or endorsement changes.",
  },
];

const timeline = [
  "Policy reminder sent 30, 15, and 3 days before expiry",
  "Advisor shares shortlist based on premium and benefits changes",
  "Renewal or claim initiation completed with guided documents",
  "Status tracking continues until insurer confirmation",
];

export default function ClaimsSupportPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="rounded-[40px] border border-white/70 bg-white/85 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.07)] lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-amber-700">
              Renewals and claims
            </p>
            <h1 className="text-5xl font-black tracking-tight text-slate-950">
              Stay ahead of expiry dates and get support when claims feel messy.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              This page focuses on after-purchase trust: reminders, guided
              renewal decisions, claim checklists, and advisor callbacks that
              keep customers confident even after checkout.
            </p>
          </div>

          <div className="rounded-[32px] bg-amber-50 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 text-slate-950">
                <BellRing size={22} />
              </div>
              <div>
                <p className="font-semibold text-slate-950">Smart reminders</p>
                <p className="text-sm text-slate-600">Email, SMS, and callback triggers</p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {timeline.map((item, index) => (
                <div
                  key={item}
                  className="flex gap-4 rounded-2xl border border-amber-100 bg-white px-4 py-4"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-7 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-3">
        {serviceCards.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="rounded-[32px] border border-white/70 bg-white/80 p-7 shadow-[0_18px_50px_rgba(15,23,42,0.06)]"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <Icon size={24} />
            </div>
            <h2 className="mt-6 text-2xl font-black tracking-tight text-slate-950">
              {title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
          </div>
        ))}
      </section>

      <section className="mt-14 rounded-[36px] bg-slate-950 p-8 text-white shadow-[0_25px_90px_rgba(15,23,42,0.18)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-amber-300">
              Support promise
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">
              Built for confidence after the purchase too
            </h2>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200">
            Claims callback target: under 10 minutes
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {[
            "Transparent claim checklists reduce avoidable rejections.",
            "Renewal nudges protect continuity benefits and no-claim bonuses.",
            "Advisor-driven escalation helps users navigate tricky insurer steps.",
            "The page design complements the homepage and product journeys cleanly.",
          ].map((item) => (
            <div
              key={item}
              className="flex items-start gap-4 rounded-[28px] border border-white/10 bg-white/5 p-5"
            >
              <ShieldCheck className="mt-1 text-amber-300" size={18} />
              <p className="text-sm leading-7 text-slate-300">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
