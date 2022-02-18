const tailwindConfig = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/features/**/*.{js,ts,jsx,tsx}',
    './src/modules/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    'node_modules/@nrc/shared/**/*.{js,ts,jsx,tsx}',
  ],
}

module.exports = {
  tailwindConfig,
}
