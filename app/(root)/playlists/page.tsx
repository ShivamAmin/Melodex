import React from 'react'
import Playlists from '@/components/playlists'
import Header from "@/components/page/header";
import Content from "@/components/page/content";
import Main from "@/components/page/main";

function Page() {
    return (
        <Main>
            <Header>Playlists</Header>
            <Content><Playlists /></Content>
        </Main>
    )
}

export default Page
