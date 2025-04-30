export interface Memory {
  id: string
  date: string
  title: string
  description: string
  location?: string
  imageUrl: string
  song: {
    title: string
    artist: string
    url: string
  }
}
