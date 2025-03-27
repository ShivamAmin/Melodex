type starRating = {
    librarySectionID: number,
    ratingKey: string,
    max?: number,
    starColour?: string,
    size?: number,
    initialRating?: number,
    onSetRating?: (rating: number) => number | Promise<void>;
    disabled?: boolean;
};

export default starRating;