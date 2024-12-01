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
    <template v-slot:item.id="props">
      <v-btn
          v-if="show_link && page"
          block
          @click="$cardOpen(page,props.item.id,{})"
          rounded="sm"
          variant="tonal"
          color="primary"
          prepend-icon="mdi-login-variant"
          class="mb-1"
      >
        {{ props.item?.id }}
      </v-btn>
      <span v-else> {{ props.item?.id }}</span>
    </template>
    <template v-slot:item.actions="{ item }">
      <TableActionsDelete v-if="has_delete && item.id" :model="model" :id="item.id" @reload="$emit('after-delete')"/>
    </template>
    <template v-slot:top>
      <slot name="top"></slot>
    </template>
  </v-data-table-server>
</template>
<script setup lang="ts">
import {useDisplay} from "vuetify";
import type {meta} from "~/types/list";
import type {header, PaginationOption} from "~/types/table";
import {Models} from "~/types/models";
import {TablePage} from "~/types/table";

const emits = defineEmits(['reload', 'after-delete']);
const {mobile} = useDisplay();
defineProps({
  model: {
    type: String as PropType<Models>,
    required: true,
  },
  page: {
    type: String as PropType<TablePage>,
    required: false,
    default: null
  },
  headers: {
    type: Array as PropType<header[]>,
    required: true,
  },
  has_delete: {
    type: Boolean,
    required: false,
    default: true,
  },
  show_link: {
    type: Boolean,
    required: false,
    default: false,
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