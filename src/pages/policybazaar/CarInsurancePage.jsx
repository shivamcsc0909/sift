import { useNavigate } from "react-router-dom";
import { ArrowRight, Car, FileCheck2, Shield, Wrench } from "lucide-react";

const addOns = [
  "Zero depreciation cover",
  "Engine and gearbox protection",
  "Roadside assistance",
  "Return to invoice cover",
];

const claimSteps = [
  {
    title: "Share incident details",
    text: "Start with policy number, accident date, and photos for faster triage.",
  },
  {
    title: "Garage and survey support",
    text: "Get guided toward network garages and keep paperwork error-free.",
  },
  {
    title: "Track approval status",
    text: "Monitor repair updates, insurer approval, and reimbursements in one place.",
  },
];

export default function CarInsurancePage() {
  const navigate = useNavigate();

  const handleCarQuotesClick = () => {
    navigate("/compare-quotes?type=car");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-sky-700">
            Car insurance
          </p>
          <h1 className="text-5xl font-black tracking-tight text-slate-950">
            Renew your car cover with smarter pricing and clearer add-ons.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">
            Compare comprehensive and third-party plans, inspect IDV changes,
            and get support for claim settlement, garage selection, and
            documents.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleCarQuotesClick}
              type="button"
              className="rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-500 cursor-pointer"
            >
              Check Car Quotes
            </button>
            <button
              onClick={handleCarQuotesClick}
              type="button"
              className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white cursor-pointer"
            >
              Renew Existing Policy
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-[36px] border border-white/70 bg-white/85 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.07)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">
                Renewal preview
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                Hatchback premium snapshot
              </h2>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
              <Car size={24} />
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {[
              ["Previous IDV", "Rs. 4.8 lakh"],
              ["Best renewal quote", "Rs. 9,860"],
              ["Cashless garages", "5,700+"],
              ["Claim support", "Advisor assisted"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
              >
                <span className="text-sm text-slate-600">{label}</span>
                <span className="font-semibold text-slate-950">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[36px] border border-white/70 bg-white/80 p-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-sky-700">
            Best add-ons
          </p>
          <div className="mt-6 space-y-3">
            {addOns.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
              >
                <Shield className="text-sky-600" size={18} />
                <span className="text-sm font-medium text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[36px] bg-slate-950 p-8 text-white shadow-[0_25px_90px_rgba(15,23,42,0.18)]">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-sky-300">
            Claims made easier
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {claimSteps.map((step, index) => {
              const Icon = [FileCheck2, Wrench, ArrowRight][index];
              return (
                <div
                  key={step.title}
                  className="rounded-[28px] border border-white/10 bg-white/5 p-5"
                >
                  <Icon className="text-sky-300" size={22} />
                  <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {step.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
