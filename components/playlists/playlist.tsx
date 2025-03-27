"use client"

import {
    Card,
    CardContent,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import PlexImage from "@/components/plexImage";
import {SquarePen} from "lucide-react";
import { useRouter } from 'next/navigation';
import playlist from '@/types/playlist'

function Playlist({ playlist }: { playlist: playlist }) {
    const router = useRouter();

    const editPlaylist = () => {
        router.push("/playlists/" + playlist.ratingKey);
    }

    return (
        <Card className={`w-[280px] overflow-hidden`} onClick={() => editPlaylist()}>
            <CardContent className={'relative w-full aspect-square'}>
                <PlexImage src={playlist.thumb ? playlist.thumb : playlist.composite} alt={playlist.title} fill />
                <div className={'absolute inset-0 flex flex-col items-center justify-end gap-2 p-2 bg-black bg-opacity-25 hover:bg-opacity-50'}>
                    <div className={'absolute inset-0 flex justify-end p-2'}>
                        <SquarePen color={'white'} className={'size-6'}/>
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
    )
}

export default Playlist
