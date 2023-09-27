/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  variants: {
    extend: {
        display: ["group-hover"],
            },
            },
  theme: {
    extend: {
      display:["group-hover"],
      colors:{
        primary: '#FF6363',
        secondary:{
          100: '#E2E2D5',
          200: '#888883',
        }
      }
    },
    screens: {
      'sm': '320px',
      // => @media (min-width: 640px) { ... }
      'md': '780px',
      
      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
