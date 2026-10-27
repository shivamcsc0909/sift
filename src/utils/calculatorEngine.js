export function calculateCalculator(type, values) {
    const calculators = {
        sip: calculateSIP,
        "income-tax": calculateIncomeTax,
        ulip: calculateULIP,
        nps: calculateNPS,
        bmi: calculateBMI,
        "ideal-weight": calculateIdealWeight,
        calorie: calculateCalories,
        "body-fat": calculateBodyFat,
        "health-premium": calculateHealthPremium,
        "car-insurance": calculateCarPremium,
        "bike-insurance": calculateBikePremium,
        "travel-insurance": calculateTravelPremium,
    };

    return calculators[type]?.(values) || {};
}
function calculateULIP({
    annualPremium,
    returnRate,
    years,
}) {
    const rate = returnRate / 100;

    const fundValue =
        annualPremium *
        (((1 + rate) ** years - 1) /
            rate);

    const totalInvestment =
        annualPremium * years;

    return {
        totalInvestment:
            Math.round(totalInvestment),

        wealthCreated:
            Math.round(
                fundValue -
                totalInvestment
            ),

        fundValue:
            Math.round(fundValue),
    };
}
function calculateSIP({
    monthlyInvestment,
    returnRate,
    years,
}) {
    const i = returnRate / 100 / 12;
    const n = years * 12;

    const maturityValue =
        monthlyInvestment *
        (((1 + i) ** n - 1) / i) *
        (1 + i);

    const totalInvested =
        monthlyInvestment * n;

    return {
        totalInvested: Math.round(totalInvested),
        estimatedReturns: Math.round(
            maturityValue - totalInvested
        ),
        maturityValue: Math.round(maturityValue),
    };
}

function calculateBMI({ height, weight }) {
    const bmi =
        weight /
        ((height / 100) * (height / 100));

    let category = "Normal";

    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 25) category = "Normal";
    else if (bmi < 30) category = "Overweight";
    else category = "Obese";

    return {
        bmi: bmi.toFixed(1),
        category,
    };
}

function calculateIncomeTax({
    annualIncome,
    deductions,
}) {
    const taxableIncome =
        annualIncome - deductions;

    const taxPayable =
        taxableIncome * 0.1;

    return {
        taxPayable: Math.round(
            taxPayable
        ),
        taxSavings: deductions * 0.2,
        netIncome:
            annualIncome - taxPayable,
    };
}


function calculateNPS({
    monthlyContribution,
    currentAge,
    retirementAge,
    returnRate,
}) {
    const years =
        retirementAge -
        currentAge;

    const monthlyRate =
        returnRate / 100 / 12;

    const months =
        years * 12;

    const corpus =
        monthlyContribution *
        (((1 + monthlyRate) **
            months -
            1) /
            monthlyRate);

    return {
        corpus:
            Math.round(corpus),

        monthlyPension:
            Math.round(
                corpus * 0.004
            ),

        taxBenefit:
            Math.round(
                monthlyContribution *
                12 *
                0.2
            ),
    };
}

function calculateIdealWeight({
    height,
    gender,
}) {
    const inches =
        height / 2.54;

    const base =
        gender === "male"
            ? 50
            : 45.5;

    const idealWeight =
        base +
        2.3 * (inches - 60);

    return {
        idealWeight:
            Math.round(
                idealWeight
            ),
    };
}

function calculateCalories({
    age,
    weight,
    height,
}) {
    const bmr =
        10 * weight +
        6.25 * height -
        5 * age +
        5;

    return {
        maintenanceCalories:
            Math.round(
                bmr * 1.55
            ),

        weightLossCalories:
            Math.round(
                bmr * 1.3
            ),

        weightGainCalories:
            Math.round(
                bmr * 1.8
            ),
    };
}

function calculateBodyFat({
    waist,
    height,
}) {
    const bodyFat =
        (waist / height) *
        100;

    return {
        bodyFat:
            bodyFat.toFixed(1),

        fitnessCategory:
            bodyFat < 20
                ? "Fit"
                : bodyFat < 30
                    ? "Average"
                    : "High",
    };
}

function calculateHealthPremium({
    age,
    sumInsured,
}) {
    age = Number(age) || 30;
    sumInsured =
        Number(sumInsured) ||
        1000000;
    const premium =
        age * 150 +
        sumInsured *
        0.005;

    return {
        estimatedPremium:
            Math.round(
                premium
            ),

        recommendedPlans:
            Math.max(
                3,
                Math.floor(
                    10 - age / 10
                )
            ),
    };
}
function calculateCarPremium({
    vehicleAge,
    idv,
}) {
    vehicleAge =
        Number(vehicleAge) || 3;

    idv =
        Number(idv) || 500000;

    const premium =
        idv * 0.025 +
        vehicleAge * 500;

    return {
        estimatedPremium:
            Math.round(premium),

        suggestedAddons:
            vehicleAge > 5
                ? 3
                : 5,
    };
} function calculateBikePremium({
    bikeAge,
    idv,
}) {
    bikeAge =
        Number(bikeAge) || 2;

    idv =
        Number(idv) || 100000;

    const premium =
        idv * 0.02 +
        bikeAge * 150;

    return {
        estimatedPremium:
            Math.round(premium),

        suggestedAddons:
            bikeAge > 5
                ? 2
                : 4,
    };
} function calculateTravelPremium({
    days,
    travellers,
}) {
    days =
        Number(days) || 10;

    travellers =
        Number(travellers) || 1;

    const premium =
        days *
        travellers *
        75;

    return {
        estimatedPremium:
            Math.round(premium),

        recommendedPlans: 6,
    };
}