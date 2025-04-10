'use server'

import { cookies } from "next/headers";
import { plexBaseURL } from '@/lib/consts';

const rateTrack = async (librarySectionID: number, ratingKey: string, rating: number) => {
    const cookieStore = await cookies();
    const plexAuthToken = cookieStore.get('plex_auth_token')  as { value: string };
    const rateUrl = new URL(`${plexBaseURL}/library/sections/${librarySectionID}/all`);

    rateUrl.searchParams.append('type', '10');
    rateUrl.searchParams.append('id', ratingKey);
    rateUrl.searchParams.append('userRating.value', String(rating));

    await fetch(rateUrl, {
        method: 'PUT',
        cache: 'no-store',
        headers: {
            'X-Plex-Token': plexAuthToken.value,
        }
    });
}

export default rateTrack;