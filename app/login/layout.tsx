interface layoutProps {
    children: React.ReactNode
}

export async function generateMetadata(
) {
    return {
        title: "Login",
    }
}

const LoginLayout: React.FC<layoutProps> = ({ children }) => {
    return (
        <>
            {children}
        </>
    )
}

export default LoginLayout