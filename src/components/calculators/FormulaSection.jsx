// src/components/calculators/FormulaSection.jsx

export default function FormulaSection({ config }) {
    if (!config?.formula) return null;

    return (<section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm lg:p-8"> <div className="mb-6"> <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">
        Formula & Methodology </span>

        <h2 className="mt-4 text-2xl font-black text-slate-950">
            How This Calculator Works
        </h2>
    </div>

        <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm leading-7 text-slate-700">
                {config.formula}
            </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 p-4">
                <h3 className="font-bold text-slate-900">
                    Input Factors
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                    Results change dynamically based on the values you provide.
                </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
                <h3 className="font-bold text-slate-900">
                    Real-Time Updates
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                    Calculations update instantly whenever an input changes.
                </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
                <h3 className="font-bold text-slate-900">
                    Educational Estimate
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                    Results are indicative and should not be treated as financial or medical advice.
                </p>
            </div>
        </div>
    </section>

    );
}
