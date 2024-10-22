/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
   theme: {
      extend: {
         colors: {
            background: "var(--background)",
            foreground: "var(--foreground)",
         },
         backgroundImage: {
            slider: "url('https://i.ibb.co.com/pPBmYPt/img1.jpg')",
         },

         fontFamily: {
            primaryF: "Rozha One",
            primaryC: "Oleo Script",
            primaryG: "Rubik Glitch",
            primaryT: "Crimson Pro",
            primaryN: "Lexend Deca",
         },
         keyframes: {
            animatedgradient: {
               "0%": { backgroundPosition: "0% 50%" },
               "50%": { backgroundPosition: "100% 50%" },
               "100%": { backgroundPosition: "0% 50%" },
            },
         },
         backgroundSize: {
            "300%": "300%",
         },
         animation: {
            gradient: "animatedgradient 6s ease infinite alternate",
         },
      },
      daisyui: {
         themes: ["light", "dark", "cupcake"],
      },
   },
   plugins: [require("daisyui")],
};
