<script setup lang="ts">
  import type { Rocket } from '@/types/rocket'
  import { computed } from 'vue'

  interface Props {
    rocket: Rocket
  }

  const props = defineProps<Props>()

  const truncatedDescription = computed(() => {
    if (!props.rocket.description) return ''
    return props.rocket.description.length > 100
      ? props.rocket.description.substring(0, 100) + '...'
      : props.rocket.description
  })

  const rocketImageUrl = computed(() => {
    if (props.rocket.flickr_images && props.rocket.flickr_images.length > 0) {
      return props.rocket.flickr_images[0]
    }
    return 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80'
  })
</script>

<template>
  <v-card
    class="rocket-card"
    elevation="3"
  >
    <v-img
      :src="rocketImageUrl"
      height="200"
      cover
      class="text-white"
    />

    <v-card-title class="text-h6">
      {{ rocket.name }}
    </v-card-title>

    <v-card-text>
      <p
        v-if="rocket.description"
        class="text-body-2"
      >
        {{ truncatedDescription }}
      </p>
    </v-card-text>
  </v-card>
</template>

<style scoped>
  .rocket-card {
    transition: transform 0.2s ease-in-out;
  }

  .rocket-card:hover {
    transform: translateY(-2px);
  }
</style>
       