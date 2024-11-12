<template>
  <table-crud v-bind="{...props.table,meta:data?.meta,query}" :data="data?.data" @reload="updateRoute"/>
</template>
<script setup lang="ts">
import type {TableProps} from "~/types/table";
import {Models} from "~/types/models";
import {useModelApi} from "~/composables/useModelApi";

const router = useRouter();
const route = useRoute();
const {modelIndex} = useModelApi();

const props = defineProps({
  model: {
    type: String as PropType<Models>,
    required: true,
  },
  table: {
    type: Object as PropType<TableProps>,
    required: true,
  },
  params: {
    type: Object as PropType<any>,
    required: false,
    default: {}
  },
  has_search: {
    type: Boolean,
    required: false,
    default: false
  },
  has_add: {
    type: Boolean,
    required: false,
    default: false
  },
});

const query = reactive<any>({
  page: route.query?.page ? Number(route.query?.page) : 1,
  perPage: route.query?.perPage ? Number(route.query?.perPage) : 10,
  ...props.params,
});

const {data} = await modelIndex(props.model, query);

const updateRoute = (data: any) => {
  query.page = data?.page;
  query.perPage = data?.itemsPerPage;
  router.push({query});
};
</script>