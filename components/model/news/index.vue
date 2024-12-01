<template>
  <list v-bind="model"/>
</template>
<script setup lang="ts">
import {type ListProps} from "~/types/list";
import {Models} from "~/types/models";
import {FieldTypes} from "~/types/form";
import {TablePage} from "~/types/table";

const model = reactive<ListProps>({
  model: Models.news,
  has_search: true,
  has_add: true,
  table: {
    show_link: true,
    page: TablePage.ModelNews,
    headers: [
      {
        title: 'ID',
        align: 'start',
        sortable: false,
        key: 'id',
        width: '0'
      },
      {
        title: 'Название',
        align: 'start',
        sortable: false,
        key: 'title',
      },
      {
        title: '',
        align: 'end',
        sortable: false,
        key: 'actions',
      },
    ],
  },
  form_fields: [
    {
      key: 'title',
      type: FieldTypes.text,
      attributes: {
        label: "Название",
      },
      sizes: {
        cols: 12,
      }
    }, {
      key: 'content',
      type: FieldTypes.textarea,
      attributes: {
        label: "Контент",
      },
      sizes: {
        cols: 12,
      }
    }
  ]
});
</script>
