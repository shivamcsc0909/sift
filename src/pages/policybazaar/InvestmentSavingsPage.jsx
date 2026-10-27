import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  TrendingUp,
  Percent,
  Calendar,
  Wallet,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  ChevronRight,
  Info,
  X,
  CreditCard,
  Briefcase,
  Users,
  Award,
  Zap,
  BookOpen,
  ArrowRightLeft,
  Home,
  User,
  Globe,
  CheckCircle2,
  DollarSign
} from "lucide-react";

// PAGE CONFIGURATIONS FOR VARIANTS
const PAGE_CONFIG = {
  wealth: {
    badge: "Wealth Creation",
    title: "Grow Wealth With Smart Investment Plans",
    description: "Compare high-performing mutual-fund ULIPs and wealth-builder plans. Start small, build a massive corpus tax-free.",
    cta: "Compare Wealth Plans"
  },
  child: {
    badge: "Child Future Security",
    title: "Secure Your Child's Future",
    description: "Plan for college admissions, weddings, or career launches. Keep their future safe even in your absence with premium waiver options.",
    cta: "Compare Child Plans"
  },
  retirement: {
    badge: "Retirement & Pension",
    title: "Build Your Retirement Corpus",
    description: "Secure a guaranteed lifetime pension and lock in annuity rates early. Build a stress-free retirement corpus starting today.",
    cta: "Compare Pension Plans"
  },
  dollar: {
    badge: "Global Investing",
    title: "Invest In Global Opportunities",
    description: "Hedge against currency depreciation. Invest in US dollar-denominated assets and globally diversified funds.",
    cta: "Compare Dollar Plans"
  },
  guaranteed: {
    badge: "Assured Returns",
    title: "Earn Predictable Guaranteed Returns",
    description: "Earn guaranteed interest and lock in fixed returns. Zero market risk, 100% tax-free under Section 10(10D).",
    cta: "Compare Guaranteed Plans"
  }
};

// PLANS BY VARIANT MOCK DATABASE
const PLANS_BY_VARIANT = {
  wealth: [
    {
      id: "w-hdfc-builder",
      title: "HDFC Wealth Builder (ULIP)",
      provider: "HDFC Life",
      guaranteedRate: "14.2% Est.",
      lockIn: "5 Years",
      minPremium: 4000,
      risk: "Aggressive",
      tags: ["High Growth", "Zero Charges"],
      description: "Invest in top-performing equity funds with zero premium allocation charges. Ideal for high wealth accumulation.",
      pros: ["100% of premium goes to fund investment", "Tax-free switches between equity & debt", "Loyalty additions boost final maturity value"]
    },
    {
      id: "w-max-smart",
      title: "Max Life Smart Wealth Plan",
      provider: "Max Life Insurance",
      guaranteedRate: "12.8% Est.",
      lockIn: "5 Years",
      minPremium: 3000,
      risk: "Balanced",
      tags: ["Capital Protection", "Tax-Free"],
      description: "A balanced mixture of equity growth and debt stability, offering capital protection with upside potential.",
      pros: ["Guaranteed loyalty additions", "Flexible premium payment options", "Section 80C and 10(10D) tax benefits"]
    },
    {
      id: "w-icici-protect",
      title: "ICICI Wealth Protector",
      provider: "ICICI Prudential",
      guaranteedRate: "13.5% Est.",
      lockIn: "5 Years",
      minPremium: 5000,
      risk: "Aggressive",
      tags: ["Market Linked", "Free Switches"],
      description: "Optimize returns by dynamically managing equity exposure. Built for aggressive wealth seekers.",
      pros: ["Unlimited free switches between 10+ funds", "Life cover of 10x annualized premium", "Wealth boosters added every 5 years"]
    },
    {
      id: "w-sbi-smart",
      title: "SBI Smart Elite ULIP",
      provider: "SBI Life",
      guaranteedRate: "11.5% Est.",
      lockIn: "5 Years",
      minPremium: 3000,
      risk: "Balanced",
      tags: ["Balanced Risk", "Tax Free"],
      description: "Steady compound growth with majorly debt-oriented investments and blue-chip equities.",
      pros: ["Low fund management fees", "Accidental death benefit rider included", "Partial withdrawal allowed after 5 years"]
    },
    {
      id: "w-lic-nivesh",
      title: "LIC Nivesh Plus",
      provider: "LIC of India",
      guaranteedRate: "8.2% Est.",
      lockIn: "5 Years",
      minPremium: 10000,
      risk: "Conservative",
      tags: ["Low Risk", "Sovereign Guarantee"],
      description: "Single premium or short-term payment plan offering secure capital appreciation backed by LIC's trust.",
      pros: ["Backed by sovereign guarantee", "Very low risk profile", "Maturity proceeds tax-exempt"]
    }
  ],
  child: [
    {
      id: "c-education-shield",
      title: "Child Education Shield",
      provider: "HDFC Life",
      guaranteedRate: "13.8% Est.",
      lockIn: "5 Years",
      minPremium: 3000,
      risk: "Balanced",
      tags: ["Premium Waiver", "Education Milestone Payouts"],
      description: "Secures child's milestone educational costs. On parent's demise, all future premiums are waived while policy remains active.",
      pros: ["Guaranteed waiver of premium on death", "Milestone payouts matching college admission years", "Tax-free maturity under Section 10(10D)"]
    },
    {
      id: "c-future-fund",
      title: "Future Education Fund",
      provider: "Bajaj Allianz",
      guaranteedRate: "12.5% Est.",
      lockIn: "5 Years",
      minPremium: 2500,
      risk: "Balanced",
      tags: ["Flexible Target", "Goal Secure"],
      description: "Secure your child's college admission funds with a mix of equity and debt investments to beat education inflation.",
      pros: ["Double death benefit option available", "Partial withdrawals allowed for secondary education", "Loyalty additions on policy milestones"]
    },
    {
      id: "c-smart-scholar",
      title: "Smart Scholar Plan",
      provider: "SBI Life",
      guaranteedRate: "11.2% Est.",
      lockIn: "5 Years",
      minPremium: 4000,
      risk: "Conservative",
      tags: ["Capital Guarantee", "Premium Waiver"],
      description: "Conservative child plan providing assured capital benefits on maturity, insulating the education fund from market downturns.",
      pros: ["In-built premium waiver benefit", "Guaranteed maturity sum assured", "Life cover on parent included"]
    },
    {
      id: "c-icici-gift",
      title: "ICICI Pru Smart Kid",
      provider: "ICICI Prudential",
      guaranteedRate: "14.1% Est.",
      lockIn: "5 Years",
      minPremium: 5000,
      risk: "Aggressive",
      tags: ["High Equity Exposure", "Milestone Payouts"],
      description: "Aggressively grow your child's education fund through high-performing mid-cap and small-cap equity funds.",
      pros: ["Dynamic fund allocation system", "Option to switch to safe funds near maturity", "Tax-free payouts at ages 18, 20, and 22"]
    }
  ],
  retirement: [
    {
      id: "r-pension-plus",
      title: "Pension Plus Guaranteed",
      provider: "LIC of India",
      guaranteedRate: "6.8% Annuity",
      lockIn: "10 Years",
      minPremium: 5000,
      risk: "Conservative",
      tags: ["Guaranteed Annuity", "Joint Life Option"],
      description: "Lock in high annuity rates early to secure a lifelong pension. Option to pass pension to spouse upon demise.",
      pros: ["Sovereign-backed lifetime pension", "Rates locked in at purchase", "Return of purchase price to nominees"]
    },
    {
      id: "r-guaranteed-income",
      title: "Guaranteed Retirement Income",
      provider: "HDFC Life",
      guaranteedRate: "7.2% Annuity",
      lockIn: "10 Years",
      minPremium: 6000,
      risk: "Conservative",
      tags: ["Tax-Deferred", "Deferment Period Options"],
      description: "Accumulate wealth and defer payouts to secure a significantly higher pension payout starting later in life.",
      pros: ["High pension rates for longer deferment", "Tax-exempt accumulation phase", "Lump sum commutation allowed up to 60%"]
    },
    {
      id: "r-lifetime-pension",
      title: "Lifetime Pension Plan",
      provider: "Tata AIA Life",
      guaranteedRate: "6.5% Annuity",
      lockIn: "10 Years",
      minPremium: 4000,
      risk: "Conservative",
      tags: ["Assured Income", "Add-on Health Rider"],
      description: "Receive monthly retirement payouts with built-in critical illness cover, ensuring medical costs are taken care of.",
      pros: ["Critical illness rider with pension benefit", "Guaranteed monthly income for life", "Regular compounding additions in accumulation phase"]
    },
    {
      id: "r-icici-easy",
      title: "ICICI Easy Retirement",
      provider: "ICICI Prudential",
      guaranteedRate: "9.5% Est. Growth",
      lockIn: "5 Years",
      minPremium: 3000,
      risk: "Balanced",
      tags: ["Pension ULIP", "Equity Accumulation"],
      description: "Build retirement corpus through equity-linked investments, converting the total to annuity upon retirement.",
      pros: ["Top-up facility to increase retirement savings", "Zero entry charges", "Choice of annuity provider at vesting"]
    }
  ],
  dollar: [
    {
      id: "d-usd-growth",
      title: "USD Growth Builder",
      provider: "Global Wealth Access",
      guaranteedRate: "9.8% USD Est.",
      lockIn: "3 Years",
      minPremium: 500,
      risk: "Aggressive",
      tags: ["US Dollar Assets", "Hedge Currency Risk"],
      description: "Invest in US indices and tech equities. Protect your capital from domestic currency depreciation.",
      pros: ["Hedge against domestic currency drops", "Direct access to top US equities and bonds", "Quarterly dollar payouts option"]
    },
    {
      id: "d-global-wealth",
      title: "Global Wealth Access Plan",
      provider: "International Opportunity",
      guaranteedRate: "8.5% USD Est.",
      lockIn: "5 Years",
      minPremium: 300,
      risk: "Balanced",
      tags: ["Global Diversification", "Low Currency Risk"],
      description: "A balanced global fund investing in US treasuries, European blue-chips, and Asian growth markets.",
      pros: ["Fully diversified international assets", "Managed by top global fund managers", "Low expense ratio structure"]
    },
    {
      id: "d-intl-opp",
      title: "International Opportunity Plan",
      provider: "US Wealth Partners",
      guaranteedRate: "11.2% USD Est.",
      lockIn: "5 Years",
      minPremium: 1000,
      risk: "Aggressive",
      tags: ["High Tech Focus", "Dollar Denominated"],
      description: "Aggressive portfolio targeting global AI, biotech, and high-growth sectors. Denominated entirely in USD.",
      pros: ["Capitalized on tech sector tailwinds", "Direct dollar denomination and settlement", "Tax optimized offshore structure"]
    },
    {
      id: "d-global-safe",
      title: "Global Safe Treasury Bond",
      provider: "US Treasury Advisory",
      guaranteedRate: "4.8% USD Assured",
      lockIn: "2 Years",
      minPremium: 200,
      risk: "Conservative",
      tags: ["US Treasuries", "Guaranteed Dollar Payouts"],
      description: "Extremely low-risk plan investing exclusively in US government debt. Assured capital safety in US dollars.",
      pros: ["Backed by US government reliability", "Guaranteed interest payouts", "Short lock-in period"]
    }
  ],
  guaranteed: [
    {
      id: "g-guaranteed-wealth",
      title: "Guaranteed Wealth Plan",
      provider: "Max Life Insurance",
      guaranteedRate: "6.9% Tax-Free",
      lockIn: "5 Years",
      minPremium: 3000,
      risk: "Conservative",
      tags: ["Fixed Return", "100% Tax Free"],
      description: "Secure a predictable future with completely guaranteed lump sum payouts. Zero market risk.",
      pros: ["Zero market volatility", "Section 80C & 10(10D) tax benefits", "Accidental death cover built-in"]
    },
    {
      id: "g-income-assured",
      title: "Income Assured Savings Plan",
      provider: "HDFC Life",
      guaranteedRate: "7.1% Fixed",
      lockIn: "7 Years",
      minPremium: 4000,
      risk: "Conservative",
      tags: ["Guaranteed Payouts", "Capital Safe"],
      description: "Get regular fixed payouts annually after premium payment term. Best for passive income streams.",
      pros: ["Assured payout rate locked at start", "Life cover of 11x annual premium included", "Exempt from taxes under Section 10(10D)"]
    },
    {
      id: "g-fixed-builder",
      title: "Fixed Return Builder",
      provider: "ICICI Prudential",
      guaranteedRate: "6.8% Fixed",
      lockIn: "5 Years",
      minPremium: 5000,
      risk: "Conservative",
      tags: ["Fixed Maturity", "Guaranteed Additions"],
      description: "Earn guaranteed additions on your accumulated money every single year. Safe, simple, and tax-efficient.",
      pros: ["Guaranteed additions compound yearly", "Short premium payment terms", "KYC-approved instant setup online"]
    },
    {
      id: "g-sbi-life-secure",
      title: "SBI Life Smart Platina Assure",
      provider: "SBI Life",
      guaranteedRate: "6.75% Fixed",
      lockIn: "7 Years",
      minPremium: 2500,
      risk: "Conservative",
      tags: ["Fixed Yield", "Capital Guarantee"],
      description: "Non-linked savings plan with guaranteed additions added at the end of each policy year.",
      pros: ["Backed by SBI brand reliability", "Simplified underwriting with quick issuance", "Tax-free maturity proceeds"]
    }
  ]
};

export default function InvestmentSavingsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // VARIANT DETECTOR
  const variant = useMemo(() => {
    return searchParams.get("variant") || "wealth";
  }, [searchParams]);

  // RISK FILTER STATE
  const [riskFilter, setRiskFilter] = useState("All");

  // CALCULATOR VARIABLES
  const [monthlyAmt, setMonthlyAmt] = useState(5000);
  const [returnRate, setReturnRate] = useState(12);
  const [years, setYears] = useState(15);
  const [childAge, setChildAge] = useState(5);
  const [targetAge, setTargetAge] = useState(18);
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);

  // COMPARE PLANS STATE
  const [selectedComparePlans, setSelectedComparePlans] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // CHECKOUT MODAL STATE
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Info, 2: Setup, 3: Success
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [investmentGoal, setInvestmentGoal] = useState("Wealth Creation");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [investmentFrequency, setInvestmentFrequency] = useState("Monthly");

  // FORMATTER UTILITY
  const formatVal = (val) => {
    if (variant === "dollar") {
      return "$" + val.toLocaleString("en-US");
    }
    return "₹" + val.toLocaleString("en-IN");
  };

  // SYNC FROM URL QUERY PARAMETERS
  useEffect(() => {
    const queryMonthly = searchParams.get("monthly");
    const queryYears = searchParams.get("years");
    const queryRate = searchParams.get("rate") || searchParams.get("returnRate");
    const queryChildAge = searchParams.get("childAge");
    const queryTargetAge = searchParams.get("targetAge");
    const queryCurrentAge = searchParams.get("age");
    const queryRetirementAge = searchParams.get("target");

    // Set defaults or values based on URL parameters
    if (variant === "wealth") {
      setMonthlyAmt(queryMonthly ? parseInt(queryMonthly) : 5000);
      setYears(queryYears ? parseInt(queryYears) : 15);
      setReturnRate(queryRate ? parseFloat(queryRate) : 12);
    } else if (variant === "child") {
      setChildAge(queryChildAge ? parseInt(queryChildAge) : 5);
      setTargetAge(queryTargetAge ? parseInt(queryTargetAge) : 18);
      setMonthlyAmt(queryMonthly ? parseInt(queryMonthly) : 5000);
      setReturnRate(queryRate ? parseFloat(queryRate) : 12);
    } else if (variant === "retirement") {
      setCurrentAge(queryCurrentAge ? parseInt(queryCurrentAge) : 30);
      setRetirementAge(queryRetirementAge ? parseInt(queryRetirementAge) : 60);
      setMonthlyAmt(queryMonthly ? parseInt(queryMonthly) : 10000);
      setReturnRate(queryRate ? parseFloat(queryRate) : 8);
    } else if (variant === "dollar") {
      setMonthlyAmt(queryMonthly ? parseInt(queryMonthly) : 500);
      setYears(queryYears ? parseInt(queryYears) : 10);
      setReturnRate(queryRate ? parseFloat(queryRate) : 9);
    } else if (variant === "guaranteed") {
      setMonthlyAmt(queryMonthly ? parseInt(queryMonthly) : 5000);
      setYears(queryYears ? parseInt(queryYears) : 10);
    }
  }, [variant, searchParams]);

  // RESET RISK FILTER ON VARIANT CHANGE
  useEffect(() => {
    setRiskFilter("All");
    setSelectedComparePlans([]);
  }, [variant]);

  // VARIANT AWARE DYNAMIC CALCULATOR LOGIC
  const calcDetails = useMemo(() => {
    switch (variant) {
      case "wealth": {
        const p = monthlyAmt;
        const i = (returnRate / 100) / 12;
        const n = years * 12;
        const totalInvested = p * n;
        const maturityValue = Math.round(p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i));
        const wealthGained = Math.round(maturityValue - totalInvested);
        return { totalInvested, wealthGained, maturityValue };
      }
      case "child": {
        const Y = Math.max(1, targetAge - childAge);
        const p = monthlyAmt;
        const i = (returnRate / 100) / 12;
        const n = Y * 12;
        const totalInvested = p * n;
        const projectedCorpus = Math.round(p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i));
        const targetCorpus = 2500000;
        const fundingGap = Math.max(0, targetCorpus - projectedCorpus);
        return { totalInvested, projectedCorpus, targetCorpus, fundingGap };
      }
      case "retirement": {
        const Y = Math.max(1, retirementAge - currentAge);
        const p = monthlyAmt;
        const i = (returnRate / 100) / 12;
        const n = Y * 12;
        const retirementCorpus = Math.round(p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i));
        const estimatedPension = Math.round((retirementCorpus * 0.06) / 12);
        return { retirementCorpus, estimatedPension, yearsOfAccumulation: Y };
      }
      case "dollar": {
        const p = monthlyAmt;
        const i = (returnRate / 100) / 12;
        const n = years * 12;
        const totalInvested = p * n;
        const projectedPortfolio = Math.round(p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i));
        const dollarGrowth = Math.round(projectedPortfolio - totalInvested);
        return { totalInvested, projectedPortfolio, dollarGrowth };
      }
      case "guaranteed": {
        const p = monthlyAmt;
        const Y = years;
        const n = Y * 12;
        const premiumPaid = p * n;
        const i = 0.06 / 12;
        const guaranteedMaturityValue = Math.round(p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i));
        const bonusAmount = Math.round(premiumPaid * 0.15);
        const totalValue = guaranteedMaturityValue + bonusAmount;
        return { premiumPaid, guaranteedMaturityValue, bonusAmount, totalValue };
      }
      default:
        return {};
    }
  }, [variant, monthlyAmt, returnRate, years, childAge, targetAge, currentAge, retirementAge]);

  // PLAN FILTERING (BY VARIANT & RISK)
  const filteredPlans = useMemo(() => {
    const plans = PLANS_BY_VARIANT[variant] || [];
    if (riskFilter === "All") return plans;
    return plans.filter((plan) => plan.risk.toLowerCase() === riskFilter.toLowerCase());
  }, [variant, riskFilter]);

  // GOAL BASED PRECONFIGURATIONS
  const handleGoalClick = (goalType) => {
    if (goalType === "home") {
      navigate("/investment-savings?variant=wealth&monthly=15000&years=10");
    } else if (goalType === "child") {
      navigate("/investment-savings?variant=child&childAge=3&targetAge=18&monthly=8000&returnRate=12");
    } else if (goalType === "marriage") {
      navigate("/investment-savings?variant=wealth&monthly=10000&years=7");
    } else if (goalType === "retirement") {
      navigate("/investment-savings?variant=retirement&age=28&target=60&monthly=12000&returnRate=8");
    } else if (goalType === "wealth") {
      navigate("/investment-savings?variant=wealth&monthly=5000&years=15");
    } else if (goalType === "global") {
      navigate("/investment-savings?variant=dollar&monthly=600&years=12&returnRate=9");
    }
  };

  // CHECKOUT INITIATOR
  const handleInvestClick = (plan) => {
    setSelectedPlan(plan);
    setCheckoutStep(1);
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!buyerName || !buyerEmail || !buyerPhone) {
      alert("Please fill out all required fields.");
      return;
    }
    setCheckoutStep(2);
  };

  // COMPARE HANDLERS
  const handleToggleCompare = (plan) => {
    if (selectedComparePlans.some((p) => p.id === plan.id)) {
      setSelectedComparePlans(selectedComparePlans.filter((p) => p.id !== plan.id));
    } else {
      if (selectedComparePlans.length >= 3) {
        alert("You can select up to 3 plans for comparison.");
        return;
      }
      setSelectedComparePlans([...selectedComparePlans, plan]);
    }
  };

  const currentConfig = PAGE_CONFIG[variant] || PAGE_CONFIG.wealth;

  return (
    <div className="bg-[#f4f6fb] min-h-screen pb-16 text-slate-900 font-sans">
      
      {/* Hero Section */}
      <section className="bg-slate-900 text-white relative overflow-hidden py-12 lg:py-16">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Navigation/Variant Tab Bar */}
          <div className="flex flex-wrap gap-2 mb-8 bg-slate-800/80 p-1.5 rounded-2xl max-w-fit border border-slate-700/50 backdrop-blur-md">
            {[
              { id: "wealth", label: "Wealth Creator" },
              { id: "child", label: "Child Education" },
              { id: "retirement", label: "Retirement & Pension" },
              { id: "dollar", label: "Global Dollar Assets" },
              { id: "guaranteed", label: "Guaranteed Return" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => navigate(`/investment-savings?variant=${tab.id}`)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition duration-150 cursor-pointer ${
                  variant === tab.id
                    ? "bg-[#0065ff] text-white shadow-md"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            
            {/* Hero Content Left */}
            <div className="space-y-6">
              <span className="bg-[#0065ff]/10 border border-[#0065ff]/20 text-[#0065ff] font-extrabold text-xs uppercase px-3.5 py-2 rounded-full tracking-wider bg-white/5 backdrop-blur-sm">
                {currentConfig.badge}
              </span>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight text-white">
                {currentConfig.title}
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
                {currentConfig.description}
              </p>
              
              <div className="flex flex-wrap gap-6 text-xs font-bold text-slate-300">
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck size={18} className="text-emerald-500" />
                  Section 80C tax deduction
                </span>
                <span className="inline-flex items-center gap-2 border-l border-slate-700 pl-6">
                  <ShieldCheck size={18} className="text-emerald-500" />
                  Tax-free maturity payouts (10D)
                </span>
              </div>
            </div>

            {/* Dynamic Calculator System Right */}
            <div className="bg-slate-800/90 border border-slate-700/50 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 backdrop-blur-md">
              
              {variant === "wealth" && (
                <div>
                  <h3 className="text-xl font-black tracking-tight flex items-center gap-2 text-white">
                    <TrendingUp className="text-[#0065ff]" size={22} />
                    SIP Wealth Calculator
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Estimate wealth gained through regular SIP investments.</p>
                  
                  <div className="mt-6 space-y-5">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                        <span>MONTHLY INVESTMENT</span>
                        <span className="text-[#0065ff]">₹{monthlyAmt.toLocaleString("en-IN")}</span>
                      </div>
                      <input
                        type="range" min="1000" max="100000" step="1000"
                        value={monthlyAmt}
                        onChange={(e) => setMonthlyAmt(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#0065ff]"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                        <span>EXPECTED RETURN RATE</span>
                        <span className="text-[#0065ff]">{returnRate}% p.a.</span>
                      </div>
                      <input
                        type="range" min="5" max="18" step="0.5"
                        value={returnRate}
                        onChange={(e) => setReturnRate(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#0065ff]"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                        <span>INVESTMENT PERIOD</span>
                        <span className="text-[#0065ff]">{years} Years</span>
                      </div>
                      <input
                        type="range" min="5" max="30" step="1"
                        value={years}
                        onChange={(e) => setYears(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#0065ff]"
                      />
                    </div>

                    <div className="border-t border-slate-700/60 pt-5 grid grid-cols-3 gap-2 text-center">
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Invested</span>
                        <span className="text-sm font-extrabold text-slate-200">₹{calcDetails.totalInvested.toLocaleString("en-IN")}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Wealth Gain</span>
                        <span className="text-sm font-extrabold text-emerald-500">₹{calcDetails.wealthGained.toLocaleString("en-IN")}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Maturity Value</span>
                        <span className="text-sm font-black text-[#0065ff]">₹{calcDetails.maturityValue.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {variant === "child" && (
                <div>
                  <h3 className="text-xl font-black tracking-tight flex items-center gap-2 text-white">
                    <BookOpen className="text-[#0065ff]" size={22} />
                    Education Planning Calculator
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Estimate funding for higher studies and graduation fees.</p>
                  
                  <div className="mt-6 space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                          <span>CHILD AGE</span>
                          <span className="text-[#0065ff]">{childAge} Years</span>
                        </div>
                        <input
                          type="range" min="0" max="15" step="1"
                          value={childAge}
                          onChange={(e) => setChildAge(parseInt(e.target.value))}
                          className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#0065ff]"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                          <span>TARGET AGE</span>
                          <span className="text-[#0065ff]">{targetAge} Years</span>
                        </div>
                        <input
                          type="range" min="16" max="25" step="1"
                          value={targetAge}
                          onChange={(e) => setTargetAge(parseInt(e.target.value))}
                          className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#0065ff]"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                        <span>MONTHLY SAVINGS</span>
                        <span className="text-[#0065ff]">₹{monthlyAmt.toLocaleString("en-IN")}</span>
                      </div>
                      <input
                        type="range" min="1000" max="100000" step="1000"
                        value={monthlyAmt}
                        onChange={(e) => setMonthlyAmt(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#0065ff]"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                        <span>EXPECTED RATE OF RETURN</span>
                        <span className="text-[#0065ff]">{returnRate}% p.a.</span>
                      </div>
                      <input
                        type="range" min="5" max="18" step="0.5"
                        value={returnRate}
                        onChange={(e) => setReturnRate(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#0065ff]"
                      />
                    </div>

                    <div className="border-t border-slate-700/60 pt-5 grid grid-cols-3 gap-2 text-center">
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Target Corpus</span>
                        <span className="text-sm font-extrabold text-slate-200">₹{calcDetails.targetCorpus.toLocaleString("en-IN")}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Projected Corpus</span>
                        <span className="text-sm font-extrabold text-[#0065ff]">₹{calcDetails.projectedCorpus.toLocaleString("en-IN")}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Funding Gap</span>
                        <span className="text-sm font-black text-rose-400">₹{calcDetails.fundingGap.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {variant === "retirement" && (
                <div>
                  <h3 className="text-xl font-black tracking-tight flex items-center gap-2 text-white">
                    <Users className="text-[#0065ff]" size={22} />
                    Retirement Corpus Calculator
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Estimate savings needed to lock in a lifetime monthly pension.</p>
                  
                  <div className="mt-6 space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                          <span>CURRENT AGE</span>
                          <span className="text-[#0065ff]">{currentAge} Years</span>
                        </div>
                        <input
                          type="range" min="18" max="55" step="1"
                          value={currentAge}
                          onChange={(e) => setCurrentAge(parseInt(e.target.value))}
                          className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#0065ff]"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                          <span>RETIREMENT AGE</span>
                          <span className="text-[#0065ff]">{retirementAge} Years</span>
                        </div>
                        <input
                          type="range" min="56" max="70" step="1"
                          value={retirementAge}
                          onChange={(e) => setRetirementAge(parseInt(e.target.value))}
                          className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#0065ff]"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                        <span>MONTHLY SAVINGS</span>
                        <span className="text-[#0065ff]">₹{monthlyAmt.toLocaleString("en-IN")}</span>
                      </div>
                      <input
                        type="range" min="1000" max="100000" step="1000"
                        value={monthlyAmt}
                        onChange={(e) => setMonthlyAmt(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#0065ff]"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                        <span>GROWTH RATE</span>
                        <span className="text-[#0065ff]">{returnRate}% p.a.</span>
                      </div>
                      <input
                        type="range" min="4" max="15" step="0.5"
                        value={returnRate}
                        onChange={(e) => setReturnRate(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#0065ff]"
                      />
                    </div>

                    <div className="border-t border-slate-700/60 pt-5 grid grid-cols-2 gap-2 text-center">
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Retirement Corpus</span>
                        <span className="text-sm font-extrabold text-[#0065ff]">₹{calcDetails.retirementCorpus.toLocaleString("en-IN")}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Est. Monthly Pension</span>
                        <span className="text-sm font-black text-emerald-400">₹{calcDetails.estimatedPension.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {variant === "dollar" && (
                <div>
                  <h3 className="text-xl font-black tracking-tight flex items-center gap-2 text-white">
                    <Globe className="text-cyan-400" size={22} />
                    Global Wealth Calculator
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Estimate compound growth on US-Dollar denominated investments.</p>
                  
                  <div className="mt-6 space-y-5">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                        <span>MONTHLY SAVINGS (USD)</span>
                        <span className="text-cyan-400">${monthlyAmt.toLocaleString("en-US")}</span>
                      </div>
                      <input
                        type="range" min="50" max="5000" step="50"
                        value={monthlyAmt}
                        onChange={(e) => setMonthlyAmt(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                        <span>USD INTEREST / GROWTH</span>
                        <span className="text-cyan-400">{returnRate}% p.a.</span>
                      </div>
                      <input
                        type="range" min="4" max="15" step="0.5"
                        value={returnRate}
                        onChange={(e) => setReturnRate(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                        <span>ACCUMULATION TIMELINE</span>
                        <span className="text-cyan-400">{years} Years</span>
                      </div>
                      <input
                        type="range" min="5" max="25" step="1"
                        value={years}
                        onChange={(e) => setYears(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                      />
                    </div>

                    <div className="border-t border-slate-700/60 pt-5 grid grid-cols-3 gap-2 text-center">
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Invested</span>
                        <span className="text-sm font-extrabold text-slate-200">${calcDetails.totalInvested.toLocaleString("en-US")}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dollar Growth</span>
                        <span className="text-sm font-extrabold text-emerald-400">${calcDetails.dollarGrowth.toLocaleString("en-US")}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Portfolio Value</span>
                        <span className="text-sm font-black text-cyan-400">${calcDetails.projectedPortfolio.toLocaleString("en-US")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {variant === "guaranteed" && (
                <div>
                  <h3 className="text-xl font-black tracking-tight flex items-center gap-2 text-white">
                    <Award className="text-amber-400" size={22} />
                    Guaranteed Maturity Calculator
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Estimate maturity benefits locked in early with zero market risk.</p>
                  
                  <div className="mt-6 space-y-5">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                        <span>MONTHLY PREMIUM</span>
                        <span className="text-amber-400">₹{monthlyAmt.toLocaleString("en-IN")}</span>
                      </div>
                      <input
                        type="range" min="1000" max="100000" step="1000"
                        value={monthlyAmt}
                        onChange={(e) => setMonthlyAmt(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                        <span>POLICY TERM</span>
                        <span className="text-amber-400">{years} Years</span>
                      </div>
                      <input
                        type="range" min="5" max="25" step="1"
                        value={years}
                        onChange={(e) => setYears(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
                      />
                    </div>

                    <div className="border-t border-slate-700/60 pt-5 grid grid-cols-3 gap-2 text-center">
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Premium Paid</span>
                        <span className="text-sm font-extrabold text-slate-200">₹{calcDetails.premiumPaid.toLocaleString("en-IN")}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Maturity addition</span>
                        <span className="text-sm font-extrabold text-emerald-400">₹{calcDetails.bonusAmount.toLocaleString("en-IN")}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Maturity</span>
                        <span className="text-sm font-black text-amber-400">₹{calcDetails.totalValue.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Graphical Proportion Indicator */}
              <div className="mt-6">
                <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden flex">
                  {variant === "child" ? (
                    <>
                      <div
                        style={{ width: `${Math.min(100, (calcDetails.projectedCorpus / calcDetails.targetCorpus) * 100)}%` }}
                        className="bg-[#0065ff] h-full"
                      ></div>
                      <div
                        style={{ width: `${Math.min(100, (calcDetails.fundingGap / calcDetails.targetCorpus) * 100)}%` }}
                        className="bg-rose-500 h-full"
                      ></div>
                    </>
                  ) : variant === "retirement" ? (
                    <>
                      <div style={{ width: "70%" }} className="bg-[#0065ff] h-full"></div>
                      <div style={{ width: "30%" }} className="bg-emerald-500 h-full"></div>
                    </>
                  ) : variant === "dollar" ? (
                    <>
                      <div
                        style={{ width: `${(calcDetails.totalInvested / calcDetails.projectedPortfolio) * 100}%` }}
                        className="bg-cyan-500 h-full"
                      ></div>
                      <div
                        style={{ width: `${(calcDetails.dollarGrowth / calcDetails.projectedPortfolio) * 100}%` }}
                        className="bg-emerald-500 h-full"
                      ></div>
                    </>
                  ) : variant === "guaranteed" ? (
                    <>
                      <div
                        style={{ width: `${(calcDetails.premiumPaid / calcDetails.totalValue) * 100}%` }}
                        className="bg-amber-500 h-full"
                      ></div>
                      <div
                        style={{ width: `${(calcDetails.bonusAmount / calcDetails.totalValue) * 100}%` }}
                        className="bg-emerald-500 h-full"
                      ></div>
                    </>
                  ) : (
                    <>
                      <div
                        style={{ width: `${(calcDetails.totalInvested / calcDetails.maturityValue) * 100}%` }}
                        className="bg-[#0065ff] h-full"
                      ></div>
                      <div
                        style={{ width: `${(calcDetails.wealthGained / calcDetails.maturityValue) * 100}%` }}
                        className="bg-emerald-500 h-full"
                      ></div>
                    </>
                  )}
                </div>
                <div className="flex justify-center gap-4 text-[10px] font-bold text-slate-400 mt-3">
                  <span className="flex items-center gap-1.5">
                    <span className={`h-2.5 w-2.5 rounded-full inline-block ${
                      variant === "dollar" ? "bg-cyan-500" : variant === "guaranteed" ? "bg-amber-500" : "bg-[#0065ff]"
                    }`}></span>
                    {variant === "guaranteed" ? "Premium Principal" : "Principal Saved"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 inline-block"></span>
                    {variant === "guaranteed" ? "Guaranteed Additions" : "Estimated Returns"}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Goal Based Investing Section */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[#0065ff] text-xs font-black uppercase tracking-wider">Goal Based Planning</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1.5">
            What are you planning your savings for?
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Click on any investment target below to immediately pre-configure the savings calculator.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { id: "home", label: "Buy A Home", icon: Home, color: "text-blue-600 bg-blue-50 border-blue-100 hover:border-blue-300" },
            { id: "child", label: "Child Education", icon: BookOpen, color: "text-indigo-600 bg-indigo-50 border-indigo-100 hover:border-indigo-300" },
            { id: "marriage", label: "Marriage Planning", icon: Percent, color: "text-pink-600 bg-pink-50 border-pink-100 hover:border-pink-300" },
            { id: "retirement", label: "Retirement Goal", icon: User, color: "text-amber-600 bg-amber-50 border-amber-100 hover:border-amber-300" },
            { id: "wealth", label: "Wealth Creation", icon: TrendingUp, color: "text-emerald-600 bg-emerald-50 border-emerald-100 hover:border-emerald-300" },
            { id: "global", label: "Global Investing", icon: Globe, color: "text-cyan-700 bg-cyan-50 border-cyan-100 hover:border-cyan-300" }
          ].map((goal) => {
            const Icon = goal.icon;
            return (
              <button
                key={goal.id}
                onClick={() => handleGoalClick(goal.id)}
                className={`flex flex-col items-center justify-center border p-5 rounded-2xl transition duration-150 cursor-pointer shadow-sm text-center ${goal.color}`}
              >
                <Icon size={24} className="mb-2.5" />
                <span className="text-xs font-bold leading-tight text-slate-800">{goal.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Plan Listing Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Header and Risk Selector */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 border-b border-slate-200 pb-6">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Top Investment Opportunities
            </h2>
            <p className="text-sm text-slate-600 mt-1.5">
              Showing tailored {variant} plans. Select up to 3 options to compare features.
            </p>
          </div>

          {/* Risk Profile Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-200/60 p-1 rounded-xl self-start">
            {["All", "Conservative", "Balanced", "Aggressive"].map((r) => (
              <button
                key={r}
                onClick={() => setRiskFilter(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition duration-150 cursor-pointer ${
                  riskFilter === r ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-950"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPlans.map((plan) => {
            const isCompared = selectedComparePlans.some((p) => p.id === plan.id);
            return (
              <div
                key={plan.id}
                className={`bg-white border rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between ${
                  isCompared ? "border-[#0065ff] ring-2 ring-[#0065ff]/10" : "border-slate-200"
                }`}
              >
                <div>
                  
                  {/* Plan Tags */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="bg-[#0065ff]/5 text-[#0065ff] text-[10px] font-black uppercase px-2.5 py-1 rounded-md">
                      {plan.provider}
                    </span>
                    
                    {/* Risk Badge */}
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                      plan.risk === "Conservative"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : plan.risk === "Balanced"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-rose-50 text-rose-700 border-rose-200"
                    }`}>
                      {plan.risk} Risk
                    </span>
                  </div>

                  {/* Title / Yield */}
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-black text-slate-900 leading-tight">{plan.title}</h3>
                      <p className="text-xs text-slate-500 mt-1">Lock-in: <span className="font-bold">{plan.lockIn}</span></p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase">Est. Returns</span>
                      <span className="text-base font-black text-emerald-600 leading-none">{plan.guaranteedRate}</span>
                    </div>
                  </div>

                  <p className="text-xs leading-5 text-slate-600 mt-3">{plan.description}</p>

                  {/* Pros Bullet Points */}
                  <div className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                    {plan.pros.map((pro, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Row Controls */}
                <div className="mt-8 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="block text-[9px] font-bold text-slate-400 uppercase">Min. Installment</span>
                      <span className="text-base font-black text-slate-900">{formatVal(plan.minPremium)}</span>
                    </div>
                    
                    {/* Compare Select Checkbox */}
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isCompared}
                        onChange={() => handleToggleCompare(plan)}
                        className="rounded border-slate-300 text-[#0065ff] focus:ring-[#0065ff]"
                      />
                      <span className="text-xs font-extrabold text-slate-600">Compare</span>
                    </label>
                  </div>

                  <button
                    onClick={() => handleInvestClick(plan)}
                    className="w-full bg-[#0065ff] hover:bg-[#0054d6] text-white font-extrabold text-xs py-3 px-4 rounded-xl transition duration-150 shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Invest Online <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredPlans.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center">
            <Info size={36} className="mx-auto text-slate-400 mb-3" />
            <h3 className="text-base font-extrabold text-slate-800">No {riskFilter} Plans Available</h3>
            <p className="text-xs text-slate-500 mt-1">Try resetting the risk filter or exploring other variants.</p>
          </div>
        )}

        {/* Bottom Floating Compare Bar */}
        {selectedComparePlans.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-5 py-3 rounded-full flex items-center gap-6 shadow-2xl z-40 border border-slate-700 max-w-full overflow-x-auto whitespace-nowrap">
            <span className="text-xs font-bold">
              Comparing <span className="text-[#0065ff] font-extrabold">{selectedComparePlans.length}</span> / 3 plans
            </span>
            
            <div className="flex items-center gap-2">
              {selectedComparePlans.map((p) => (
                <div key={p.id} className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
                  <span className="truncate max-w-32">{p.title}</span>
                  <button onClick={() => handleToggleCompare(p)} className="text-slate-400 hover:text-slate-200">
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowCompareModal(true)}
              className="bg-[#0065ff] hover:bg-[#0054d6] text-xs font-black px-4 py-2 rounded-lg cursor-pointer transition flex items-center gap-1"
            >
              <ArrowRightLeft size={12} /> Compare Selected Plans
            </button>
          </div>
        )}
      </section>

      {/* Trust & statistics Section */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <span className="block text-3xl sm:text-4xl font-black text-slate-950">100+</span>
            <span className="block text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">Investment Plans</span>
          </div>
          <div className="border-l border-slate-100">
            <span className="block text-3xl sm:text-4xl font-black text-slate-950">₹500 Cr+</span>
            <span className="block text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">Assets Facilitated</span>
          </div>
          <div className="border-l border-slate-100">
            <span className="block text-3xl sm:text-4xl font-black text-slate-950">50,000+</span>
            <span className="block text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">Investors Registered</span>
          </div>
          <div className="border-l border-slate-100">
            <span className="block text-3xl sm:text-4xl font-black text-[#0aa36e]">4.8/5</span>
            <span className="block text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">Customer Rating</span>
          </div>
        </div>
      </section>

      {/* Why Invest Through PolicySift */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[#0065ff] text-xs font-black uppercase tracking-wider">The PolicySift Advantage</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1.5">
            Why Invest Through PolicySift?
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Enjoy premium asset planning and digital-first checkout processes without hidden broker commissions.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Zero Hidden Charges", desc: "No agent brokerages or commissions. 100% of your premium goes straight into wealth building.", icon: Wallet },
            { title: "Certified Advisors", desc: "Get unbiased wealth consultations from IRDAI/SEBI certified financial experts.", icon: ShieldCheck },
            { title: "Tax Optimization", desc: "Leverage Section 80C and 10(10D) exemptions dynamically to maximize net savings.", icon: Percent },
            { title: "Digital Investment Setup", desc: "Instant KYC validation, UPI AutoPay, and mandate authentication in under 2 minutes.", icon: Zap },
            { title: "Goal-Based Planning", desc: "Align your mutual fund, ULIP, and pension milestones to real educational or retirement targets.", icon: Briefcase },
            { title: "Dedicated Support", desc: "Our 24/7 client concierge assists with claim settlements, nominee additions, and bank modifications.", icon: HelpCircle }
          ].map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={i} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition">
                <div className="h-10 w-10 bg-[#0065ff]/10 text-[#0065ff] rounded-xl grid place-items-center mb-4">
                  <Icon size={20} />
                </div>
                <h4 className="font-extrabold text-slate-900 text-base">{card.title}</h4>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tax Benefits Section */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-[#f0f9ff] border border-blue-100 rounded-[40px] p-8 sm:p-12 shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="text-[#0065ff] text-xs font-black uppercase tracking-wider">Tax Shield Benefits</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mt-1.5">
              Secure Your Capital & Cut Annual Income Taxes
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Every investment plan featured on PolicySift qualifies for major tax exemptions under the Income Tax Act.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { code: "Section 80C", title: "Premium Deductions", desc: "Claim deductions up to ₹1.5 Lakhs annually on premiums paid towards qualifying savings plans." },
              { code: "Section 10(10D)", title: "Tax-Free Maturity", desc: "Maturity proceeds and compounded returns are entirely exempt from income taxes (on aggregate premium under ₹5 Lakhs)." },
              { code: "Retirement Payouts", title: "Pension Exemptions", desc: "Up to 60% of commuting pension corpus can be withdrawn tax-free, with the rest yielding steady tax-deferred income." },
              { code: "Long-Term Growth", title: "Capital Gains Relief", desc: "ULIP fund switching is free from capital gains taxation, unlike traditional mutual fund trades." }
            ].map((tax, i) => (
              <div key={i} className="bg-white border border-blue-50/50 p-6 rounded-2xl shadow-sm">
                <span className="inline-block bg-[#0065ff]/5 text-[#0065ff] font-extrabold text-xs px-2.5 py-1 rounded-md mb-3">
                  {tax.code}
                </span>
                <h4 className="font-extrabold text-slate-900 text-sm">{tax.title}</h4>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{tax.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accordion FAQs */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight text-center mb-8">
          Frequently Answered Doubts
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { q: "What is a ULIP?", a: "A Unit Linked Insurance Plan (ULIP) is a dual-benefit investment that provides life insurance coverage alongside market-linked wealth generation (equity/debt/balanced funds) without upfront charge deductions." },
            { q: "What is a Guaranteed Return Plan?", a: "Guaranteed Return plans are fixed-income savings plans that guarantee maturity benefits, bonuses, or recurring payout annuity rates, eliminating market risk completely." },
            { q: "How are returns calculated?", a: "Returns are calculated using compound interest formulas. Market-linked plans use estimated rate returns (10-14% p.a.), while guaranteed return plans lock in a fixed p.a. yield (6-7.5% tax-free)." },
            { q: "Can I withdraw early?", a: "Most ULIPs and savings plans carry a mandatory lock-in period of 5 years. After 5 years, partial withdrawals are permitted for milestone events like medical emergencies or child education." },
            { q: "Are maturity proceeds taxable?", a: "Under Section 10(10D), maturity payouts are 100% tax-exempt if aggregate yearly premiums do not exceed ₹5 Lakhs. Demise payouts to nominees are always 100% tax-free." },
            { q: "What is a lock-in period?", a: "A lock-in period (typically 5 years for ULIPs and savings plans) is the mandatory duration during which you cannot surrender the policy or make partial lump-sum withdrawals." }
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

      {/* PLAN COMPARISON MODAL */}
      {showCompareModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
              <div className="flex items-center gap-2">
                <ArrowRightLeft className="text-[#0065ff]" size={20} />
                <h3 className="text-lg font-black text-slate-900 tracking-tight">Compare Investment Plans</h3>
              </div>
              <button
                onClick={() => setShowCompareModal(false)}
                className="text-slate-500 hover:text-slate-700 bg-slate-200/50 hover:bg-slate-200 p-1.5 rounded-lg transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Scrollable comparison grid */}
            <div className="p-6 overflow-y-auto">
              <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${selectedComparePlans.length + 1}, minmax(0, 1fr))` }}>
                
                {/* Feature Column */}
                <div className="space-y-6 text-xs font-bold text-slate-400 uppercase pt-32">
                  <div className="h-16 border-b border-slate-100 flex items-center">Provider</div>
                  <div className="h-16 border-b border-slate-100 flex items-center">Est. Yield / Returns</div>
                  <div className="h-16 border-b border-slate-100 flex items-center">Lock-in Period</div>
                  <div className="h-16 border-b border-slate-100 flex items-center">Risk Level</div>
                  <div className="h-16 border-b border-slate-100 flex items-center">Min Installment</div>
                  <div className="border-b border-slate-100 flex items-center py-4">Key Benefits</div>
                </div>

                {/* Plan Columns */}
                {selectedComparePlans.map((p) => (
                  <div key={p.id} className="text-center">
                    
                    {/* Header */}
                    <div className="pb-6 h-32 flex flex-col justify-between items-center px-2">
                      <span className="text-xs font-bold text-[#0065ff] bg-[#0065ff]/5 px-3 py-1 rounded-md">
                        {p.provider}
                      </span>
                      <h4 className="text-sm font-black text-slate-900 leading-tight mt-2 line-clamp-2">{p.title}</h4>
                    </div>

                    {/* Provider details */}
                    <div className="h-16 border-b border-slate-100 flex items-center justify-center text-xs font-extrabold text-slate-700">
                      {p.provider}
                    </div>

                    {/* Returns */}
                    <div className="h-16 border-b border-slate-100 flex items-center justify-center text-sm font-black text-emerald-600">
                      {p.guaranteedRate}
                    </div>

                    {/* Lock in */}
                    <div className="h-16 border-b border-slate-100 flex items-center justify-center text-xs font-bold text-slate-700">
                      {p.lockIn}
                    </div>

                    {/* Risk Level */}
                    <div className="h-16 border-b border-slate-100 flex items-center justify-center">
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                        p.risk === "Conservative"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : p.risk === "Balanced"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-rose-50 text-rose-700 border-rose-200"
                      }`}>
                        {p.risk} Risk
                      </span>
                    </div>

                    {/* Min Premium */}
                    <div className="h-16 border-b border-slate-100 flex items-center justify-center text-xs font-black text-slate-900">
                      {formatVal(p.minPremium)}
                    </div>

                    {/* Key Benefits */}
                    <div className="border-b border-slate-100 py-4 px-2 text-left space-y-2">
                      {p.pros.map((pro, idx) => (
                        <div key={idx} className="flex items-start gap-1 text-[10px] font-semibold text-slate-600">
                          <CheckCircle2 size={12} className="text-emerald-500 shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </div>
                      ))}
                    </div>

                    {/* Buy CTA */}
                    <button
                      onClick={() => {
                        setShowCompareModal(false);
                        handleInvestClick(p);
                      }}
                      className="mt-6 w-full bg-[#0065ff] hover:bg-[#0054d6] text-white font-extrabold text-xs py-2.5 rounded-xl transition cursor-pointer"
                    >
                      Invest Now
                    </button>

                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MULTI STEP PURCHASE CHECKOUT MODAL */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-100">

            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-[#f8fafc]">
              <div className="flex items-center gap-2">
                <Briefcase className="text-[#0aa36e]" size={20} />
                <h3 className="text-lg font-black text-slate-900 tracking-tight">Start Investment Setup</h3>
              </div>
              <button
                onClick={() => setSelectedPlan(null)}
                className="text-slate-500 hover:text-slate-700 bg-slate-200/50 hover:bg-slate-200 p-1.5 rounded-lg transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Stepper Progress Bar */}
            <div className="grid grid-cols-3 text-center border-b border-slate-100 bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-500">
              <div className={`py-3 border-r border-slate-100 ${checkoutStep >= 1 ? "text-blue-600 bg-white" : ""}`}>
                1. Investor Details
              </div>
              <div className={`py-3 border-r border-slate-100 ${checkoutStep >= 2 ? "text-blue-600 bg-white" : ""}`}>
                2. Funding Setup
              </div>
              <div className={`py-3 ${checkoutStep >= 3 ? "text-emerald-600 bg-white" : ""}`}>
                3. Success
              </div>
            </div>

            {/* Step 1: Investor Details */}
            {checkoutStep === 1 && (
              <form onSubmit={handleCheckoutSubmit} className="p-6 space-y-4">
                <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100">
                  <p className="text-xs font-bold text-slate-600 uppercase">Selected Plan</p>
                  <p className="font-extrabold text-slate-900 text-sm mt-1">
                    {selectedPlan.provider} - {selectedPlan.title}
                  </p>
                  <p className="text-xs font-semibold text-slate-500 mt-1">
                    Expected Rate: {selectedPlan.guaranteedRate} | Min: {formatVal(selectedPlan.minPremium)}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Investor Full Name</label>
                  <input
                    type="text" required placeholder="Enter name matching PAN Card"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#0065ff] focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Email Address</label>
                    <input
                      type="email" required placeholder="name@example.com"
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#0065ff] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Mobile Number</label>
                    <input
                      type="tel" required placeholder="+91-XXXXX-XXXXX"
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#0065ff] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">PAN Card Number</label>
                    <input
                      type="text" placeholder="ABCDE1234F" maxLength={10}
                      value={panNumber}
                      onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#0065ff] focus:bg-white uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Investment Goal</label>
                    <select
                      value={investmentGoal}
                      onChange={(e) => setInvestmentGoal(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#0065ff] focus:bg-white font-semibold text-slate-800"
                    >
                      <option value="Wealth Creation">Wealth Creation</option>
                      <option value="Child's Education">Child's Education</option>
                      <option value="Retirement & Pension">Retirement & Pension</option>
                      <option value="Global Investing">Global Investing</option>
                      <option value="Tax Saving Goal">Tax Saving Goal</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0065ff] hover:bg-[#0054d6] text-white font-extrabold text-sm py-3 px-4 rounded-xl transition duration-150 shadow-sm flex items-center justify-center gap-1 cursor-pointer"
                >
                  Continue to Funding Setup <ChevronRight size={16} />
                </button>
              </form>
            )}

            {/* Step 2: Funding Setup */}
            {checkoutStep === 2 && (
              <div className="p-6 space-y-5">
                <div className="flex justify-between items-center bg-slate-50 p-4 border border-slate-100 rounded-2xl">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase">First Installment</p>
                    <p className="text-xl font-black text-slate-900 mt-1">
                      {formatVal(selectedPlan.minPremium)}
                    </p>
                  </div>
                  <span className="text-xs bg-[#fff3e6] text-[#f58220] font-black px-3 py-1.5 rounded-lg border border-[#ffd5ab]">
                    Mock Deposit
                  </span>
                </div>

                {/* Investment Frequency */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">Investment Frequency</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Monthly", "Quarterly", "Yearly"].map((freq) => (
                      <button
                        key={freq}
                        type="button"
                        onClick={() => setInvestmentFrequency(freq)}
                        className={`py-2 px-3 border rounded-xl text-xs font-extrabold transition cursor-pointer ${
                          investmentFrequency === freq
                            ? "border-[#0065ff] bg-[#0065ff]/5 text-[#0065ff]"
                            : "border-slate-200 hover:bg-slate-50 text-slate-600"
                        }`}
                      >
                        {freq}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">Set up E-Mandate via</label>

                  {[
                    { id: "upi", label: "UPI AutoPay (PhonePe / GPay)", desc: "Quick verification via UPI pin mandate setup" },
                    { id: "card", label: "Bank Account / Debit Card Mandate", desc: "Secured authorization through debit card e-mandate" },
                    { id: "netbanking", label: "Net Banking Mandate", desc: "Authorize using bank login credentials" }
                  ].map((method) => (
                    <label
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`flex items-start gap-3 p-3.5 border rounded-2xl cursor-pointer transition select-none ${
                        paymentMethod === method.id ? "border-[#0065ff] bg-[#0065ff]/5" : "border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="mandate"
                        checked={paymentMethod === method.id}
                        onChange={() => {}}
                        className="mt-1 text-[#0065ff] focus:ring-[#0065ff] border-slate-300"
                      />
                      <div>
                        <p className="text-sm font-extrabold text-slate-900">{method.label}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{method.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setCheckoutStep(1)}
                    className="w-1/3 border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-sm py-3 px-4 rounded-xl transition cursor-pointer"
                  >
                    Go Back
                  </button>
                  <button
                    onClick={() => setCheckoutStep(3)}
                    className="w-2/3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm py-3 px-4 rounded-xl transition duration-150 shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <CreditCard size={16} /> Authorize Mandate
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Success Screen */}
            {checkoutStep === 3 && (
              <div className="p-8 text-center space-y-6">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle size={32} />
                </div>

                <div>
                  <h3 className="text-xl font-black text-slate-950">Investment Registered!</h3>
                  <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">
                    Congratulations, <span className="font-bold text-slate-800">{buyerName}</span>. Your {investmentFrequency.toLowerCase()} savings auto-debit of <span className="font-bold text-slate-800">{formatVal(selectedPlan.minPremium)}</span> has been authorized.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-500">Certificate Reference</span>
                    <span className="font-bold text-slate-800">CW-INV-{(10000 + Math.floor(Math.random() * 90000))}</span>
                  </div>
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-500">Variant</span>
                    <span className="font-bold text-slate-800 capitalize">{variant} Plan</span>
                  </div>
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-500">Savings Provider</span>
                    <span className="font-bold text-slate-800">{selectedPlan.provider}</span>
                  </div>
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-500">Investment Goal</span>
                    <span className="font-bold text-slate-800">{investmentGoal}</span>
                  </div>
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-500">Est. Growth Rate</span>
                    <span className="font-bold text-slate-800">{selectedPlan.guaranteedRate}</span>
                  </div>
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-500">Projected Corpus</span>
                    <span className="font-bold text-[#0065ff]">
                      {variant === "child"
                        ? formatVal(calcDetails.projectedCorpus)
                        : variant === "retirement"
                          ? formatVal(calcDetails.retirementCorpus)
                          : variant === "guaranteed"
                            ? formatVal(calcDetails.totalValue)
                            : variant === "dollar"
                              ? formatVal(calcDetails.projectedPortfolio)
                              : formatVal(calcDetails.maturityValue)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      alert("Mock Investment Certificate PDF download started.");
                    }}
                    className="w-full bg-[#0065ff] hover:bg-[#0054d6] text-white font-extrabold text-sm py-3 px-4 rounded-xl transition duration-150 shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Wallet size={16} /> Download Certificate PDF
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPlan(null);
                    }}
                    className="w-full text-slate-600 hover:text-slate-900 font-bold text-xs py-2 transition cursor-pointer"
                  >
                    Back to Investment Center
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
