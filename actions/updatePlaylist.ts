'use server';

import { cookies, headers } from "next/headers";
import { plexBaseURL } from "@/lib/consts";
import { revalidatePath } from "next/cache";

const updateMetadata = async (metadataUrl: URL) => {
    const cookieStore = await cookies();
    const plexAuthToken = cookieStore.get('plex_auth_token')  as { value: string };

    await fetch(metadataUrl.toString(), {
        method: "PUT",
        headers: {
            'X-Plex-Token': plexAuthToken.value
        }
    })
}

const updatePoster = async (posterUrl: URL) => {
    const cookieStore = await cookies();
    const plexAuthToken = cookieStore.get('plex_auth_token') as { value: string };

    await fetch(posterUrl.toString(), {
        method: "PUT",
        headers: {
            'X-Plex-Token': plexAuthToken.value
        }
    })
}

export const updatePlaylist = async (titleShouldUpdate: boolean, descriptionShouldUpdate: boolean, posterShouldUpdate: boolean, ratingKey: string, localTitle: string, localDescription: string, selectedPosterKey: string) => {
    const header = await headers();
    const pathname = header.get("x-pathname") as string;

    if (titleShouldUpdate || descriptionShouldUpdate) {
        const metadataUrl = new URL(`${plexBaseURL}/playlists/${ratingKey}`);
        titleShouldUpdate && metadataUrl.searchParams.append("title", localTitle);
        descriptionShouldUpdate && metadataUrl.searchParams.append("summary", localDescription);

        await updateMetadata(metadataUrl)
    }

    if (posterShouldUpdate) {
        const posterUrl = new URL(`${plexBaseURL}/library/metadata/${ratingKey}/poster`);
        posterUrl.searchParams.append("url", selectedPosterKey);

        await updatePoster(posterUrl);
    }

    revalidatePath(pathname);
}