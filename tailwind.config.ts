/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#1a202c',
            h1: {
              color: '#1a202c',
              fontWeight: '700',
            },
            h2: {
              color: '#1a202c',
              fontWeight: '600',
            },
            h3: {
              color: '#1a202c',
              fontWeight: '600',
            },
            code: {
              color: '#1a202c',
              backgroundColor: '#f7fafc',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              font: 'inherit',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#f7fafc',
              color: '#1a202c',
              borderRadius: '0.375rem',
              padding: '1rem',
            },
            a: {
              color: '#059669',
              textDecoration: 'none',
              '&:hover': {
                color: '#047857',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}