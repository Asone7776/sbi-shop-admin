<template>
  <table-crud v-bind="{...props.table, total: data?.meta?.total, query, model: model}" :loading="loading"
              :data="data?.data"
              @reload="updateRoute" @after-delete="refresh">
    <template v-slot:top>
      <list-components-toolbar :title="currentModelTitle(props.model)">
        <template #actions>
          <v-btn-group class="mr-5" divided>
            <crud-modal-add v-if="has_add" :model="model" :form_fields="form_fields"
                            :open_edit_after_add="open_edit_after_add" @refresh="refresh"/>
            <v-btn v-if="has_refresh" icon="mdi-refresh" @click.prevent="refresh"/>
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
    type: Object as PropType<Record<string, any>>,
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
  open_edit_after_add: {
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
  ...route.query,
  page: route.query?.page ? Number(route.query?.page) : 1,
  perPage: route.query?.perPage ? Number(route.query?.perPage) : 10,
  ...props?.params,
});

const filteredQuery = computed(() => {
  const {_card, ...rest} = query;
  return rest;
});

const {data, refresh, status} = await modelIndex(props.model, filteredQuery);

const loading = computed(() => {
  return status.value === 'pending';
});

const save_or_clear_cards = () => {
  if (router.currentRoute.value.query['_card']) {
    query['_card'] = router.currentRoute.value.query['_card'];
  } else {
    delete query['_card'];
  }
}
const updateRoute = (data: any) => {
  query.page = data?.page;
  query.perPage = data?.itemsPerPage;
  save_or_clear_cards();
  router.push({query});
};
</script>


