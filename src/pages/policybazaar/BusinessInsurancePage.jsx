import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  ShieldAlert,
  Users,
  Building,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  FileText,
  Lock
} from "lucide-react";

const corporateSectors = [
  {
    icon: Building,
    title: "Professional Indemnity",
    desc: "Covers defense costs and damages against professional negligence lawsuits or data loss claims. Essential for IT, Consulting, and Legal firms."
  },
  {
    icon: ShieldAlert,
    title: "Public Liability & Assets",
    desc: "Protects business properties against fire, break-ins, and natural disasters, while covering third-party bodily injuries on your premises."
  },
  {
    icon: Users,
    title: "Group Health Cover",
    desc: "Provide comprehensive medical benefits, maternity perks, and pre-existing disease waivers to your staff starting from just 7 employees."
  },
  {
    icon: Lock,
    title: "Cyber Security Insurance",
    desc: "Covers financial losses, ransom negotiation expenses, and customer notification liabilities resulting from server malware hacks."
  }
];

const faqs = [
  {
    question: "Is Business Insurance tax deductible in India?",
    answer: "Yes, premiums paid for commercial policies (like Fire, Public Liability, Group Health, and Cyber Cover) are fully write-off eligible as regular business operating expenses under Section 37 of the Income Tax Act."
  },
  {
    question: "What is a Directors & Officers (D&O) liability cover?",
    answer: "D&O insurance protects the personal assets of company directors and managers against legal actions taken by shareholders, regulators, or customers alleging mismanagement or breach of fiduciary duties."
  }
];

export default function BusinessInsurancePage() {
  const navigate = useNavigate();
  
  const [industry, setIndustry] = useState("IT / Consulting");
  const [revenue, setRevenue] = useState("50L - 5Cr");
  const [employeeSize, setEmployeeSize] = useState("11 - 50");
  const [liabilityLimit, setLiabilityLimit] = useState("10000000"); // 1 Crore default

  const handleCalculateQuotes = (e) => {
    e.preventDefault();
    navigate(
      `/compare-quotes?type=business&industry=${industry}&revenue=${revenue}&employees=${employeeSize}&cover=${liabilityLimit}`
    );
  };

  return (
    <div className="bg-[#f4f6fb] min-h-screen pb-16">
      
      {/* Hero Section */}
      <section className="bg-slate-900 text-white relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            
            {/* Left Column */}
            <div className="space-y-6">
              <span className="bg-purple-500/10 border border-purple-500/20 text-purple-400 font-extrabold text-xs uppercase px-3 py-1.5 rounded-full tracking-wider">
                Corporate Risk Protection
              </span>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                Secure your company. Protect your liabilities.
              </h1>
              <p className="text-slate-300 text-lg leading-8 max-w-xl">
                Shield your business assets, employees, and executive management from costly claims, fires, cyber hacks, and operational litigation.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-300">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle size={16} className="text-[#0aa36e]" />
                  Section 37 Premium tax write-offs
                </span>
                <span className="inline-flex items-center gap-1.5 border-l border-slate-700 pl-4">
                  <CheckCircle size={16} className="text-[#0aa36e]" />
                  Risk engineering audits included
                </span>
              </div>
            </div>

            {/* Right Estimator Widget Form */}
            <div className="bg-slate-800/95 border border-slate-700/60 rounded-[36px] p-6 sm:p-8 shadow-2xl text-slate-100">
              <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                <TrendingUp className="text-purple-400" size={22} />
                Corporate Premium Estimator
              </h3>
              <p className="text-xs text-slate-400 mt-1">Get initial estimations tailored to industry scale.</p>

              <form onSubmit={handleCalculateQuotes} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide mb-1.5">Industry Sector</label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900/65 px-4 py-3 outline-none transition focus:border-purple-400 text-sm font-semibold text-slate-200 cursor-pointer"
                  >
                    <option value="IT / Consulting">IT / Consulting (Standard Risk)</option>
                    <option value="Retail Shop">Retail Shop & Wholesale</option>
                    <option value="Manufacturing">Manufacturing & Factories (High Risk)</option>
                    <option value="Healthcare">Healthcare & Special Clinics</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide mb-1.5">Annual Revenue</label>
                    <select
                      value={revenue}
                      onChange={(e) => setRevenue(e.target.value)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900/65 px-4 py-3 outline-none transition focus:border-purple-400 text-sm font-semibold text-slate-200 cursor-pointer"
                    >
                      <option value="Under 50L">Under ₹50 Lakhs</option>
                      <option value="50L - 5Cr">₹50L - ₹5 Crores</option>
                      <option value="5Cr - 25Cr">₹5Cr - ₹25 Crores</option>
                      <option value="Over 25Cr">Over ₹25 Crores</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide mb-1.5">Employee Group Size</label>
                    <select
                      value={employeeSize}
                      onChange={(e) => setEmployeeSize(e.target.value)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900/65 px-4 py-3 outline-none transition focus:border-purple-400 text-sm font-semibold text-slate-200 cursor-pointer"
                    >
                      <option value="1 - 10">1 - 10 Staff</option>
                      <option value="11 - 50">11 - 50 Staff</option>
                      <option value="51 - 250">51 - 250 Staff</option>
                      <option value="Over 250">250+ Staff</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide mb-1.5">Liability Coverage Limit</label>
                  <select
                    value={liabilityLimit}
                    onChange={(e) => setLiabilityLimit(e.target.value)}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900/65 px-4 py-3 outline-none transition focus:border-purple-400 text-sm font-semibold text-slate-200 cursor-pointer"
                  >
                    <option value="5000000">₹50 Lakhs</option>
                    <option value="10000000">₹1 Crore</option>
                    <option value="20000000">₹2 Crores</option>
                    <option value="50000000">₹5 Crores</option>
                    <option value="100000000">₹10 Crores</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0065ff] hover:bg-[#0054d6] text-white font-extrabold text-sm py-4.5 rounded-2xl transition duration-150 shadow-sm flex items-center justify-center gap-2 cursor-pointer border-none"
                >
                  View Corporate Quotes <ArrowRight size={18} />
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Coverage Catalog Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight text-center mb-10">
          Core Commercial Coverages We Support
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {corporateSectors.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex gap-4 hover:shadow-md transition">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                <Icon size={24} />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-950 leading-tight">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight text-center mb-8">
          Frequently Answered Corporate Queries
        </h2>
        <div className="space-y-4">
          {faqs.map(({ question, answer }) => (
            <div key={question} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                <FileText size={16} className="text-purple-500" />
                {question}
              </h4>
              <p className="mt-2.5 text-xs leading-6 text-slate-600">{answer}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
