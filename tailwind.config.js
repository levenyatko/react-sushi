/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    DEFAULT: '#fc292b',
                    medium: '#f4686a',
                    strong: '#810304',
                }
            }
        },
    },
    plugins: [],
}
