<template>
  <v-text-field
    class="ml-2 mr-2"
    prepend-inner-icon="mdi-magnify"
    v-model="computedValue"
    rounted="0"
    variant="outlined"
    placeholder=""
    hide-details
    clearable
    elevation="0"
    density="comfortable"
    base-color="primary"
    tile
    bg-color="rgba(0,0,0,0.09)"
    rounded="md"
  ></v-text-field>
</template>
<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
    default: "",
  },
});

const emits = defineEmits(["update:modelValue"]);
const computedValue = computed({
  get() {
    return props.modelValue;
  },
  set(value: string) {
    emits("update:modelValue", value);
  },
});
</script>