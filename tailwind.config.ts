import type { Config } from "tailwindcss";

export default {
 content: [
   "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
   "./src/components/**/*.{js,ts,jsx,tsx,mdx}", 
   "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
 ],
 theme: {
   extend: {
     colors: {
       background: "var(--background)",
       foreground: "var(--foreground)",
     },
     keyframes: {
       slideUp: {
         '0%': { transform: 'translateY(100%)' },
         '100%': { transform: 'translateY(0)' }
       }
     },
     animation: {
       slideUp: 'slideUp 0.3s ease-out'
     }
   },
 },
 plugins: [],
} satisfies Config;