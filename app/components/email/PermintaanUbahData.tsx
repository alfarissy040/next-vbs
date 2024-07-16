import { Body, Html, Tailwind } from "@react-email/components"

const PermintaanUbahData = (namaKacab: String, AccName: String, nonas: String, namaNas: String) => {
    return (
        <Html>
            <Tailwind>
                <Body className="bg-gray-100">
                    <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden mt-10 shadow-lg">
                        <div className="text-center p-6 bg-blue-500">
                            <h1 className="text-white text-2xl font-bold">VBS Neural Bank</h1>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-700 mb-4">Dear {namaKacab},</p>
                            <p className="text-gray-700 mb-4">
                                We have received a request for data update associated with the following details:
                            </p>
                            <div className="bg-gray-100 p-4 rounded-lg mb-4">
                                <p className="text-gray-700"><strong>Name:</strong> {namaNas}</p>
                                <p className="text-gray-700"><strong>Account Number :</strong> {nonas}</p>
                                <p className="text-gray-700"><strong>Account Officer Name :</strong> {AccName}</p>
                            </div>
                            <p className="text-gray-700 mb-4">
                                Please review this request and take the necessary actions. If you have any questions or need further information, do not hesitate to contact our support team.
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

export default PermintaanUbahData