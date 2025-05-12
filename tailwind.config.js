/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./public/index.html",
    ],
    darkMode: 'media', // or 'class' for manual dark mode toggle
    theme: {
      extend: {
        fontFamily: {
          sans: [
            '"Inter var"',
            'Inter',
            'system-ui',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
          ],
          mono: [
            'JetBrains Mono',
            'ui-monospace',
            'SFMono-Regular',
            'Menlo',
            'Monaco',
            'Consolas',
            '"Liberation Mono"',
            '"Courier New"',
            'monospace',
          ],
        },
        colors: {
          primary: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1',
            800: '#075985',
            900: '#0c4a6e',
            950: '#082f49',
          },
          secondary: {
            50: '#fdf4ff',
            100: '#fae8ff',
            200: '#f5d0fe',
            300: '#f0abfc',
            400: '#e879f9',
            500: '#d946ef',
            600: '#c026d3',
            700: '#a21caf',
            800: '#86198f',
            900: '#701a75',
            950: '#4a044e',
          },
        },
        spacing: {
          '72': '18rem',
          '84': '21rem',
          '96': '24rem',
          '128': '32rem',
        },
        animation: {
          'text-gradient': 'text-gradient 1.5s linear infinite',
          'background-shine': 'background-shine 2s linear infinite',
          'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'float': 'float 3s ease-in-out infinite',
        },
        keyframes: {
          'text-gradient': {
            to: {
              'background-position': '200% center',
            },
          },
          'background-shine': {
            from: { backgroundPosition: '0 0' },
            to: { backgroundPosition: '-200% 0' },
          },
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          },
        },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'hero-pattern': 'url("/assets/images/hero-bg-pattern.svg")',
        },
        boxShadow: {
          'soft': '0 5px 20px -5px rgba(0, 0, 0, 0.1)',
          'glow': '0 0 15px 2px rgba(14, 165, 233, 0.3)',
          'glow-purple': '0 0 15px 2px rgba(217, 70, 239, 0.3)',
        },
        typography: (theme) => ({
          DEFAULT: {
            css: {
              color: theme('colors.gray.900'),
              a: {
                color: theme('colors.primary.600'),
                '&:hover': {
                  color: theme('colors.primary.800'),
                },
              },
              'h1, h2, h3, h4': {
                color: theme('colors.gray.900'),
                fontWeight: theme('fontWeight.bold'),
              },
            },
          },
          dark: {
            css: {
              color: theme('colors.gray.300'),
              a: {
                color: theme('colors.primary.400'),
                '&:hover': {
                  color: theme('colors.primary.300'),
                },
              },
              'h1, h2, h3, h4': {
                color: theme('colors.white'),
              },
            },
          },
        }),
      },
    },
    plugins: [
      (await import('@tailwindcss/typography')).default,
      (await import('@tailwindcss/forms')).default,
    ],
  };