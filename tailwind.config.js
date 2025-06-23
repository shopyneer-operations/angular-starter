module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Include Angular templates and components
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin') // Include Flowbite plugin
  ],
};
