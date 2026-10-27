// src/components/calculators/CTASection.jsx

import { useNavigate } from "react-router-dom";

export default function CTASection({
    config,
}) {
    const navigate = useNavigate();

    const cta = config?.cta;

    if (!cta) return null;

    return (<section className="overflow-hidden rounded-[32px] bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-lg lg:p-12"> <div className="max-w-3xl"> <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wide">
        Next Step </span>

        <h2 className="mt-4 text-3xl font-black">
            Ready To Compare Real Plans?
        </h2>

        <p className="mt-4 text-blue-100">
            Use your calculation results to compare actual insurance plans and find the best option for your needs.
        </p>

        <button
            onClick={() => navigate(cta.route)}
            className="mt-8 rounded-xl bg-white px-6 py-3 font-bold text-blue-700 transition hover:bg-slate-100"
        >
            {cta.label}
        </button>
    </div>
    </section>


    );
}
