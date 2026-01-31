'use client'

import { useState } from "react";
import useSpotifyOAuth from "@/hooks/useSpotifyOAuth";
import { toast } from "sonner";
import parseErrorMessage from "@/utils/parseErrorMessage";
import { Button } from "@/components/ui/button";
import { Spinner } from '@/components/ui/spinner';

const SpotifyAuthButton = () => {
    const [isLoadingState, setIsLoadingState] = useState(false);
    const { initializeLogin, login } = useSpotifyOAuth();
    const clickHandler = async () => {
        setIsLoadingState(true);
        await initializeLogin();
        setTimeout(async () => {
            try {
                await login();
            } catch (error) {
                toast.error('Spotify Auth', { description: parseErrorMessage(error) });
            } finally {
                setIsLoadingState(false);
            }
        }, 2000);
    }
    return (
        <Button onClick={clickHandler} className="w-full bg-green-600 hover:bg-green-700" disabled={isLoadingState}>
            {isLoadingState ? (
                <Spinner color={'white'} />
            ) : (
                'Connect to Spotify'
            )}
        </Button>
    )
}

export default SpotifyAuthButton;