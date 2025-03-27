import Header from "@/components/page/header";
import Content from "@/components/page/content";
import Main from "@/components/page/main";
import PlaylistSkeleton from "@/components/playlists/playlistSkeleton";
function Loading() {
    return (
        <Main>
            <Header>Playlists</Header>
            <Content><PlaylistSkeleton /></Content>
        </Main>
    )
}

export default Loading
