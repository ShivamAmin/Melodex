import {Skeleton} from "@/components/ui/skeleton";

function TrackSkeleton() {
    return (
        <div className={'flex flex-col gap-4'}>
            {Array.from({length: 25}).map((_, i) => { return (
                <Skeleton key={i} className={'w-full h-[80px] rounded-xl'} />
            )})}
        </div>
    )
}

export default TrackSkeleton
