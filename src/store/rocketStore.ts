import { defineStore } from 'pinia'
import { getRockets, getRocketById } from '@/services/rocketService'
import type { Rocket } from '@/types/rocket'

export const useRocketStore = defineStore('rocket', {
  state: () => ({
    rockets: [] as Rocket[],
    selectedRocket: null as Rocket | null
  }),
  actions: {
    async fetchRockets() {
      this.rockets = await getRockets()
    },
    async fetchRocket(id: string) {
      this.selectedRocket = await getRocketById(id)
    },
    createRocket(payload: Omit<Rocket, 'id'>) {
      const newRocket: Rocket = {
        id: crypto.randomUUID(),
        ...payload
      }
      this.rockets.push(newRocket)
    }
  }
})
