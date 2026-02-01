import { useRef } from "react";
import Cookies from 'js-cookie';
import { spotifyClientID, spotifyRedirectURI } from "@/lib/consts";
import { getAccessToken, refreshAccessToken } from "@/actions/spotify/auth";

const useSpotifyOAuth = () => {
    const loginPopup = useRef<Window | null>(null);
    const spotifyAccessToken = useRef<string>(Cookies.get('spotify_access_token') as string);
    const spotifyRefreshToken = useRef<string>(Cookies.get('spotify_refresh_token') as string);
    const state = useRef<string>(Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10));
    const scope = 'playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public';
    const authURL = useRef<URL>(new URL('https://accounts.spotify.com/authorize?'));
    
    authURL.current.searchParams.append('response_type', 'code');
    authURL.current.searchParams.append('client_id', spotifyClientID);
    authURL.current.searchParams.append('scope', scope);
    authURL.current.searchParams.append('redirect_uri', spotifyRedirectURI);
    authURL.current.searchParams.append('state', state.current);

    Cookies.set('spotify_auth_state', state.current);

    const openLoginPopup = (title: string, h: number, w: number): void => {
        if (loginPopup.current) {
            loginPopup.current.focus();
            return;
        }

        const y = window.outerHeight / 2 + window.screenY - (h / 2);
        const x = window.outerWidth / 2 + window.screenX - (w / 2);

        const newWindow = window.open(
            '/user/connections/loader?service=spotify',
            title,
            `
              scrollbars=yes,
              width=${w}, 
              height=${h}, 
              top=${y}, 
              left=${x}
            `
        );
        if (newWindow) {
            newWindow.focus();
            loginPopup.current = newWindow;
        }
    }

    const closeLoginPopup = () => {
        loginPopup.current?.close();
        loginPopup.current = null;
    };

    const pollSpotifyAuth = (): Promise<string> => {
        const executePoll = async (resolve: (spotifyAccessToken: string) => void, reject: (e: Error) => void) => {
            const authCode = Cookies.get('spotify_auth_code');
            const authError = Cookies.get('spotify_auth_error');
            if (authError) {
                Cookies.remove('spotify_auth_error');
                closeLoginPopup();
                reject(new Error(authError));
                return;
            } else if (authCode) {
                Cookies.remove('spotify_auth_code');
                try {
                    const [accessToken, refreshToken] = await getAccessToken(authCode);
                    Cookies.set('spotify_access_token', accessToken);
                    Cookies.set('spotify_refresh_token', refreshToken);
                    spotifyAccessToken.current = accessToken;
                    spotifyRefreshToken.current = refreshToken;
                    closeLoginPopup();
                    resolve(accessToken);
                } catch (error) {
                    reject(error as Error);
                }
            } else if (!loginPopup.current?.closed) {
                setTimeout(() => executePoll(resolve, reject), 1000);
            } else {
                closeLoginPopup();
                reject(new Error('Spotify authentication popup was prematurely closed'));
            }
        }
        return new Promise<string>((resolve, reject) => {
            setTimeout(() => reject(new Error('Timeout while waiting for Spotify authentication')), 60000);
            executePoll(resolve, reject).then();
        });
    }

    const login = async (): Promise<string> => {
        openLoginPopup('Spotify Auth', 700, 600);

        setTimeout(async () => {
            if (loginPopup.current) {
                loginPopup.current.location.href = authURL.current.toString();
            }
        }, 2000);
        
        return pollSpotifyAuth();
    }

    const refreshToken = async () => {
        try {
            if (!spotifyRefreshToken.current) {
                throw new Error('No refresh token available. Re-authentication required.');
            }
            const accessToken = await refreshAccessToken(spotifyRefreshToken.current);
            Cookies.set('spotify_access_token', accessToken);
            spotifyAccessToken.current = accessToken;
        } catch (error) {
            throw error;
        }
        
    }

    return { login, refreshToken, spotifyAccessToken: spotifyAccessToken.current };
}

export default useSpotifyOAuth;