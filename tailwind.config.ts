import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#10212B",
        sand: "#F4E7D7",
        coral: "#F16A4F",
        teal: "#1F8A8A",
        cream: "#FFFDF8",
        slate: "#5F6C72"
      },
      boxShadow: {
        glow: "0 20px 60px rgba(16, 33, 43, 0.12)"
      },
      borderRadius: {
        "4xl": "2rem"
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top, rgba(255,255,255,0.28), transparent 40%), linear-gradient(135deg, #10212B 0%, #1F8A8A 55%, #F16A4F 100%)"
      }
    }
  },
  plugins: []
};

export default config;
