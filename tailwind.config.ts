import type { Config } from "tailwindcss";
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend:
     {
      colors:{
        'Royal':'#334EAC',
        'Moon' : '#F7F2EB',
        'China': '#7096D1',
        'Asian-Pear':'#F2F0DE',
        'Midnight':'#081F5C',
        'Dawn':'#D0E3FF',
        'Jicama':'#FFF9F0',
        'Porcelain':'#EDF1F6',
        'Sky':'#BAD6EB',
      },
      rotate: {
        '270': '270deg',
      },
      transitionProperty: {
        'height': 'height',
      },
      backgroundColor: {
        'primary': '#16423C',
        'secondary': '#C4DAD2',
      },
      textColor: {
        'primary': '#16423C',
        'secondary': '#E9EFEC',
      },
    },
  },
  plugins: []} satisfies Config;


