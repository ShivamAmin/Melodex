"use client"

import {ChevronRight, type LucideIcon} from "lucide-react";
import {
    SidebarGroup,
    SidebarMenuButton,
} from "@/components/ui/sidebar";
import Link from "next/link";

export const NavMain = ({ items }: {
    items: {
        title: string,
        url: string,
        icon?: LucideIcon,
        isActive?: boolean,
        items?: {
            title: string,
            url: string,
        }[]
    }[]
}) => {
    return (
        <SidebarGroup>
            {items.map((item) => (
                <Link href={item.url} key={item.title}>
                    <SidebarMenuButton>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto" />
                    </SidebarMenuButton>
                </Link>
            ))}
        </SidebarGroup>
    )
}

export default NavMain;