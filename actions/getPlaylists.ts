'use server'

import { cookies } from "next/headers";
import { plexBaseURL } from '@/lib/consts';
import playlist from "@/types/playlist";

const getPlaylists = async (): Promise<playlist[]> => {
    const cookieStore = await cookies();
    const plexAuthToken = cookieStore.get('plex_auth_token')  as { value: string };
    const playlistUrl = new URL(`${plexBaseURL}/playlists`);

    playlistUrl.searchParams.append('playlistType', 'audio');

    return await fetch(playlistUrl.toString(), {
        method: "GET",
        headers: {
            Accept: "application/json",
            'X-Plex-Token': plexAuthToken.value
        }
    })
        .then((res) => res.json())
        .then((data) => data.MediaContainer.Metadata);
}

export default getPlaylists;