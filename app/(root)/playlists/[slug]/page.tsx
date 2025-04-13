'use server'

import { getPlaylistItems } from "@/actions/getPlaylistItems";
import Main from "@/components/page/main";
import Header from "@/components/page/header";
import Content from "@/components/page/content";
import track from "@/types/track";
import Track from '@/components/tracks/track';

async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { tracks, title } = await getPlaylistItems(slug);

    return (
        <Main>
            <Header>Playlists &gt; Editing: {title}</Header>
            <Content>
                <div className={'flex flex-col gap-4'}>
                    {tracks && tracks.map((track: track) => (
                        <Track key={track.key} track={track} />
                    ))}
                </div>
            </Content>
        </Main>
    )
}

export default Page
