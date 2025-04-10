"use client"

import Image, { ImageProps } from "next/image";
import { Skeleton } from '@/components/ui/skeleton';
import usePlexOAuth from "@/hooks/usePlexOAuth";
import { useState, useEffect } from "react";
import { plexBaseURL } from '@/lib/consts';

function PlexImage(props: ImageProps) {
    const { src, ...restProps } = props;
    const { plexAuthToken } = usePlexOAuth();

    const [loading, setLoading] = useState<boolean>(true);
    const [imageSRCWithAuth, setImageSRCWithAuth] = useState<string>('');

    useEffect(() => {
        setLoading(true);
        const controller = new AbortController();
        const plexImageUrl = new URL(`${plexBaseURL}${src}`);

        const getImage = async () => {
            if (plexAuthToken) {
                try {
                    await fetch(plexImageUrl, {
                        method: 'GET',
                        headers: {
                            'X-Plex-Token': plexAuthToken
                        },
                        signal: controller.signal,
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

        setTimeout(() => getImage(), 500);

        return () => {
            controller.abort('Request cancelled unexpectedly');
        };

    }, [plexAuthToken, src]);

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
