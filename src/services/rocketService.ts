import { api } from '@/lib/axios'
import type { Rocket } from '@/types/rocket'

export async function getRockets(): Promise<Rocket[]> {
  const res = await api.get('/rockets')
  return res.data
}

export async function getRocketById(id: string): Promise<Rocket> {
  const res = await api.get(`/rockets/${id}`)
  return res.data
}
