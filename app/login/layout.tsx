"use client"
interface layoutProps {
    children: React.ReactNode
}

const LoginLayout: React.FC<layoutProps> = ({ children }) => {
    return (
        <>
            {children}
        </>
    )
}

export default LoginLayout