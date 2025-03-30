"use client";
import useContentLayoutStore from "@/store/ContentLayoutStore";
import BreadcrumbResponsive, { BreadcrumbResponsiveItem } from "./BreadcrumbResponsive";
import { usePathname } from "next/navigation";

interface ContentLayoutProps {
    navigationItems: BreadcrumbResponsiveItem[];
    children: React.ReactNode;
}

const ContentLayout: React.FC<ContentLayoutProps> = ({ navigationItems, children }) => {
    const title = useContentLayoutStore((state) => state.title);
    return (
        <div className="flex flex-col gap-1 w-full h-full">
            <h1 className="text-xl font-bold">{title}</h1>
            <BreadcrumbResponsive items={navigationItems} />
            <div className="flex-1">{children}</div>
        </div>
    );
};

export default ContentLayout;
