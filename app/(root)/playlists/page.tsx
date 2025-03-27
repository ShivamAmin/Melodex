import Header from "@/components/page/header";
import Content from "@/components/page/content";
import Main from "@/components/page/main";
import { cookies } from "next/headers";
import Playlist from "@/components/playlists/playlist";
import playlist from '@/types/playlist'

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
    const playlists: playlist[] = await resp.MediaContainer.Metadata;
    return (
        <Main>
            <Header>Playlists</Header>
            <Content>
                <div className={`grid justify-center gap-4 grid-cols-[repeat(auto-fit,minmax(280px,max-content))]`}>
                    {playlists.map((playlist: playlist) => (
                        <Playlist key={playlist.key} playlist={playlist} />
                    ))}
                </div>
            </Content>
        </Main>
    )
}

export default Page
