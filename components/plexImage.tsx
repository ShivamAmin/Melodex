"use client"
import Image, { ImageProps } from "next/image";
import usePlexOAuth from "@/hooks/usePlexOAuth";
import { useState, useEffect } from "react";

function PlexImage(props: ImageProps) {
    const { src, ...restProps } = props;
    const { plexAuthToken } = usePlexOAuth();

    const [loading, setLoading] = useState<boolean>(true);
    const [imageSRCWithAuth, setImageSRCWithAuth] = useState<string>('');

    useEffect(() => {
        const plexImageUrl = 'https://plex.shivamamin.com' + src;
        if (plexAuthToken) {
            fetch(plexImageUrl, {
                method: 'GET',
                headers: {
                    'X-Plex-Token': plexAuthToken
                }
            })
                .then(res => res.blob())
                .then(blob => setImageSRCWithAuth(URL.createObjectURL(blob)))
                .then(() => setLoading(false));
        }
    }, [plexAuthToken]);

    if (loading) {
        return <>Loading...</>
    }

    return (
        <Image src={imageSRCWithAuth} {...restProps} />
)
}

export default PlexImage;
