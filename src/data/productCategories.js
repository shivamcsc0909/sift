// src/data/productCategories.js

export const PRODUCT_CATEGORIES = [
    {
        id: "personal",
        label: "Personal Insurance",

        sections: [
            {
                title: "Health Insurance",

                products: [
                    "Health Insurance",
                    "Health For Parents",
                    "Health Insurance PED",
                ],
            },

            {
                title: "Life Insurance",

                products: [
                    "Term Life Insurance",
                    "Free of Cost Term Plans",
                    "Term Plans with Return",
                ],
            },

            {
                title: "Travel",

                products: [
                    "Travel Insurance",
                ],
            },
        ],
    },

    {
        id: "investment",
        label: "Investment Plans",

        sections: [
            {
                title: "Savings & Wealth",

                products: [
                    "Investment Plans",
                    "Child Savings Plans",
                    "Retirement Plans",
                    "Dollar Based Investment",
                    "Guaranteed Return Plans",
                ],
            },
        ],
    },

    {
        id: "vehicle",
        label: "Vehicle Insurance",

        sections: [
            {
                title: "Motor Insurance",

                products: [
                    "Car Insurance",
                    "Two Wheeler Insurance",
                ],
            },
        ],
    },

    {
        id: "property",
        label: "Property & Assets",

        sections: [
            {
                title: "Property Protection",

                products: [
                    "Home Insurance",
                ],
            },
        ],
    },
];