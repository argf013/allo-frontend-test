export interface Rocket {
  id: string
  name: string
  description: string
  active: boolean
  cost_per_launch: number
  success_rate_pct: number
  first_flight: string
  country: string
  flickr_images: string[]
}
