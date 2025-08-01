import { ref } from 'vue'
import { getRockets, getRocketById } from '@/services/rocketService'
import type { Rocket } from '@/types/rocket'

const rockets = ref<Rocket[]>([])
const selectedRocket = ref<Rocket | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

export function useRocket() {
  async function fetchRockets() {
    isLoading.value = true
    error.value = null
    try {
      rockets.value = await getRockets()
    } catch (err) {
      console.error(err)
      error.value = 'Failed to fetch rockets'
    } finally {
      isLoading.value = false
    }
  }

  async function fetchRocketDetail(id: string) {
    isLoading.value = true
    error.value = null
    try {
      selectedRocket.value = await getRocketById(id)
    } catch (err) {
      console.error(err)
      error.value = 'Failed to fetch rocket detail'
    } finally {
      isLoading.value = false
    }
  }

  return {
    rockets,
    selectedRocket,
    isLoading,
    error,
    fetchRockets,
    fetchRocketDetail
  }
}
