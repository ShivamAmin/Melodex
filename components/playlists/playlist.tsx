import {
    Card,
    CardContent,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import PlexImage from "@/components/plexImage";
import EditPlaylistMetadata from "@/components/playlists/editPlaylistMetadata";
import playlist from '@/types/playlist'
import Link from "next/link";

function Playlist({ playlist }: { playlist: playlist }) {
    return (
        <Link href={`/playlists/${playlist.ratingKey}`} passHref>
            <Card className={`w-[280px] overflow-hidden [content-visibility:auto]`}>
                <CardContent className={'relative w-full aspect-square'}>
                    <PlexImage src={playlist.thumb ? playlist.thumb : playlist.composite} alt={playlist.title} fill />
                    <div className={'absolute inset-0 flex flex-col items-center justify-end gap-2 p-2 bg-black bg-opacity-25 hover:bg-opacity-50'}>
                            <div className={'absolute inset-0 flex justify-end p-2'}>
                                <EditPlaylistMetadata ratingKey={playlist.ratingKey} title={playlist.title} description={playlist.summary} />
                            </div>
                        <CardTitle className={'text-white [text-shadow:_black_0px_0px_10px]'}>
                            {playlist.title}
                        </CardTitle>
                        <CardDescription className={'text-white [text-shadow:_black_0px_0px_10px] whitespace-nowrap overflow-ellipsis overflow-hidden max-w-full'}>
                            {playlist.summary}
                        </CardDescription>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}

export default Playlist
