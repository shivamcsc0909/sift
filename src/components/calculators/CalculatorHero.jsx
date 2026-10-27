// src/components/calculators/CalculatorHero.jsx

import * as Icons from "lucide-react";

export default function CalculatorHero({ config }) {
    const Icon =
        Icons[config.icon] || Icons.Calculator;

    return (<section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm lg:p-12"> <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"> <div> <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-blue-700">
        {config.badge} </span>

        ```
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 lg:text-5xl">
            {config.title}
        </h1>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            {config.description}
        </p>
    </div>

        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-50 text-blue-700">
            <Icon size={40} />
        </div>
    </div>
    </section>


    );
}
