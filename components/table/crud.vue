<template>
  <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="data"
      :items-length="meta.total"
      :loading="loading"
      :search="search"
      item-value="name"
      @update:options="loadItems"
  ></v-data-table-server>
</template>
<script setup lang="ts">
import {useDisplay} from "vuetify";
import type {header, meta} from "~/types/list";

const {mobile} = useDisplay();
const props = defineProps({
  headers: {
    type: Array as PropType<header[]>,
    required: false,
  },
  data: {
    type: Array as PropType<any[]>,
    required: false,
    default: []
  },
  meta: {
    type: Object as PropType<meta>,
    required: false,
    default: {
      total: 0,
      lastPage: 0,
      currentPage: 1,
      perPage: 10,
      prev: null,
      next: null
    }
  }
})
</script>