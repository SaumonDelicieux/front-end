/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: ["./src/**/*.{html, ts, tsx}", "./src/**/*"],
    theme: {
        fontFamily: {
            monderatRegular: ['"Moderat-Regular"', "sans-serif"],
            monderatBold: ['"Moderat-Bold"', "sans-serif"],
        },
        extend: {
            colors: {
                searchBlue: "#d9d9d959",
            },
        },
    },
    plugins: [],
}
