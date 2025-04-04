"use client"

import Image, { ImageProps } from "next/image";
import { Skeleton } from '@/components/ui/skeleton';
import usePlexOAuth from "@/hooks/usePlexOAuth";
import { useState, useEffect } from "react";
// import {cn} from "@/lib/utils";

function PlexImage(props: ImageProps) {
    const { src, ...restProps } = props;
    const { plexAuthToken } = usePlexOAuth();

    const [loading, setLoading] = useState<boolean>(true);
    const [imageSRCWithAuth, setImageSRCWithAuth] = useState<string>('');

    useEffect(() => {
        const controller = new AbortController();
        const plexImageUrl = 'https://plex.shivamamin.com' + src;

        const getImage = async () => {
            if (plexAuthToken) {
                try {
                    await fetch(plexImageUrl, {
                        method: 'GET',
                        headers: {
                            'X-Plex-Token': plexAuthToken
                        }
                    })
                        .then(res => res.blob())
                        .then(blob => setImageSRCWithAuth(URL.createObjectURL(blob)))
                        .then(() => {
                            setLoading(false);
                        });
                } catch (e) {
                    setLoading(true);
                }
            }
        }

        getImage();

        return () => {
            controller.abort('Request cancelled unexpectedly');
        };

    }, [plexAuthToken]);

    if (loading) {
        if (restProps?.fill) {
            return <Skeleton className={'absolute w-full h-full inset-0'} />;
        } else {
            return <Skeleton style={{height: `${restProps.height}px`, width: `${restProps.width}px`}} />;
        }
    }

    return (
        <Image src={imageSRCWithAuth} {...restProps} />
)
}

export default PlexImage;
