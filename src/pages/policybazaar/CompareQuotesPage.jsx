import { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Shield,
  Star,
  Check,
  ChevronRight,
  Filter,
  ArrowRightLeft,
  X,
  CreditCard,
  CheckCircle,
  Truck,
  Heart,
  FileCheck,
  Activity,
  Info,
  User,
  Globe
} from "lucide-react";

// Mock Data for Health Quotes
const MOCK_HEALTH_QUOTES = [
  {
    id: "h-niva-reassure",
    insurer: "Niva Bupa",
    planName: "ReAssure 2.0 Titanium",
    rating: 4.7,
    csr: 96.5,
    cashlessHospitals: "10,200+",
    roomRent: "No Room Rent Limit",
    copay: "0% Co-pay",
    waitingPeriod: "2 Years",
    basePremiumMonthly: 680,
    features: ["Unlimited Restore Benefit", "Free Annual Health Checkup", "OPD Cover"],
    hasMaternity: true,
    hasPreExisting: false,
    hasNoRentLimit: true
  },
  {
    id: "h-hdfc-optima",
    insurer: "HDFC Ergo",
    planName: "Optima Secure",
    rating: 4.9,
    csr: 99.1,
    cashlessHospitals: "12,500+",
    roomRent: "Single Private AC Room",
    copay: "0% Co-pay",
    waitingPeriod: "3 Years",
    basePremiumMonthly: 810,
    features: ["2x Instant Coverage Boost", "Home Treatment Cover", "Global Cover Option"],
    hasMaternity: true,
    hasPreExisting: true,
    hasNoRentLimit: true
  },
  {
    id: "h-care-supreme",
    insurer: "Care Health",
    planName: "Care Supreme Classic",
    rating: 4.5,
    csr: 95.2,
    cashlessHospitals: "8,900+",
    roomRent: "Single Room Limit",
    copay: "10% Co-pay",
    waitingPeriod: "4 Years",
    basePremiumMonthly: 540,
    features: ["NCB Super (Up to 150%)", "Alternative Treatments (AYUSH)", "OPD Add-on Available"],
    hasMaternity: false,
    hasPreExisting: true,
    hasNoRentLimit: false
  },
  {
    id: "h-star-assure",
    insurer: "Star Health",
    planName: "Star Assure Gold",
    rating: 4.6,
    csr: 98.2,
    cashlessHospitals: "14,000+",
    roomRent: "No Room Rent Limit",
    copay: "0% Co-pay",
    waitingPeriod: "3 Years",
    basePremiumMonthly: 720,
    features: ["Automatic Restore (Unlimited)", "Maternity Cover from Day 1", "Accidental Death Rider"],
    hasMaternity: true,
    hasPreExisting: true,
    hasNoRentLimit: true
  },
  {
    id: "h-aditya-activ",
    insurer: "Aditya Birla",
    planName: "Activ Fit Premium",
    rating: 4.4,
    csr: 94.0,
    cashlessHospitals: "7,500+",
    roomRent: "Shared Room Option",
    copay: "20% Co-pay",
    waitingPeriod: "3 Years",
    basePremiumMonthly: 490,
    features: ["Up to 50% Health Returns", "Mental Health Counselling", "Fitness Coach Benefit"],
    hasMaternity: false,
    hasPreExisting: false,
    hasNoRentLimit: false
  },
  {
    id: "h-icici-health",
    insurer: "ICICI Lombard",
    planName: "Complete Health Shield",
    rating: 4.8,
    csr: 97.8,
    cashlessHospitals: "9,500+",
    roomRent: "No Room Rent Limit",
    copay: "0% Co-pay",
    waitingPeriod: "2 Years",
    basePremiumMonthly: 780,
    features: ["Donor Expenses Cover", "Critical Illness Add-on", "Compassionate Visit Benefit"],
    hasMaternity: true,
    hasPreExisting: false,
    hasNoRentLimit: true
  }
];

// Mock Data for Car Quotes
const MOCK_CAR_QUOTES = [
  {
    id: "c-tata-aig",
    insurer: "Tata AIG",
    planName: "Auto Secure Comprehensive",
    rating: 4.8,
    csr: 98.4,
    cashlessGarages: "7,500+",
    damageCover: "Comprehensive Cover",
    thirdPartyLimit: "Up to Rs. 7.5 Lakhs",
    basePremiumMonthly: 310,
    features: ["Cashless Claim Settlement", "Free Pick & Drop in network", "24/7 Roadside Assistance"],
    hasZeroDep: true,
    hasRoadside: true,
    hasEngineProtection: true
  },
  {
    id: "c-icici-lombard",
    insurer: "ICICI Lombard",
    planName: "Car Shield Gold",
    rating: 4.7,
    csr: 97.6,
    cashlessGarages: "8,200+",
    damageCover: "Comprehensive + Add-ons",
    thirdPartyLimit: "Unlimited Third Party",
    basePremiumMonthly: 340,
    features: ["No Claim Bonus Protection", "Consumables Cover Included", "Engine Protect Add-on"],
    hasZeroDep: true,
    hasRoadside: true,
    hasEngineProtection: true
  },
  {
    id: "c-bajaj-allianz",
    insurer: "Bajaj Allianz",
    planName: "Drive Smart",
    rating: 4.6,
    csr: 96.9,
    cashlessGarages: "6,800+",
    damageCover: "Comprehensive Basic",
    thirdPartyLimit: "Up to Rs. 7.5 Lakhs",
    basePremiumMonthly: 280,
    features: ["Key Replacement Cover", "Personal Baggage Cover", "Instant Spot Settlement"],
    hasZeroDep: false,
    hasRoadside: true,
    hasEngineProtection: false
  },
  {
    id: "c-hdfc-ergo",
    insurer: "HDFC Ergo",
    planName: "Motor Insurance Silver",
    rating: 4.9,
    csr: 99.0,
    cashlessGarages: "9,000+",
    damageCover: "Comprehensive Elite",
    thirdPartyLimit: "Unlimited Third Party",
    basePremiumMonthly: 390,
    features: ["Zero Dep. on all parts", "Emergency Hotel Expenses", "Roadside Assistance Standard"],
    hasZeroDep: true,
    hasRoadside: true,
    hasEngineProtection: true
  },
  {
    id: "c-royal-sundaram",
    insurer: "Royal Sundaram",
    planName: "Car Shield Value",
    rating: 4.3,
    csr: 92.5,
    cashlessGarages: "4,600+",
    damageCover: "Comprehensive Standalone",
    thirdPartyLimit: "Up to Rs. 7.5 Lakhs",
    basePremiumMonthly: 240,
    features: ["Windshield Glass Cover", "Aggressive IDV Selection", "Towing Charge reimbursement"],
    hasZeroDep: false,
    hasRoadside: false,
    hasEngineProtection: false
  }
];

// Mock Data for Life Quotes
const MOCK_LIFE_QUOTES = [
  {
    id: "l-lic-tech",
    insurer: "LIC of India",
    planName: "Tech Term Plan",
    rating: 4.9,
    csr: 99.0,
    coverCeiling: "Till age 80",
    hasTrop: false,
    hasCriticalIllness: true,
    hasAccidentalRider: true,
    basePremiumMonthly: 440,
    features: ["Sovereign Guarantee", "Accidental Death Rider Available", "Special Rates for Women"]
  },
  {
    id: "l-hdfc-click",
    insurer: "HDFC Life",
    planName: "Click 2 Protect Super",
    rating: 4.8,
    csr: 98.6,
    coverCeiling: "Till age 85",
    hasTrop: true,
    hasCriticalIllness: true,
    hasAccidentalRider: true,
    basePremiumMonthly: 490,
    features: ["Accelerated Critical Illness", "Waiver of Premium on Disability", "Return of Premium Option"]
  },
  {
    id: "l-max-smart",
    insurer: "Max Life",
    planName: "Smart Secure Plus",
    rating: 4.8,
    csr: 99.2,
    coverCeiling: "Till age 85",
    hasTrop: true,
    hasCriticalIllness: true,
    hasAccidentalRider: false,
    basePremiumMonthly: 460,
    features: ["100% Premium Back Choice", "Terminal Illness Cover Built-in", "Top-up Cover option"]
  },
  {
    id: "l-icici-ipru",
    insurer: "ICICI Prudential",
    planName: "iProtect Smart",
    rating: 4.7,
    csr: 97.9,
    coverCeiling: "Till age 80",
    hasTrop: false,
    hasCriticalIllness: true,
    hasAccidentalRider: true,
    basePremiumMonthly: 420,
    features: ["34 Critical Illnesses Covered", "Accidental Death Payout Boost", "Permanent Disability Waiver"]
  },
  {
    id: "l-tata-aia",
    insurer: "Tata AIA",
    planName: "Sampoorna Raksha Supreme",
    rating: 4.8,
    csr: 98.5,
    coverCeiling: "Till age 85",
    hasTrop: true,
    hasCriticalIllness: false,
    hasAccidentalRider: true,
    basePremiumMonthly: 510,
    features: ["Whole Life Cover option", "Increasing Cover Benefit", "Discounted Non-smoker rates"]
  },
  {
    id: "l-sbi-shield",
    insurer: "SBI Life",
    planName: "eShield Next",
    rating: 4.6,
    csr: 97.0,
    coverCeiling: "Till age 80",
    hasTrop: false,
    hasCriticalIllness: false,
    hasAccidentalRider: true,
    basePremiumMonthly: 390,
    features: ["No Medicals up to 50 Lakhs", "Simple claim settlement", "Better Premium rates for Females"]
  }
];

// Mock Data for Travel Quotes
const MOCK_TRAVEL_QUOTES = [
  {
    id: "t-tata-travel",
    insurer: "Tata AIG",
    planName: "Travel Guard Gold",
    rating: 4.8,
    csr: 98.2,
    basePremiumDaily: 45, // ₹45 per day
    features: ["COVID-19 Hospitalization Covered", "Baggage Loss up to $1000", "Loss of Passport Covered"],
    hasCovidCover: true,
    hasBaggageDelay: true,
    hasPassportLoss: true
  },
  {
    id: "t-hdfc-travel",
    insurer: "HDFC Ergo",
    planName: "Travel Protect Explorer",
    rating: 4.9,
    csr: 99.0,
    basePremiumDaily: 52,
    features: ["Unlimited Cashless medical network", "Adventure sports rider included", "Trip Delay cover ($100/6hrs)"],
    hasCovidCover: true,
    hasBaggageDelay: true,
    hasPassportLoss: true
  },
  {
    id: "t-care-travel",
    insurer: "Care Health",
    planName: "Explore Global Plus",
    rating: 4.6,
    csr: 95.8,
    basePremiumDaily: 38,
    features: ["Affordable basic medical coverage", "Pre-existing cover option", "24/7 assist line"],
    hasCovidCover: true,
    hasBaggageDelay: false,
    hasPassportLoss: false
  },
  {
    id: "t-reliance-travel",
    insurer: "Reliance General",
    planName: "Travel Secure Premium",
    rating: 4.4,
    csr: 93.4,
    basePremiumDaily: 40,
    features: ["Dental relief up to $500", "Baggage loss reimbursement", "Missed connection cover"],
    hasCovidCover: false,
    hasBaggageDelay: true,
    hasPassportLoss: true
  },
  {
    id: "t-bajaj-travel",
    insurer: "Bajaj Allianz",
    planName: "Travel Companion",
    rating: 4.7,
    csr: 97.4,
    basePremiumDaily: 48,
    features: ["Schengen approved policy document", "Baggage delay cover ($50/12hrs)", "Personal Liability Cover"],
    hasCovidCover: true,
    hasBaggageDelay: true,
    hasPassportLoss: false
  }
];

export default function CompareQuotesPage() {
  const [searchParams] = useSearchParams();
  
  // Detect policy type: 'health', 'car', 'life', or 'travel'
  const policyType = useMemo(() => {
    const type = searchParams.get("type");
    if (type === "car") return "car";
    if (type === "life") return "life";
    if (type === "travel") return "travel";
    return "health";
  }, [searchParams]);

  // State Variables
  const [sortBy, setSortBy] = useState("premiumAsc");
  const [selectedInsurers, setSelectedInsurers] = useState([]);
  
  // Health Specific Form Settings
  const [healthAge, setHealthAge] = useState(searchParams.get("age") || "30");
  const [healthMembers, setHealthMembers] = useState(searchParams.get("members") || "1 Adult");
  const [healthSumInsured, setHealthSumInsured] = useState(parseInt(searchParams.get("sumInsured")) || 1000000); 
  const [healthCity, setHealthCity] = useState(searchParams.get("city") || "Mumbai");
  
  // Health Filter Toggles
  const [requireMaternity, setRequireMaternity] = useState(false);
  const [requireNoRentLimit, setRequireNoRentLimit] = useState(false);

  // Car Specific Form Settings
  const [carModel, setCarModel] = useState(searchParams.get("model") || "Maruti Swift");
  const [carYear, setCarYear] = useState(searchParams.get("year") || "2023");
  const [carIDV, setCarIDV] = useState(parseInt(searchParams.get("idv")) || 500000); 

  // Car Filter Toggles
  const [requireZeroDep, setRequireZeroDep] = useState(false);
  const [requireRoadside, setRequireRoadside] = useState(false);
  const [requireEngineProtect, setRequireEngineProtect] = useState(false);

  // Life Specific Form Settings
  const [lifeGender, setLifeGender] = useState(searchParams.get("gender") || "Male");
  const [lifeTobacco, setLifeTobacco] = useState(searchParams.get("tobacco") || "No");
  const [lifeAge, setLifeAge] = useState(searchParams.get("age") || "30");
  const [lifeIncome, setLifeIncome] = useState(searchParams.get("income") || "5L - 10L");
  const [lifeCover, setLifeCover] = useState(parseInt(searchParams.get("cover")) || 10000000); 

  // Life Filter Toggles
  const [requireTrop, setRequireTrop] = useState(false);
  const [requireCriticalIllness, setRequireCriticalIllness] = useState(false);
  const [requireAccidentalRider, setRequireAccidentalRider] = useState(false);

  // Travel Specific Form Settings
  const [travelDestination, setTravelDestination] = useState(searchParams.get("destination") || "Schengen Area");
  const [travelDuration, setTravelDuration] = useState(parseInt(searchParams.get("duration")) || 10);
  const [travelAge, setTravelAge] = useState(searchParams.get("age") || "30");
  const [travelMedicalLimit, setTravelMedicalLimit] = useState(parseInt(searchParams.get("medicalLimit")) || 100000);

  // Travel Filter Toggles
  const [requireCovidCover, setRequireCovidCover] = useState(false);
  const [requireBaggageDelay, setRequireBaggageDelay] = useState(false);
  const [requirePassportLoss, setRequirePassportLoss] = useState(false);

  // Quote Comparison state
  const [comparedQuotes, setComparedQuotes] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Checkout modal state
  const [checkoutQuote, setCheckoutQuote] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState(1); 
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");

  // Premium Billing Frequency
  const [isAnnualBilling, setIsAnnualBilling] = useState(false);

  // Reset filter when route changes
  useEffect(() => {
    setSelectedInsurers([]);
    setComparedQuotes([]);
    setShowCompareModal(false);
  }, [policyType]);

  // Handle checking a quote for comparison
  const handleToggleCompare = (quote) => {
    if (comparedQuotes.some((q) => q.id === quote.id)) {
      setComparedQuotes(comparedQuotes.filter((q) => q.id !== quote.id));
    } else {
      if (comparedQuotes.length >= 3) {
        alert("You can compare up to 3 plans at a time.");
        return;
      }
      setComparedQuotes([...comparedQuotes, quote]);
    }
  };

  // Get dynamic multiplier based on Inputs
  const baseScale = useMemo(() => {
    let scale = 1.0;
    if (policyType === "health") {
      if (healthSumInsured <= 500000) scale = 0.8;
      else if (healthSumInsured <= 1000000) scale = 1.0;
      else if (healthSumInsured <= 2000000) scale = 1.25;
      else if (healthSumInsured <= 5000000) scale = 1.6;
      else scale = 2.0;

      const ageNum = parseInt(healthAge) || 30;
      if (ageNum < 25) scale *= 0.85;
      else if (ageNum <= 35) scale *= 1.0;
      else if (ageNum <= 45) scale *= 1.25;
      else if (ageNum <= 55) scale *= 1.5;
      else scale *= 1.9;
    } else if (policyType === "car") {
      if (carIDV <= 300000) scale = 0.7;
      else if (carIDV <= 600000) scale = 1.0;
      else if (carIDV <= 900000) scale = 1.3;
      else scale = 1.7;

      const currentYear = new Date().getFullYear();
      const carAge = currentYear - parseInt(carYear);
      if (carAge <= 1) scale *= 1.2;
      else if (carAge <= 3) scale *= 1.0;
      else if (carAge <= 6) scale *= 0.85;
      else scale *= 0.7;
    } else if (policyType === "life") {
      if (lifeCover <= 5000000) scale = 0.7;
      else if (lifeCover <= 10000000) scale = 1.0;
      else if (lifeCover <= 20000000) scale = 1.4;
      else scale = 2.2;

      const ageNum = parseInt(lifeAge) || 30;
      if (ageNum < 25) scale *= 0.8;
      else if (ageNum <= 35) scale *= 1.0;
      else if (ageNum <= 45) scale *= 1.4;
      else if (ageNum <= 55) scale *= 1.9;
      else scale *= 2.6;

      if (lifeTobacco === "Yes") scale *= 1.4;
      if (lifeGender === "Female") scale *= 0.9;
    } else {
      // Travel Insurance scale (proportional to duration of the trip)
      scale = travelDuration; // Base premium daily is multiplied by trip days

      // Destination surcharges
      if (travelDestination === "USA & Canada") {
        scale *= 2.0; // 2x rate for USA/Canada
      } else if (travelDestination === "Schengen Area") {
        scale *= 1.2;
      } else if (travelDestination === "Asia") {
        scale *= 0.8;
      } else {
        scale *= 1.0;
      }

      // Medical Limit Surcharge
      if (travelMedicalLimit <= 50000) scale *= 0.85;
      else if (travelMedicalLimit <= 100000) scale *= 1.0;
      else if (travelMedicalLimit <= 250000) scale *= 1.35;
      else scale *= 1.7;

      // Age Surcharge
      const ageNum = parseInt(travelAge) || 30;
      if (ageNum < 30) scale *= 0.9;
      else if (ageNum <= 45) scale *= 1.0;
      else if (ageNum <= 60) scale *= 1.4;
      else scale *= 2.1;
    }
    return scale;
  }, [
    policyType,
    healthSumInsured,
    healthAge,
    carIDV,
    carYear,
    lifeCover,
    lifeAge,
    lifeTobacco,
    lifeGender,
    travelDestination,
    travelDuration,
    travelAge,
    travelMedicalLimit
  ]);

  // Compute filtered & sorted quotes
  const quotesList = useMemo(() => {
    let rawQuotes = MOCK_HEALTH_QUOTES;
    if (policyType === "car") rawQuotes = MOCK_CAR_QUOTES;
    if (policyType === "life") rawQuotes = MOCK_LIFE_QUOTES;
    if (policyType === "travel") rawQuotes = MOCK_TRAVEL_QUOTES;

    let filtered = rawQuotes.map((q) => {
      // Calculate dynamic premium
      if (policyType === "travel") {
        const rawDailyBase = q.basePremiumDaily;
        const finalTripPremium = Math.round(rawDailyBase * baseScale);
        return {
          ...q,
          premiumMonthly: Math.round(finalTripPremium / 10), // simulated daily cost equivalent reference
          premiumYearly: finalTripPremium // total travel policy cost
        };
      } else {
        const rawBase = q.basePremiumMonthly;
        const finalMonthly = Math.round(rawBase * baseScale);
        const finalAnnual = Math.round(finalMonthly * 11);
        return {
          ...q,
          premiumMonthly: finalMonthly,
          premiumYearly: finalAnnual
        };
      }
    });

    // Filter by selected Insurers
    if (selectedInsurers.length > 0) {
      filtered = filtered.filter((q) => selectedInsurers.includes(q.insurer));
    }

    // Filter by features
    if (policyType === "health") {
      if (requireMaternity) filtered = filtered.filter((q) => q.hasMaternity);
      if (requireNoRentLimit) filtered = filtered.filter((q) => q.hasNoRentLimit);
    } else if (policyType === "car") {
      if (requireZeroDep) filtered = filtered.filter((q) => q.hasZeroDep);
      if (requireRoadside) filtered = filtered.filter((q) => q.hasRoadside);
      if (requireEngineProtect) filtered = filtered.filter((q) => q.hasEngineProtection);
    } else if (policyType === "life") {
      if (requireTrop) filtered = filtered.filter((q) => q.hasTrop);
      if (requireCriticalIllness) filtered = filtered.filter((q) => q.hasCriticalIllness);
      if (requireAccidentalRider) filtered = filtered.filter((q) => q.hasAccidentalRider);
    } else {
      if (requireCovidCover) filtered = filtered.filter((q) => q.hasCovidCover);
      if (requireBaggageDelay) filtered = filtered.filter((q) => q.hasBaggageDelay);
      if (requirePassportLoss) filtered = filtered.filter((q) => q.hasPassportLoss);
    }

    // Sorting
    filtered.sort((a, b) => {
      const getPremium = (q) => (policyType === "travel" ? q.premiumYearly : isAnnualBilling ? q.premiumYearly : q.premiumMonthly);
      if (sortBy === "premiumAsc") {
        return getPremium(a) - getPremium(b);
      } else if (sortBy === "premiumDesc") {
        return getPremium(b) - getPremium(a);
      } else if (sortBy === "csrDesc") {
        return b.csr - a.csr;
      } else if (sortBy === "ratingDesc") {
        return b.rating - a.rating;
      }
      return 0;
    });

    return filtered;
  }, [
    policyType,
    baseScale,
    selectedInsurers,
    requireMaternity,
    requireNoRentLimit,
    requireZeroDep,
    requireRoadside,
    requireEngineProtect,
    requireTrop,
    requireCriticalIllness,
    requireAccidentalRider,
    requireCovidCover,
    requireBaggageDelay,
    requirePassportLoss,
    sortBy,
    isAnnualBilling
  ]);

  // List of unique insurers for filters
  const insurerOptions = useMemo(() => {
    let rawQuotes = MOCK_HEALTH_QUOTES;
    if (policyType === "car") rawQuotes = MOCK_CAR_QUOTES;
    if (policyType === "life") rawQuotes = MOCK_LIFE_QUOTES;
    if (policyType === "travel") rawQuotes = MOCK_TRAVEL_QUOTES;
    return Array.from(new Set(rawQuotes.map((q) => q.insurer)));
  }, [policyType]);

  const handleInsurerFilterChange = (insurerName) => {
    if (selectedInsurers.includes(insurerName)) {
      setSelectedInsurers(selectedInsurers.filter((name) => name !== insurerName));
    } else {
      setSelectedInsurers([...selectedInsurers, insurerName]);
    }
  };

  const handleBuyNow = (quote) => {
    setCheckoutQuote(quote);
    setCheckoutStep(1);
    setShowCompareModal(false);
  };

  const submitCheckoutDetails = (e) => {
    e.preventDefault();
    if (!buyerName || !buyerEmail || !buyerPhone) {
      alert("Please fill in all buyer details.");
      return;
    }
    if (policyType === "travel" && !passportNumber) {
      alert("Passport number is mandatory for international travel policies.");
      return;
    }
    setCheckoutStep(2);
  };

  const submitPayment = () => {
    setCheckoutStep(3);
  };

  return (
    <div className="min-h-screen bg-[#f4f6fb] pb-16">
      {/* Dynamic Header Controls */}
      <section className="bg-white border-b border-slate-200 py-6 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                <Link to="/" className="hover:text-blue-600">Home</Link>
                <ChevronRight size={14} />
                <span className="font-semibold text-slate-700 capitalize">{policyType} Insurance Quotes</span>
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                {policyType === "health" && (
                  <>
                    <Activity className="text-emerald-600" size={24} />
                    Compare Health Insurance Policies
                  </>
                )}
                {policyType === "car" && (
                  <>
                    <Truck className="text-sky-600" size={24} />
                    Compare Car Insurance Quotes
                  </>
                )}
                {policyType === "life" && (
                  <>
                    <User className="text-blue-600" size={24} />
                    Compare Term Life Insurance Plans
                  </>
                )}
                {policyType === "travel" && (
                  <>
                    <Globe className="text-cyan-600" size={24} />
                    Compare International Travel Insurance
                  </>
                )}
              </h1>
            </div>

            {/* Toggle Billing Frequency (not shown for Travel plans since they are single-premium per trip) */}
            {policyType !== "travel" && (
              <div className="flex items-center bg-slate-100 p-1.5 rounded-xl self-start lg:self-center">
                <button
                  onClick={() => setIsAnnualBilling(false)}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-200 ${
                    !isAnnualBilling ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Monthly Premiums
                </button>
                <button
                  onClick={() => setIsAnnualBilling(true)}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-200 ${
                    isAnnualBilling ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Annual (Save ~10%)
                </button>
              </div>
            )}
            {policyType === "travel" && (
              <div className="bg-[#f0fbf8] text-[#008f65] text-xs font-bold border border-[#c6f3e7] rounded-xl px-4 py-2.5 flex items-center gap-2 self-start lg:self-center">
                <Info size={16} /> Total Trip Policy Premium Shown
              </div>
            )}
          </div>

          {/* Inline criteria editor */}
          <div className="mt-6 bg-[#f8fafc] border border-slate-200 rounded-2xl p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-end">
            {policyType === "health" && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Sum Insured</label>
                  <select
                    value={healthSumInsured}
                    onChange={(e) => setHealthSumInsured(parseInt(e.target.value))}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-emerald-500"
                  >
                    <option value={500000}>₹5 Lakhs</option>
                    <option value={1000000}>₹10 Lakhs</option>
                    <option value={2000000}>₹20 Lakhs</option>
                    <option value={5000000}>₹50 Lakhs</option>
                    <option value={10000000}>₹1 Crore</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Age of Eldest Member</label>
                  <select
                    value={healthAge}
                    onChange={(e) => setHealthAge(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-emerald-500"
                  >
                    {[18, 22, 26, 30, 35, 40, 45, 50, 55, 60, 65, 70].map((age) => (
                      <option key={age} value={age}>{age} Years</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Cover Members</label>
                  <select
                    value={healthMembers}
                    onChange={(e) => setHealthMembers(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-emerald-500"
                  >
                    <option value="1 Adult">1 Adult (Self)</option>
                    <option value="2 Adults">2 Adults (Self + Spouse)</option>
                    <option value="2 Adults + 1 Child">2 Adults + 1 Child</option>
                    <option value="2 Adults + 2 Children">2 Adults + 2 Children</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">City</label>
                  <select
                    value={healthCity}
                    onChange={(e) => setHealthCity(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-emerald-500"
                  >
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Pune">Pune</option>
                  </select>
                </div>
              </>
            )}
            
            {policyType === "car" && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Car Make / Model</label>
                  <select
                    value={carModel}
                    onChange={(e) => setCarModel(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-sky-500"
                  >
                    <option value="Maruti Swift">Maruti Swift (Hatchback)</option>
                    <option value="Hyundai Creta">Hyundai Creta (SUV)</option>
                    <option value="Honda City">Honda City (Sedan)</option>
                    <option value="Tata Nexon">Tata Nexon (Compact SUV)</option>
                    <option value="Mahindra XUV700">Mahindra XUV700 (Premium SUV)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Registration Year</label>
                  <select
                    value={carYear}
                    onChange={(e) => setCarYear(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-sky-500"
                  >
                    {[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019].map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Vehicle IDV Coverage</label>
                  <select
                    value={carIDV}
                    onChange={(e) => setCarIDV(parseInt(e.target.value))}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-sky-500"
                  >
                    <option value={300000}>₹3 Lakhs (Low Value)</option>
                    <option value={500000}>₹5 Lakhs (Standard)</option>
                    <option value={700000}>₹7 Lakhs (Enhanced)</option>
                    <option value={1000000}>₹10 Lakhs (Premium)</option>
                  </select>
                </div>
                <div className="flex justify-center items-center h-9 text-xs text-slate-500 font-medium">
                  Dynamic calculations enabled
                </div>
              </>
            )}

            {policyType === "life" && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Life Cover Amount</label>
                  <select
                    value={lifeCover}
                    onChange={(e) => setLifeCover(parseInt(e.target.value))}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500"
                  >
                    <option value={5000000}>₹50 Lakhs</option>
                    <option value={10000000}>₹1 Crore</option>
                    <option value={20000000}>₹2 Crores</option>
                    <option value={50000000}>₹5 Crores</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Tobacco Habitation</label>
                  <select
                    value={lifeTobacco}
                    onChange={(e) => setLifeTobacco(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500"
                  >
                    <option value="No">No (Non-Smoker)</option>
                    <option value="Yes">Yes (Smoker)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Age</label>
                  <select
                    value={lifeAge}
                    onChange={(e) => setLifeAge(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500"
                  >
                    {[18, 22, 26, 30, 35, 40, 45, 50, 55, 60].map((ageVal) => (
                      <option key={ageVal} value={ageVal}>{ageVal} Years</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Gender</label>
                  <select
                    value={lifeGender}
                    onChange={(e) => setLifeGender(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </>
            )}

            {policyType === "travel" && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Destination</label>
                  <select
                    value={travelDestination}
                    onChange={(e) => setTravelDestination(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-sky-500"
                  >
                    <option value="Schengen Area">Schengen Area</option>
                    <option value="USA & Canada">USA & Canada</option>
                    <option value="Asia">Asia Region</option>
                    <option value="Rest of World">Rest of World</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Trip Length (Days)</label>
                  <select
                    value={travelDuration}
                    onChange={(e) => setTravelDuration(parseInt(e.target.value))}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-sky-500"
                  >
                    {[7, 10, 15, 30, 45, 60].map((days) => (
                      <option key={days} value={days}>{days} Days</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Medical Limit</label>
                  <select
                    value={travelMedicalLimit}
                    onChange={(e) => setTravelMedicalLimit(parseInt(e.target.value))}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-sky-500"
                  >
                    <option value={50000}>$50,000 USD</option>
                    <option value={100000}>$100,000 USD</option>
                    <option value={250000}>$250,000 USD</option>
                    <option value={500000}>$500,000 USD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Elder Age</label>
                  <select
                    value={travelAge}
                    onChange={(e) => setTravelAge(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-sky-500"
                  >
                    {[18, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70].map((ageVal) => (
                      <option key={ageVal} value={ageVal}>{ageVal} Years</option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Main Grid: Sidebar + Quotes */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          
          {/* Sidebar Filters */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <span className="font-extrabold text-slate-900 text-sm tracking-wider uppercase flex items-center gap-2">
                  <Filter size={16} /> Filters
                </span>
                <button
                  onClick={() => {
                    setSelectedInsurers([]);
                    setRequireMaternity(false);
                    setRequireNoRentLimit(false);
                    setRequireZeroDep(false);
                    setRequireRoadside(false);
                    setRequireEngineProtect(false);
                    setRequireTrop(false);
                    setRequireCriticalIllness(false);
                    setRequireAccidentalRider(false);
                    setRequireCovidCover(false);
                    setRequireBaggageDelay(false);
                    setRequirePassportLoss(false);
                  }}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 transition"
                >
                  Clear All
                </button>
              </div>

              {/* Insurers Checkbox List */}
              <div className="space-y-3">
                <p className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Insurers</p>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {insurerOptions.map((insurer) => (
                    <label key={insurer} className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={selectedInsurers.includes(insurer)}
                        onChange={() => handleInsurerFilterChange(insurer)}
                        className="rounded text-blue-600 focus:ring-blue-500 border-slate-300 h-4.5 w-4.5"
                      />
                      <span>{insurer}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Feature/Add-on Filters */}
              <div className="border-t border-slate-100 pt-4 mt-4 space-y-3">
                <p className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">
                  {policyType === "health" && "Key Perks"}
                  {policyType === "car" && "Add-on Riders"}
                  {policyType === "life" && "Plan Features"}
                  {policyType === "travel" && "Travel Protection"}
                </p>
                <div className="space-y-2">
                  {policyType === "health" && (
                    <>
                      <label className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={requireMaternity}
                          onChange={(e) => setRequireMaternity(e.target.checked)}
                          className="rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 h-4.5 w-4.5"
                        />
                        <span>Maternity Cover</span>
                      </label>
                      <label className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={requireNoRentLimit}
                          onChange={(e) => setRequireNoRentLimit(e.target.checked)}
                          className="rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 h-4.5 w-4.5"
                        />
                        <span>No Room Rent Limit</span>
                      </label>
                    </>
                  )}
                  {policyType === "car" && (
                    <>
                      <label className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={requireZeroDep}
                          onChange={(e) => setRequireZeroDep(e.target.checked)}
                          className="rounded text-sky-600 focus:ring-sky-500 border-slate-300 h-4.5 w-4.5"
                        />
                        <span>Zero Depreciation</span>
                      </label>
                      <label className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={requireRoadside}
                          onChange={(e) => setRequireRoadside(e.target.checked)}
                          className="rounded text-sky-600 focus:ring-sky-500 border-slate-300 h-4.5 w-4.5"
                        />
                        <span>Roadside Assistance</span>
                      </label>
                      <label className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={requireEngineProtect}
                          onChange={(e) => setRequireEngineProtect(e.target.checked)}
                          className="rounded text-sky-600 focus:ring-sky-500 border-slate-300 h-4.5 w-4.5"
                        />
                        <span>Engine Protection</span>
                      </label>
                    </>
                  )}
                  {policyType === "life" && (
                    <>
                      <label className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={requireTrop}
                          onChange={(e) => setRequireTrop(e.target.checked)}
                          className="rounded text-blue-600 focus:ring-blue-500 border-slate-300 h-4.5 w-4.5"
                        />
                        <span>Return Premium (TROP)</span>
                      </label>
                      <label className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={requireCriticalIllness}
                          onChange={(e) => setRequireCriticalIllness(e.target.checked)}
                          className="rounded text-blue-600 focus:ring-blue-500 border-slate-300 h-4.5 w-4.5"
                        />
                        <span>Critical Illness Benefit</span>
                      </label>
                      <label className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={requireAccidentalRider}
                          onChange={(e) => setRequireAccidentalRider(e.target.checked)}
                          className="rounded text-blue-600 focus:ring-blue-500 border-slate-300 h-4.5 w-4.5"
                        />
                        <span>Accidental Death Rider</span>
                      </label>
                    </>
                  )}
                  {policyType === "travel" && (
                    <>
                      <label className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={requireCovidCover}
                          onChange={(e) => setRequireCovidCover(e.target.checked)}
                          className="rounded text-cyan-600 focus:ring-cyan-500 border-slate-300 h-4.5 w-4.5"
                        />
                        <span>COVID-19 Hospitalization</span>
                      </label>
                      <label className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={requireBaggageDelay}
                          onChange={(e) => setRequireBaggageDelay(e.target.checked)}
                          className="rounded text-cyan-600 focus:ring-cyan-500 border-slate-300 h-4.5 w-4.5"
                        />
                        <span>Baggage Delay / Loss Cover</span>
                      </label>
                      <label className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={requirePassportLoss}
                          onChange={(e) => setRequirePassportLoss(e.target.checked)}
                          className="rounded text-cyan-600 focus:ring-cyan-500 border-slate-300 h-4.5 w-4.5"
                        />
                        <span>Passport Loss Cover</span>
                      </label>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Direct Callout Box */}
            <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 p-5 text-white shadow-sm">
              <p className="text-xs font-bold text-[#f58220] uppercase tracking-wider">Need Expert Help?</p>
              <h4 className="mt-2 text-base font-black tracking-tight">Speak with our Claims Advisor</h4>
              <p className="mt-2 text-xs leading-5 text-slate-400">Our advisor callback system aims for under 10 minutes wait time during business hours.</p>
              <a href="#expert-callback" className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-white bg-blue-600 px-4 py-2.5 rounded-xl hover:bg-blue-700 transition">
                Request callback
              </a>
            </div>
          </aside>

          {/* Quotes Results */}
          <main className="space-y-4">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm">
              <span className="text-sm font-bold text-slate-700">
                Showing <span className="text-blue-600 font-extrabold">{quotesList.length}</span> matching plans
              </span>

              {/* Sort selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="premiumAsc">Premium: Low to High</option>
                  <option value="premiumDesc">Premium: High to Low</option>
                  <option value="csrDesc">Claim Settlement Ratio (CSR)</option>
                  <option value="ratingDesc">User Rating</option>
                </select>
              </div>
            </div>

            {/* Quotes Grid / List */}
            {quotesList.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-500 mb-4">
                  <Info size={28} />
                </div>
                <h3 className="text-lg font-black text-slate-900">No Quotes Found</h3>
                <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
                  Try clearing some of your filters or expanding your insurer selections to view matching policies.
                </p>
                <button
                  onClick={() => {
                    setSelectedInsurers([]);
                    setRequireMaternity(false);
                    setRequireNoRentLimit(false);
                    setRequireZeroDep(false);
                    setRequireRoadside(false);
                    setRequireEngineProtect(false);
                    setRequireTrop(false);
                    setRequireCriticalIllness(false);
                    setRequireAccidentalRider(false);
                    setRequireCovidCover(false);
                    setRequireBaggageDelay(false);
                    setRequirePassportLoss(false);
                  }}
                  className="mt-5 text-sm font-bold text-white bg-blue-600 px-5 py-2.5 rounded-xl hover:bg-blue-700 transition"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              quotesList.map((quote) => {
                const isCompared = comparedQuotes.some((q) => q.id === quote.id);
                return (
                  <div
                    key={quote.id}
                    className={`bg-white border rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden ${
                      isCompared ? "border-blue-500 bg-blue-50/10" : "border-slate-200"
                    }`}
                  >
                    {/* Badge for Top Rated */}
                    {quote.rating >= 4.8 && (
                      <div className="absolute top-0 right-0 bg-[#0aa36e] text-white text-[10px] font-black uppercase px-4 py-1 rounded-bl-xl tracking-wider">
                        Top Rated Plan
                      </div>
                    )}

                    <div className="grid gap-6 md:grid-cols-[160px_1fr_200px] items-center">
                      {/* Logo and Compare checkbox */}
                      <div className="flex flex-col gap-4">
                        <div>
                          <div className="font-black text-lg text-slate-900 leading-tight">
                            {quote.insurer}
                          </div>
                          <div className="text-xs font-semibold text-slate-500 mt-1">
                            {quote.planName}
                          </div>
                        </div>

                        {/* Compare Toggle */}
                        <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={isCompared}
                            onChange={() => handleToggleCompare(quote)}
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4.5 w-4.5"
                          />
                          <span className="text-xs font-bold text-slate-700">Add to Compare</span>
                        </label>
                      </div>

                      {/* Benefits & Details */}
                      <div>
                        {/* Summary Metrics */}
                        <div className="flex flex-wrap gap-x-5 gap-y-2 mb-4">
                          <div className="flex items-center gap-1.5">
                            <Star size={15} className="fill-amber-400 text-amber-400" />
                            <span className="text-sm font-bold text-slate-800">{quote.rating}</span>
                            <span className="text-xs text-slate-500">Rating</span>
                          </div>
                          <div className="flex items-center gap-1.5 border-l border-slate-200 pl-4">
                            <span className="text-sm font-extrabold text-[#0aa36e]">{quote.csr}%</span>
                            <span className="text-xs text-slate-500">CSR</span>
                          </div>
                          <div className="flex items-center gap-1.5 border-l border-slate-200 pl-4">
                            <span className="text-xs font-semibold text-slate-700">
                              {policyType === "health" && `${quote.cashlessHospitals} Cashless Hospitals`}
                              {policyType === "car" && `${quote.cashlessGarages} Cashless Garages`}
                              {policyType === "life" && `${quote.coverCeiling}`}
                              {policyType === "travel" && `Medical Cover: $${(travelMedicalLimit/1000).toLocaleString()}k USD`}
                            </span>
                          </div>
                        </div>

                        {/* Mini Features Checklist */}
                        <div className="grid gap-1.5 grid-cols-1 sm:grid-cols-2">
                          {quote.features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                              <Check size={14} className="text-[#0aa36e] shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pricing and Action */}
                      <div className="flex flex-col items-stretch justify-center border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 text-right md:text-left gap-3">
                        <div>
                          <div className="text-2xl font-black text-slate-900 leading-none">
                            ₹
                            {policyType === "travel" 
                              ? quote.premiumYearly.toLocaleString("en-IN")
                              : isAnnualBilling
                              ? quote.premiumYearly.toLocaleString("en-IN")
                              : quote.premiumMonthly.toLocaleString("en-IN")}
                          </div>
                          <div className="text-[11px] font-bold text-slate-500 mt-1 uppercase tracking-wider">
                            {policyType === "travel" ? `Premium / ${travelDuration} Days` : isAnnualBilling ? "Premium / Year" : "Premium / Month"}
                          </div>
                        </div>

                        <button
                          onClick={() => handleBuyNow(quote)}
                          className="w-full bg-[#0065ff] hover:bg-[#0054d6] text-white font-extrabold text-sm py-3 px-4 rounded-xl transition duration-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                        >
                          Buy Now <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </main>
        </div>
      </div>

      {/* Floating Compare Bar */}
      {comparedQuotes.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white py-4 px-6 shadow-[0_-10px_30px_rgba(15,23,42,0.15)] z-30 transition-all duration-300 border-t border-white/10">
          <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-[#0065ff] text-white text-xs font-black h-6 w-6 rounded-full flex items-center justify-center">
                {comparedQuotes.length}
              </div>
              <div>
                <h4 className="text-sm font-bold">Compare Plans</h4>
                <p className="text-xs text-slate-400">Select up to 3 policies to check detailed differences.</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Selected Insurer Quick Chips */}
              <div className="hidden md:flex items-center gap-3">
                {comparedQuotes.map((q) => (
                  <div key={q.id} className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/5 text-xs font-semibold">
                    <span>{q.insurer}</span>
                    <button
                      onClick={() => setComparedQuotes(comparedQuotes.filter((item) => item.id !== q.id))}
                      className="text-slate-400 hover:text-white"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setComparedQuotes([])}
                  className="text-xs font-bold text-slate-400 hover:text-white transition px-3 py-2"
                >
                  Clear Selection
                </button>
                <button
                  onClick={() => setShowCompareModal(true)}
                  disabled={comparedQuotes.length < 2}
                  className={`font-black text-xs px-5 py-3 rounded-xl transition flex items-center gap-2 shadow-sm ${
                    comparedQuotes.length >= 2
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer"
                      : "bg-slate-800 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  <ArrowRightLeft size={14} />
                  Compare Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 1. Comparison Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col">
            
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-[#f8fafc]">
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <ArrowRightLeft className="text-blue-600" size={20} />
                  Detailed Product Comparison
                </h3>
                <p className="text-xs text-slate-500 mt-1">Review critical features side-by-side to make the right choice.</p>
              </div>
              <button
                onClick={() => setShowCompareModal(false)}
                className="text-slate-500 hover:text-slate-700 bg-slate-200/50 hover:bg-slate-200 p-2 rounded-xl transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Comparison Grid */}
            <div className="p-6 overflow-y-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-4 text-xs font-black text-slate-500 uppercase tracking-wider w-1/4">Key Specs</th>
                    {comparedQuotes.map((q) => (
                      <th key={q.id} className="py-4 px-4 w-1/4">
                        <div className="font-extrabold text-slate-950 text-base">{q.insurer}</div>
                        <div className="text-xs text-slate-500 font-semibold">{q.planName}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {/* Premium */}
                  {policyType !== "travel" ? (
                    <>
                      <tr>
                        <td className="py-4 text-sm font-bold text-slate-800">Monthly Premium</td>
                        {comparedQuotes.map((q) => (
                          <td key={q.id} className="py-4 px-4 font-extrabold text-blue-600 text-lg">
                            ₹{q.premiumMonthly} <span className="text-[10px] font-bold text-slate-500 uppercase">/ Mo</span>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-4 text-sm font-bold text-slate-800">Annual Premium</td>
                        {comparedQuotes.map((q) => (
                          <td key={q.id} className="py-4 px-4 font-extrabold text-slate-800 text-sm">
                            ₹{q.premiumYearly.toLocaleString("en-IN")} <span className="text-[10px] font-bold text-slate-500 uppercase">/ Yr</span>
                          </td>
                        ))}
                      </tr>
                    </>
                  ) : (
                    <tr>
                      <td className="py-4 text-sm font-bold text-slate-800">Total Trip Premium</td>
                      {comparedQuotes.map((q) => (
                        <td key={q.id} className="py-4 px-4 font-extrabold text-blue-600 text-lg">
                          ₹{q.premiumYearly.toLocaleString("en-IN")} <span className="text-[10px] font-bold text-slate-500 uppercase">/ Total</span>
                        </td>
                      ))}
                    </tr>
                  )}
                  {/* Rating */}
                  <tr>
                    <td className="py-4 text-sm font-bold text-slate-800">User Rating</td>
                    {comparedQuotes.map((q) => (
                      <td key={q.id} className="py-4 px-4 font-semibold text-slate-900">
                        <span className="flex items-center gap-1">
                          <Star size={14} className="fill-amber-400 text-amber-400" />
                          {q.rating} / 5.0
                        </span>
                      </td>
                    ))}
                  </tr>
                  {/* Claim Settlement Ratio */}
                  <tr>
                    <td className="py-4 text-sm font-bold text-slate-800">Claim Settlement Ratio</td>
                    {comparedQuotes.map((q) => (
                      <td key={q.id} className="py-4 px-4 font-extrabold text-emerald-600">
                        {q.csr}%
                      </td>
                    ))}
                  </tr>
                  
                  {/* Health-specific Comparison Lines */}
                  {policyType === "health" && (
                    <>
                      <tr>
                        <td className="py-4 text-sm font-bold text-slate-800">Cashless Hospitals</td>
                        {comparedQuotes.map((q) => (
                          <td key={q.id} className="py-4 px-4 text-sm font-semibold text-slate-700">
                            {q.cashlessHospitals}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-4 text-sm font-bold text-slate-800">Room Rent Limits</td>
                        {comparedQuotes.map((q) => (
                          <td key={q.id} className="py-4 px-4 text-sm font-semibold text-slate-700">
                            {q.roomRent}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-4 text-sm font-bold text-slate-800">Co-pay Requirements</td>
                        {comparedQuotes.map((q) => (
                          <td key={q.id} className="py-4 px-4 text-sm font-semibold text-slate-700">
                            {q.copay}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-4 text-sm font-bold text-slate-800">Pre-Existing Waiting Period</td>
                        {comparedQuotes.map((q) => (
                          <td key={q.id} className="py-4 px-4 text-sm font-semibold text-slate-700">
                            {q.waitingPeriod}
                          </td>
                        ))}
                      </tr>
                    </>
                  )}
                  
                  {/* Car-specific Comparison Lines */}
                  {policyType === "car" && (
                    <>
                      <tr>
                        <td className="py-4 text-sm font-bold text-slate-800">Cashless Garages</td>
                        {comparedQuotes.map((q) => (
                          <td key={q.id} className="py-4 px-4 text-sm font-semibold text-slate-700">
                            {q.cashlessGarages}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-4 text-sm font-bold text-slate-800">Coverage Type</td>
                        {comparedQuotes.map((q) => (
                          <td key={q.id} className="py-4 px-4 text-sm font-semibold text-slate-700">
                            {q.damageCover}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-4 text-sm font-bold text-slate-800">Third-Party Cover Limit</td>
                        {comparedQuotes.map((q) => (
                          <td key={q.id} className="py-4 px-4 text-sm font-semibold text-slate-700">
                            {q.thirdPartyLimit}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-4 text-sm font-bold text-slate-800">Zero Depreciation Rider</td>
                        {comparedQuotes.map((q) => (
                          <td key={q.id} className="py-4 px-4 text-sm font-semibold text-slate-700">
                            {q.hasZeroDep ? (
                              <span className="inline-flex items-center gap-1 text-[#0aa36e] font-bold"><Check size={14} /> Supported</span>
                            ) : (
                              <span className="text-slate-400">Not Included</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    </>
                  )}

                  {/* Life-specific Comparison Lines */}
                  {policyType === "life" && (
                    <>
                      <tr>
                        <td className="py-4 text-sm font-bold text-slate-800">Cover Ceiling</td>
                        {comparedQuotes.map((q) => (
                          <td key={q.id} className="py-4 px-4 text-sm font-semibold text-slate-700">
                            {q.coverCeiling}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-4 text-sm font-bold text-slate-800">Return of Premium (TROP)</td>
                        {comparedQuotes.map((q) => (
                          <td key={q.id} className="py-4 px-4 text-sm font-semibold text-slate-700">
                            {q.hasTrop ? (
                              <span className="inline-flex items-center gap-1 text-emerald-600 font-bold"><Check size={14} /> Available</span>
                            ) : (
                              <span className="text-slate-400">Not Available</span>
                            )}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-4 text-sm font-bold text-slate-800">Critical Illness Rider</td>
                        {comparedQuotes.map((q) => (
                          <td key={q.id} className="py-4 px-4 text-sm font-semibold text-slate-700">
                            {q.hasCriticalIllness ? (
                              <span className="inline-flex items-center gap-1 text-emerald-600 font-bold"><Check size={14} /> Supported</span>
                            ) : (
                              <span className="text-slate-400">Not Available</span>
                            )}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-4 text-sm font-bold text-slate-800">Accidental Death Rider</td>
                        {comparedQuotes.map((q) => (
                          <td key={q.id} className="py-4 px-4 text-sm font-semibold text-slate-700">
                            {q.hasAccidentalRider ? (
                              <span className="inline-flex items-center gap-1 text-emerald-600 font-bold"><Check size={14} /> Supported</span>
                            ) : (
                              <span className="text-slate-400">Not Available</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    </>
                  )}

                  {/* Travel-specific Comparison Lines */}
                  {policyType === "travel" && (
                    <>
                      <tr>
                        <td className="py-4 text-sm font-bold text-slate-800">Medical Expense Limit</td>
                        {comparedQuotes.map((q) => (
                          <td key={q.id} className="py-4 px-4 text-sm font-semibold text-slate-700">
                            ${travelMedicalLimit.toLocaleString()} USD
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-4 text-sm font-bold text-slate-800">COVID-19 Protection</td>
                        {comparedQuotes.map((q) => (
                          <td key={q.id} className="py-4 px-4 text-sm font-semibold text-slate-700">
                            {q.hasCovidCover ? (
                              <span className="inline-flex items-center gap-1 text-emerald-600 font-bold"><Check size={14} /> Included</span>
                            ) : (
                              <span className="text-slate-400">Not Included</span>
                            )}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-4 text-sm font-bold text-slate-800">Baggage Delay Coverage</td>
                        {comparedQuotes.map((q) => (
                          <td key={q.id} className="py-4 px-4 text-sm font-semibold text-slate-700">
                            {q.hasBaggageDelay ? (
                              <span className="inline-flex items-center gap-1 text-emerald-600 font-bold"><Check size={14} /> Included</span>
                            ) : (
                              <span className="text-slate-400">Not Included</span>
                            )}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-4 text-sm font-bold text-slate-800">Loss of Passport Cover</td>
                        {comparedQuotes.map((q) => (
                          <td key={q.id} className="py-4 px-4 text-sm font-semibold text-slate-700">
                            {q.hasPassportLoss ? (
                              <span className="inline-flex items-center gap-1 text-emerald-600 font-bold"><Check size={14} /> Covered</span>
                            ) : (
                              <span className="text-slate-400">Not Covered</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    </>
                  )}

                  {/* Buy Column */}
                  <tr>
                    <td className="py-4"></td>
                    {comparedQuotes.map((q) => (
                      <td key={q.id} className="py-4 px-4">
                        <button
                          onClick={() => handleBuyNow(q)}
                          className="bg-[#0aa36e] hover:bg-[#088b5d] text-white text-xs font-black py-2.5 px-4 rounded-xl transition duration-150 shadow-sm cursor-pointer"
                        >
                          Checkout Plan
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. Purchase / Checkout Modal (Multi-step) */}
      {checkoutQuote && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-100">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-[#f8fafc]">
              <div className="flex items-center gap-2">
                <Shield className="text-[#0aa36e]" size={20} />
                <h3 className="text-lg font-black text-slate-900 tracking-tight">Secure checkout</h3>
              </div>
              <button
                onClick={() => setCheckoutQuote(null)}
                className="text-slate-500 hover:text-slate-700 bg-slate-200/50 hover:bg-slate-200 p-1.5 rounded-lg transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Stepper Progress Bar */}
            <div className="grid grid-cols-3 text-center border-b border-slate-100 bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-500">
              <div className={`py-3 border-r border-slate-100 ${checkoutStep >= 1 ? "text-blue-600 bg-white" : ""}`}>
                1. Details
              </div>
              <div className={`py-3 border-r border-slate-100 ${checkoutStep >= 2 ? "text-blue-600 bg-white" : ""}`}>
                2. Payment
              </div>
              <div className={`py-3 ${checkoutStep >= 3 ? "text-emerald-600 bg-white" : ""}`}>
                3. Issued
              </div>
            </div>

            {/* Step 1: Customer Details */}
            {checkoutStep === 1 && (
              <form onSubmit={submitCheckoutDetails} className="p-6 space-y-4">
                <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100">
                  <p className="text-xs font-bold text-slate-600 uppercase">Selected Coverage</p>
                  <p className="font-extrabold text-slate-900 text-sm mt-1">
                    {checkoutQuote.insurer} - {checkoutQuote.planName}
                  </p>
                  <p className="text-xs font-semibold text-slate-500 mt-1">
                    Premium: ₹{policyType === "travel" ? checkoutQuote.premiumYearly.toLocaleString("en-IN") : isAnnualBilling ? checkoutQuote.premiumYearly.toLocaleString("en-IN") : checkoutQuote.premiumMonthly.toLocaleString("en-IN")} {policyType === "travel" ? `for ${travelDuration} Days` : isAnnualBilling ? "/ Year" : "/ Month"}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter policyholder name"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91-XXXXX-XXXXX"
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
                    />
                  </div>
                </div>

                {policyType === "travel" && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Passport Number (Mandatory)</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter international passport code"
                      value={passportNumber}
                      onChange={(e) => setPassportNumber(e.target.value.toUpperCase())}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white uppercase"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#0065ff] hover:bg-[#0054d6] text-white font-extrabold text-sm py-3 px-4 rounded-xl transition duration-150 shadow-sm flex items-center justify-center gap-1 cursor-pointer"
                >
                  Continue to Payment <ChevronRight size={16} />
                </button>
              </form>
            )}

            {/* Step 2: Payment Simulator */}
            {checkoutStep === 2 && (
              <div className="p-6 space-y-5">
                <div className="flex justify-between items-center bg-slate-50 p-4 border border-slate-100 rounded-2xl">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase">Amount Due</p>
                    <p className="text-xl font-black text-slate-900 mt-1">
                      ₹
                      {policyType === "travel"
                        ? checkoutQuote.premiumYearly.toLocaleString("en-IN")
                        : isAnnualBilling
                        ? checkoutQuote.premiumYearly.toLocaleString("en-IN")
                        : checkoutQuote.premiumMonthly.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <span className="text-xs bg-[#fff3e6] text-[#f58220] font-black px-3 py-1.5 rounded-lg border border-[#ffd5ab]">
                    Mock Transaction
                  </span>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">Select Payment Method</label>
                  
                  {[
                    { id: "upi", label: "Instant UPI (PhonePe / GPay)", desc: "Quick & direct bank transfer" },
                    { id: "card", label: "Credit / Debit Card", desc: "Visa, MasterCard, RuPay" },
                    { id: "netbanking", label: "Net Banking", desc: "All major Indian banks supported" }
                  ].map((method) => (
                    <label
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`flex items-start gap-3 p-3.5 border rounded-2xl cursor-pointer transition select-none ${paymentMethod === method.id ? "border-blue-500 bg-blue-50/20" : "border-slate-200 hover:bg-slate-50"
                        }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === method.id}
                        onChange={() => {}}
                        className="mt-1 text-blue-600 focus:ring-blue-500 border-slate-300"
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
                    onClick={submitPayment}
                    className="w-2/3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm py-3 px-4 rounded-xl transition duration-150 shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <CreditCard size={16} /> Pay Securely
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
                  <h3 className="text-xl font-black text-slate-950">Payment Successful!</h3>
                  <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">
                    Thank you, <span className="font-bold text-slate-800">{buyerName}</span>. Your {policyType === "health" ? "health" : policyType === "car" ? "motor" : policyType === "life" ? "life" : "travel"} insurance policy has been generated and activated.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-500">Policy Reference</span>
                    <span className="font-bold text-slate-800">CW-{(100000 + Math.floor(Math.random() * 900000))}</span>
                  </div>
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-500">Insurer Partner</span>
                    <span className="font-bold text-slate-800">{checkoutQuote.insurer}</span>
                  </div>
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-500">Insured Value</span>
                    <span className="font-bold text-slate-800">
                      {policyType === "health" && `₹${(healthSumInsured/100000).toFixed(0)} Lakhs`}
                      {policyType === "car" && `₹${(carIDV/100000).toFixed(0)} Lakhs (IDV)`}
                      {policyType === "life" && `₹${(lifeCover/10000000).toFixed(1)} Crore`}
                      {policyType === "travel" && `$${(travelMedicalLimit/1000).toLocaleString()}k USD Cover`}
                    </span>
                  </div>
                  {policyType === "travel" && (
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-500">Passport Number</span>
                      <span className="font-bold text-slate-800">{passportNumber}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-500">Activation Date</span>
                    <span className="font-bold text-slate-800">{new Date().toLocaleDateString("en-IN")}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      alert("Mock Policy PDF download started.");
                    }}
                    className="w-full bg-[#0065ff] hover:bg-[#0054d6] text-white font-extrabold text-sm py-3 px-4 rounded-xl transition duration-150 shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <FileCheck size={16} /> Download Policy PDF
                  </button>
                  <button
                    onClick={() => {
                      setCheckoutQuote(null);
                      setComparedQuotes([]);
                    }}
                    className="w-full text-slate-600 hover:text-slate-900 font-bold text-xs py-2 transition cursor-pointer"
                  >
                    Back to Comparison Dashboard
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
