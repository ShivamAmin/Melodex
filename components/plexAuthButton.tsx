'use client'

import { useState } from "react";
import usePlexOAuth from "@/hooks/usePlexOAuth";
import { toast } from "sonner";
import parseErrorMessage from "@/utils/parseErrorMessage";
import { Button } from "@/components/ui/button";
import { Spinner } from '@/components/ui/spinner';

const plexAuthButton = () => {
    const [isLoadingState, setIsLoadingState] = useState(false);
    const { login, plexAuthToken } = usePlexOAuth();
    const clickHandler = async () => {
        setIsLoadingState(true);
        try {
            await login();
        } catch (error) {
            toast.error('Plex Auth', { description: parseErrorMessage(error) });
        } finally {
            setIsLoadingState(false);
        }
    }
    return (
        <Button onClick={clickHandler} className="w-full bg-amber-500 hover:bg-amber-600" disabled={isLoadingState}>
            {isLoadingState ? (
                <Spinner color={'white'} />
            ) : (
                'Authenticate Plex Account'
            )}
        </Button>
    )
}

export default plexAuthButton;