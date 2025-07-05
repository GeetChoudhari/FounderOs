// FounderOS Design System - Prize-Winning UI
// Based on comprehensive research for Vercel optimization

export const designTokens = {
  // Professional Color Palette (from document)
  colors: {
    // Dark Mode (Primary)
    dark: {
      primary: {
        brand: '#1e40af',        // Deep Blue for CTAs and brand
        secondary: '#06b6d4',     // Electric Cyan for interactive elements
      },
      surface: {
        background: '#0f172a',    // Charcoal backgrounds
        card: '#1e293b',          // Dark Gray card surfaces
        border: '#334155',        // Border color
        hover: '#475569',         // Hover states
      },
      text: {
        primary: '#f1f5f9',       // Off White for primary content
        secondary: '#94a3b8',     // Light Gray for secondary
        muted: '#64748b',         // Muted text
        accent: '#06b6d4',        // Accent text
      },
      status: {
        success: '#10b981',       // Success states
        warning: '#f59e0b',       // Warning states
        error: '#ef4444',         // Error states
        info: '#3b82f6',          // Info states
      }
    },
    
    // Light Mode (Alternative)
    light: {
      primary: {
        brand: '#3b82f6',         // Royal Blue maintaining consistency
        secondary: '#14b8a6',     // Teal for modern appeal
      },
      surface: {
        background: '#ffffff',    // Pure White backgrounds
        card: '#f8fafc',          // Subtle Gray cards
        border: '#e2e8f0',        // Light borders
        hover: '#f1f5f9',         // Light hover states
      },
      text: {
        primary: '#0f172a',       // Dark text on light
        secondary: '#475569',     // Secondary text
        muted: '#64748b',         // Muted text
        accent: '#14b8a6',        // Accent text
      },
      status: {
        success: '#059669',
        warning: '#d97706',
        error: '#dc2626',
        info: '#2563eb',
      }
    },
    
    // Canadian Theme Colors
    canadian: {
      red: '#FF0000',           // Canada red
      white: '#FFFFFF',         // Canada white
      maple: '#FF6B35',         // Maple accent
    }
  },
  
  // Typography Hierarchy (from document)
  typography: {
    fonts: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Consolas', 'monospace'],
    },
    sizes: {
      // Headlines: 24-32px for dashboard titles
      h1: '2rem',     // 32px
      h2: '1.75rem',  // 28px  
      h3: '1.5rem',   // 24px
      h4: '1.25rem',  // 20px
      
      // Body Text: 14-16px for optimal readability
      body: '1rem',   // 16px
      small: '0.875rem', // 14px
      
      // Data Labels: 12-14px for charts
      caption: '0.75rem', // 12px
      micro: '0.6875rem', // 11px
    },
    weights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    }
  },
  
  // Spacing System
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
  },
  
  // Border Radius
  radius: {
    sm: '0.375rem',  // 6px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    full: '9999px',  // Fully rounded
  },
  
  // Shadows for depth
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    glow: '0 0 20px rgb(59 130 246 / 0.3)', // Market intelligence glow
  },
  
  // Animation and Transitions
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    }
  },
  
  // Breakpoints for responsive design
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Z-index scale
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  }
}

// Theme configuration for dark/light mode
export const themes = {
  dark: {
    ...designTokens.colors.dark,
    name: 'dark',
  },
  light: {
    ...designTokens.colors.light,
    name: 'light',
  }
}

// Utility functions for design system
export const getColorValue = (theme: 'dark' | 'light', path: string) => {
  const keys = path.split('.')
  let value: any = designTokens.colors[theme]
  
  for (const key of keys) {
    value = value?.[key]
  }
  
  return value || '#000000'
}

// Component variants for consistent styling
export const componentVariants = {
  button: {
    primary: 'bg-primary-brand hover:bg-primary-brand/90 text-white',
    secondary: 'bg-surface-card hover:bg-surface-hover text-text-primary border border-surface-border',
    ghost: 'hover:bg-surface-hover text-text-primary',
    danger: 'bg-status-error hover:bg-status-error/90 text-white',
  },
  
  card: {
    default: 'bg-surface-card border border-surface-border rounded-lg',
    elevated: 'bg-surface-card border border-surface-border rounded-lg shadow-lg',
    interactive: 'bg-surface-card border border-surface-border rounded-lg hover:border-surface-hover transition-colors cursor-pointer',
  },
  
  status: {
    success: 'text-status-success bg-status-success/10 border-status-success/20',
    warning: 'text-status-warning bg-status-warning/10 border-status-warning/20',
    error: 'text-status-error bg-status-error/10 border-status-error/20',
    info: 'text-status-info bg-status-info/10 border-status-info/20',
  }
}

// Performance optimization constants
export const performanceConfig = {
  // Core Web Vitals targets (from document)
  vitals: {
    LCP: 2500,  // Largest Contentful Paint < 2.5s
    FID: 100,   // First Input Delay < 100ms
    CLS: 0.1,   // Cumulative Layout Shift < 0.1
  },
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    quality: 85,
    placeholder: 'blur',
  },
  
  // Bundle optimization
  bundle: {
    maxSize: 500000, // 500KB target
    chunkSize: 50000, // 50KB per chunk
  }
}

export default designTokens