import React from 'react'
import PlaylistList from '@/components/playlists/playlistList'
import Header from "@/components/page/header";
import Content from "@/components/page/content";
import Main from "@/components/page/main";

async function Page() {
    return (
        <Main>
            <Header>Playlists</Header>
            <Content><PlaylistList /></Content>
        </Main>
    )
}

export default Page
