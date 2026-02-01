'use client'

import { useState } from "react";
import useSpotifyOAuth from "@/hooks/useSpotifyOAuth";
import { toast } from "sonner";
import parseErrorMessage from "@/utils/parseErrorMessage";
import { Button } from "@/components/ui/button";
import { Spinner } from '@/components/ui/spinner';

const SpotifyAuthButton = () => {
    const [isLoadingState, setIsLoadingState] = useState(false);
    const { login, refreshToken, spotifyAccessToken } = useSpotifyOAuth();
    const clickHandler = async () => {
        setIsLoadingState(true);
        try {
            if (!spotifyAccessToken) {
                console.log(!spotifyAccessToken)
                await login();
            } else {
                await refreshToken();
            }
        } catch (error) {
            toast.error('Spotify Auth', { description: parseErrorMessage(error) });
        } finally {
            setIsLoadingState(false);
        }
    }
    return (
        <Button onClick={clickHandler} className="w-full bg-green-600 hover:bg-green-700" disabled={isLoadingState}>
            {isLoadingState ? (
                <Spinner color={'white'} />
            ) : (
                <>{!!spotifyAccessToken ? 'Rea' : 'A'}uthenticate Spotify Account</>
            )}
        </Button>
    )
}

export default SpotifyAuthButton;