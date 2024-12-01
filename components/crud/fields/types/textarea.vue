<template>
  <v-textarea
      v-model="computedValue"
      variant="outlined"
      :rules="rules"
      :auto-grow="true"
      v-bind="attributes"
      @click:clear="$emit('clear')"
  >
  </v-textarea>
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
