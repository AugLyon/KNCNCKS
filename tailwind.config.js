/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            center: true,
            padding: {
            },
            screens: {
                '2xs': '360px',
                xs: '480px',
                sm: '640px',
                md: '760px',
                lg: '960px',
                xl: '1240px',
                '2xl': '1536px',
                '3xl': '1728px',
                '4xl': '1920px',
            },
            fontFamily: {
                jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
            },
        },
    },
    plugins: [],
}