import {
  Baby,
  Bike,
  Calculator,
  Car,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  FileHeart,
  HeartPulse,
  HelpCircle,
  Home,
  Landmark,
  MessageCircle,
  Plane,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Star,
  TrendingUp,
  Umbrella,
  Users,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { CALCULATOR_CONFIG, CALCULATOR_CATEGORIES } from "../../data/calculatorConfig"
import PartnersSection from "./PartnersSection";


const products = [
  { title: "Investment Plans", tag: "Upto 40% Discount", icon: TrendingUp, color: "text-violet-600", bg: "bg-violet-50", to: "/investment-savings?variant=wealth" },
  { title: "Health Insurance", tag: "0% GST on All Plans", icon: HeartPulse, color: "text-emerald-600", bg: "bg-emerald-50", to: "/health-insurance?variant=individual" },
  { title: "Term Life Insurance", tag: "Waiver of Premium", icon: ShieldCheck, color: "text-blue-600", bg: "bg-blue-50", to: "/life-insurance?variant=term" },
  { title: "Child Savings Plans", tag: "Tax free returns", icon: Baby, color: "text-pink-600", bg: "bg-pink-50", to: "/investment-savings?variant=child" },
  { title: "Retirement Plans", tag: "Pension for Life", icon: Umbrella, color: "text-amber-600", bg: "bg-amber-50", to: "/investment-savings?variant=retirement" },
  { title: "Dollar Based Investment", tag: "New Launch", icon: CircleDollarSign, color: "text-cyan-700", bg: "bg-cyan-50", to: "/investment-savings?variant=dollar" },
  { title: "Health For Parents", tag: "35% Cheaper", icon: Users, color: "text-green-700", bg: "bg-green-50", to: "/health-insurance?variant=parents" },
  { title: "Free of Cost Term Plans", tag: "All Premiums Back", icon: FileHeart, color: "text-rose-600", bg: "bg-rose-50", to: "/life-insurance?variant=free-cover" },
  { title: "Term Plans with Return", tag: "Premium return", icon: Landmark, color: "text-indigo-600", bg: "bg-indigo-50", to: "/life-insurance?variant=return-premium" },
  { title: "Health Insurance PED", tag: "Existing disease", icon: ClipboardCheck, color: "text-teal-700", bg: "bg-teal-50", to: "/health-insurance?variant=ped" },
  { title: "Car Insurance", tag: "Instant renewal", icon: Car, color: "text-orange-600", bg: "bg-orange-50", to: "/vehicle-insurance?variant=car" },
  { title: "Two Wheeler Insurance", tag: "Lowest prices", icon: Bike, color: "text-sky-600", bg: "bg-sky-50", to: "/vehicle-insurance?variant=bike" },
  { title: "Travel Insurance", tag: "Visa ready", icon: Plane, color: "text-blue-700", bg: "bg-blue-50", to: "/travel-insurance" },
  { title: "Guaranteed Return Plans", tag: "Upto 6.9% Returns", icon: TrendingUp, color: "text-lime-700", bg: "bg-lime-50", to: "/investment-savings?variant=guaranteed" },
  { title: "Home Insurance", tag: "Secure assets", icon: Home, color: "text-slate-700", bg: "bg-slate-100", to: "/home-insurance" },
];

const actionLinks = [
  { title: "Renew a Policy", icon: RefreshCw, to: "/claims-support" },
  { title: "File a Claim", icon: ClipboardCheck, to: "/claims-support" },
  { title: "Health Insurance", icon: ChevronRight, to: "/health-insurance" },
];

const promoCards = [
  { title: "Health Insurance", text: "Special concierge services for your parents at no extra cost.", accent: "border-l-emerald-500" },
  { title: "ULIP Investment Plans", text: "Exclusive long-term plans for wealth building and life protection.", accent: "border-l-violet-500" },
  { title: "Term Life Insurance", text: "Large cover options with simple monthly premium comparisons.", accent: "border-l-blue-500" },
  { title: "Child Investment Plan", text: "Plan your child's future with disciplined savings and insurance.", accent: "border-l-pink-500" },
  { title: "Retirement Plans", text: "Build a retirement corpus with predictable income options.", accent: "border-l-amber-500" },
];

const trustItems = [
  { title: "Over 9 million", text: "customers trust us and have bought their insurance online" },
  { title: "51 insurers", text: "partnered with us so you can compare easily and transparently" },
  { title: "Great Price", text: "for all kinds of insurance plans available online" },
  { title: "Claims", text: "support built in with every policy for help when you need it" },
];

const calculatorGroups = [
  {
    title: "Investment Calculators",

    calculators: [
      {
        key: "sip",
        title: "SIP Calculator",
        icon: "TrendingUp",
      },

      {
        key: "income-tax",
        title: "Income Tax Calculator",
        icon: "Calculator",
      },

      {
        key: "ulip",
        title: "ULIP Calculator",
        icon: "Shield",
      },

      {
        key: "nps",
        title: "NPS Calculator",
        icon: "PiggyBank",
      },
    ],
  },

  {
    title: "Health & Wellness Calculators",

    calculators: [
      {
        key: "bmi",
        title: "BMI Calculator",
        icon: "Heart",
      },

      {
        key: "ideal-weight",
        title: "Ideal Weight Calculator",
        icon: "Scale",
      },

      {
        key: "calorie",
        title: "Calorie Calculator",
        icon: "Flame",
      },

      {
        key: "body-fat",
        title: "Body Fat Calculator",
        icon: "Activity",
      },
    ],
  },

  {
    title: "Policy Premium Calculators",

    calculators: [
      // {
      //   key: "health-premium",
      //   title: "Health Premium Calculator",
      //   icon: "ShieldPlus",
      // },

      {
        key: "car-insurance",
        title: "Car Insurance Calculator",
        icon: "Car",
      },

      {
        key: "bike-insurance",
        title: "Bike Insurance Calculator",
        icon: "Bike",
      },

      {
        key: "travel-insurance",
        title: "Travel Insurance Calculator",
        icon: "Plane",
      },
    ],
  },
];

const advantageItems = [
  { title: "One of the best Prices", text: "Guaranteed" },
  { title: "Unbiased Advice", text: "Keeping customers first" },
  { title: "100% Reliable", text: "Clear, transparent comparison" },
  { title: "Claims Support", text: "Made stress-free" },
  { title: "Happy to Help", text: "Every day of the week" },
];

const testimonials = [
  "Very simple to use, friendly website.",
  "Got a good deal without needing to speak to multiple agents.",
  "The services are helpful in making the right choice.",
];

const partners = ["LIC", "HDFC Life", "ICICI Lombard", "Niva Bupa", "TATA AIG", "Bajaj Allianz"];

export default function HomePage() {

  const navigate = useNavigate();
  return (
    <div className="bg-[#f4f6fb]">
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 pb-8 pt-7 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">
              Let&apos;s find you the Best Insurance
            </h1>
            <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#0aa36e]" />
                51 insurers offering competitive prices
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#0aa36e]" />
                Quick, easy and hassle free
              </span>
            </div>
          </div>

          <div className="mt-8 border-2 rounded-lg  border-blue-800 bg-white" id="products">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
              {products.map(({ title, tag, icon: Icon, color, bg, to }) => (
                <Link
                  key={title}
                  to={to}
                  className="group relative flex min-h-32 flex-col items-center justify-center m-1  px-3 py-5 text-center bg-gray-100 transition hover:bg-[#f7fbff]"
                >
                  <span className="mb-2 min-h-5 text-xs font-bold leading-5 text-[#f58220]">
                    {tag}
                  </span>
                  <span className={`grid h-12 w-12 place-items-center rounded-lg ${bg} ${color}`}>
                    <Icon size={25} />
                  </span>
                  <span className="mt-3 max-w-32 text-sm font-semibold leading-5 text-slate-900">
                    {title}
                  </span>
                </Link>
              ))}
            </div>
          </div>


        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        <div className="flex gap-4 overflow-x-auto pb-2">
          {promoCards.map((card) => (
            <div
              key={card.title}
              className={`min-w-64 rounded-lg border border-slate-200 border-l-4 ${card.accent} bg-white p-4 shadow-sm`}
            >
              <p className="text-sm font-bold text-slate-950">{card.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-11">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <h2 className="text-3xl font-bold leading-tight text-slate-950">
              What makes PolicySift one of India&apos;s favourite places to buy insurance?
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {trustItems.map((item) => (
              <div key={item.title} className="rounded-lg border border-slate-200 bg-[#f8fafc] p-5">
                <p className="text-2xl font-bold text-slate-950">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-5 flex max-w-3xl flex-wrap justify-center gap-3">
          {actionLinks.map(({ title, icon: Icon, to }) => (
            <Link
              key={title}
              to={to}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 shadow-sm transition hover:border-[#0065ff] hover:text-[#0065ff]"
            >
              <Icon size={17} />
              {title}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-950">Popular calculators</h2>
              <p className="mt-1 text-sm text-slate-600">
                User-friendly calculators tailored to help make informed financial decisions.
              </p>
            </div>
            <Calculator size={28} className="text-[#0065ff]" />
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {calculatorGroups.map((group) => (
              <div key={group.title} className="rounded-lg border border-slate-200 bg-[#f8fafc] p-4">
                <p className="text-sm font-bold text-slate-950">{group.title}</p>
                <div className="mt-3 grid gap-2">
                  {group.calculators.map((calculator) => (
                    <button
                      key={calculator.key}
                      type="button"
                      onClick={() =>
                        navigate(
                          `/calculators?calculator=${calculator.key}`
                        )
                      }
                      className="flex items-center justify-between rounded-md bg-white px-3 py-2 text-left text-sm font-semibold text-slate-700 transition hover:text-[#0065ff]"
                    >
                      {calculator.title}

                      <ChevronRight size={16} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-11">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-950">PolicySift Advantage</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
              When you buy insurance, you get more than financial safety: clear
              terms, quick quotes, stress-free claims, and support when things
              get complicated.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {advantageItems.map((item) => (
                <div key={item.title} className="rounded-lg border border-slate-200 bg-[#f8fafc] p-4">
                  <p className="text-sm font-bold text-slate-950">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="app" className="rounded-lg border border-slate-200 bg-[#f8fbff] p-6">
            <div className="flex items-start gap-4">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-lg bg-[#e7f0ff] text-[#0065ff]">
                <Smartphone size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-950">Get the PolicySift app</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Compare policies, store documents, track policy status, and
                  download policy copies with a single tap.
                </p>
              </div>
            </div>
            <button
              type="button"
              className="mt-6 rounded-lg bg-[#0065ff] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0054d6]"
            >
              Get the app now
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-950">
            What our customers are saying
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((quote) => (
              <div
                key={quote}
                className="rounded-lg border border-slate-200 bg-[#f8fafc] p-4"
              >
                <div className="mb-2 flex text-[#f58220]">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star
                      key={star}
                      size={15}
                      fill="currentColor"
                    />
                  ))}
                </div>

                <p className="text-sm leading-6 text-slate-700">
                  {quote}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">


            <div className="mt-8">
              <PartnersSection />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <div className="grid h-14 w-14 place-items-center rounded-lg bg-[#fff3e6] text-[#f58220]">
              <HelpCircle size={28} />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-slate-950">Have a question?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Support is available for buying, renewals, claims, and account help.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { title: "Talk to Expert", text: "+91-74281-19439", icon: MessageCircle },
              { title: "Claim Support", text: "amit1sri@gmail.com", icon: ClipboardCheck },
              { title: "Account Help", text: "Manage policy status", icon: ShieldCheck },
            ].map(({ title, text, icon: Icon }) => (
              <div key={title} className="rounded-lg border border-slate-200 bg-[#f8fafc] p-4">
                <Icon size={22} className="text-[#0065ff]" />
                <p className="mt-3 text-sm font-bold text-slate-950">{title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
