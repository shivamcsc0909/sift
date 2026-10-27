import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const insuranceTypes = [
    "Health",
    "Term",
    "Car",
    "Bike",
    "Travel",
    "Investment",
    "Other",
];

// Vite users: set this in .env as VITE_GOOGLE_SCRIPT_URL=...
const SCRIPT_URL =
    import.meta.env.VITE_GOOGLE_SCRIPT_URL ||
    "https://script.google.com/macros/s/AKfycbwMTALWQD5zfEku96_hksVQE-Se0BOw5CbREmjAohZfOSZW0iBuDr_ELSJoFw6HaEHh/exec";

const inquirySchema = z.object({
    name: z.string().min(2, "Please enter your full name"),
    phone: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid mobile number"),
    email: z.string().email("Please enter a valid email address"),
    interest: z.string().min(1, "Please select an insurance type"),
    whatsapp: z.boolean().optional(),
});

export default function InquiryForm() {
    const [submitMessage, setSubmitMessage] = useState("");

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(inquirySchema),
        defaultValues: {
            interest: "",
            whatsapp: true,
        },
    });

    const selectedInterest = watch("interest");

    const sendToSheet = async (data, action) => {
        const payload = {
            ...data,
            action,
            source: "Website Form",
            pageUrl: window.location.href,
            submittedAt: new Date().toISOString(),
        };

        await fetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            },
            body: JSON.stringify(payload),
        });

        reset({
            name: "",
            phone: "",
            email: "",
            interest: "",
            whatsapp: true,
        });

        setSubmitMessage(
            action === "whatsapp"
                ? "Submitted successfully from WhatsApp button."
                : "Submitted successfully from Call button."
        );
    };

    const onSubmitCall = handleSubmit((data) => sendToSheet(data, "Call"));
    const onSubmitWhatsApp = handleSubmit((data) => sendToSheet(data, "WhatsApp"));

    return (
        <div className="w-full bg-white p-6 md:p-8">
            <div className="mb-8 text-center">
                <div className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-[#0065ff]">
                    Free Insurance Consultation
                </div>

                <h2 className="mt-4 text-3xl font-bold text-slate-900">
                    Get Expert Insurance Advice
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                    Compare plans from top insurers and find the right coverage.
                </p>
            </div>

            <form className="space-y-5">
                <div>
                    <label className="mb-3 block text-sm font-semibold text-slate-700">
                        What are you looking for?
                    </label>

                    <div className="grid grid-cols-2 gap-3">
                        {insuranceTypes.map((item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() =>
                                    setValue("interest", item, {
                                        shouldDirty: true,
                                        shouldTouch: true,
                                        shouldValidate: true,
                                    })
                                }
                                className={`rounded-2xl border p-4 text-sm font-semibold transition-all duration-200
                  ${selectedInterest === item
                                        ? "border-[#0065ff] bg-blue-50 text-[#0065ff] shadow-sm"
                                        : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-slate-50"
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    {errors.interest && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.interest.message}
                        </p>
                    )}
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Full Name"
                        {...register("name")}
                        className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm transition-all outline-none focus:border-[#0065ff] focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                    {errors.name && (
                        <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
                    )}
                </div>

                <div>
                    <input
                        type="tel"
                        placeholder="Mobile Number"
                        {...register("phone")}
                        className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm transition-all outline-none focus:border-[#0065ff] focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                    {errors.phone && (
                        <p className="mt-2 text-sm text-red-500">{errors.phone.message}</p>
                    )}
                </div>

                <div>
                    <input
                        type="email"
                        placeholder="Email Address"
                        {...register("email")}
                        className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm transition-all outline-none focus:border-[#0065ff] focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                    {errors.email && (
                        <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
                    )}
                </div>

                <label className="flex items-center gap-3 rounded-2xl border border-green-100 bg-green-50 p-4 text-sm text-slate-700">
                    <input
                        type="checkbox"
                        {...register("whatsapp")}
                        className="h-4 w-4"
                    />
                    Receive quotes and updates on WhatsApp
                </label>

                <div className="flex w-full gap-4">
                    <button
                        type="button"
                        onClick={onSubmitCall}
                        disabled={isSubmitting}
                        className="h-14 w-1/2 rounded-2xl bg-[#0065ff] text-base font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {isSubmitting ? "Submitting..." : "Call Us"}
                    </button>

                    <button
                        type="button"
                        onClick={onSubmitWhatsApp}
                        disabled={isSubmitting}
                        className="h-14 w-1/2 rounded-2xl bg-green-600 text-base font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {isSubmitting ? "Submitting..." : "Whatsapp Us"}
                    </button>
                </div>

                {submitMessage && (
                    <p className="text-center text-sm font-medium text-green-600">
                        {submitMessage}
                    </p>
                )}

                <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
                    <div className="rounded-xl bg-slate-50 p-3 font-medium text-slate-600">
                        ✓ Free Advice
                    </div>
                    <div className="rounded-xl bg-slate-50 p-3 font-medium text-slate-600">
                        ✓ Top Insurers
                    </div>
                    <div className="rounded-xl bg-slate-50 p-3 font-medium text-slate-600">
                        ✓ Quick Callback
                    </div>
                </div>

                <p className="text-center text-xs text-slate-500">
                    By proceeding, you agree to our Terms of Service and Privacy Policy.
                </p>
            </form>
        </div>
    );
}