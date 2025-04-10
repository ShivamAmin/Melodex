import track from "@/types/track";
import { plexBaseURL } from "@/lib/consts";
import { cookies } from "next/headers";

export const getPlaylistItems = async (playlistId: string): Promise<{ tracks: track[], title: string }> => {

    const playlistItemsUrl = new URL(`${plexBaseURL}/playlists/${playlistId}/items`);
    const cookieStore = await cookies();
    const plexAuthToken = cookieStore.get('plex_auth_token') as { value: string };
    const resp: {
        MediaContainer: {
            Metadata: track[],
            title: string,
        }
    } = await fetch(playlistItemsUrl.toString(), {
        method: "GET",
        headers: {
            Accept: "application/json",
            "X-Plex-Token": plexAuthToken.value
        }
    }).then(req => req.json());

    return { tracks: resp.MediaContainer.Metadata, title: resp.MediaContainer.title };
}