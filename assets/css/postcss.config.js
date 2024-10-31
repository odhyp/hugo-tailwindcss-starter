module.exports = {
  plugins: [
    require("tailwindcss")("./assets/css/tailwind.config.js"), // Update path to the root directory
    require("autoprefixer")({
      path: ["./"],
    }),
  ],
};
