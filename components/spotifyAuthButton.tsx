'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Spinner from '@/components/spinner';
import { auth } from "@/actions/spotify/auth";

const SpotifyAuthButton = () => {
    const [isLoadingState, setIsLoadingState] = useState(false);
    const clickHandler = async () => {
        setIsLoadingState(true);
        await auth();
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