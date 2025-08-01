<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { useRocketStore } from '@/store/rocketStore'
  import LoadingState from '@/components/LoadingState.vue'

  const route = useRoute()
  const rocketStore = useRocketStore()

  const loading = ref(false)
  const error = ref(false)
  const errorMessage = ref('')

  const loadRocket = async () => {
    const id = route.params.id as string
    loading.value = true
    error.value = false
    errorMessage.value = ''

    try {
      await rocketStore.fetchRocket(id)
    } catch (err) {
      console.error('Failed to load rocket:', err)
      error.value = true
      errorMessage.value =
        'Failed to load rocket details. Please check your connection and try again.'
    } finally {
      loading.value = false
    }
  }

  onMounted(async () => {
    await loadRocket()
  })
</script>

<template>
  <v-container>
    <LoadingState
      v-if="loading || error"
      :message="loading ? 'Loading rocket details...' : undefined"
      :is-error="error"
      :error-message="errorMessage"
      @retry="loadRocket"
    />

    <div v-else-if="rocketStore.selectedRocket">
      <!-- Header with back button -->
      <div class="d-flex align-center mb-4">
        <v-btn
          icon
          variant="text"
          @click="$router.back()"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <h1 class="text-h4 ml-2">
          {{ rocketStore.selectedRocket.name }}
        </h1>
      </div>

      <v-card>
        <v-card-text>
          <!-- Rocket Image -->
          <div
            v-if="
              rocketStore.selectedRocket.flickr_images &&
                rocketStore.selectedRocket.flickr_images.length > 0
            "
            class="mb-4"
          >
            <v-img
              :src="rocketStore.selectedRocket.flickr_images[0]"
              :alt="rocketStore.selectedRocket.name"
              cover
              class="rounded"
            />
          </div>

          <!-- Description -->
          <div
            v-if="rocketStore.selectedRocket.description"
            class="mb-4"
          >
            <h6 class="text-h6 mb-2">
              Description
            </h6>
            <p class="text-body-1">
              {{ rocketStore.selectedRocket.description }}
            </p>
          </div>

          <!-- Key Information -->
          <v-row>
            <v-col
              cols="12"
              sm="6"
            >
              <div class="mb-3">
                <strong>Cost per Launch:</strong>
                <div class="text-h6 text-primary">
                  ${{ new Intl.NumberFormat().format(rocketStore.selectedRocket.cost_per_launch) }}
                </div>
              </div>
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <div class="mb-3">
                <strong>Country:</strong>
                <div class="text-body-1">
                  {{ rocketStore.selectedRocket.country }}
                </div>
              </div>
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <div class="mb-3">
                <strong>First Flight:</strong>
                <div class="text-body-1">
                  {{ rocketStore.selectedRocket.first_flight }}
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>

    <div
      v-else
      class="text-center py-8"
    >
      <v-icon
        size="64"
        color="grey"
      >
        mdi-rocket-outline
      </v-icon>
      <h3 class="text-h6 mt-2">
        Rocket not found
      </h3>
      <p class="text-body-2">
        The requested rocket could not be found.
      </p>
      <v-btn
        color="primary"
        variant="outlined"
        @click="$router.push('/')"
      >
        Back to Rockets
      </v-btn>
    </div>
  </v-container>
</template>
