'use client'
import { useSearchParams } from "next/navigation";
import Cookies from 'js-cookie';
import { Spinner } from "@/components/ui/spinner";

function page() {
    const searchParams = useSearchParams();
    const state = searchParams.get('state');
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const cookieState = Cookies.get('spotify_auth_state');

    if (state !== cookieState) {
        Cookies.set('spotify_auth_error', 'state_mismatch');
    } else if (error) {
        Cookies.set('spotify_auth_error', error);
    } else {
        Cookies.set('spotify_auth_code', code!);
    }
    
    return (
        <div className="flex w-full h-full items-center justify-center">
            <Spinner className='size-16'/>
        </div>

    )
}

export default page;