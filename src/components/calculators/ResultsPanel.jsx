// src/components/calculators/ResultsPanel.jsx

const formatCurrency = (value) => {
    if (
        typeof value !== "number" ||
        Number.isNaN(value)
    ) {
        return value;
    }

    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }
    ).format(value);
};

const formatLabel = (key) =>
    key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) =>
            str.toUpperCase()
        );

export default function ResultsPanel({
    config,
    results,
}) {
    const resultKeys =
        config?.resultFields || [];

    return (<div className="rounded-[32px] border border-slate-200 bg-slate-950 p-6 text-white shadow-sm lg:p-8"> <div className="mb-6"> <h2 className="text-xl font-bold">
        Results </h2>

        <p className="mt-2 text-sm text-slate-400">
            Updated instantly as you
            change values.
        </p>
    </div>

        <div className="grid gap-4">
            {resultKeys.map((field) => {
                const value =
                    results?.[field.key];

                return (
                    <div
                        key={field.key}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                        <p className="text-xs uppercase tracking-wide text-slate-400">
                            {field.label}
                        </p>

                        <p className="mt-2 text-2xl font-black">
                            {value}
                        </p>
                    </div>
                );
            })}
        </div>

        {config?.formula && (
            <div className="mt-6 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-blue-300">
                    Formula
                </p>

                {typeof config.formula === "string" ? (
                    <p className="mt-2 text-sm leading-7 text-slate-300">
                        {config.formula}
                    </p>
                ) : (
                    <>
                        <h3 className="mt-2 font-semibold text-white">
                            {config.formula.title}
                        </h3>

                        <p className="mt-2 text-sm leading-7 text-slate-300">
                            {config.formula.description}
                        </p>
                    </>
                )}
            </div>
        )}
    </div>


    );
}
