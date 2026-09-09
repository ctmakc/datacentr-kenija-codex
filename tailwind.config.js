/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          600: "#2563eb",
          700: "#1d4ed8"
        },
        secondary: {
          500: "#10b981"
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          900: "#111827"
        },
        success: "#22c55e",
        warning: "#f59e0b",
        error: "#ef4444",
        accent: {
          purple: "#8b5cf6",
          cyan: "#06b6d4"
        }
      }
    }
  },
  plugins: []
};
