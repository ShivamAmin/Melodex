'use server';

import { spotifyClientID, spotifyClientSecret, spotifyRedirectURI } from "@/lib/consts";


export const getAccessToken = async (authCode: string) => {
    const tokenURL = new URL('https://accounts.spotify.com/api/token?');

    tokenURL.searchParams.append('grant_type', 'authorization_code');
    tokenURL.searchParams.append('redirect_uri', spotifyRedirectURI);
    tokenURL.searchParams.append('code', authCode);

    const resp = await fetch(tokenURL.toString(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(spotifyClientID + ':' + spotifyClientSecret).toString('base64'),
        },
    }).then(res => res.json());
    return [resp.access_token, resp.refresh_token];
}

export const refreshAccessToken = async (refreshToken: string) => {
    const tokenURL = new URL('https://accounts.spotify.com/api/token?');

    tokenURL.searchParams.append('grant_type', 'refresh_token');
    tokenURL.searchParams.append('refresh_token', refreshToken);
    tokenURL.searchParams.append('client_id', spotifyClientID);

    const resp = await fetch(tokenURL.toString(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(spotifyClientID + ':' + spotifyClientSecret).toString('base64'),
        },
    }).then(res => res.json());

    return resp.access_token;
}