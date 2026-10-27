import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Plane,
  Briefcase,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Shield,
  Clock,
  Globe,
  FileText
} from "lucide-react";

const keyBenefits = [
  {
    icon: Shield,
    title: "$50,000+ Medical Cover",
    text: "Get comprehensive coverage for emergency hospitalization, outpatient care, and dental relief abroad."
  },
  {
    icon: Briefcase,
    title: "Baggage Loss & Delay",
    text: "Reimbursement for essential items and clothing if checked-in baggage is lost or delayed by the airline."
  },
  {
    icon: Clock,
    title: "Trip Cancellation & Delay",
    text: "Compensation for pre-paid non-refundable expenses if flights are cancelled or delayed beyond 6 hours."
  },
  {
    icon: Globe,
    title: "Cashless Claims Globally",
    text: "Access to cashless medical networks across major cities globally. Simply contact the 24/7 hotline."
  }
];

const faqItems = [
  {
    question: "Do I need travel insurance for Schengen visa?",
    answer: "Yes, travel insurance is mandatory for Schengen visa applications. The policy must cover medical emergency expenses up to at least €30,000 and include repatriation cover."
  },
  {
    question: "How does destination affect my premium?",
    answer: "Medical costs in USA and Canada are extremely high compared to the rest of the world. Thus, policies covering USA and Canada carry a higher premium (usually 2x the standard rate)."
  },
  {
    question: "Is COVID-19 medical expense covered?",
    answer: "Most premium travel plans today include COVID-19 coverage for hospitalization expenses, quarantine allowance (if medically advised), and flight cancellations due to positive test reports."
  }
];

export default function TravelInsurancePage() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("Schengen Area");
  const [duration, setDuration] = useState("10");
  const [age, setAge] = useState("30");
  const [medicalLimit, setMedicalLimit] = useState("100000"); // 100,000 USD default

  const handleGetQuotes = (e) => {
    e.preventDefault();
    navigate(
      `/compare-quotes?type=travel&destination=${destination}&duration=${duration}&age=${age}&medicalLimit=${medicalLimit}`
    );
  };

  return (
    <div className="bg-[#f4f6fb] min-h-screen pb-16">
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">

            {/* Left Content */}
            <div className="space-y-6">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-sky-700">
                International Travel Insurance
              </p>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950 leading-tight">
                Fly stress-free with global cashless coverage.
              </h1>
              <p className="max-w-xl text-lg leading-8 text-slate-600">
                Compare and buy travel insurance starting at just ₹40 per day. Handled online, instant visa-ready policy copy delivered in minutes.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-slate-600 font-semibold">
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#0aa36e]" />
                  Mandatory Schengen approved policies
                </span>
                <span className="inline-flex items-center gap-2 border-l border-slate-200 pl-4">
                  <CheckCircle2 size={16} className="text-[#0aa36e]" />
                  24/7 Global Helpline & Cashless Support
                </span>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="rounded-[36px] border border-white/70 bg-white/85 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.07)]">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Check Travel Premium Rates</h3>
              <p className="text-xs text-slate-500 mt-1">Get quote estimations based on travel details.</p>

              <form onSubmit={handleGetQuotes} className="mt-6 space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700 uppercase tracking-wide">Destination Country/Region</label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-500 focus:bg-white text-sm font-semibold text-slate-800"
                  >
                    <option value="Schengen Area">Schengen Area (Europe)</option>
                    <option value="USA & Canada">USA & Canada (High Medical Cost)</option>
                    <option value="Asia">Asia (Thailand, Bali, Singapore, etc.)</option>
                    <option value="Rest of World">Rest of the World</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-700 uppercase tracking-wide">Trip Duration</label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-500 focus:bg-white text-sm font-semibold text-slate-800"
                    >
                      <option value="7">7 Days</option>
                      <option value="10">10 Days</option>
                      <option value="15">15 Days</option>
                      <option value="30">30 Days</option>
                      <option value="45">45 Days</option>
                      <option value="60">60 Days</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-700 uppercase tracking-wide">Eldest Traveler Age</label>
                    <select
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-500 focus:bg-white text-sm font-semibold text-slate-800"
                    >
                      {[18, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70].map((ageVal) => (
                        <option key={ageVal} value={ageVal}>{ageVal} Years</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700 uppercase tracking-wide">Medical Expenses Limit</label>
                  <select
                    value={medicalLimit}
                    onChange={(e) => setMedicalLimit(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-500 focus:bg-white text-sm font-semibold text-slate-800"
                  >
                    <option value="50000">$50,000 USD</option>
                    <option value="100000">$100,000 USD</option>
                    <option value="250000">$250,000 USD</option>
                    <option value="500000">$500,000 USD</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0065ff] hover:bg-[#0054d6] text-white font-extrabold text-sm py-4.5 rounded-2xl transition duration-150 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  View Travel Quotes <ArrowRight size={18} />
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight text-center mb-10">
          PolicySift Travel Shield Protections
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {keyBenefits.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 mb-4">
                <Icon size={22} />
              </div>
              <h3 className="text-lg font-black text-slate-900 leading-tight">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Info Callout Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[36px] bg-slate-950 p-8 text-white shadow-xl lg:p-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="bg-[#fff3e6] text-[#f58220] font-black text-[10px] uppercase px-3 py-1.5 rounded-lg border border-[#ffd5ab]">
              Emergency Repatriation
            </span>
            <h2 className="text-3xl font-black tracking-tight leading-tight">
              Medical Repatriation Cover
            </h2>
            <p className="text-sm leading-7 text-slate-300">
              All plans recommended through PolicySift provide mandatory medical evacuation and repatriation benefits back to India up to the full sum insured limit, taking care of specialized medical flights and companion travel expenses automatically.
            </p>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/compare-quotes?type=travel")}
              className="bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-sm py-4 px-6 rounded-2xl transition"
            >
              Compare Live Quotes
            </button>
            <Link
              to="/claims-support"
              className="border border-white/20 hover:border-white text-white font-extrabold text-sm py-4 px-6 rounded-2xl transition text-center"
            >
              Understand Support
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight text-center mb-8">
          Frequently Answered Questions
        </h2>
        <div className="space-y-4">
          {faqItems.map(({ question, answer }) => (
            <div key={question} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h4 className="text-sm font-extrabold text-slate-900">{question}</h4>
              <p className="mt-2.5 text-xs leading-6 text-slate-600">{answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
