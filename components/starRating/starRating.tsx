'use client'

import starRating from '@/types/starRating'
import { useState } from "react";
import Star from '@/components/starRating/star';

function StarRating({
    max = 5,
    starColour = "#fcc149",
    size = 18,
    initialRating = 0,
    onSetRating = (rating: number) => {
        return rating;
    },
    disabled = false,
}: starRating) {
    const [rating, setRating] = useState(initialRating);
    const [hoverRating, setHoverRating] = useState(0);
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
                    size={size}
                    key={i}
                    onRate={(side: string) => {
                        if (!disabled) {
                            if (side === 'left') {
                                setRating(((i + 1) * 2) - 1)
                                onSetRating(((i + 1) * 2) - 1)
                            } else {
                                setRating((i + 1) * 2)
                                onSetRating((i + 1) * 2)
                            }
                        }
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
