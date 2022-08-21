module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '300': '75rem'
      },
      fontSize: {
        h2t: ['24px', '30px']
      },
      lineHeight: {
        'cus': '2.625rem',
        'cus2': '1.313rem'
      },
      width: {
        '30': '30%',
      },
      maxWidth: {
        '30': '30%',
      },
      minWidth: {
        '375': '3.75rem',
       },
      margin: {
        '0375': '0.375rem',
      },
      padding: {
        cus: '5px',
        cus2: '1.875rem'
      },
      textColor: {
        'cus': '#2e9cc3',
      },
      backgroundImage: theme => ({
        'visa': "url('data:image/png;base64,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')",
      }),
      backgroundPosition: {
        backgroundPosition: {
         '50-center': '50% center',
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
