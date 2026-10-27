import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ShieldCheck,
  Heart,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Award,
  Users,
  BadgeCheck,
  Building2,
  Wallet,
  Shield,
  HeartHandshake,
  FileCheck,
  Star,
  Crown,
  Banknote,
} from "lucide-react";

const planTypes = [
  {
    title: "Pure Term Plan",
    description:
      "Maximum life cover at the lowest premium with financial protection for your family.",
  },
  {
    title: "Return of Premium",
    description:
      "Get all base premiums back if you survive the policy term while staying protected.",
  },
  {
    title: "Term Plan with Riders",
    description:
      "Enhance coverage with critical illness, accidental death, and waiver benefits.",
  },
];

const insurers = [
  "LIC",
  "HDFC Life",
  "ICICI Prudential",
  "Max Life",
  "Tata AIA",
  "Bajaj Allianz",
];

const compareFeatures = [
  {
    icon: Shield,
    title: "Life Cover",
    text: "Compare ₹50L to ₹5Cr+ coverage options.",
  },
  {
    icon: Award,
    title: "Claim Settlement Ratio",
    text: "Evaluate insurers based on CSR and trust metrics.",
  },
  {
    icon: HeartHandshake,
    title: "Rider Benefits",
    text: "Critical illness, accidental death and waiver options.",
  },
  {
    icon: Wallet,
    title: "Premium Cost",
    text: "Compare monthly and annual premium affordability.",
  },
];

const trustStats = [
  {
    icon: Users,
    title: "50L+ Customers",
  },
  {
    icon: ShieldCheck,
    title: "₹5Cr Cover Options",
  },
  {
    icon: FileCheck,
    title: "99%+ CSR Plans",
  },
  {
    icon: Building2,
    title: "Top Life Insurers",
  },
];

const faqItems = [
  {
    question: "What is Term Life Insurance?",
    answer:
      "Term insurance provides a large life cover at affordable premiums and pays the nominee if the insured passes away during the policy term.",
  },
  {
    question: "Why do smokers pay higher premiums?",
    answer:
      "Tobacco consumption increases health risks which directly impacts premium calculations by insurers.",
  },
  {
    question: "What is Return of Premium?",
    answer:
      "Return of Premium plans refund all eligible base premiums paid if the policyholder survives the policy term.",
  },
];

export default function LifeInsurancePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const variant = searchParams.get("variant") || "term";

  const [gender, setGender] = useState("Male");
  const [tobacco, setTobacco] = useState("No");
  const [age, setAge] = useState("30");
  const [income, setIncome] = useState("5L - 10L");
  const [cover, setCover] = useState("10000000");
  const [policyTerm, setPolicyTerm] = useState("30");
  const [criticalIllness, setCriticalIllness] = useState(false);
  const [accidentalCover, setAccidentalCover] = useState(false);

  useEffect(() => {
    if (variant === "return-premium") {
      setCover("10000000");
    }

    if (variant === "free-cover") {
      setCover("5000000");
    }
  }, [variant]);

  const pageConfig = {
    term: {
      badge: "Term Life Insurance",
      title: "Protect Your Family With A High-Cover Term Plan",
      description:
        "Compare term insurance plans from India's leading insurers and secure your family's future with affordable premiums.",
    },
    "return-premium": {
      badge: "Return Of Premium Plans",
      title: "Get Life Cover Plus Your Premiums Back",
      description:
        "Compare TROP plans that provide financial protection and refund eligible premiums at maturity.",
    },
    "free-cover": {
      badge: "Premium Back Plans",
      title: "Life Insurance Plans With Premium Return Benefits",
      description:
        "Explore life cover options that combine protection with maturity benefits.",
    },
  };

  const currentConfig = pageConfig[variant] || pageConfig.term;

  const handleGetQuotes = (e) => {
    e.preventDefault();

    const params = new URLSearchParams({
      type: "life",
      variant,
      gender,
      tobacco,
      age,
      income,
      cover,
      policyTerm,
      criticalIllness,
      accidentalCover,
    });

    navigate(`/compare-quotes?${params.toString()}`);
  };

  return (
    <div className="bg-[#f4f6fb] min-h-screen pb-20">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
                {currentConfig.badge}
              </span>

              <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
                {currentConfig.title}
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                {currentConfig.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  Zero Broker Commission
                </div>

                <div className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  Instant Policy Issuance
                </div>

                <div className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  Claim Assistance
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
              <h2 className="text-2xl font-black text-slate-950">
                Calculate Premium Quotes
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Personalized recommendations from top insurers.
              </p>

              <form onSubmit={handleGetQuotes} className="mt-8 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="rounded-xl border border-slate-200 px-4 py-3"
                  >
                    <option>Male</option>
                    <option>Female</option>
                  </select>

                  <select
                    value={tobacco}
                    onChange={(e) => setTobacco(e.target.value)}
                    className="rounded-xl border border-slate-200 px-4 py-3"
                  >
                    <option value="No">Non Smoker</option>
                    <option value="Yes">Smoker</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="rounded-xl border border-slate-200 px-4 py-3"
                  >
                    {[18, 25, 30, 35, 40, 45, 50, 55, 60].map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>

                  <select
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="rounded-xl border border-slate-200 px-4 py-3"
                  >
                    <option>Under 5L</option>
                    <option>5L - 10L</option>
                    <option>10L - 15L</option>
                    <option>15L+</option>
                  </select>
                </div>

                <select
                  value={cover}
                  onChange={(e) => setCover(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3"
                >
                  <option value="5000000">₹50 Lakhs</option>
                  <option value="10000000">₹1 Crore</option>
                  <option value="20000000">₹2 Crores</option>
                  <option value="50000000">₹5 Crores</option>
                </select>

                <select
                  value={policyTerm}
                  onChange={(e) => setPolicyTerm(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3"
                >
                  <option value="20">20 Years</option>
                  <option value="30">30 Years</option>
                  <option value="40">40 Years</option>
                </select>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="mb-3 text-sm font-bold text-slate-900">
                    Optional Riders
                  </p>

                  <label className="flex items-center gap-3 text-sm">
                    <input
                      type="checkbox"
                      checked={criticalIllness}
                      onChange={() =>
                        setCriticalIllness(!criticalIllness)
                      }
                    />
                    Critical Illness Cover
                  </label>

                  <label className="mt-3 flex items-center gap-3 text-sm">
                    <input
                      type="checkbox"
                      checked={accidentalCover}
                      onChange={() =>
                        setAccidentalCover(!accidentalCover)
                      }
                    />
                    Accidental Death Benefit
                  </label>
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 font-bold text-white transition hover:bg-blue-700 cursor-pointer"
                >
                  View Free Quotes
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {trustStats.map(({ icon: Icon, title }) => (
            <div
              key={title}
              className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm"
            >
              <Icon className="mx-auto text-blue-600" size={32} />
              <h3 className="mt-4 font-bold text-slate-900">{title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Insurers */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-black text-slate-950">
          Compare Plans From Leading Insurers
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {insurers.map((insurer) => (
            <div
              key={insurer}
              className="flex h-20 items-center justify-center rounded-2xl border border-slate-200 bg-white font-semibold shadow-sm"
            >
              {insurer}
            </div>
          ))}
        </div>
      </section>

      {/* Plan Types */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-center text-3xl font-black text-slate-950">
          Choose The Right Life Insurance Plan
        </h2>

        <div className="grid gap-6 lg:grid-cols-3">
          {planTypes.map((plan) => (
            <div
              key={plan.title}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <Crown className="text-blue-600" size={26} />

              <h3 className="mt-5 text-2xl font-black text-slate-950">
                {plan.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                {plan.description}
              </p>

              <button className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-600">
                Learn More <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Compare Features */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-950 p-8 text-white">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
            What You'll Compare
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {compareFeatures.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <Icon size={22} className="text-blue-400" />

                <h3 className="mt-4 text-xl font-bold">{title}</h3>

                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tax Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-10 text-white">
          <Banknote size={38} />

          <h2 className="mt-4 text-3xl font-black">
            Tax Benefits Under Sections 80C & 10(10D)
          </h2>

          <p className="mt-4 max-w-3xl text-blue-50">
            Save taxes on premiums paid and ensure your family receives
            tax-free claim benefits under applicable tax provisions.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/compare-quotes?type=life")}
              className="rounded-xl bg-white px-6 py-3 font-bold text-blue-700"
            >
              Compare Quotes
            </button>

            <Link
              to="/claims-support"
              className="rounded-xl border border-white/20 px-6 py-3 font-bold"
            >
              Claim Settlement Guide
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-3xl font-black text-slate-950">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqItems.map((faq) => (
            <div
              key={faq.question}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="font-bold text-slate-900">
                {faq.question}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}