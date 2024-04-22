const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#00C6D7',
					secondary: '#009198',
					accent: '#00c7dc',
					neutral: '#030600',
					'base-100': '#222222',
					info: '#00efff',
					success: '#65c721',
					warning: '#f95d00',
					error: '#ec485b'
				}
			}
		]
	},

	plugins: [require('daisyui'), require('@tailwindcss/typography')]
};

module.exports = config;
