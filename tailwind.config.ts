import { nextui } from '@nextui-org/react'
import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				secondary: "#FAE0CB"
			}
		}
	},
	darkMode: "class",
	plugins: [
		nextui({
			addCommonColors: false,

		}),
		require('@tailwindcss/typography')
	]
}
export default config
