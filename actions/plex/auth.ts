'use server'

import { PlexHeaders } from "@/lib/types";

export const getPlexPin = async (headers: PlexHeaders) => {
    return fetch('https://plex.tv/api/v2/pins?strong=true', {
        method: 'POST',
        headers: headers,
    }).then(res => res.json());
}

export const getPlexJWT = async (id: number, headers: PlexHeaders) => {
    return fetch(`https://plex.tv/api/v2/pins/${id}`, {
        headers: headers
    }).then(res => res.json());
}