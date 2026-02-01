"use client"

import Main from '@/components/page/main';
import Header from '@/components/page/header';
import Content from "@/components/page/content";
import PlexAuthButton from '@/components/plexAuthButton';
import SpotifyAuthButton from '@/components/spotifyAuthButton';

function Page() {
    return (
        <Main>
            <Header>Settings Page</Header>
            <Content>
                <PlexAuthButton />
                <SpotifyAuthButton />
            </Content>
        </Main>
    )
}

export default Page;
