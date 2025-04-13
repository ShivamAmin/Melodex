'use server'

import playlist from '@/types/playlist';
import { cookies, headers } from "next/headers";
import { plexBaseURL } from "@/lib/consts";
import { revalidatePath } from "next/cache";

export const deletePlaylist = async (ratingKey: playlist['ratingKey']): Promise<void> => {
    const cookieStore = await cookies();
    const header = await headers();
    const plexAuthToken = cookieStore.get('plex_auth_token') as { value: string };
    const pathname = header.get("x-pathname") as string;
    const playlistUrl = new URL(`${plexBaseURL}/playlists/${ratingKey}`);

    await fetch(playlistUrl.toString(), {
        method: 'DELETE',
        headers: {
            'X-Plex-Token': plexAuthToken.value,
        }
    });

    revalidatePath(pathname);
}