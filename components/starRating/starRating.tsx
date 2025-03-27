'use client'

import starRating from '@/types/starRating'
import { useState } from "react";
import Star from '@/components/starRating/star';
import rateTrack from '@/actions/rateTrack';

function StarRating({ librarySectionID, ratingKey, max = 5, starColour = "#fcc149", initialRating = 0, disabled = false }: starRating) {
    const [rating, setRating] = useState(initialRating);
    const [hoverRating, setHoverRating] = useState(0);

    const handleRating = (userRating: number) => {
        setRating(userRating);
        rateTrack(librarySectionID, ratingKey, userRating);
    }

    const getFill = (idx: number): 'empty' | 'half' | 'full' => {
        if (!!hoverRating) {
            if (hoverRating >= idx) {
                return 'full'
            } else if (hoverRating + 1 === idx) {
                return 'half'
            } else {
                return 'empty'
            }
        } else {
            if (rating >= idx) {
                return 'full'
            } else if (rating + 1 === idx) {
                return 'half'
            } else {
                return 'empty'
            }
        }
    }

    return (
        <div className={'flex'}>
            {Array.from({ length: max }, (_, i) => (
                <Star
                    starColour={starColour}
                    key={i}
                    onRate={(side: string) => {
                        const rating = side === 'left' ? ((i + 1) * 2) - 1 : (i + 1) * 2;
                        handleRating(rating);
                    }}
                    fill={getFill((i + 1) * 2)}
                    onHover={(side: string) => {
                        if (!disabled) {
                            if (side === 'left') {
                                setHoverRating(((i + 1) * 2) - 1)
                            } else {
                                setHoverRating((i + 1) * 2)
                            }
                        }
                    }}
                    onHoverOut={() => setHoverRating(0)}
                />
            ))}
        </div>
    )
}

export default StarRating
