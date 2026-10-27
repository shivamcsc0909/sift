import { useEffect, useState } from "react";
import {
  Activity,
  ArrowRight,
  Building2,
  HeartHandshake,
  Hospital,
  ShieldPlus,
  Star,
  Users,
  BadgeCheck,
  HeartPulse,
} from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const planCards = [
  {
    title: "Family Floater",
    text: "Single sum insured covering spouse, children, and parents under one affordable premium.",
  },
  {
    title: "Senior Citizen Plans",
    text: "Designed for parents and senior citizens with chronic care, restore benefits, and cashless treatment.",
  },
  {
    title: "Pre-Existing Disease Plans",
    text: "Specialized coverage for diabetes, hypertension, asthma, and other medical conditions.",
  },
];

const comparisonFeatures = [
  {
    icon: Hospital,
    title: "Cashless Hospitals",
    text: "Compare network hospitals available near your city.",
  },
  {
    icon: ShieldPlus,
    title: "Waiting Period",
    text: "Understand PED, maternity, and disease-specific waiting periods.",
  },
  {
    icon: Activity,
    title: "Room Rent Limits",
    text: "Check room category restrictions and ICU eligibility.",
  },
  {
    icon: HeartHandshake,
    title: "Restoration Benefits",
    text: "Restore exhausted sum insured automatically.",
  },
];

const insurerLogos = [
  "HDFC Ergo",
  "Care Health",
  "Niva Bupa",
  "Star Health",
  "ICICI Lombard",
  "Aditya Birla",
];

export default function HealthInsurancePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const variant = searchParams.get("variant") || "individual";

  const [members, setMembers] = useState("1 Adult");
  const [age, setAge] = useState("30");
  const [city, setCity] = useState("Mumbai");
  const [sumInsured, setSumInsured] = useState("1000000");
  const [disease, setDisease] = useState("None");

  useEffect(() => {
    if (variant === "parents") {
      setMembers("Parents");
      setAge("60");
    }

    if (variant === "ped") {
      setDisease("Diabetes");
    }
  }, [variant]);

  const pageConfig = {
    individual: {
      badge: "Health Insurance",
      title: "Compare Health Insurance Plans & Save More",
      description:
        "Find the right health insurance plan with cashless hospitals, claim support, wellness benefits, and affordable premiums.",
    },
    parents: {
      badge: "Health Insurance For Parents",
      title: "Protect Your Parents With Comprehensive Health Coverage",
      description:
        "Compare senior citizen plans with higher coverage, chronic care support, and faster claim assistance.",
    },
    ped: {
      badge: "PED Health Insurance",
      title: "Health Insurance For Pre-Existing Diseases",
      description:
        "Compare plans for diabetes, BP, asthma, and other pre-existing conditions with shorter waiting periods.",
    },
  };

  const currentConfig = pageConfig[variant] || pageConfig.individual;

  const handleCompareClick = () => {
    const params = new URLSearchParams({
      type: "health",
      variant,
      age,
      members,
      city,
      sumInsured,
      disease,
    });

    navigate(`/compare-quotes?${params.toString()}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      {/* Hero Section */}
      <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
            {currentConfig.badge}
          </span>

          <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            {currentConfig.title}
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            {currentConfig.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium">
              <BadgeCheck size={16} className="text-emerald-600" />
              50 Lakh+ Customers
            </div>

            <div className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium">
              <Hospital size={16} className="text-emerald-600" />
              14,500+ Hospitals
            </div>

            <div className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium">
              <HeartHandshake size={16} className="text-emerald-600" />
              Claims Support
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={handleCompareClick}
              className="rounded-xl bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-700 cursor-pointer"
            >
              Compare Plans
            </button>

            <Link
              to="/claims-support"
              className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Claims Support
            </Link>
          </div>
        </div>

        {/* Quote Form */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-black text-slate-950">
            Find The Right Health Plan
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Compare premiums, cashless hospitals, waiting periods, and claim
            settlement support.
          </p>

          <div className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Who Needs Insurance?
              </label>

              <select
                value={members}
                onChange={(e) => setMembers(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3"
              >
                <option value="1 Adult">Self</option>
                <option value="2 Adults">Self + Spouse</option>
                <option value="2 Adults + 1 Child">
                  Self + Spouse + Child
                </option>
                <option value="2 Adults + 2 Children">
                  Self + Spouse + 2 Children
                </option>
                <option value="Parents">Parents</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Age of Oldest Member
              </label>

              <select
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3"
              >
                {[18, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75].map(
                  (value) => (
                    <option key={value} value={value}>
                      {value} Years
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                City
              </label>

              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3"
              >
                <option>Mumbai</option>
                <option>Delhi NCR</option>
                <option>Bangalore</option>
                <option>Hyderabad</option>
                <option>Pune</option>
                <option>Chennai</option>
                <option>Kolkata</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Existing Disease
              </label>

              <select
                value={disease}
                onChange={(e) => setDisease(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3"
              >
                <option>None</option>
                <option>Diabetes</option>
                <option>Hypertension</option>
                <option>Asthma</option>
                <option>Heart Disease</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Coverage Amount
              </label>

              <select
                value={sumInsured}
                onChange={(e) => setSumInsured(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3"
              >
                <option value="500000">₹5 Lakhs</option>
                <option value="1000000">₹10 Lakhs</option>
                <option value="2000000">₹20 Lakhs</option>
                <option value="5000000">₹50 Lakhs</option>
                <option value="10000000">₹1 Crore</option>
              </select>
            </div>

            <button
              onClick={handleCompareClick}
              className="w-full rounded-xl bg-orange-600 px-5 py-4 text-sm font-semibold text-white transition hover:bg-orange-700 cursor-pointer"
            >
              View Plans & Prices
            </button>
          </div>
        </div>
      </section>

      {/* Insurers */}
      <section className="mt-16">
        <div className="text-center">
          <h2 className="text-3xl font-black text-slate-950">
            Compare Plans From Leading Insurers
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {insurerLogos.map((insurer) => (
            <div
              key={insurer}
              className="flex h-20 items-center justify-center rounded-2xl border border-slate-200 bg-white font-semibold text-slate-700 shadow-sm"
            >
              {insurer}
            </div>
          ))}
        </div>
      </section>

      {/* Plan Types */}
      <section className="mt-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {planCards.map((plan) => (
            <div
              key={plan.title}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-2xl font-black text-slate-950">
                {plan.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                {plan.text}
              </p>

              <button className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                Learn More <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Compare Features */}
      <section className="mt-16 rounded-3xl bg-slate-900 p-8 text-white">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-400">
          What You'll Compare
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {comparisonFeatures.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <Icon size={22} className="text-emerald-400" />

              <h3 className="mt-4 text-xl font-bold">{title}</h3>

              <p className="mt-3 text-sm leading-7 text-slate-300">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="mt-16 rounded-3xl border border-slate-200 bg-white p-8">
        <h2 className="text-center text-3xl font-black text-slate-950">
          Why Buy Through PolicySift?
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          <div className="text-center">
            <Users className="mx-auto text-emerald-600" size={34} />
            <h3 className="mt-4 font-bold">50L+ Customers</h3>
          </div>

          <div className="text-center">
            <Hospital className="mx-auto text-emerald-600" size={34} />
            <h3 className="mt-4 font-bold">14,500+ Hospitals</h3>
          </div>

          <div className="text-center">
            <Building2 className="mx-auto text-emerald-600" size={34} />
            <h3 className="mt-4 font-bold">Top Insurers</h3>
          </div>

          <div className="text-center">
            <Star className="mx-auto text-emerald-600" size={34} />
            <h3 className="mt-4 font-bold">Expert Support</h3>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mt-16 rounded-3xl bg-gradient-to-r from-emerald-600 to-emerald-700 p-10 text-center text-white">
        <HeartPulse className="mx-auto" size={42} />

        <h2 className="mt-4 text-3xl font-black">
          Compare Health Insurance Plans In Minutes
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-emerald-50">
          Get personalized recommendations based on age, family members,
          location, and medical conditions.
        </p>

        <button
          onClick={handleCompareClick}
          className="mt-8 rounded-xl bg-white px-8 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-slate-100 cursor-pointer"
        >
          Compare Plans Now
        </button>
      </section>
    </div>
  );
}