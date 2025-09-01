/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
   theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        doom: {
          DEFAULT: '#0B0B0B',
          surface: '#0F0F10',
          pink: '#FF1964',
          accent: '#FF2B6D',
          muted: '#9AA0A6',
        },
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}