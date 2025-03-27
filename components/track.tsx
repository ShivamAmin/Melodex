"use client"

import  track  from '@/types/track';
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import PlexImage from "@/components/plexImage";
import StarRating from "@/components/starRating/starRating";
import usePlexOAuth from "@/hooks/usePlexOAuth";

function Track({ track }: { track: track }) {
    const { plexAuthToken } = usePlexOAuth();
    const rate = async (rating: number) => {
        const ratingUrl = `https://plex.shivamamin.com/library/sections/${track.librarySectionID}/all?type=10&id=${track.ratingKey}&userRating.value=${rating}`;
        if (plexAuthToken) {
            await fetch(ratingUrl, {
                method: "PUT",
                headers: {
                    'X-Plex-Token': plexAuthToken
                }
            })
        }
    }
    return (
        <Card className={'overflow-hidden h-[80px]'}>
            <CardContent className={'h-full w-full p-0'}>
                <div className={'h-full flex flex-row'}>
                    <div className={'relative h-full aspect-square'}>
                        <PlexImage src={track.thumb} alt={track.title} fill />
                    </div>
                    <div className={'flex flex-col justify-center p-4'}>
                        <div className={'text-sm font-semibold'}>
                            {track.title}
                        </div>
                        <div className={'text-sm text-muted-foreground'}>
                            {track.grandparentTitle}
                        </div>
                    </div>
                    <div className={'h-full flex justify-center items-center'}>
                        <StarRating onSetRating={(rating: number) => rate(rating)} initialRating={track.userRating} />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default Track
