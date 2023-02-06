/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': "#171721",
        'secondary': "#21212d",
        'third':'#424153',
        'pink2': "#f874a2",
        'green2': "#70c6bc",
        'purple2': "#b06ad8",
        'yellow2': "#e6b22f",
      },
    },
    fontFamily:{
      rubik: ['Rubik']
    }
  },
  plugins: [],
};
