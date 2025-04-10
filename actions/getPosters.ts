'use server'

import { plexBaseURL } from "@/lib/consts";
import { cookies } from "next/headers";
import poster from "@/types/poster";

export const getPosters = async (ratingKey: string): Promise<poster[]> => {
    const cookieStore = await cookies();
    const plexAuthToken = cookieStore.get('plex_auth_token')  as { value: string };
    const postersUrl = new URL(`${plexBaseURL}/library/metadata/${ratingKey}/posters`);

    return await fetch(postersUrl.toString(), {
        headers: {
            Accept: "application/json",
            'X-Plex-Token': plexAuthToken.value
        }
    })
        .then(resp => resp.json())
        .then((data) => data.MediaContainer.Metadata);
}