import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { getServerSession } from 'next-auth/next'
import { authOption } from '@/lib/auth'
import AuthContext from './context/AuthProvider'
import StyleProvider from './context/StyleProvider'

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
	const session = await getServerSession(authOption)

	return (
		<html lang="en">
			<body className={poppins.className}>
				<StyleProvider>
					<AuthContext session={session}>
						{children}
					</AuthContext>
				</StyleProvider>
			</body>
		</html>
	)
}
