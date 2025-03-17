"use client"

import {useEffect, useState} from "react";
import usePlexOAuth from "@/hooks/usePlexOAuth";
import PlaylistItem from "./playlistItem";

function PlaylistList() {
    const [loading, setLoading] = useState(true);
    const [playlists, setPlaylists] = useState([]);
    const { plexAuthToken } = usePlexOAuth();
    useEffect(() => {
        const getPlaylists = async () => {
            const url = "https://plex.shivamamin.com/playlists?playlistType=audio"
            return await fetch(url, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    'X-Plex-Token': plexAuthToken!
                }
            })
                .then((res) => res.json())
                .then((data) => setPlaylists(data.MediaContainer.Metadata));
        }
        getPlaylists().then(() => setLoading(false));
    }, []);

    return (
        <div className={`grid justify-center gap-4 grid-cols-[repeat(auto-fit,minmax(280px,max-content))]`} /*className={'flex flex-wrap gap-4 justify-center'}*/>
            {!loading && playlists.map((playlist: any) => (
                <PlaylistItem playlist={playlist} key={playlist.key} />
            ))}
        </div>
    )
}

export default PlaylistList
