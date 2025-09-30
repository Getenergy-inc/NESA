module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      // Enhanced browser support configuration
      overrideBrowserslist: [
        "last 2 versions",
        "> 1%",
        "IE 11",
        "Edge >= 79",
        "Chrome >= 60",
        "Firefox >= 60",
        "Safari >= 12"
      ],
      grid: true, // Enable Grid Layout prefixes
      flexbox: "no-2009" // Modern flexbox prefixes only
    },
  },
};
