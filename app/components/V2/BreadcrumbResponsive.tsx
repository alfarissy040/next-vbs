"use client";

import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { useMediaQuery } from "./utils";
import useContentLayoutStore from "@/store/ContentLayoutStore";

export type BreadcrumbResponsiveItem = {
    href: string;
    label: string;
    children?: BreadcrumbResponsiveItem[];
};
interface BreadcrumbResponsiveProps {
    items: BreadcrumbResponsiveItem[];
}

const BreadcrumbResponsive: React.FC<BreadcrumbResponsiveProps> = ({ items }) => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const setTitle = useContentLayoutStore((state) => state.setTitle);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const ITEMS_TO_DISPLAY = 3;

    const parseListItem = (items: BreadcrumbResponsiveItem[], pathname: string): BreadcrumbResponsiveItem[] => {
        return items.reduce<BreadcrumbResponsiveItem[]>((resultArray, item) => {
            const isInPath = pathname.includes(item.href);
            if (!isInPath) return resultArray;

            const result = [
                ...resultArray,
                {
                    href: item.href,
                    label: item.label,
                },
            ];

            // Rekursi untuk menangani children secara mendalam
            if (item.children) {
                const childArr = parseListItem(item.children, pathname);
                return [...result, ...childArr];
            }

            return result;
        }, []);
    };

    const convertedItems: BreadcrumbResponsiveItem[] = useMemo(() => {
        const targetList = parseListItem(items, pathname);
        const targetIndex = targetList.findIndex((item) => item.href === pathname);
        setTitle(targetList[targetIndex]?.label ?? "");

        const result = targetList.slice(0, targetIndex + 1);
        return result;
    }, [items, pathname]);

    return (
        convertedItems.length > 0 && (
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={convertedItems[0].href}>{convertedItems[0].label}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    {convertedItems.length > ITEMS_TO_DISPLAY ? (
                        <>
                            <BreadcrumbItem>
                                {isDesktop ? (
                                    <DropdownMenu open={open} onOpenChange={setOpen}>
                                        <DropdownMenuTrigger className="flex items-center gap-1" aria-label="Toggle menu">
                                            <BreadcrumbEllipsis className="h-4 w-4" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="" align="start">
                                            {convertedItems.slice(1, -(ITEMS_TO_DISPLAY - 1)).map((item, index) => (
                                                <DropdownMenuItem key={index}>
                                                    <Link className="hover:bg-slate:700" href={item.href ? item.href : "#"}>
                                                        {item.label}
                                                    </Link>
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                ) : (
                                    <Drawer open={open} onOpenChange={setOpen}>
                                        <DrawerTrigger aria-label="Toggle Menu">
                                            <BreadcrumbEllipsis className="h-4 w-4" />
                                        </DrawerTrigger>
                                        <DrawerContent>
                                            <DrawerHeader className="text-left">
                                                <DrawerTitle>Navigate to</DrawerTitle>
                                                <DrawerDescription>Select a page to navigate to.</DrawerDescription>
                                            </DrawerHeader>
                                            <div className="grid gap-1 px-4">
                                                {convertedItems.slice(1, -2).map((item, index) => (
                                                    <Link key={index} href={item.href ? item.href : "#"} className="py-1 text-sm">
                                                        {item.label}
                                                    </Link>
                                                ))}
                                            </div>
                                            <DrawerFooter className="pt-4">
                                                <DrawerClose asChild>
                                                    <Button variant="outline">Close</Button>
                                                </DrawerClose>
                                            </DrawerFooter>
                                        </DrawerContent>
                                    </Drawer>
                                )}
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </>
                    ) : null}
                    {convertedItems.length > 2 ? (
                        convertedItems.slice(-2).map((item, index) => (
                            <BreadcrumbItem key={index}>
                                {item.href !== pathname ? (
                                    <>
                                        <BreadcrumbLink asChild className="max-w-20 truncate md:max-w-none">
                                            <Link href={item.href}>{item.label}</Link>
                                        </BreadcrumbLink>
                                        <BreadcrumbSeparator />
                                    </>
                                ) : (
                                    <BreadcrumbPage className="max-w-20 truncate md:max-w-none">{item.label}</BreadcrumbPage>
                                )}
                            </BreadcrumbItem>
                        ))
                    ) : (
                        <BreadcrumbPage className="max-w-20 truncate md:max-w-none">{convertedItems[1].label}</BreadcrumbPage>
                    )}
                </BreadcrumbList>
            </Breadcrumb>
        )
    );
};

export default BreadcrumbResponsive;
