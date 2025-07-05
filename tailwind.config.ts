import type { Config } from 'tailwindcss'
import { designTokens } from './src/lib/design-system'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      // Professional Color Palette
      colors: {
        // Surface colors using CSS variables for theme switching
        surface: {
          DEFAULT: 'rgb(var(--color-surface-background) / <alpha-value>)',
          background: 'rgb(var(--color-surface-background) / <alpha-value>)',
          card: 'rgb(var(--color-surface-card) / <alpha-value>)',
          border: 'rgb(var(--color-surface-border) / <alpha-value>)',
          hover: 'rgb(var(--color-surface-hover) / <alpha-value>)',
        },
        
        // Text colors
        primary: 'rgb(var(--color-text-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
        muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
        accent: 'rgb(var(--color-text-accent) / <alpha-value>)',
        
        // Brand colors
        brand: {
          primary: 'rgb(var(--color-primary-brand) / <alpha-value>)',
          secondary: 'rgb(var(--color-primary-secondary) / <alpha-value>)',
        },
        
        // Status colors
        status: {
          success: 'rgb(var(--color-status-success) / <alpha-value>)',
          warning: 'rgb(var(--color-status-warning) / <alpha-value>)',
          error: 'rgb(var(--color-status-error) / <alpha-value>)',
          info: 'rgb(var(--color-status-info) / <alpha-value>)',
        },
        
        // Canadian theme colors
        canadian: {
          red: 'rgb(var(--color-canadian-red) / <alpha-value>)',
          white: 'rgb(var(--color-canadian-white) / <alpha-value>)',
          maple: 'rgb(var(--color-canadian-maple) / <alpha-value>)',
        },
        
        // Extended color palette for charts and visualizations
        chart: {
          1: '#3b82f6', // Blue
          2: '#10b981', // Green
          3: '#f59e0b', // Yellow
          4: '#ef4444', // Red
          5: '#8b5cf6', // Purple
          6: '#06b6d4', // Cyan
          7: '#f97316', // Orange
          8: '#84cc16', // Lime
        }
      },
      
      // Typography using Inter font system
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Consolas', 'monospace'],
      },
      
      // Professional font sizes from design system
      fontSize: {
        'xs': ['0.6875rem', { lineHeight: '1rem' }],      // 11px
        'sm': ['0.75rem', { lineHeight: '1.25rem' }],     // 12px
        'base': ['0.875rem', { lineHeight: '1.5rem' }],   // 14px
        'lg': ['1rem', { lineHeight: '1.75rem' }],        // 16px
        'xl': ['1.125rem', { lineHeight: '1.75rem' }],    // 18px
        '2xl': ['1.25rem', { lineHeight: '2rem' }],       // 20px
        '3xl': ['1.5rem', { lineHeight: '2rem' }],        // 24px
        '4xl': ['1.75rem', { lineHeight: '2.25rem' }],    // 28px
        '5xl': ['2rem', { lineHeight: '2.5rem' }],        // 32px
        '6xl': ['2.5rem', { lineHeight: '3rem' }],        // 40px
      },
      
      // Professional spacing scale
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Border radius for modern design
      borderRadius: {
        'sm': '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      
      // Professional shadows
      boxShadow: {
        'glow': '0 0 20px rgb(59 130 246 / 0.3)',
        'glow-lg': '0 0 30px rgb(59 130 246 / 0.4)',
        'card': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'card-hover': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'ambient': '0 0 0 1px rgb(var(--color-primary-secondary) / 0.1), 0 8px 16px rgb(0 0 0 / 0.15)',
      },
      
      // Animation and transitions
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ambient-pulse': 'ambientPulse 3s ease-in-out infinite',
        'data-flow': 'dataFlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s ease-in-out infinite',
      },
      
      // Keyframes for custom animations
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        ambientPulse: {
          '0%, 100%': { 
            opacity: '1', 
            transform: 'scale(1)',
            boxShadow: '0 0 0 0 rgba(var(--color-primary-secondary), 0.7)'
          },
          '50%': { 
            opacity: '0.9', 
            transform: 'scale(1.02)',
            boxShadow: '0 0 0 10px rgba(var(--color-primary-secondary), 0)'
          },
        },
        dataFlow: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateX(10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      
      // Backdrop blur utilities
      backdropBlur: {
        'xs': '2px',
      },
      
      // Professional grid system
      gridTemplateColumns: {
        'dashboard': 'minmax(300px, 1fr) 3fr',
        'cards': 'repeat(auto-fit, minmax(300px, 1fr))',
      },
      
      // Z-index scale
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      
      // Screen sizes optimized for Canadian business context
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
      },
      
      // Container configuration
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1400px',
        },
      },
      
      // Professional gradient stops
      gradientColorStops: {
        'brand-start': 'rgb(var(--color-primary-brand))',
        'brand-end': 'rgb(var(--color-primary-secondary))',
        'surface-start': 'rgb(var(--color-surface-background))',
        'surface-end': 'rgb(var(--color-surface-card))',
      },
      
      // Line height optimizations
      lineHeight: {
        'tight': '1.1',
        'snug': '1.3',
        'normal': '1.5',
        'relaxed': '1.6',
        'loose': '1.8',
      },
      
      // Letter spacing for professional typography
      letterSpacing: {
        'tightest': '-0.075em',
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0em',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
      },
    },
  },
  plugins: [
    // Plugin for custom utilities
    function({ addUtilities, theme }: any) {
      const newUtilities = {
        // Professional text utilities
        '.text-balance': {
          'text-wrap': 'balance',
        },
        
        // Canadian currency formatting
        '.currency-cad::before': {
          content: '"CAD $"',
        },
        
        // Status indicator utilities
        '.status-online': {
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '0',
            right: '0',
            width: '8px',
            height: '8px',
            backgroundColor: 'rgb(var(--color-status-success))',
            borderRadius: '50%',
            border: '2px solid rgb(var(--color-surface-background))',
            boxShadow: '0 0 0 2px rgba(var(--color-status-success), 0.3)',
          },
        },
        
        // Glass morphism effect
        '.glass': {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        
        // Performance optimized animations
        '.gpu-accelerated': {
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          perspective: '1000px',
        },
        
        // Ambient glow effect
        '.ambient-glow': {
          boxShadow: '0 0 20px rgba(var(--color-primary-secondary), 0.3)',
          transition: 'box-shadow 0.3s ease',
          '&:hover': {
            boxShadow: '0 0 30px rgba(var(--color-primary-secondary), 0.5)',
          },
        },
        
        // Canadian flag gradient
        '.canada-gradient': {
          background: 'linear-gradient(45deg, rgb(var(--color-canadian-red)) 0%, rgb(var(--color-canadian-white)) 50%, rgb(var(--color-canadian-red)) 100%)',
        },
        
        // Scrollbar styling
        '.scrollbar-thin': {
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgb(var(--color-surface-border)) rgb(var(--color-surface-background))',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgb(var(--color-surface-background))',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgb(var(--color-surface-border))',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'rgb(var(--color-surface-hover))',
          },
        },
      }
      
      addUtilities(newUtilities)
    },
    
    // Plugin for component variants
    function({ addComponents, theme }: any) {
      const components = {
        // Button components
        '.btn': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: theme('borderRadius.lg'),
          padding: `${theme('spacing.2')} ${theme('spacing.4')}`,
          fontSize: theme('fontSize.sm')[0],
          fontWeight: theme('fontWeight.medium'),
          transition: 'all 0.2s ease',
          outline: 'none',
          '&:focus': {
            ring: `2px solid ${theme('colors.blue.500')}`,
            ringOffset: '2px',
          },
        },
        
        '.btn-primary': {
          backgroundColor: 'rgb(var(--color-primary-brand))',
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgb(var(--color-primary-brand) / 0.9)',
          },
        },
        
        '.btn-secondary': {
          backgroundColor: 'rgb(var(--color-surface-card))',
          color: 'rgb(var(--color-text-primary))',
          border: '1px solid rgb(var(--color-surface-border))',
          '&:hover': {
            backgroundColor: 'rgb(var(--color-surface-hover))',
          },
        },
        
        // Card components
        '.card': {
          backgroundColor: 'rgb(var(--color-surface-card))',
          border: '1px solid rgb(var(--color-surface-border))',
          borderRadius: theme('borderRadius.lg'),
          padding: theme('spacing.6'),
          boxShadow: theme('boxShadow.card'),
        },
        
        '.card-interactive': {
          backgroundColor: 'rgb(var(--color-surface-card))',
          border: '1px solid rgb(var(--color-surface-border))',
          borderRadius: theme('borderRadius.lg'),
          padding: theme('spacing.6'),
          boxShadow: theme('boxShadow.card'),
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: theme('boxShadow.card-hover'),
            borderColor: 'rgb(var(--color-surface-hover))',
          },
        },
        
        // Status badges
        '.badge': {
          display: 'inline-flex',
          alignItems: 'center',
          padding: `${theme('spacing.1')} ${theme('spacing.2')}`,
          fontSize: theme('fontSize.xs')[0],
          fontWeight: theme('fontWeight.medium'),
          borderRadius: theme('borderRadius.full'),
        },
        
        '.badge-success': {
          backgroundColor: 'rgba(var(--color-status-success), 0.1)',
          color: 'rgb(var(--color-status-success))',
          border: '1px solid rgba(var(--color-status-success), 0.2)',
        },
        
        '.badge-warning': {
          backgroundColor: 'rgba(var(--color-status-warning), 0.1)',
          color: 'rgb(var(--color-status-warning))',
          border: '1px solid rgba(var(--color-status-warning), 0.2)',
        },
        
        '.badge-error': {
          backgroundColor: 'rgba(var(--color-status-error), 0.1)',
          color: 'rgb(var(--color-status-error))',
          border: '1px solid rgba(var(--color-status-error), 0.2)',
        },
      }
      
      addComponents(components)
    },
  ],
}

export default config