import getPlaylists from "@/actions/getPlaylists";
import playlist from '@/types/playlist'
import Main from "@/components/page/main";
import Header from "@/components/page/header";
import Content from "@/components/page/content";
import CreatePlaylist from "@/components/playlists/createPlaylist";
import Playlist from "@/components/playlists/playlist";

async function Page() {
    const playlists: playlist[] = await getPlaylists();

    return (
        <Main>
            <Header>Playlists</Header>
            <Content>
                <div className={`grid justify-center gap-4 grid-cols-[repeat(auto-fit,minmax(280px,max-content))]`}>
                    <CreatePlaylist />
                    {playlists.map((playlist: playlist) => (
                        <Playlist key={playlist.key} playlist={playlist} />
                    ))}
                </div>
            </Content>
        </Main>
    )
}

export default Page
