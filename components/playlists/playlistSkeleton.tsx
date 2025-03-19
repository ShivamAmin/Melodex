import { Skeleton } from '@/components/ui/skeleton';
import React from "react";

function PlaylistSkeleton() {
    return (
        <div className={`grid justify-center gap-4 grid-cols-[repeat(auto-fit,minmax(280px,max-content))]`}>
            {Array.from({length: 15}).map((_, i) => { return (
                <Skeleton key={i} className={'w-[280px] h-[280px] rounded-xl'} />
            )})}
        </div>
    )
}

export default PlaylistSkeleton
