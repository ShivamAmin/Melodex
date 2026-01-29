"use client"

import { useState } from 'react'
import Main from '@/components/page/main';
import Header from '@/components/page/header';
import Content from "@/components/page/content";
import LoadingButton from "@/components/loadingButton";
import usePlexOAuth from "@/hooks/usePlexOAuth";
import { toast } from "sonner";
import parseErrorMessage from "@/utils/parseErrorMessage";
import SpotifyAuthButton from '@/components/spotifyAuthButton';

function Page() {
    const [loading, setLoading] = useState(false);
    const { plexAuthToken, login, initializeLogin } = usePlexOAuth();
    const getPlexToken = () => {
        setLoading(true);
        initializeLogin();
        setTimeout(async () => {
            try {
                await login();
            } catch (error) {
                toast.error('Plex Auth', { description: parseErrorMessage(error) });
            } finally {
                setLoading(false);
            }
        }, 2000);
    }
    return (
        <Main>
            <Header>Settings Page</Header>
            <Content>
                <LoadingButton onClick={() => getPlexToken()} loading={loading} type={'button'} disabled={!!plexAuthToken}>Plex</LoadingButton>
                <SpotifyAuthButton />
            </Content>
        </Main>
    )
}

export default Page
