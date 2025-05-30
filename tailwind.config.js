import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      layout: {
        dividerWeight: "1px", 
        disabledOpacity: 0.45, 
        fontSize: {
          tiny: "0.75rem",   // 12px
          small: "0.875rem", // 14px
          medium: "0.9375rem", // 15px
          large: "1.125rem", // 18px
        },
        lineHeight: {
          tiny: "1rem", 
          small: "1.25rem", 
          medium: "1.5rem", 
          large: "1.75rem", 
        },
        radius: {
          small: "6px", 
          medium: "8px", 
          large: "12px", 
        },
        borderWidth: {
          small: "1px", 
          medium: "1px", 
          large: "2px", 
        },
      },
      themes: {
        light: {
          colors: {
            background: {
              DEFAULT: "#383939" // Cambiado de #fffef0 a #383939
            },
            content1: {
              DEFAULT: "#2d2e2e", // Cambiado para mejor contraste
              foreground: "#f4f4f4" // Cambiado para mejor contraste
            },
            content2: {
              DEFAULT: "#444545", // Cambiado para mejor contraste
              foreground: "#f4f4f4" // Cambiado para mejor contraste
            },
            content3: {
              DEFAULT: "#4a4b4b", // Cambiado para mejor contraste
              foreground: "#f4f4f4" // Cambiado para mejor contraste
            },
            content4: {
              DEFAULT: "#5a5b5b", // Cambiado para mejor contraste
              foreground: "#f4f4f4" // Cambiado para mejor contraste
            },
            divider: {
              DEFAULT: "rgba(244, 244, 244, 0.15)" // Cambiado para mejor contraste
            },
            focus: {
              DEFAULT: "#f01826"
            },
            foreground: {
              DEFAULT: "#f4f4f4" // Cambiado para mejor contraste
            },
            overlay: {
              DEFAULT: "#000000"
            },
            default: {
              50: "#fafafa",
              100: "#f4f4f5",
              200: "#e4e4e7",
              300: "#d4d4d8",
              400: "#a1a1aa",
              500: "#71717a",
              600: "#52525b",
              700: "#3f3f46",
              800: "#27272a",
              900: "#18181b",
              DEFAULT: "#d4d4d8",
              foreground: "#333333"
            },
            primary: {
              50: "#fefde8",
              100: "#fefbd0",
              200: "#fcf7a1",
              300: "#faf472",
              400: "#f7ef44",
              500: "#f4ec27", // Color principal
              600: "#c2bc1f",
              700: "#918d17",
              800: "#615e10",
              900: "#302f08",
              DEFAULT: "#f4ec27",
              foreground: "#333333"
            },
            secondary: {
              50: "#fee7e9",
              100: "#fdd0d3",
              200: "#faa0a7",
              300: "#f8717b",
              400: "#f5414f",
              500: "#f01826", // Color secundario
              600: "#c0131e",
              700: "#900e17",
              800: "#60090f",
              900: "#300508",
              DEFAULT: "#f01826",
              foreground: "#ffffff"
            },
            success: {
              50: "#e8faf0",
              100: "#d1f4e0",
              200: "#a2e9c1",
              300: "#74dfa2",
              400: "#45d483",
              500: "#17c964",
              600: "#12a150",
              700: "#0e793c",
              800: "#095028",
              900: "#052814",
              DEFAULT: "#17c964",
              foreground: "#000"
            },
            warning: {
              50: "#fefce8",
              100: "#fdedd3",
              200: "#fbdba7",
              300: "#f9c97c",
              400: "#f7b750",
              500: "#f5a524",
              600: "#c4841d",
              700: "#936316",
              800: "#62420e",
              900: "#312107",
              DEFAULT: "#f5a524",
              foreground: "#000"
            },
            danger: {
              50: "#fee7ef",
              100: "#fdd0df",
              200: "#faa0bf",
              300: "#f871a0",
              400: "#f54180",
              500: "#f31260",
              600: "#c20e4d",
              700: "#920b3a",
              800: "#610726",
              900: "#310413",
              DEFAULT: "#f31260",
              foreground: "#ffffff"
            }
          }
        }
      }
    })
  ]
}