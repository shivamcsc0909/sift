// src/components/calculators/DynamicForm.jsx

import { useMemo } from "react";

export default function DynamicForm({
    config,
    values,
    onChange,
}) {
    const fields = useMemo(
        () => config?.fields || [],
        [config]
    );

    const renderField = (field) => {
        const value =
            values[field.name] ??
            field.defaultValue ??
            "";


        switch (field.type) {
            case "select":
                return (
                    <select
                        value={value}
                        onChange={(e) =>
                            onChange(
                                field.name,
                                e.target.value
                            )
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                    >
                        {field.options.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            case "number":
            default:
                return (
                    <input
                        type="number"
                        value={value}
                        onChange={(e) =>
                            onChange(
                                field.name,
                                Number(e.target.value)
                            )
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                    />
                );
        }


    };

    return (<div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm lg:p-8"> <div className="mb-6"> <h2 className="text-xl font-bold text-slate-950">
        Enter Details </h2>


        <p className="mt-2 text-sm text-slate-500">
            Adjust inputs to calculate
            real-time results.
        </p>
    </div>

        <div className="grid gap-5">
            {fields.map((field) => (
                <div key={field.name}>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        {field.label}
                    </label>

                    {renderField(field)}
                </div>
            ))}
        </div>
    </div>


    );
}
