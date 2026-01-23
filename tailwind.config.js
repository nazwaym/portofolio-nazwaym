/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#A78BFA', // Lavender
          dark: '#8B5CF6',
        },
        secondary: {
          DEFAULT: '#F0ABFC', // Pink Glow
        },
        accent: {
          DEFAULT: '#C084FC', // Violet
        },
        dark: {
          bg: '#0F0F1A', // Deep Navy
          card: 'rgba(255, 255, 255, 0.05)', // Glassmorphism
          border: '#1F2937', // Dark Gray
        },
        text: {
          main: '#F9FAFB', // Soft White
          muted: '#9CA3AF',
        }
      },
      animation: {
        'blob': 'blob 7s infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
