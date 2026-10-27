import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  Home,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  Lock,
  Flame,
  Award
} from "lucide-react";

export default function HomeInsurancePage() {
  const navigate = useNavigate();

  // Form states
  const [pincode, setPincode] = useState("");
  const [propertyAge, setPropertyAge] = useState("0-5 Years");
  const [coverageType, setCoverageType] = useState("Both");
  const [securitySystems, setSecuritySystems] = useState("Yes");
  const [propertyType, setPropertyType] = useState("Apartment");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!pincode) {
      alert("Please enter your property pincode.");
      return;
    }
    // Route to compare quotes with home parameters
    navigate(
      `/compare-quotes?type=home&pincode=${pincode}&age=${propertyAge}&coverage=${coverageType.toLowerCase()}&security=${securitySystems.toLowerCase()}&propType=${propertyType.toLowerCase()}`
    );
  };

  return (
    <div className="bg-[#f4f6fb] min-h-screen pb-16 text-slate-900 font-sans">
      
      {/* Hero and Quote Form */}
      <section className="bg-slate-900 text-white relative overflow-hidden py-12 lg:py-16">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            
            {/* Hero Left */}
            <div className="space-y-6">
              <span className="bg-[#0065ff]/10 border border-[#0065ff]/20 text-[#0065ff] font-extrabold text-xs uppercase px-3.5 py-2 rounded-full tracking-wider bg-white/5 backdrop-blur-sm">
                Property Protection
              </span>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight text-white">
                Protect Your Home & Valuables Instantly
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
                Secure your building structure and precious household contents against fire, theft, floods, and earthquakes from just ₹3/day.
              </p>

              <div className="flex flex-wrap gap-6 text-xs font-bold text-slate-300">
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck size={18} className="text-emerald-500" />
                  Instant policy issuance
                </span>
                <span className="inline-flex items-center gap-2 border-l border-slate-700 pl-6">
                  <Lock size={18} className="text-emerald-500" />
                  ₹50 Lakhs structural cover
                </span>
              </div>
            </div>

            {/* Form Right */}
            <div className="bg-slate-800/90 border border-slate-700/50 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 backdrop-blur-md">
              <h3 className="text-xl font-black tracking-tight flex items-center gap-2 text-white">
                <FileCheck2 className="text-[#0065ff]" size={22} />
                Get Home Quotes
              </h3>
              <p className="text-xs text-slate-400 mt-1">Enter property metrics to calculate tailored annual premiums.</p>

              <form onSubmit={handleFormSubmit} className="mt-6 space-y-4 text-slate-800">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide mb-1.5">Property Pincode</label>
                  <input
                    type="text" required placeholder="400001" maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 text-slate-100 px-4 py-3 text-sm outline-none transition focus:border-[#0065ff]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide mb-1.5">Property Type</label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 text-slate-100 px-3 py-2.5 text-xs font-semibold outline-none focus:border-[#0065ff]"
                    >
                      {["Apartment", "Independent Villa", "Rented Home", "Row House"].map((t) => (
                        <option key={t} value={t} className="bg-slate-800">{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide mb-1.5">Property Age</label>
                    <select
                      value={propertyAge}
                      onChange={(e) => setPropertyAge(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 text-slate-100 px-3 py-2.5 text-xs font-semibold outline-none focus:border-[#0065ff]"
                    >
                      {["0-5 Years", "6-15 Years", "16-30 Years", "30+ Years"].map((a) => (
                        <option key={a} value={a} className="bg-slate-800">{a}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide mb-1.5">Coverage Scope</label>
                    <select
                      value={coverageType}
                      onChange={(e) => setCoverageType(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 text-slate-100 px-3 py-2.5 text-xs font-semibold outline-none focus:border-[#0065ff]"
                    >
                      {["Structure Only", "Contents Only", "Both"].map((c) => (
                        <option key={c} value={c} className="bg-slate-800">{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide mb-1.5">CCTV / Security Guard?</label>
                    <div className="flex gap-2 h-9">
                      {["Yes", "No"].map((choice) => (
                        <button
                          key={choice} type="button"
                          onClick={() => setSecuritySystems(choice)}
                          className={`flex-1 border rounded-xl text-xs font-extrabold transition cursor-pointer ${
                            securitySystems === choice
                              ? "bg-[#0065ff] border-[#0065ff] text-white shadow-sm"
                              : "border-slate-700 bg-slate-900 text-slate-300 hover:text-white"
                          }`}
                        >
                          {choice}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0065ff] hover:bg-[#0054d6] text-white font-extrabold text-sm py-3 px-4 rounded-xl transition duration-150 shadow-sm flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                >
                  Compare Home Quotes <ArrowRight size={16} />
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Benefits section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#0065ff] text-xs font-black uppercase tracking-wider">Comprehensive Cover</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1.5">
            What is Covered in PolicySift Home Insurance?
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Get complete financial reimbursement for property losses against multiple unexpected disasters.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Fire & Natural Disasters", desc: "Covers damage caused by fire, lightning, storm, earthquake, and flooding.", icon: Flame },
            { title: "Theft & Burglary Cover", desc: "Compensation for stolen valuables, electronics, appliances, and gold.", icon: Lock },
            { title: "Alternative Lodging", desc: "Rent allowances for alternative temporary accommodation during repairs.", icon: Home },
            { title: "Third Party Liabilities", desc: "Covers medical or legal liabilities for injuries suffered by visitors at home.", icon: Shield }
          ].map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="h-10 w-10 bg-[#0065ff]/10 text-[#0065ff] rounded-xl grid place-items-center mb-4">
                    <Icon size={20} />
                  </div>
                  <h4 className="font-extrabold text-slate-950 text-base">{benefit.title}</h4>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trust stats */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Homes Insured", value: "15L+" },
            { label: "Pincodes Covered", value: "12,000+" },
            { label: "Claim Settlement Ratio", value: "98.6%" },
            { label: "Expert Advisors", value: "24x7 Help" }
          ].map((stat) => (
            <div key={stat.label} className="first:border-l-0 border-l border-slate-100">
              <span className="block text-3xl sm:text-4xl font-black text-slate-950">{stat.value}</span>
              <span className="block text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight text-center mb-8">
          Frequently Answered Doubts
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { q: "Is home insurance mandatory for home loans?", a: "Most banks require structural home insurance policies before releasing home loan amounts to protect their collateral value." },
            { q: "Can tenants buy home insurance?", a: "Yes. Tenants can buy 'Contents Only' home insurance to secure their personal belongings, furniture, and appliances." },
            { q: "How is structural premium calculated?", a: "Premium is calculated based on built-up area and reconstruction costs, not market land value." },
            { q: "Does it cover jewellery and cash?", a: "Yes, you can secure valuables and jewellery under contents coverage with a sub-limit declarations option." }
          ].map((faq, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <h4 className="font-extrabold text-slate-900 text-sm flex items-start gap-2 leading-snug">
                <HelpCircle size={16} className="text-[#0065ff] shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs leading-relaxed text-slate-500 mt-2.5">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
