export const CALCULATOR_CATEGORIES = {
  investment: {
    id: "investment",
    title: "Investment Calculators",
  },

  health: {
    id: "health",
    title: "Health & Wellness Calculators",
  },

  insurance: {
    id: "insurance",
    title: "Policy Premium Calculators",
  },
};

export const CALCULATOR_CONFIG = {
  sip: {
    slug: "sip",
    category: "investment",

    title: "SIP Calculator",
    badge: "Investment Calculator",
    icon: "TrendingUp",

    description:
      "Calculate future wealth generated through monthly SIP investments.",

    fields: [
      {
        name: "monthlyInvestment",
        label: "Monthly Investment",
        type: "number",
        defaultValue: 5000,
      },

      {
        name: "returnRate",
        label: "Expected Return (%)",
        type: "number",
        defaultValue: 12,
      },

      {
        name: "years",
        label: "Investment Period (Years)",
        type: "number",
        defaultValue: 15,
      },
    ],

    resultFields: [
      {
        key: "totalInvested",
        label: "Total Invested",
        format: "currency",
      },

      {
        key: "estimatedReturns",
        label: "Estimated Returns",
        format: "currency",
      },

      {
        key: "maturityValue",
        label: "Maturity Value",
        format: "currency",
      },
    ],

    formula:
      "Future Value of SIP using monthly compounding.",

    related: ["ulip", "nps", "income-tax"],

    faqs: [
      {
        question: "What is SIP?",
        answer:
          "A SIP allows you to invest a fixed amount regularly in mutual funds.",
      },

      {
        question: "Are SIP returns guaranteed?",
        answer:
          "No. SIP returns depend on market performance.",
      },
    ],
  },

  "income-tax": {
    slug: "income-tax",
    category: "investment",

    title: "Income Tax Calculator",
    badge: "Tax Calculator",
    icon: "Calculator",

    description:
      "Estimate tax payable under old and new tax regimes.",

    fields: [
      {
        name: "annualIncome",
        label: "Annual Income",
        type: "number",
        defaultValue: 1000000,
      },

      {
        name: "deductions",
        label: "Deductions",
        type: "number",
        defaultValue: 150000,
      },

      {
        name: "regime",
        label: "Tax Regime",
        type: "select",
        defaultValue: "new",

        options: [
          { label: "New Regime", value: "new" },
          { label: "Old Regime", value: "old" },
        ],
      },
    ],

    resultFields: [
      {
        key: "taxPayable",
        label: "Tax Payable",
        format: "currency",
      },

      {
        key: "taxSavings",
        label: "Tax Savings",
        format: "currency",
      },

      {
        key: "netIncome",
        label: "Net Income",
        format: "currency",
      },
    ],

    formula:
      "Income tax slabs based on selected tax regime.",

    related: ["sip", "ulip", "nps"],

    faqs: [],
  },

  ulip: {
    slug: "ulip",
    category: "investment",

    title: "ULIP Calculator",
    badge: "Investment Calculator",
    icon: "Shield",

    description:
      "Estimate future ULIP fund value.",

    fields: [
      {
        name: "annualPremium",
        label: "Annual Premium",
        type: "number",
        defaultValue: 50000,
      },

      {
        name: "returnRate",
        label: "Expected Return (%)",
        type: "number",
        defaultValue: 10,
      },

      {
        name: "years",
        label: "Years",
        type: "number",
        defaultValue: 20,
      },
    ],

    resultFields: [
      {
        key: "totalInvestment",
        label: "Total Investment",
        format: "currency",
      },

      {
        key: "wealthCreated",
        label: "Wealth Created",
        format: "currency",
      },

      {
        key: "fundValue",
        label: "Fund Value",
        format: "currency",
      },
    ],

    formula:
      "Compound annual growth calculation.",

    related: ["sip", "nps", "income-tax"],

    faqs: [],
  },

  nps: {
    slug: "nps",
    category: "investment",

    title: "NPS Calculator",
    badge: "Retirement Calculator",
    icon: "PiggyBank",

    description:
      "Estimate retirement corpus through NPS investments.",

    fields: [
      {
        name: "monthlyContribution",
        label: "Monthly Contribution",
        type: "number",
        defaultValue: 5000,
      },

      {
        name: "currentAge",
        label: "Current Age",
        type: "number",
        defaultValue: 30,
      },

      {
        name: "retirementAge",
        label: "Retirement Age",
        type: "number",
        defaultValue: 60,
      },

      {
        name: "returnRate",
        label: "Expected Return (%)",
        type: "number",
        defaultValue: 10,
      },
    ],

    resultFields: [
      "corpus",
      "monthlyPension",
      "taxBenefit",
    ],

    formula:
      "Future value of monthly retirement contributions.",

    related: ["sip", "ulip", "income-tax"],

    faqs: [],
  },

  bmi: {
    slug: "bmi",
    category: "health",

    title: "BMI Calculator",
    badge: "Health Calculator",
    icon: "Heart",

    description:
      "Check your Body Mass Index.",

    fields: [
      {
        name: "height",
        label: "Height (cm)",
        type: "number",
        defaultValue: 170,
      },

      {
        name: "weight",
        label: "Weight (kg)",
        type: "number",
        defaultValue: 70,
      },
    ],

    resultFields: [
      {
        key: "bmi",
        label: "BMI",
        format: "number",
      },

      {
        key: "category",
        label: "Category",
        format: "text",
      },
    ],

    formula:
      "BMI = Weight (kg) ÷ Height² (m²)",

    related: [
      "ideal-weight",
      "body-fat",
      "calorie",
    ],

    faqs: [],
  },

  "ideal-weight": {
    slug: "ideal-weight",
    category: "health",

    title: "Ideal Weight Calculator",
    badge: "Health Calculator",
    icon: "Scale",

    description:
      "Estimate ideal body weight.",

    fields: [
      {
        name: "height",
        label: "Height (cm)",
        type: "number",
        defaultValue: 170,
      },

      {
        name: "gender",
        label: "Gender",
        type: "select",

        defaultValue: "male",

        options: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ],
      },
    ],

    resultFields: [
      {
        key: "idealWeight",
        label: "Ideal Weight",
        format: "number",
      },
    ],

    formula:
      "Devine Ideal Body Weight Formula",

    related: ["bmi", "body-fat", "calorie"],

    faqs: [],
  },

  calorie: {
    slug: "calorie",
    category: "health",

    title: "Calorie Calculator",
    badge: "Health Calculator",
    icon: "Flame",

    description:
      "Estimate daily calorie requirements.",

    fields: [
      {
        name: "age",
        label: "Age",
        type: "number",
        defaultValue: 30,
      },

      {
        name: "weight",
        label: "Weight (kg)",
        type: "number",
        defaultValue: 70,
      },

      {
        name: "height",
        label: "Height (cm)",
        type: "number",
        defaultValue: 170,
      },
    ],

    resultFields: [
      {
        key: "maintenanceCalories",
        label: "Maintenance Calories",
        format: "number",
      },

      {
        key: "weightLossCalories",
        label: "Weight Loss Calories",
        format: "number",
      },

      {
        key: "weightGainCalories",
        label: "Weight Gain Calories",
        format: "number",
      },
    ],

    formula:
      "Mifflin-St Jeor Equation",

    related: ["bmi", "body-fat", "ideal-weight"],

    faqs: [],
  },

  "body-fat": {
    slug: "body-fat",
    category: "health",

    title: "Body Fat Calculator",
    badge: "Health Calculator",
    icon: "Activity",

    description:
      "Estimate body fat percentage.",

    fields: [
      {
        name: "waist",
        label: "Waist (cm)",
        type: "number",
        defaultValue: 80,
      },

      {
        name: "height",
        label: "Height (cm)",
        type: "number",
        defaultValue: 170,
      },
    ],

    resultFields: [
      {
        key: "bodyFat",
        label: "Body Fat %",
        format: "percentage",
      },

      {
        key: "fitnessCategory",
        label: "Fitness Category",
        format: "text",
      },
    ],

    formula:
      "US Navy Body Fat Formula",

    related: ["bmi", "ideal-weight", "calorie"],

    faqs: [],
  },

  "health-premium": {
    slug: "health-premium",

    category: "insurance",

    title: "Health Premium Calculator",

    badge: "Insurance Calculator",

    icon: "ShieldPlus",

    description:
      "Estimate health insurance premiums and discover suitable plans.",

    fields: [
      {
        name: "age",
        label: "Age",
        type: "number",
        defaultValue: 30,
        min: 18,
        max: 100,
      },

      {
        name: "sumInsured",
        label: "Coverage Amount",
        type: "number",
        defaultValue: 1000000,
        step: 100000,
        prefix: "₹",
      },
    ],

    resultFields: [
      {
        key: "estimatedPremium",
        label: "Estimated Premium",
        format: "currency",
      },

      {
        key: "recommendedPlans",
        label: "Recommended Plans",
        format: "number",
      },
    ],

    formula: {
      title: "Health Premium Estimation",
      description:
        "Premium depends on age, coverage amount and risk factors.",
    },

    cta: {
      label: "Compare Health Plans",
      route: "/compare-quotes?type=health",
    },

    related: [
      "car-insurance",
      "bike-insurance",
      "travel-insurance",
    ],

    faqs: [],
  },

  "car-insurance": {
    slug: "car-insurance",
    category: "insurance",

    title: "Car Insurance Calculator",
    badge: "Insurance Calculator",
    icon: "Car",

    description:
      "Estimate car insurance premiums.",

    fields: [
      {
        name: "vehicleAge",
        label: "Vehicle Age",
        type: "number",
        defaultValue: 3,
      },

      {
        name: "idv",
        label: "IDV",
        type: "number",
        defaultValue: 500000,
      },
    ],

    resultFields: [
      {
        key: "estimatedPremium",
        label: "Estimated Premium",
        format: "currency",
      },

      {
        key: "suggestedAddons",
        label: "Suggested Add-ons",
        format: "number",
      },
    ],

    formula:
      "IDV based premium estimation",

    related: [
      "bike-insurance",
      "travel-insurance",
      "health-premium",
    ],

    faqs: [],
  },

  "bike-insurance": {
    slug: "bike-insurance",
    category: "insurance",

    title: "Bike Insurance Calculator",
    badge: "Insurance Calculator",
    icon: "Bike",

    description:
      "Estimate bike insurance premiums.",

    fields: [
      {
        name: "bikeAge",
        label: "Bike Age",
        type: "number",
        defaultValue: 2,
      },

      {
        name: "idv",
        label: "IDV",
        type: "number",
        defaultValue: 100000,
      },
    ],

    "bike-insurance": {
      slug: "bike-insurance",
      category: "insurance",

      title: "Bike Insurance Calculator",
      badge: "Insurance Calculator",
      icon: "Bike",

      description:
        "Estimate bike insurance premiums.",

      fields: [
        {
          name: "bikeAge",
          label: "Bike Age",
          type: "number",
          defaultValue: 2,
        },

        {
          name: "idv",
          label: "IDV",
          type: "number",
          defaultValue: 100000,
        },
      ],

      resultFields: [
        "estimatedPremium",
        "suggestedAddons",
      ],

      formula:
        "Bike insurance premium estimation",

      related: [
        "car-insurance",
        "travel-insurance",
        "health-premium",
      ],

      faqs: [],
    },

    formula:
      "Bike insurance premium estimation",

    related: [
      "car-insurance",
      "travel-insurance",
      "health-premium",
    ],

    faqs: [],
  },

  "travel-insurance": {
    slug: "travel-insurance",
    category: "insurance",

    title: "Travel Insurance Calculator",
    badge: "Insurance Calculator",
    icon: "Plane",

    description:
      "Estimate travel insurance premiums.",

    fields: [
      {
        name: "days",
        label: "Trip Duration (Days)",
        type: "number",
        defaultValue: 10,
      },

      {
        name: "travellers",
        label: "Travellers",
        type: "number",
        defaultValue: 1,
      },
    ],

    resultFields: [
      {
        key: "estimatedPremium",
        label: "Estimated Premium",
        format: "currency",
      },

      {
        key: "recommendedPlans",
        label: "Recommended Plans",
        format: "number",
      },
    ],

    formula:
      "Trip duration and traveller count estimation",

    related: [
      "car-insurance",
      "bike-insurance",
      "health-premium",
    ],

    faqs: [],
  },
};