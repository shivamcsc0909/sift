// src/components/calculators/RelatedCalculators.jsx

import { Link } from "react-router-dom";
import { CALCULATOR_CONFIG } from "../../data/calculatorConfig";

export default function RelatedCalculators({
    calculatorKey,
}) {
    const config =
        CALCULATOR_CONFIG[calculatorKey];

    if (!config) return null;

    const relatedKeys =
        config.related || [];

    const relatedCalculators =
        relatedKeys
            .map((key) => ({
                key,
                ...CALCULATOR_CONFIG[key],
            }))
            .filter(Boolean);

    if (!relatedCalculators.length)
        return null;

    return (<section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm lg:p-8"> <div className="mb-8"> <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">
        Explore More </span>

        <h2 className="mt-4 text-2xl font-black text-slate-950">
            Related Calculators
        </h2>
    </div>

        <div className="grid gap-4 md:grid-cols-3">
            {relatedCalculators.map(
                (calculator) => (
                    <Link
                        key={calculator.key}
                        to={`/calculators?calculator=${calculator.key}`}
                        className="group rounded-2xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50"
                    >
                        <h3 className="font-bold text-slate-900">
                            {calculator.title}
                        </h3>

                        <p className="mt-2 text-sm text-slate-600">
                            {calculator.description}
                        </p>

                        <span className="mt-4 inline-flex text-sm font-semibold text-blue-600">
                            Open Calculator →
                        </span>
                    </Link>
                )
            )}
        </div>
    </section>

    );
}
