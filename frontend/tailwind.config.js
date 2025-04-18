/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",  // include all JS/TS/React files
        "./public/index.html",         // in case you're using CRA or similar
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#6366F1", // indigo-500
                    dark: "#4F46E5",    // indigo-600
                    light: "#A5B4FC",   // indigo-300
                    mainScreenBackground: "#e5e7eb",
                },
            },
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui'], // optional: add Inter font
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),     // better form styling
        require('@tailwindcss/typography'),// prose classes
        require('@tailwindcss/aspect-ratio') // for media layout
    ],
};
