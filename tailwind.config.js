export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'electric-blue': '#00A2FF',
        'electric-blue-dark': '#0088D1',
        'electric-blue-light': '#4DC1FF',
        'passion-orange': '#FF6B35',
        'passion-orange-dark': '#E05A2B',
        'passion-orange-light': '#FF8C5A',
        'text-primary': '#1A1A1A',
        'text-secondary': '#666666',
        'text-tertiary': '#999999',
        'bg-light': '#F5F5F5',
        'border-light': '#E5E5E5',
        'dark-bg': '#0F172A',
        'dark-card': '#1E293B',
        'dark-border': '#334155',
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
}
