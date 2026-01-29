'use server';

export const auth = async () => {
    const state = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
    const scope = 'playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public';
    const authURL = new URL('https://accounts.spotify.com/authorize?');
    authURL.searchParams.append('response_type', 'code');
    authURL.searchParams.append('client_id', process.env.SPOTIFY_CLIENT_ID!);
    authURL.searchParams.append('scope', scope);
    authURL.searchParams.append('redirect_uri', process.env.BETTER_AUTH_URL! + '/api/spotify/callback');
    authURL.searchParams.append('state', state);
    await fetch(authURL.toString());
}