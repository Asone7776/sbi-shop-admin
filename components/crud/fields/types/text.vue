<template>
  <v-text-field
      v-model="computedValue"
      type="text"
      variant="outlined"
      :rules="rules"
      v-bind="attributes"
      @click:clear="$emit('clear')"
  >
  </v-text-field>
</template>
<script setup lang="ts">
const emits = defineEmits(["update:modelValue", "enter-pressed", "clear"]);
const props = defineProps({
  send: {
    type: Function,
    default: () => {
    },
  },
  attributes: {
    type: Object,
    default: () => ({}),
  },
  rules: {
    type: Array as PropType<any>,
    required: false
  },
  defaultValue: {},
  modelValue: {
    type: String,
    default: "",
  },
  mask: {
    type: Object,
    required: false,
    default: {},
  },
});

const computedValue = computed({
  get: () => {
    return props.modelValue;
  },
  set: (value) => {
    emits("update:modelValue", value);
  },
});
</script>
