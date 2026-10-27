import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  Car,
  Bike,
  Shield,
  FileCheck2,
  Wrench,
  HelpCircle,
  ChevronRight,
  Info,
  Users,
  Award,
  Zap,
  Activity,
  Globe,
  Settings,
  Scale
} from "lucide-react";

// DYNAMIC CONFIG FOR HERO SECTION
const PAGE_CONFIG = {
  car: {
    badge: "Car Insurance",
    title: "Compare Car Insurance Plans & Save More",
    description: "Renew, buy or compare comprehensive and third-party car insurance plans from leading insurers."
  },
  bike: {
    badge: "Two Wheeler Insurance",
    title: "Protect Your Bike With Affordable Coverage",
    description: "Compare bike insurance plans with instant renewal, cashless garages and low premiums."
  }
};

// DYNAMIC ADD-ONS
const ADDONS_BY_VARIANT = {
  car: [
    { title: "Zero Depreciation", desc: "Get full claim amount without depreciation deduction on repaired parts." },
    { title: "Engine Protection", desc: "Covers repair costs for damage to engine parts caused by water logging or oil leakage." },
    { title: "Return To Invoice", desc: "Receive the original invoice price of the car (including taxes/registration) in case of total theft/loss." },
    { title: "Roadside Assistance", desc: "24/7 emergency roadside support for towing, flat tires, battery jumpstart, and minor repairs." },
    { title: "Consumables Cover", desc: "Covers costs of engine oil, coolant, nuts, bolts, and other one-time use parts during claim." },
    { title: "NCB Protection", desc: "Retain your No Claim Bonus discount even if you make a claim during the policy term." }
  ],
  bike: [
    { title: "Zero Depreciation", desc: "Zero deduction on depreciation of bike parts during repair claims." },
    { title: "Roadside Assistance", desc: "Emergency assistance for flat tires, towing, key loss, and minor break-downs." },
    { title: "Engine Protection", desc: "Hassle-free coverage for engine repair and mechanical breakdown expenses." },
    { title: "Helmet Cover", desc: "Provides allowance or replacement coverage for expensive helmet damage in case of accident." },
    { title: "Accessories Cover", desc: "Insure electrical and non-electrical customized accessories on your two-wheeler." },
    { title: "Personal Accident Cover", desc: "Additional high-value personal accident coverage for both rider and pillion passenger." }
  ]
};

// INSURER BRANDS
const INSURERS_BY_VARIANT = {
  car: ["HDFC Ergo", "ICICI Lombard", "Bajaj Allianz", "Tata AIG", "Reliance General", "Digit"],
  bike: ["HDFC Ergo", "Bajaj Allianz", "Digit", "Reliance", "ICICI Lombard", "Tata AIG"]
};

// CLAIMS TIMELINE STEPS
const CLAIM_STEPS = [
  { step: "1", title: "Report Incident", desc: "Submit accident date, location, and photos via the PolicySift app or support line." },
  { step: "2", title: "Upload Documents", desc: "Instantly upload your driving license, registration card (RC), and policy document." },
  { step: "3", title: "Vehicle Inspection", desc: "A surveyor performs a digital or physical inspection to assess damages within 4 hours." },
  { step: "4", title: "Garage Repair", desc: "Get your vehicle towed or driven to any of our 6,000+ cashless network garages." },
  { step: "5", title: "Claim Settlement", desc: "Insurer settles bills directly with the garage. Pay only the minor compulsory deductible!" }
];

// STATS
const TRUST_STATS = [
  { label: "Policies Compared", value: "50L+" },
  { label: "Cashless Garages", value: "6,000+" },
  { label: "Claim Support Satisfaction", value: "98%" },
  { label: "Claims Assistance", value: "24x7" }
];

// WHAT YOU'LL COMPARE
const COMPARE_ITEMS_BY_VARIANT = {
  car: [
    { title: "Premium", desc: "Compare comprehensive & third-party annual costs side-by-side." },
    { title: "IDV", desc: "Check Insured Declared Value settings across insurers to get the right market worth." },
    { title: "Claim Settlement Ratio", desc: "Review claim approval percentages to pick the most reliable partner." },
    { title: "Garage Network", desc: "Find insurers with the highest density of cashless garages in your city." },
    { title: "Add-ons", desc: "Compare cost and availability of zero-dep, engine protect, and passenger covers." },
    { title: "NCB Benefits", desc: "Compare No Claim Bonus structures and transfer rates up to 50%." }
  ],
  bike: [
    { title: "Premium", desc: "Compare low-cost third-party and comprehensive two-wheeler coverages." },
    { title: "Garage Network", desc: "Ensure quick cashless garage repair locations for daily commute peace of mind." },
    { title: "IDV", desc: "Optimize your bike's market valuation to secure complete recovery coverage." },
    { title: "Roadside Assistance", desc: "Verify towing and on-site repair assistance rates for long rides." },
    { title: "Add-ons", desc: "Hassle-free helmet, accessories, and pillion rider cover comparisons." },
    { title: "Claim Process", desc: "Pick insurers offering digital-first video claims approvals in minutes." }
  ]
};

// POLICY TYPES
const POLICY_TYPES_BY_VARIANT = {
  car: [
    {
      title: "Third Party Insurance",
      coverage: "Mandatory by law. Covers third-party property damage, bodily injuries, or demise.",
      benefits: "Avoid legal fines, covers third-party liabilities entirely.",
      idealFor: "Older cars with very low market value."
    },
    {
      title: "Comprehensive Insurance",
      coverage: "Covers third-party liabilities + damages to your own car due to accidents, fire, theft, or natural calamities.",
      benefits: "Complete security, customizable with zero-dep and engine protection add-ons.",
      idealFor: "All standard cars, new purchases, and daily drivers."
    },
    {
      title: "Standalone Own Damage",
      coverage: "Covers only damages to your own car. Third-party cover must be bought separately.",
      benefits: "Flexible own-damage protection at lower premium rates.",
      idealFor: "Car owners who already have a long-term third-party liability cover."
    }
  ],
  bike: [
    {
      title: "Third Party Insurance",
      coverage: "Legal mandate. Covers liabilities arising from damages, injuries, or demise caused to third-party individuals.",
      benefits: "Guarantees legal compliance, covers high financial third-party liabilities.",
      idealFor: "Older scooters or commuter bikes."
    },
    {
      title: "Comprehensive Insurance",
      coverage: "Covers third-party liability + own-damage cover for your bike against accident, storm, theft, or self-ignition.",
      benefits: "Maximum safety, add-on options like helmet cover and personal accident riders.",
      idealFor: "Sports bikes, daily commute two-wheelers, and new scooter purchases."
    },
    {
      title: "Standalone Own Damage",
      coverage: "Covers strictly damages, theft, or loss of your own two-wheeler.",
      benefits: "Low-cost own damage shield if you already have a multi-year third party mandate.",
      idealFor: "Owners with active standalone third-party policies."
    }
  ]
};

// WHY BUY THROUGH POLICYSIFT
const WHY_BUY_CARDS = [
  { title: "Instant Quotes", desc: "Enter registration details and see customized rates from 20+ insurers in 30 seconds." },
  { title: "Cashless Repairs", desc: "Zero out-of-pocket bills at any of our 6,000+ partner cashless repair network garages." },
  { title: "Dedicated Claims Support", desc: "A claims manager stands by you from incident reporting to settlement release." },
  { title: "No Hidden Charges", desc: "Get direct insurer pricing with zero agent markups or platform service fees." },
  { title: "100% Online Process", desc: "No physical inspection or paperwork needed for quick renewals." },
  { title: "Trusted Insurers", desc: "Partnered exclusively with IRDAI-registered, top claim-settlement insurance brands." }
];

// PREMIUM FACTORS
const FACTORS_BY_VARIANT = {
  car: [
    { title: "Vehicle Age", desc: "Older cars have lower market value (IDV), reducing own-damage premiums but carrying higher maintenance risk." },
    { title: "City of Registration", desc: "Metro registration cities carry higher premiums due to higher congestion and accident frequencies." },
    { title: "Fuel Type", desc: "CNG and Diesel engines attract slightly higher premiums than Petrol or Electric variants." },
    { title: "Claims History (NCB)", desc: "Making no claims earns you a No Claim Bonus discount, slashing premiums up to 50% over 5 years." },
    { title: "Insured Declared Value (IDV)", desc: "Setting a higher IDV increases the payout limit but moderately increases annual premiums." }
  ],
  bike: [
    { title: "Engine Capacity (cc)", desc: "Higher cubic capacity (cc) engines attract significantly higher third-party and comprehensive rates." },
    { title: "Location", desc: "Urban zones have higher premium values compared to rural areas due to accident density." },
    { title: "Vehicle Age", desc: "Market depreciation reduces the bike's IDV, which decreases the own-damage portion of the premium." },
    { title: "Claims History", desc: "No claim years reward you with NCB discounts, lowering renewal rates annually." },
    { title: "Add-ons Selection", desc: "Optional riders like Helmet Cover, Zero Dep, and Pillion Cover increase the final premium cost." }
  ]
};

// FAQ
const FAQS = [
  { q: "What is Zero Depreciation Cover?", a: "Zero Dep cover ensures that during a claim, the insurance company pays 100% of the cost of replaced rubber, glass, plastic, and metal parts without subtracting any depreciation. Standard policies deduct up to 50% depreciation on these items." },
  { q: "What is NCB (No Claim Bonus)?", a: "No Claim Bonus is a discount given on own-damage premiums for every claim-free year. It starts at 20% after the first year and can build up to 50% after five consecutive claim-free years." },
  { q: "How does IDV affect premium?", a: "Insured Declared Value (IDV) is the maximum sum assured (market value) of your vehicle. A higher IDV ensures larger payouts in case of total theft or loss, which increases the own-damage premium proportionally." },
  { q: "Can I transfer my No Claim Bonus?", a: "Yes, NCB belongs to the driver, not the vehicle. When selling your old vehicle, you can obtain an NCB certificate from your insurer and apply the same discount to your new vehicle's premium." },
  { q: "What is cashless claim settlement?", a: "With cashless settlement, your vehicle is repaired at a network garage. The insurer pays the garage directly for approved repairs, and you only pay compulsory deductibles and non-covered items." },
  { q: "Can I renew an expired insurance policy?", a: "Yes, you can renew expired policies online. However, if the policy has been expired for over 90 days, you lose your accumulated NCB discount, and the insurer might require a quick digital vehicle inspection." }
];

export default function VehicleInsurancePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // VARIANT CONTROLLER
  const variant = useMemo(() => {
    return searchParams.get("variant") || "car";
  }, [searchParams]);

  // COMMON FORM STATES
  const [regNo, setRegNo] = useState("");
  const [purchaseYear, setPurchaseYear] = useState("2024");
  const [city, setCity] = useState("Mumbai");
  const [prevClaims, setPrevClaims] = useState("No");
  const [expiryStatus, setExpiryStatus] = useState("Not expired");

  // CAR-SPECIFIC STATES
  const [fuelType, setFuelType] = useState("Petrol");
  const [carType, setCarType] = useState("Hatchback");

  // BIKE-SPECIFIC STATES
  const [bikeType, setBikeType] = useState("Commuter");
  const [engineCC, setEngineCC] = useState("100cc");

  // RESET FORM FIELD DEFAULTS ON VARIANT CHANGE
  useEffect(() => {
    setRegNo("");
    setPurchaseYear("2024");
    setCity("Mumbai");
    setPrevClaims("No");
    setExpiryStatus("Not expired");
    setFuelType("Petrol");
    setCarType("Hatchback");
    setBikeType("Commuter");
    setEngineCC("100cc");
  }, [variant]);

  // FORM SUBMIT HANDLER -> COMPARISON REDIRECTION
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!regNo) {
      alert("Please enter your Vehicle Registration Number.");
      return;
    }

    if (variant === "car") {
      navigate(
        `/compare-quotes?type=car&variant=car&fuel=${fuelType.toLowerCase()}&vehicle=${carType.toLowerCase()}&claims=${prevClaims.toLowerCase()}&regNo=${regNo}&year=${purchaseYear}&city=${city}`
      );
    } else {
      navigate(
        `/compare-quotes?type=car&variant=bike&bikeType=${bikeType.toLowerCase()}&cc=${engineCC.replace("cc", "")}&claims=${prevClaims.toLowerCase()}&regNo=${regNo}&year=${purchaseYear}&city=${city}`
      );
    }
  };

  const currentConfig = PAGE_CONFIG[variant] || PAGE_CONFIG.car;
  const currentAddons = ADDONS_BY_VARIANT[variant] || ADDONS_BY_VARIANT.car;
  const currentInsurers = INSURERS_BY_VARIANT[variant] || INSURERS_BY_VARIANT.car;
  const currentCompareItems = COMPARE_ITEMS_BY_VARIANT[variant] || COMPARE_ITEMS_BY_VARIANT.car;
  const currentPolicyTypes = POLICY_TYPES_BY_VARIANT[variant] || POLICY_TYPES_BY_VARIANT.car;
  const currentFactors = FACTORS_BY_VARIANT[variant] || FACTORS_BY_VARIANT.car;

  return (
    <div className="bg-[#f4f6fb] min-h-screen pb-16 text-slate-900 font-sans">

      {/* Hero and Quote Form Section */}
      <section className="bg-gray-200 text-white relative overflow-hidden py-12 lg:py-16">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Tabs for Car / Bike variant */}
          <div className="flex flex-wrap gap-2 mb-8 bg-slate-800/80 p-1.5 rounded-2xl max-w-fit border border-slate-700/50 backdrop-blur-md">
            <button
              onClick={() => navigate("/vehicle-insurance?variant=car")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition duration-155 flex items-center gap-1.5 cursor-pointer ${variant === "car"
                ? "bg-[#0065ff] text-white shadow-md"
                : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
            >
              <Car size={14} /> Car Insurance
            </button>
            <button
              onClick={() => navigate("/vehicle-insurance?variant=bike")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition duration-155 flex items-center gap-1.5 cursor-pointer ${variant === "bike"
                ? "bg-[#0065ff] text-white shadow-md"
                : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
            >
              <Bike size={14} /> Two Wheeler Insurance
            </button>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">

            {/* Hero Content Left */}
            <div className="space-y-6">
              <span className="bg-[#0065ff]/10 border border-[#0065ff]/20 text-[#0065ff] font-extrabold text-xs uppercase px-3.5 py-2 rounded-full tracking-wider bg-white/5 backdrop-blur-sm">
                {currentConfig.badge}
              </span>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight text-blue-500">
                {currentConfig.title}
              </h1>
              <p className="text-slate-900 text-base sm:text-lg leading-relaxed max-w-xl">
                {currentConfig.description}
              </p>

              <div className="flex flex-wrap gap-6 text-xs font-bold text-slate-900">
                <span className="inline-flex items-center gap-2">
                  <Shield size={18} className="text-emerald-500" />
                  Instant policy generation
                </span>
                <span className="inline-flex items-center gap-2 border-l border-slate-700 pl-6">
                  <Wrench size={18} className="text-emerald-500" />
                  Cashless repairs in minutes
                </span>
              </div>
            </div>

            {/* Quote Form Card Right */}
            <div className="bg-slate-800/90 border border-slate-700/50 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 backdrop-blur-md">
              <h3 className="text-xl font-black tracking-tight flex items-center gap-2 text-white">
                <FileCheck2 className="text-[#0065ff]" size={22} />
                Get Vehicle Quotes
              </h3>
              <p className="text-xs text-slate-400 mt-1">Enter your details to generate dynamic insurer premiums.</p>

              <form onSubmit={handleFormSubmit} className="mt-6 space-y-4 text-slate-800">

                {/* Reg Number */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide mb-1.5">Vehicle Registration Number</label>
                  <input
                    type="text" required placeholder="MH-12-AB-1234"
                    value={regNo}
                    onChange={(e) => setRegNo(e.target.value.toUpperCase())}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 text-slate-100 px-4 py-3 text-sm outline-none transition focus:border-[#0065ff] uppercase"
                  />
                </div>

                {/* Grid Common Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide mb-1.5">Purchase Year</label>
                    <select
                      value={purchaseYear}
                      onChange={(e) => setPurchaseYear(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 text-slate-100 px-3 py-2.5 text-xs font-semibold outline-none focus:border-[#0065ff]"
                    >
                      {["2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017"].map((y) => (
                        <option key={y} value={y} className="bg-slate-800">{y}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide mb-1.5">City</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 text-slate-100 px-3 py-2.5 text-xs font-semibold outline-none focus:border-[#0065ff]"
                    >
                      {["Mumbai", "Delhi NCR", "Bangalore", "Pune", "Chennai", "Kolkata", "Hyderabad"].map((c) => (
                        <option key={c} value={c} className="bg-slate-800">{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Variant-Specific Fields */}
                {variant === "car" ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide mb-1.5">Fuel Type</label>
                      <select
                        value={fuelType}
                        onChange={(e) => setFuelType(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-900 text-slate-100 px-3 py-2.5 text-xs font-semibold outline-none focus:border-[#0065ff]"
                      >
                        {["Petrol", "Diesel", "CNG", "Electric"].map((f) => (
                          <option key={f} value={f} className="bg-slate-800">{f}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide mb-1.5">Vehicle Type</label>
                      <select
                        value={carType}
                        onChange={(e) => setCarType(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-900 text-slate-100 px-3 py-2.5 text-xs font-semibold outline-none focus:border-[#0065ff]"
                      >
                        {["Hatchback", "Sedan", "SUV", "Luxury"].map((v) => (
                          <option key={v} value={v} className="bg-slate-800">{v}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide mb-1.5">Bike Type</label>
                      <select
                        value={bikeType}
                        onChange={(e) => setBikeType(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-900 text-slate-100 px-3 py-2.5 text-xs font-semibold outline-none focus:border-[#0065ff]"
                      >
                        {["Commuter", "Sports", "Cruiser", "Scooter"].map((b) => (
                          <option key={b} value={b} className="bg-slate-800">{b}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide mb-1.5">Engine Capacity</label>
                      <select
                        value={engineCC}
                        onChange={(e) => setEngineCC(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-900 text-slate-100 px-3 py-2.5 text-xs font-semibold outline-none focus:border-[#0065ff]"
                      >
                        {["100cc", "125cc", "150cc", "200cc+"].map((cc) => (
                          <option key={cc} value={cc} className="bg-slate-800">{cc}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* Expiry and Previous Claims */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide mb-1.5">Expiry Status</label>
                    <select
                      value={expiryStatus}
                      onChange={(e) => setExpiryStatus(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 text-slate-100 px-3 py-2.5 text-xs font-semibold outline-none focus:border-[#0065ff]"
                    >
                      {["Not expired", "Expired < 90 Days", "Expired > 90 Days"].map((status) => (
                        <option key={status} value={status} className="bg-slate-800">{status}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide mb-1.5">Previous Claims?</label>
                    <div className="flex gap-2 h-9">
                      {["Yes", "No"].map((choice) => (
                        <button
                          key={choice} type="button"
                          onClick={() => setPrevClaims(choice)}
                          className={`flex-1 border rounded-xl text-xs font-extrabold transition cursor-pointer ${prevClaims === choice
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
                  Compare Insurance Quotes <ArrowRight size={16} />
                </button>

              </form>
            </div>

          </div>
        </div>
      </section>

      {/* What You'll Compare Section */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[#0065ff] text-xs font-black uppercase tracking-wider">Plan Parameters</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1.5">
            What You'll Compare on PolicySift
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Every vehicle quote provides clear metrics side-by-side to take the complexity out of insurance.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {currentCompareItems.map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition">
              <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <span className="h-6 w-6 rounded-md bg-[#0065ff]/10 text-[#0065ff] text-xs font-black grid place-items-center shrink-0">
                  {idx + 1}
                </span>
                {item.title}
              </h4>
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic Add-ons section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[#0065ff] text-xs font-black uppercase tracking-wider">Customize Your Shield</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1.5">
            Tailor Payouts with Premium Add-ons
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Expand standard coverage rules by selecting add-on riders customized for {variant === "car" ? "cars" : "two-wheelers"}.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {currentAddons.map((addon) => (
            <div key={addon.title} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition flex gap-4">
              <div className="h-10 w-10 rounded-2xl bg-sky-50 text-sky-600 grid place-items-center shrink-0">
                <Shield size={20} />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-950 text-base">{addon.title}</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{addon.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leading Insurers logo Section */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 tracking-tight text-center mb-8">
            Compare Plans From Leading Insurers
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {currentInsurers.map((ins) => (
              <div
                key={ins}
                className="grid min-h-16 place-items-center rounded-2xl border border-slate-100 bg-[#f8fafc] px-3 text-center text-sm font-extrabold text-slate-700 shadow-sm"
              >
                {ins}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Claims Support Journey Timeline */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#0065ff] text-xs font-black uppercase tracking-wider">Claims Made Easy</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1.5">
            5-Step Cashless Claims Journey
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            No endless paperwork. Claim approvals are processed digitally in a few simple steps.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>

          <div className="grid gap-6 lg:grid-cols-5 relative z-10">
            {CLAIM_STEPS.map((step) => (
              <div key={step.step} className="bg-slate-900 text-white rounded-3xl p-6 shadow-md border border-slate-800 flex flex-col justify-between h-full hover:border-[#0065ff] transition">
                <div>
                  <span className="h-8 w-8 rounded-full bg-[#0065ff] text-white text-xs font-black grid place-items-center mb-4">
                    {step.step}
                  </span>
                  <h4 className="font-extrabold text-white text-lg">{step.title}</h4>
                  <p className="text-xs text-slate-400 mt-3 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust statistics Section */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {TRUST_STATS.map((stat) => (
            <div key={stat.label} className="first:border-l-0 border-l border-slate-100">
              <span className="block text-3xl sm:text-4xl font-black text-slate-950">{stat.value}</span>
              <span className="block text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Policy Types Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[#0065ff] text-xs font-black uppercase tracking-wider">Understand Payout Structures</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1.5">
            Different Types of {variant === "car" ? "Car" : "Bike"} Insurance Policies
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Select the cover type matching your requirements, vehicle age, and risk budget.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {currentPolicyTypes.map((type) => (
            <div key={type.title} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
              <div>
                <span className="inline-block bg-[#0065ff]/5 text-[#0065ff] text-xs font-black uppercase px-2.5 py-1 rounded-md mb-4">
                  {type.title}
                </span>

                <div className="space-y-3.5">
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">What it covers</span>
                    <p className="text-xs font-semibold text-slate-700 mt-0.5">{type.coverage}</p>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Key Benefit</span>
                    <p className="text-xs font-semibold text-slate-700 mt-0.5">{type.benefits}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-slate-100 pt-4">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ideal For</span>
                <p className="text-xs font-black text-slate-900 mt-0.5">{type.idealFor}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Buy Through PolicySift Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[#0065ff] text-xs font-black uppercase tracking-wider">The PolicySift Advantage</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1.5">
            Why Buy Insurance on PolicySift?
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Compare plans easily and get guided claim support at zero additional cost.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_BUY_CARDS.map((card, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition">
              <div className="h-10 w-10 bg-[#0065ff]/10 text-[#0065ff] rounded-xl grid place-items-center mb-4">
                <Shield size={20} />
              </div>
              <h4 className="font-extrabold text-slate-900 text-base">{card.title}</h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Premium Factors Section */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-[#f0f9ff] border border-blue-100 rounded-[40px] p-8 sm:p-12 shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="text-[#0065ff] text-xs font-black uppercase tracking-wider">Education Center</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mt-1.5">
              Key Factors Influencing Your Premium
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Understanding these parameters helps you optimize coverages and control insurance costs.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {currentFactors.map((factor, i) => (
              <div key={i} className="bg-white border border-blue-50/50 p-6 rounded-2xl shadow-sm">
                <span className="inline-block bg-[#0065ff]/5 text-[#0065ff] font-extrabold text-[10px] px-2.5 py-1 rounded-md mb-3">
                  Factor {i + 1}
                </span>
                <h4 className="font-extrabold text-slate-900 text-sm">{factor.title}</h4>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{factor.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight text-center mb-8">
          Frequently Answered Doubts
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {FAQS.map((faq, idx) => (
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

      {/* Optional Renewal Banner (CTA Banner) */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-[36px] p-8 sm:p-12 text-center relative overflow-hidden border border-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,101,255,0.15),transparent_60%)]"></div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Renew Your Vehicle Insurance In Under 2 Minutes
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Compare instant plans from 20+ IRDAI-approved insurance providers side-by-side. 100% online KYC & credit checkout.
            </p>
            <button
              onClick={() => {
                navigate(`/compare-quotes?type=car&variant=${variant}`);
              }}
              className="bg-[#0065ff] hover:bg-[#0054d6] text-white font-extrabold text-xs px-6 py-3.5 rounded-xl transition duration-150 shadow-md inline-flex items-center gap-1.5 cursor-pointer"
            >
              Compare Quotes <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
