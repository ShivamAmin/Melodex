import  track  from '@/types/track';
import {
    Card,
    CardContent,
} from '@/components/ui/card';
import PlexImage from "@/components/plexImage";
import StarRating from "@/components/starRating/starRating";

function Track({ track }: { track: track }) {
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
                        <StarRating initialRating={track.userRating} librarySectionID={track.librarySectionID} ratingKey={track.ratingKey} />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default Track
