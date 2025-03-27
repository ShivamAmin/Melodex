type image = {
    alt: string,
    type: string,
    url: string
};

type media = {
    id: number,
    duration: number,
    audioChannels: number,
    audioCodec: string,
    container: string,
    hasVoiceActivity: boolean,
    Part?: media[],
};

type images = [image, image]

type track = {
    art?: string,
    ratingKey: string,
    key: string,
    parentRatingKey: string,
    grandparentRatingKey: string,
    guid: string,
    parentGuid: string,
    grandparentGuid: string,
    parentStudio: string,
    type: 'track',
    title: string,
    grandparentKey: string,
    parentKey: string,
    librarySectionTitle: string,
    librarySectionID: number,
    librarySectionKey: string,
    grandparentTitle: string,
    parentTitle: string,
    originalTitle: string,
    summary: string,
    index: number,
    parentIndex: number,
    ratingCount: number,
    userRating: number,
    viewCount: number,
    skipCount: number,
    lastViewedAt: number,
    lastRatedAt: number,
    parentYear: number,
    thumb: string,
    parentThumb: string,
    grandparentThumb: string,
    duration: number,
    addedAt: number,
    updatedAt: number,
    musicAnalysisVersion: string,
    Media: media,
    Image: images
}

export default track;