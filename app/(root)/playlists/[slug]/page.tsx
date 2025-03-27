import { cookies } from "next/headers";
import track from "@/types/track";
import Track from '@/components/tracks/track';
import Main from "@/components/page/main";
import Header from "@/components/page/header";
import Content from "@/components/page/content";
import React from "react";

async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const url = `https://plex.shivamamin.com/playlists/${slug}/items`;
    const cookieStore = await cookies();
    const plexAuthToken = cookieStore.get('plex_auth_token');

    const req = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "X-Plex-Token": plexAuthToken!.value
        }
    }).then(req => req.json());

    const title = await req.MediaContainer.title;
    const tracks: track[] = await req.MediaContainer.Metadata;

    return (
        <Main>
            <Header>Playlists &gt; Editing: {title}</Header>
            <Content>
                <div className={'flex flex-col gap-4'}>
                    {tracks.map((track: track) => (
                        <Track key={track.key} track={track} />
                    ))}
                </div>
            </Content>
        </Main>
    )
}

export default Page
