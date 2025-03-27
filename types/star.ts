type star = {
    onRate: (side: string) => void,
    fill: 'empty' | 'half' | 'full',
    onHover: (side: string) => void,
    onHoverOut: () => void,
    starColour: string,
    size: number,
}

export default star