'use server'

import playlist from '@/types/playlist';
import { plexBaseURL } from "@/lib/consts";
import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";

export const deletePlaylist = async (ratingKey: playlist['ratingKey']): Promise<void> => {
    const cookieStore = await cookies();
    const header = await headers();
    const pathname = header.get("x-pathname") as string;
    const playlistUrl = new URL(`${plexBaseURL}/playlists/${ratingKey}`);
    const plexAuthToken = cookieStore.get('plex_auth_token') as { value: string };

    await fetch(playlistUrl.toString(), {
        method: 'DELETE',
        headers: {
            'X-Plex-Token': plexAuthToken.value,
        }
    });

    revalidatePath(pathname);
}