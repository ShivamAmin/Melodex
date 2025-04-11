'use server'

import { cookies, headers } from "next/headers";
import { plexBaseURL } from "@/lib/consts";
import { revalidatePath } from "next/cache";

export const uploadPosterByURL = async (ratingKey: string, externalPosterUrl: string) => {
    const header = await headers();
    const pathname = header.get("x-pathname") as string;
    const cookieStore = await cookies();
    const plexAuthToken = cookieStore.get('plex_auth_token')  as { value: string }
    const posterUrl = new URL(`${plexBaseURL}/library/metadata/${ratingKey}/posters`);
    posterUrl.searchParams.append("url", externalPosterUrl);

    await fetch(posterUrl, {
        method: "POST",
        headers: {
            'X-Plex-Token': plexAuthToken.value,
        }
    });

    revalidatePath(pathname);
}

export const uploadPosterByImages = async (ratingKey: string, files: File[]) => {
    const header = await headers();
    const pathname = header.get("x-pathname") as string;
    const cookieStore = await cookies();
    const plexAuthToken = cookieStore.get('plex_auth_token') as { value: string };
    const posterUrl = new URL(`${plexBaseURL}/library/metadata/${ratingKey}/posters`);

    await Promise.all(files.map(async file => {
        return fetch(posterUrl, {
            method: "POST",
            headers: {
                'X-Plex-Token': plexAuthToken.value
            },
            body: await file.arrayBuffer() as ArrayBuffer,
        })
    }));

    revalidatePath(pathname);
}