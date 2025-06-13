/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                fuchsiaPink: {
                    50: '#FBF5FC',
                    100: '#F8E8FA',
                    200: '#ECCBF2',
                    300: '#E0AEEB',
                    400: '#C878DE',
                    500: '#ad47cf',
                    600: '#963ABA',
                    700: '#73279C',
                    800: '#55197D',
                    900: '#390E5C',
                    950: '#1F063B',
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms')({ strategy: 'class' }),
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/container-queries'),
        require('@tailwindcss/line-clamp'),
    ],
}
