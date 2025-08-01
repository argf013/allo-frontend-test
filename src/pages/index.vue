<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useRocketStore } from '@/store/rocketStore'
  import type { Rocket } from '@/types/rocket'
  import LoadingState from '@/components/LoadingState.vue'
  import RocketFilter from '@/components/RocketFilter.vue'
  import RocketCard from '@/components/RocketCard.vue'
  import RocketForm from '@/components/RocketForm.vue'

  const router = useRouter()
  const rocketStore = useRocketStore()

  const loading = ref(false)
  const error = ref(false)
  const errorMessage = ref('')
  const formLoading = ref(false)
  const formDialog = ref(false)

  const filters = ref({
    search: '',
    status: null,
    type: null
  })

  const filteredRockets = computed(() => {
    let filtered = rocketStore.rockets

    if (filters.value.search) {
      filtered = filtered.filter(
        rocket =>
          rocket.name.toLowerCase().includes(filters.value.search.toLowerCase())
      )
    }

    if (filters.value.status) {
      const isActive = filters.value.status === 'active'
      filtered = filtered.filter(rocket => rocket.active === isActive)
    }

    return filtered.map(rocket => ({
      id: rocket.id,
      name: rocket.name,
      description: rocket.description,
      cost_per_launch: rocket.cost_per_launch,
      country: rocket.country,
      first_flight: rocket.first_flight,
      flickr_images: rocket.flickr_images,
      active: rocket.active,
      success_rate_pct: rocket.success_rate_pct,
    }))
  })

  const loadRockets = async () => {
    loading.value = true
    error.value = false
    errorMessage.value = ''

    try {
      await rocketStore.fetchRockets()
      error.value = false
    } catch (err) {
      console.error('Failed to load rockets:', err)
      error.value = true
      errorMessage.value = 'Failed to load rockets. Please check your connection and try again.'
    } finally {
      loading.value = false
    }
  }

  const openCreateDialog = () => {
    rocketStore.selectedRocket = {
      id: '',
      name: '',
      description: '',
      active: true,
      cost_per_launch: 0,
      success_rate_pct: 0,
      first_flight: '',
      country: '',
      flickr_images: []
    }
    formDialog.value = true
  }

  const viewRocket = (rocket: Rocket) => {
    router.push(`/rockets/${rocket.id}`)
  }

  const handleFormSubmit = async (rocketData: Rocket) => {
    formLoading.value = true
    try {
      rocketStore.createRocket(rocketData)
      formDialog.value = false
    } catch (error) {
      console.error('Failed to save rocket:', error)
    } finally {
      formLoading.value = false
    }
  }

  onMounted(async () => {
    await loadRockets()
  })
</script>

<template>
  <v-container>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1 class="text-h4">
        Rockets
      </h1>
      <v-btn
        color="primary"
        variant="flat"
        @click="openCreateDialog"
      >
        <v-icon start>
          mdi-plus
        </v-icon>
        Add Rocket
      </v-btn>
    </div>

    <RocketFilter v-model="filters" />

    <LoadingState
      v-if="loading || error"
      :message="loading ? 'Loading rockets...' : undefined"
      :is-error="!!error"
      :error-message="errorMessage"
      @retry="loadRockets"
    />

    <div v-else-if="!loading && !error">
      <v-row>
        <v-col
          v-for="rocket in filteredRockets"
          :key="rocket.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <RocketCard
            :rocket="rocket"
            @click="viewRocket(rocket)"
          />
        </v-col>
      </v-row>

      <div
        v-if="filteredRockets.length === 0"
        class="text-center py-8"
      >
        <v-icon
          size="64"
          color="grey"
        >
          mdi-rocket
        </v-icon>
        <h3 class="text-h6 mt-2">
          No rockets found
        </h3>
        <p class="text-body-2">
          Try adjusting your filters or add a new rocket.
        </p>
      </div>
    </div>

    <!-- Form Dialog -->
    <v-dialog
      v-model="formDialog"
      max-width="800"
    >
      <RocketForm
        :model-value="rocketStore.selectedRocket || undefined"
        :loading="formLoading"
        @submit="handleFormSubmit"
        @cancel="formDialog = false"
      />
    </v-dialog>
  </v-container>
</template>