export async function generateMetadata(
) {
    return {
        title: "Create Nasabah | VBS",
    }
}

export default function CreateNasbahLayout({
    children
}: {
    children: React.ReactNode,
}) {

    return (
        <>
            {children}
        </>
    );
}