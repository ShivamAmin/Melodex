import React from 'react'
import PlaylistList from '@/components/playlists/playlistList'
import Header from "@/components/page/header";
import Content from "@/components/page/content";
import Main from "@/components/page/main";
import { cookies } from "next/headers";

async function Page() {
    const url = "https://plex.shivamamin.com/playlists?playlistType=audio";
    const cookieStore = await cookies();
    const plexAuthToken = cookieStore.get('plex_auth_token');
    const req = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            'X-Plex-Token': plexAuthToken!.value
        }
    });
    const resp = await req.json();
    const playlists = resp.MediaContainer.Metadata;
    return (
        <Main>
            <Header>Playlists</Header>
            <Content><PlaylistList playlists={playlists} /></Content>
        </Main>
    )
}

export default Page
