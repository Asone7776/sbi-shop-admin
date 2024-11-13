<template>
  <v-data-table-server
      :headers="headers"
      v-model:items-per-page="query.perPage"
      v-model:page="query.page"
      :items="data"
      :items-length="total"
      :loading="loading"
      item-value="name"
      :mobile="mobile"
      @update:options="loadItems"
      :items-per-page-options="pagination_options"
  >
    <template v-slot:top>
      <slot name="top"></slot>
    </template>
  </v-data-table-server>
</template>
<script setup lang="ts">
import {useDisplay} from "vuetify";
import type {meta} from "~/types/list";
import type {header, PaginationOption} from "~/types/table";

const emits = defineEmits(['reload']);
const {mobile} = useDisplay();
defineProps({
  headers: {
    type: Array as PropType<header[]>,
    required: true,
  },
  pagination_options: {
    type: Array as PropType<PaginationOption[]>,
    required: false,
    default: [
      {value: 1, title: '1'},
      {value: 10, title: '10'},
      {value: 25, title: '25'},
      {value: 50, title: '50'},
      {value: 100, title: '100'},
    ]
  },
  data: {
    type: Array as PropType<any[]>,
    required: false,
    default: []
  },
  loading: {
    type: Boolean,
    required: false,
    default: false
  },
  total: {
    type: Number,
    required: true,
    default: 0
  },
  query: {
    type: Object as PropType<Pick<meta, "page" | "perPage">>,
    required: false,
    default: {
      page: 1,
      perPage: 10,
    }
  }
});
const loadItems = (items: any) => {
  emits('reload', items);
}
</script>