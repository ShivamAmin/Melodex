"use client";
import React from 'react'
import {
    Sidebar,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { NavUser } from "@/components/navbar/navuser";
import { NavMain } from "@/components/navbar/navmain";
import { authClient } from "@/auth-client"
import { AudioLinesIcon as Logo, ListMusic } from "lucide-react";
import version from '@/utils/version';
import Link from "next/link";

const navItems = [
    {
        title: "Playlists",
        url: '/playlists',
        icon: ListMusic,
    }
]

const Navbar = () => {

    const {
        data: session,
    } = authClient.useSession();

    if (!session) return <></>;

    return (
        <Sidebar collapsible={"icon"} >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size={'lg'} asChild>
                            <Link href={'/'}>
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Logo className='size-6' />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">Melodex</span>
                                    <span className="">v{version}</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>
            <SidebarFooter>
                {session && (
                    <NavUser user={{name: session.user.name, email: session.user.email, avatar: session.user.image || ''}} />
                )}
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}

export default Navbar
