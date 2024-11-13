<template>
  <v-app-bar
      flat
      color="success"
  >
    <v-app-bar-title>{{ title }}</v-app-bar-title>
    <slot name="actions"></slot>
  </v-app-bar>
</template>
<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: false,
  },
});
</script>