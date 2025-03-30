import BreadcrumbResponsive, { BreadcrumbResponsiveItem } from "@/app/components/V2/BreadcrumbResponsive";

export async function generateMetadata() {
    return {
        title: "Create Nasabah | VBS",
    };
}

export default function CreateNasbahLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
