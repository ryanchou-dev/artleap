/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			backgroundSize: {
				'300%': '300%',
			},
			animation: {
				// gradient: 'gradient 8s linear infinite'
				gradient: 'animatedgradient 15s ease infinite alternate',
				spotlight: "spotlight 2s ease .75s 1 forwards",
			},
			keyframes: {
				gradient: {
					to: {
						backgroundPosition: 'var(--bg-size) 0'
					}
				},
				spotlight: {
					"0%": {
						opacity: 0,
						transform: "translate(-72%, -62%) scale(0.5)",
					},
					"100%": {
						opacity: 1,
						transform: "translate(-50%,-40%) scale(1)",
					},
				},
				animatedgradient: {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' }
				},
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};
// theme: {
// 	extend: {
// 		keyframes: {

// 		},
// 		backgroundSize: {
// 			'300%': '300%',
//       },
// 		animation: {
// 			gradient: 'animatedgradient 6s ease infinite alternate',
//       },
// 	},
// },
