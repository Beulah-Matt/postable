/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'), //trancates no of lines in a post
    require('@tailwindcss/forms'),
  ],
}

