<template>
  <v-dialog
      v-model="dialog"
      max-width="500px"
  >
    <template v-slot:activator="{ props }">
      <v-btn
          icon="mdi-plus"
          color="primary"
          v-bind="props"
      />
    </template>
    <v-card>
      <v-toolbar variant="flat" color="primary">
        <v-app-bar-nav-icon
            icon="mdi-arrow-left"
            @click="close"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <crud-form-add :form_fields="form_fields" :open_edit_after_add="open_edit_after_add" :model="model"
                       @refresh="onRefresh"/>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import type {FormFields} from "~/types/form";
import {Models} from "~/types/models";

const props = defineProps({
  title: {
    type: String as PropType<string>,
    required: false,
    default: "Создать новый элемент"
  },
  form_fields: {
    type: Array as PropType<FormFields>,
    required: false,
    default: []
  },
  model: {
    type: String as PropType<Models>,
    required: true,
  },
  open_edit_after_add: {
    type: Boolean,
    required: false,
    default: true
  },
});
const emits = defineEmits(['refresh']);
const dialog = ref(false);
const close = () => {
  dialog.value = false;
}
const onRefresh = () => {
  close();
  emits('refresh');
}
</script>