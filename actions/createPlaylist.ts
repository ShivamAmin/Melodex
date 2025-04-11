'use server'

import { cookies, headers } from "next/headers";
import { plexBaseURL } from "@/lib/consts";
import { revalidatePath } from "next/cache";

export const createPlaylist = async (title: string) => {
    const cookieStore = await cookies();
    const header = await headers();
    const plexAuthToken = cookieStore.get('plex_auth_token') as { value: string };
    const pathname = header.get("x-pathname") as string;
    const playlistUrl = new URL(`${plexBaseURL}/playlists`);
    playlistUrl.searchParams.append('title', title);
    playlistUrl.searchParams.append('type', 'audio');
    playlistUrl.searchParams.append('smart', '0');
    playlistUrl.searchParams.append('uri', '');

    await fetch(playlistUrl.toString(), {
        method: 'POST',
        headers: {
            'X-Plex-Token': plexAuthToken.value,
        },
    })

    revalidatePath(pathname)
}