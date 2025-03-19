import PlaylistItem from "./playlistItem";
import playlist from '@/types/playlist'

function PlaylistList({ playlists }: { playlists: playlist[] }) {
    return (
        <div className={`grid justify-center gap-4 grid-cols-[repeat(auto-fit,minmax(280px,max-content))]`}>
            {playlists.map((playlist: playlist) => (
                <PlaylistItem playlist={playlist} key={playlist.key} />
            ))}
        </div>
    )
}

export default PlaylistList
