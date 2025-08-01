<template>
  <v-container
    class="d-flex justify-center align-center"
    :style="{ minHeight }"
  >
    <div class="text-center">
      <!-- Loading State -->
      <div v-if="!isError">
        <v-progress-circular
          :size="size"
          :width="width"
          color="primary"
          indeterminate
        />
        <v-card-text
          v-if="message"
          class="mt-3"
        >
          {{ message }}
        </v-card-text>
      </div>

      <!-- Error State -->
      <div v-else>
        <v-icon
          :size="size"
          color="error"
          class="mb-3"
        >
          mdi-alert-circle
        </v-icon>
        <v-card-text
          v-if="errorMessage"
          class="text-error"
        >
          {{ errorMessage }}
        </v-card-text>
        <v-btn
          color="primary"
          variant="outlined"
          class="mt-3"
          @click="$emit('retry')"
        >
          {{ retryText }}
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
  interface Props {
    message?: string
    size?: number
    width?: number
    minHeight?: string
    isError?: boolean
    errorMessage?: string
    retryText?: string
  }

  withDefaults(defineProps<Props>(), {
    message: '',
    size: 64,
    width: 4,
    minHeight: '200px',
    isError: false,
    errorMessage: 'Something went wrong. Please try again.',
    retryText: 'Retry'
  })

  defineEmits<{
    retry: []
  }>()
</script>
