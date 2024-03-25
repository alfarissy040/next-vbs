import { authOption } from '@/lib/auth'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import dynamic from 'next/dynamic'
import { Poppins } from 'next/font/google'
import AuthProvider from './context/AuthProvider'
import './globals.css'


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
	const session = await getServerSession(authOption)
	console.log(session)
	return (
		<html lang="en">
			<body className={poppins.className}>

				<AuthProvider session={session}>
					<ClientStyleProvider>
						{children}
					</ClientStyleProvider>
				</AuthProvider>
			</body>
		</html>
	)
}
