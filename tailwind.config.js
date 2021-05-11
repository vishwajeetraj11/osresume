module.exports = {
	purge: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		opacity: {
			0: '0',
			20: '0.2',
			40: '0.4',
			60: '0.6',
			80: '0.8',
			100: '1',
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
