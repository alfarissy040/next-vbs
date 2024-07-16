import { Html, Head, Body, Tailwind, Link, Button } from "@react-email/components"

const ForgotPassword = (name: string, url: string, expires: string) => {
    return (
        <Html>
            <Head />
            <Tailwind>
                <Body className="bg-gray-100">
                    <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden mt-10 shadow-lg">
                        <div className="text-center p-6 bg-blue-500">
                            <h1 className="text-white text-2xl font-bold">VBS Neural Bank</h1>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-700 mb-4">Dear {name},</p>
                            <p className="text-gray-700 mb-4">
                                We received a request to reset your password for your VBS Neural Bank account. Click the button below to reset your password:
                            </p>
                            <div className="text-center my-4">
                                <Button href={url} target="_blank" className="inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded">
                                    Reset Password
                                </Button>
                            </div>
                            <p className="text-gray-700 mb-4">
                                or open this link <Link href={url} target="_blank">{url}</Link>
                            </p>
                            <p className="text-gray-700 mb-4">
                                Please note that this link will expire in GMT+7 {expires}.
                            </p>
                            <p className="text-gray-700 mb-4">
                                If you did not request a password reset, please ignore this email or contact our support team if you have questions.
                            </p>
                            <p className="text-gray-700">
                                Thanks,<br />The VBS Neural Bank Team
                            </p>
                        </div>
                        <div className="bg-gray-200 text-gray-600 text-center p-4">
                            &copy; 2024 VBS Neural Bank. All rights reserved.
                        </div>
                    </div>
                </Body>
            </Tailwind>
        </Html>
    )
}

export default ForgotPassword