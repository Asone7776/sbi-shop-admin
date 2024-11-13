<template>
  <table-crud v-bind="{...props.table,total:data?.meta?.total,query}" :loading="loading" :data="data?.data"
              @reload="updateRoute">
    <template v-slot:top>
      <list-components-toolbar :title="currentModelTitle(props.model)">
        <template #actions>
          <v-btn-group class="mr-5" divided>
            <crud-modal-add v-if="has_add" @refresh="refresh"/>
            <v-btn v-if="has_refresh"  icon="mdi-refresh" @click.prevent="refresh"/>
          </v-btn-group>
        </template>
      </list-components-toolbar>
    </template>
  </table-crud>
</template>
<script setup lang="ts">
import type {TableProps} from "~/types/table";
import {Models} from "~/types/models";
import type {FormFields} from "~/types/form";
import {useModelApi} from "~/composables/useModelApi";

const router = useRouter();
const route = useRoute();
const {modelIndex, currentModelTitle} = useModelApi();

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
    default: true
  },
  has_refresh: {
    type: Boolean,
    required: false,
    default: true
  },
  form_fields: {
    type: Array as PropType<FormFields>,
    required: false,
    default: []
  }
});

const query = reactive<any>({
  page: route.query?.page ? Number(route.query?.page) : 1,
  perPage: route.query?.perPage ? Number(route.query?.perPage) : 10,
  ...props.params,
});

const {data, refresh, status} = await modelIndex(props.model, query);
const loading = computed(() => {
  return status.value === 'pending';
});
const updateRoute = (data: any) => {
  query.page = data?.page;
  query.perPage = data?.itemsPerPage;
  router.push({query});
};
</script>