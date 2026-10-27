// src/components/policybazaar/PartnersSection.jsx

import { PARTNERS } from "../../data/partners";
import { useState } from "react";

export default function PartnersSection() {
    const [showAll, setShowAll] =
        useState(false);
    console.log(PARTNERS.length);

    const visiblePartners =
        showAll
            ? PARTNERS
            : PARTNERS.slice(0, 8);
    return (
        <section className="bg-slate-50 py-16">
            <div className="mx-auto max-w-7xl px-4">

                <div className="text-center">
                    <h2 className="text-4xl font-bold text-slate-900">
                        Our Partners
                    </h2>

                    <p className="mt-3 text-lg text-slate-600">
                        Leading insurers for your financial freedom
                    </p>
                </div>


                <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">

                    {visiblePartners.map((partner) => (
                        <div
                            key={partner.name}
                            className="
              group
              flex
              h-24
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white
              p-4
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-blue-200
              hover:shadow-lg
            "
                        >
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className="
                  max-h-12
                  w-auto
                  object-contain
                  grayscale
                  transition
                  duration-300
                  group-hover:grayscale-0
                "
                            />
                        </div>
                    ))}

                </div>

                {/* Add this here */}
                {PARTNERS.length > 8 && (
                    <div className="mt-8 flex justify-center">
                        <button
                            type="button"
                            onClick={() =>
                                setShowAll(!showAll)
                            }
                            className="
        rounded-lg
        border
        border-slate-300
        bg-white
        px-6
        py-3
        text-sm
        font-semibold
        text-slate-700
        transition
        hover:border-[#0065ff]
        hover:text-[#0065ff]
      "
                        >
                            {showAll
                                ? "Show Less"
                                : `View All ${PARTNERS.length} Partners`}
                        </button>
                    </div>
                )}

            </div>
        </section>
    );
}