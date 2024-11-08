<template>
  <table-crud v-bind="{...props.table,...default_data}" @reload=""/>
</template>
<script setup lang="ts">
import type {PaginatedResult} from "~/types/list";
import type {TableProps} from "~/types/table";
import {Models} from "~/types/models";
import {useModelApi} from "~/composables/useModelApi";

const {modelIndex} = useModelApi();

let default_data = reactive<PaginatedResult<typeof props.model>>({
  data: [],
  meta: {
    total: 0,
    lastPage: 0,
    currentPage: 1,
    perPage: 10,
    prev: null,
    next: null
  }
});
const props = defineProps({
  model: {
    type: String as PropType<Models>,
    required: true,
  },
  table: {
    type: Object as PropType<TableProps>,
    required: true,
  }
})
const onReload = async () => {
  const {data, meta} = await modelIndex(props.model);
  if (data) {
    default_data.data = data;
  }
  if (meta) {
    default_data.meta = meta;
  }
}
await onReload();
</script>