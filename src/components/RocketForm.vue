<template>
  <v-card>
    <v-card-title>Add New Rocket</v-card-title>
    <v-card-text>
      <v-form
        ref="formRef"
        v-model="valid"
      >
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="form.name"
              label="Rocket Name"
              :rules="nameRules"
              variant="outlined"
              required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-textarea
              v-model="form.description"
              label="Description"
              :rules="descriptionRules"
              variant="outlined"
              rows="3"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="form.cost_per_launch"
              label="Cost per Launch ($)"
              type="number"
              :rules="costRules"
              variant="outlined"
              required
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="form.country"
              label="Country"
              :rules="countryRules"
              variant="outlined"
              required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="form.first_flight"
              label="First Flight Date"
              type="date"
              variant="outlined"
              :rules="firstFlightRules"
              required
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        variant="outlined"
        @click="$emit('cancel')"
      >
        Cancel
      </v-btn>
      <v-btn
        :disabled="!valid || loading"
        :loading="loading"
        color="primary"
        variant="flat"
        @click="submitForm"
      >
        Create
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
  import type { Rocket } from '@/types/rocket'
  import { ref, reactive, watch } from 'vue'

  interface Props {
    modelValue?: Rocket
    loading?: boolean
  }

  interface Emits {
    (e: 'submit', value: Rocket): void
    (e: 'cancel'): void
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: () => ({
      id: '',
      name: '',
      description: '',
      active: true,
      stages: 0,
      boosters: 0,
      cost_per_launch: 0,
      success_rate_pct: 0,
      first_flight: '',
      country: '',
      company: '',
      flickr_images: []
    }),
    loading: false
  })

  const emit = defineEmits<Emits>()

  const formRef = ref()
  const valid = ref(false)

  const form = reactive<Rocket>({ ...props.modelValue })

  const nameRules = [
    (v: string) => !!v || 'Name is required',
    (v: string) => v.length >= 3 || 'Name must be at least 3 characters'
  ]

  const countryRules = [(v: string) => !!v || 'Country is required']

  const costRules = [
    (v: number) => !!v || 'Cost is required',
    (v: number) => v > 0 || 'Cost must be positive'
  ]

  const firstFlightRules = [(v: string) => !!v || 'First flight date is required']

  const descriptionRules = [
    (v: string) => v.length <= 500 || 'Description must be less than 500 characters'
  ]

  const submitForm = async () => {
    const { valid: isValid } = await formRef.value.validate()
    if (isValid) {
      emit('submit', { ...form })
    }
  }

  watch(
    () => props.modelValue,
    newValue => {
      Object.assign(form, newValue)
    },
    { deep: true }
  )
</script>
