import { BreadcrumbResponsiveItem } from "@/app/components/V2/BreadcrumbResponsive";
import ContentLayout from "@/app/components/V2/ContentLayout";

export async function generateMetadata() {
    return {
        title: "Create Nasabah | VBS",
    };
}

const navigationItems: BreadcrumbResponsiveItem[] = [
    { href: "/", label: "Home" },
    {
        href: "/cis/informasi-nasabah",
        label: "Informasi Nasabah",
        children: [
            {
                href: "/cis/informasi-nasabah/create-nasabah",
                label: "Pembuatan Nasabah Informasi",
                children: [
                    { href: "/cis/informasi-nasabah/create-nasabah/perorangan", label: "Nasabah Tipe Perorangan" },
                    { href: "/cis/informasi-nasabah/create-nasabah/perusahaan", label: "Nasabah Tipe Perusahaan" },
                    { href: "/cis/informasi-nasabah/create-nasabah/instansi-pemerintah", label: "Nasabah Tipe Instansi Pemerintah" },
                    { href: "/cis/informasi-nasabah/create-nasabah/non-profit", label: "Nasabah Tipe Lembaga non-profit" },
                ],
            },
        ],
    },
    {
        href: "/cis/aktivasi-nasabah",
        label: "Aktivasi Informasi Nasabah",
    },
    {
        href: "/cis/permintaan-ubah",
        label: "Persetujuan Perubahan Data",
    },
];

export default function CISLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="flex flex-col gap-3 w-full h-full text-background dark:text-foreground">
            <ContentLayout navigationItems={navigationItems}>{children}</ContentLayout>
        </section>
    );
}
