export interface PlexHeaders extends Record<string, string> {
    Accept: string;
    'X-Plex-Client-Identifier': string;
    'X-Plex-Product': string;
    'X-Plex-Version': string;
    'X-Plex-Platform': string;
    'X-Plex-Platform-Version': string;
    'X-Plex-Device': string;
    'X-Plex-Model': string;
    'X-Plex-Device-Vendor': string;
    'X-Plex-Device-Name': string;
    'X-Plex-Device-Screen-Resolution': string;
    'X-Plex-Language': string;
}

export interface PlexPin {
    id: number;
    code: string;
}