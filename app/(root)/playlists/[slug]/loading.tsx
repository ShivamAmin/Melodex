import React from 'react'
import Main from "@/components/page/main";
import Header from "@/components/page/header";
import Content from "@/components/page/content";
import TrackSkeleton from "@/components/tracks/trackSkeleton";
import HeaderSkeleton from "@/components/tracks/headerSkeleton";

function Loading() {
    return (
        <Main>
            <Header>Playlists &gt; Editing: <HeaderSkeleton /></Header>
            <Content>
                <TrackSkeleton />
            </Content>
        </Main>
    )
}

export default Loading
