
// src/pages/CalculatorsPage.jsx

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
    CALCULATOR_CONFIG,
} from "../data/calculatorConfig";

import {
    calculateCalculator,
} from "../utils/calculatorEngine";

import CalculatorHero from "../components/calculators/CalculatorHero";
import DynamicForm from "../components/calculators/DynamicForm";
import ResultsPanel from "../components/calculators/ResultsPanel";

import FormulaSection from "../components/calculators/FormulaSection";
import FAQSection from "../components/calculators/FAQSection";
import RelatedCalculators from "../components/calculators/RelatedCalculators";
import CTASection from "../components/calculators/CTASection";

function getDefaultValues(config) {
    if (!config?.fields) return {};

    return config.fields.reduce((acc, field) => {
        acc[field.name] =
            field.defaultValue ?? "";

        return acc;
    }, {});
}

export default function CalculatorsPage() {
    const [searchParams] =
        useSearchParams();

    const calculatorKey =
        searchParams.get("calculator") ||
        "sip";

    const config =
        CALCULATOR_CONFIG[
        calculatorKey
        ] ||
        CALCULATOR_CONFIG.sip;

    const [values, setValues] =
        useState(() =>
            getDefaultValues(config)
        );

    useEffect(() => {
        setValues(
            getDefaultValues(config)
        );
    }, [calculatorKey]);

    const handleChange = (
        name,
        value
    ) => {
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const results = useMemo(() => {
        return calculateCalculator(
            calculatorKey,
            values
        );
    }, [
        calculatorKey,
        values,
    ]);

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

                {/* Hero */}
                <CalculatorHero
                    config={config}
                />

                {/* Calculator Area */}
                <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_420px]">

                    <DynamicForm
                        config={config}
                        values={values}
                        onChange={
                            handleChange
                        }
                    />

                    <ResultsPanel
                        config={config}
                        results={results}
                    />

                </section>

                {/* Formula */}
                <section className="mt-8">
                    <FormulaSection
                        config={config}
                    />
                </section>

                {/* Related */}
                <section className="mt-8">
                    <RelatedCalculators
                        calculatorKey={
                            calculatorKey
                        }
                    />
                </section>

                {/* FAQ */}
                <section className="mt-8">
                    <FAQSection
                        config={config}
                    />
                </section>

                {/* CTA */}
                <section className="mt-8">
                    <CTASection
                        config={config}
                    />
                </section>

            </div>
        </div>
    );
}
