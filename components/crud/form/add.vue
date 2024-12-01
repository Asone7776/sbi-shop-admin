<template>
  <v-card-text>
    <pre>{{ item }}</pre>
    <v-form ref="form" validate-on="submit lazy" @submit.prevent>
      <crud-fields
          :form_fields="form_fields"
          v-model="item"
          :loading="loading"
          :item="item"
          :model="model"
          @make-submit="submit"
      />
    </v-form>
  </v-card-text>
  <v-divider></v-divider>

  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn
        :loading="loading"
        :disabled="loading"
        size="large"
        variant="flat"
        color="primary"
        @click="submit"
    >{{ $t("words.send") }}
    </v-btn>
  </v-card-actions>
</template>

<script setup lang="ts">
import {Models} from "~/types/models.js";
import {useModelApi} from "~/composables/useModelApi";
import type {FormFields} from "~/types/form";

const {modelStore} = useModelApi();

const form = ref();
const emits = defineEmits(['refresh']);
const item = ref({});
const app = useNuxtApp();

const props = defineProps({
  page: {
    type: String,
    default: "",
  },
  model: {
    type: String as PropType<Models>,
    required: true,
  },
  form_fields: {
    type: Array as PropType<FormFields>,
    default: () => [],
  },
  additional_data: {
    type: Object,
    required: false,
    default: {},
  },
  open_edit_after_add: {
    type: Boolean,
    required: false,
    default: true,
  },
});
const {data, execute, status} = await modelStore(props.model, props.form_fields, item.value, {
  immediate: false,
  watch: false,
});
const loading = computed(() => {
  return status.value === 'pending';
})

const submit = async () => {
  const {valid} = await form.value.validate();
  if (valid) {
    await execute();
    emits('refresh');

  }
  // if (data) {
  //   if (data.id) {
  //     item.value = data;
  //   } else if (data.data) {
  //     item.value = data.data;
  //   }
  //
  //   if (props.page && item.value && props.open_edit_after_add) {
  //     app.$cardOpen(props.page, item.value.id, {
  //       id_num: item.value?.id_num,
  //     });
  //   }
  // }
};
</script>
