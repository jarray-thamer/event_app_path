/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        checked: "#37D764",
        notchecked: "#3F3D56",
        busy: "#FF7826",
        available: "#37D764",
        setAdmin: "#7A0FCF",
        borderSurvey: "#022F5E",
        logocolor: "#001F3F",
      },
      spacing: {
        line: "50.5%",
      },
    },
  },
  plugins: [],
};
