import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

import dynamic from 'next/dynamic'

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
	title: 'VBS',
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const ClientStyleProvider = dynamic(() => import('./context/StyleProvider'), { ssr: false })

	return (
		<html lang="en">
			<body className={poppins.className}>
				<ClientStyleProvider>
					{children}
				</ClientStyleProvider>
			</body>
		</html>
	)
}
