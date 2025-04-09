'use server'

import { cookies } from "next/headers";
import { plexBaseURL } from '@/lib/consts';

const rateTrack = async (librarySectionID: number, ratingKey: string, rating: number) => {
    const cookieStore = await cookies();
    const plexAuthToken = cookieStore.get('plex_auth_token');
    const url = `${plexBaseURL}/library/sections/${librarySectionID}/all?type=10&id=${ratingKey}&userRating.value=${rating}`;
    try {
        if (plexAuthToken?.value) {
            await fetch(url, {
                method: 'PUT',
                cache: 'no-store',
                headers: {
                    'X-Plex-Token': plexAuthToken.value,
                }
            });
        } else {
            console.log('Has plex been authenticated?')
        }
    } catch (e) {
        console.error('Unable to rate');
    }
}

export default rateTrack;