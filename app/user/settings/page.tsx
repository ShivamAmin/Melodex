"use client"

import React, { useState } from 'react'
import Header from '@/components/header';
import Content from "@/components/content";
import LoadingButton from "@/components/loadingButton";
import usePlexOAuth from "@/hooks/usePlexOAuth";
import { toast } from "sonner";
import parseErrorMessage from "@/utils/parseErrorMessage";

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
        <>
            <Header>Settings Page</Header>
            <Content>
                <LoadingButton onClick={() => getPlexToken()} loading={loading} type={'button'} disabled={!!plexAuthToken}>Plex</LoadingButton>
            </Content>
        </>
    )
}

export default Page
