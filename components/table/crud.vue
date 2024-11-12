<template>
  <v-data-table-server
      :headers="headers"
      v-model:items-per-page="query.perPage"
      v-model:page="query.page"
      :items="data"
      :items-length="meta.total"
      :loading="loading"
      item-value="name"
      :mobile="mobile"
      @update:options="loadItems"
  ></v-data-table-server>
</template>
<script setup lang="ts">
import {useDisplay} from "vuetify";
import type {meta} from "~/types/list";
import type {header} from "~/types/table";

const emits = defineEmits(['reload']);
const {mobile} = useDisplay();
const props = defineProps({
  headers: {
    type: Array as PropType<header[]>,
    required: true,
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
  meta: {
    type: Object as PropType<meta>,
    required: false,
    default: {
      total: 0,
      lastPage: 0,
      page: 1,
      perPage: 1,
      prev: null,
      next: null
    }
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
//
// const options = computed({
//   get: () => props.query,
//   set: (value) => {
//     loadItems(value);
//   },
// });

</script>