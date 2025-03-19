type playlist = {
    ratingKey: string,
    key: string,
    guid: string,
    type: string,
    title: string,
    titleSort: string,
    summary: string,
    smart: true,
    playlistType: string,
    composite: string,
    thumb?: string,
    icon: string,
    viewCount: number,
    lastViewedAt: number,
    duration: number,
    leafCount: number,
    addedAt: number,
    updatedAt: number
}

export default playlist;