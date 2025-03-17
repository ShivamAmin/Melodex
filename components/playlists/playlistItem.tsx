"use client"
import React, {useEffect, useState} from 'react'
import {
    Card,
    CardContent,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import usePlexOAuth from "@/hooks/usePlexOAuth";
import Image from "next/image";
import {SquarePen} from "lucide-react";
import Spinner from "@/components/spinner";

function PlaylistItem({ playlist }: { playlist: any }) {
    const [loading, setLoading] = useState<boolean>(true);
    const [imageSRC, setImageSRC] = useState<string>('');
    const { plexAuthToken } = usePlexOAuth();
    useEffect(() => {
        setLoading(true);
        const getImage = async () => {
            const imageUrl = playlist.thumb ? playlist.thumb : playlist.composite;
            await fetch('https://plex.shivamamin.com' + imageUrl, {
                method: 'GET',
                headers: {
                    'X-Plex-Token': plexAuthToken!,
                }
            })
                .then(res => res.blob())
                .then(blob => setImageSRC(URL.createObjectURL(blob)));
        }
        getImage().then(() => setLoading(false));
    }, []);
    return (
        <Card className={`w-[280px] overflow-hidden`}>
            <CardContent className={'relative w-full aspect-square'}>
                {loading ? <Spinner color={'black'} /> : <Image src={imageSRC} alt={playlist.title} fill />}
                <div className={'absolute inset-0 flex flex-col items-center justify-end gap-2 p-2 bg-black bg-opacity-25 hover:bg-opacity-50'}>
                    <div className={'absolute inset-0 flex justify-end p-2'}>
                        <SquarePen color={'white'} className={'size-6'}/>
                    </div>
                    <CardTitle className={'text-white'}>
                        {playlist.title}
                    </CardTitle>
                    <CardDescription className={'text-white whitespace-nowrap overflow-ellipsis overflow-hidden max-w-full'}>
                        {playlist.summary}
                    </CardDescription>
                </div>
            </CardContent>
        </Card>
    )
}

export default PlaylistItem
