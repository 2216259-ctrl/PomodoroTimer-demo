/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#13c8ec',
                'background-light': '#f6f8f8',
                'background-dark': '#101f22',
                'surface-dark': '#1a2c30',
                'border-dark': '#223032',
            },
            fontFamily: {
                display: ['Inter', 'sans-serif']
            },
            borderRadius: {
                DEFAULT: '0.25rem',
                lg: '0.5rem',
                xl: '0.75rem',
                full: '9999px',
            },
            animation: {
                'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'ping-slow': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
            },
        },
    },
    plugins: [],
};
