// src/components/calculators/FAQSection.jsx

export default function FAQSection({ config }) {
    const faqs = config?.faqs || [];

    if (!faqs.length) return null;

    return (<section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm lg:p-8"> <div className="mb-8"> <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">
        FAQs </span>

        <h2 className="mt-4 text-2xl font-black text-slate-950">
            Frequently Asked Questions
        </h2>
    </div>

        <div className="space-y-4">
            {faqs.map((faq, index) => (
                <details
                    key={`${faq.question}-${index}`}
                    className="group rounded-2xl border border-slate-200 p-5"
                >
                    <summary className="cursor-pointer list-none font-semibold text-slate-900">
                        {faq.question}
                    </summary>

                    <p className="mt-4 text-sm leading-7 text-slate-600">
                        {faq.answer}
                    </p>
                </details>
            ))}
        </div>
    </section>


    );
}
