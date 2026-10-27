export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#39BDA1",
        "primary-hover": "#2EA88E",
        "primary-dark": "#21453A",
        "primary-light": "#7FD9C5",
        "primary-pale": "#E4F0D4",
        "background-main": "#F5F7F6",
        "background-sidebar": "#D9E4E2",
        "background-card": "#FFFFFF",
        "background-soft": "#EEF3F1",
        "background-hover": "#ECF7F4",
        "text-primary": "#21453A",
        "text-secondary": "#626D65",
        "text-muted": "#8A928C",
        "text-light": "#B5BAB5",
        border: "#D5DDD9",
        "border-light": "#E7ECE9",
        success: "#39BDA1",
        warning: "#F4C95D",
        error: "#E57373",
        info: "#7FD9C5",
      },
      boxShadow: {
        soft: "0 12px 35px rgba(33, 69, 58, 0.08)",
      },
    },
  },
  plugins: [],
};
