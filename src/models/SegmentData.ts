interface Segment {
    index: number,
    content: string,
    image?: string,
    imageHash?: string,
    story: string,
}

interface Segments {
    segments: Segment[]
}

export type { Segments };