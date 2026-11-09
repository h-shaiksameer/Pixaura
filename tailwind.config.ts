import type { Config } from "tailwindcss";
export default {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { colors: { ink: "#172033", mint: "#21c49a", cloud: "#f5f7fb" }, boxShadow: { card: "0 20px 60px rgba(30, 42, 70, .08)" } } },
  plugins: []
} satisfies Config;
