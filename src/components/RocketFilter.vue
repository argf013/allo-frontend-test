<script setup lang="ts">
  import { reactive } from 'vue'

  interface FilterData {
    search: string
    status: string | null
  }

  interface Props {
    modelValue?: FilterData
  }

  interface Emits {
    (e: 'update:modelValue', value: FilterData): void
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: () => ({ search: '', status: null })
  })

  const emit = defineEmits<Emits>()

  const filters = reactive<FilterData>({ ...props.modelValue })

  const statusOptions = [
    { title: 'Active', value: 'active' },
    { title: 'Inactive', value: 'inactive' }
  ]

  const updateFilters = () => {
    emit('update:modelValue', { ...filters })
  }

  const clearFilters = () => {
    filters.search = ''
    filters.status = null
    updateFilters()
  }
</script>

<template>
  <v-card class="mb-4">
    <v-card-title>Filter Rockets</v-card-title>
    <v-card-text>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="filters.search"
            label="Search rockets..."
            prepend-inner-icon="mdi-magnify"
            clearable
            variant="outlined"
            @input="updateFilters"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-select
            v-model="filters.status"
            :items="statusOptions"
            label="Status"
            variant="outlined"
            clearable
            @update:model-value="updateFilters"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn
            variant="outlined"
            color="secondary"
            @click="clearFilters"
          >
            Clear Filters
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
