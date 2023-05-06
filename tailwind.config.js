/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        sm: '1.25rem',
        md: '1.75rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl': '3.5rem',
      }
    }
  },
  plugins: [require("daisyui")],
}
