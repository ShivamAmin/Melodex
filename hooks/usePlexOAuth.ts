import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Bowser from 'bowser';
import version from '@/utils/version';
import Cookies from 'js-cookie';
import { PlexHeaders, PlexPin } from "@/lib/types";
import { getPlexPin, getPlexJWT } from "@/actions/plex/auth";

const usePlexOAuth = () => {
    const plexHeaders = useRef<PlexHeaders>({
        Accept: 'application/json',
        'X-Plex-Client-Identifier': '',
        'X-Plex-Product': 'Melodex',
        'X-Plex-Version': '',
        'X-Plex-Platform': '',
        'X-Plex-Platform-Version': '',
        'X-Plex-Device': '',
        'X-Plex-Model': '',
        'X-Plex-Device-Vendor': '',
        'X-Plex-Device-Name': '',
        'X-Plex-Device-Screen-Resolution': '',
        'X-Plex-Language': 'en',
    });
    const plexPin = useRef<PlexPin>({id: 0, code: ''});
    const plexAuthToken = useRef<string>(Cookies.get('plex_auth_token') as string);
    const loginPopup = useRef<Window | null>(null);

    const setHeaders = () => {
        const browser = Bowser.getParser(window.navigator.userAgent);
        let clientId = localStorage.getItem('X-Plex-Client-Identifier');
        if (!clientId) {
            const uuid = uuidv4();
            localStorage.setItem('X-Plex-Client-Identifier', uuid);
            clientId = uuid;
        }
        plexHeaders.current = {
            ...plexHeaders.current,
            'X-Plex-Client-Identifier': clientId,
            'X-Plex-Version': version,
            'X-Plex-Platform': browser.getBrowserName() || '',
            'X-Plex-Platform-Version': browser.getBrowserVersion() || '',
            'X-Plex-Device': browser.getOSName() || '',
            'X-Plex-Model': browser.getUA() || '',
            'X-Plex-Device-Vendor': browser.getOSName() || '',
            'X-Plex-Device-Name': `${browser.getOSName()} Melodex`,
            'X-Plex-Device-Screen-Resolution': window.screen.width + 'x' + window.screen.height
        }
    }

    const getAuthParams = () => {
        return {
            clientID: plexHeaders.current['X-Plex-Client-Identifier'],
            'context[device][product]': plexHeaders.current['X-Plex-Product'],
            'context[device][version]': plexHeaders.current['X-Plex-Version'],
            'context[device][platform]': plexHeaders.current['X-Plex-Platform'],
            'context[device][platformVersion]': plexHeaders.current['X-Plex-Platform-Version'],
            'context[device][device]': plexHeaders.current['X-Plex-Device'],
            'context[device][deviceName]': plexHeaders.current['X-Plex-Device-Name'],
            'context[device][model]': plexHeaders.current['X-Plex-Model'],
            'context[device][screenResolution]': plexHeaders.current['X-Plex-Device-Screen-Resolution'],
            'context[device][layout]': plexHeaders.current['X-Plex-Model'],
            code: plexPin.current.code,
        }
    }

    const openLoginPopup = (title: string, h: number, w: number): void => {
        if (loginPopup.current) {
            loginPopup.current.focus();
            return;
        }

        const y = window.outerHeight / 2 + window.screenY - (h / 2);
        const x = window.outerWidth / 2 + window.screenX - (w / 2);

        const newWindow = window.open(
            '/user/connections/loader?service=plex',
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

    const getPin: () => Promise<void> = async (): Promise<void> => {
        plexPin.current = await getPlexPin(plexHeaders.current);
    }

    const encodeParams = (params: Record<string, string>): string => {
        return Object.keys(params)
            .map(function (key) {
                return [key, params[key]].map(encodeURIComponent).join('=');
            }).join('&');
    }

    const pollPlexPin = (): Promise<string> => {
        const executePoll = async (resolve: (plexAuthToken: string) => void, reject: (e: Error) => void) => {
            try {
                const resp = await getPlexJWT(plexPin.current.id, plexHeaders.current);
                if (resp?.authToken) {
                    plexAuthToken.current = resp.authToken as string;
                    Cookies.set('plex_auth_token', plexAuthToken.current);
                    closeLoginPopup();
                    resolve(plexAuthToken.current)
                } else if (!resp?.authToken && !loginPopup.current?.closed) {
                    setTimeout(executePoll, 1000, resolve, reject);
                } else {
                    reject(new Error('Popup closed prematurely'));
                }
            } catch (e) {
                closeLoginPopup();
                reject(e as Error);
            }
        }
        return new Promise((resolve, reject) => {
            setTimeout(() => reject(new Error('Polling timed out')), 60000);
            executePoll(resolve, reject).then();
        });
    }

    const login = async (): Promise<string> => {
        openLoginPopup('Plex Auth', 700, 600);

        setTimeout(async () => {
            setHeaders();
            await getPin();

            const params = getAuthParams();

            if (loginPopup.current) {
                loginPopup.current.location.href = `https://app.plex.tv/auth/#!?${encodeParams(params)}`;
            }
        }, 2000);

        return pollPlexPin();
    }

    return { login, plexAuthToken: plexAuthToken.current };
}

export default usePlexOAuth;
