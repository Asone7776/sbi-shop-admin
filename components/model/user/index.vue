<template>
  <list v-bind="model"/>
</template>
<script setup lang="ts">
import {type ListProps} from "~/types/list";
import {Models} from "~/types/models";
import {FieldTypes} from "~/types/form";
import {TablePage} from "~/types/table";

const model = reactive<ListProps>({
  model: Models.user,
  has_search: true,
  has_add: true,
  table: {
    has_delete: false,
    show_link: true,
    page: TablePage.ModelUser,
    headers: [
      {
        title: 'ID',
        align: "start",
        sortable: false,
        key: 'id',
        width: '0'
      },
      {
        title: 'Имя',
        align: "start",
        sortable: false,
        key: 'first_name',
      },
      {
        title: 'Фамилия',
        align: 'start',
        sortable: false,
        key: 'last_name',
      },
      {
        title: 'Отчество',
        align: 'start',
        sortable: false,
        key: 'middle_name',
      },
      {
        title: 'Email',
        align: 'start',
        sortable: false,
        key: 'email',
      },
      {
        title: 'Роль',
        align: 'start',
        sortable: false,
        key: 'role',
      },
      {
        title: '',
        align: 'end',
        sortable: false,
        key: 'actions',
      },
    ],
    pagination_options: [1, 5, 10],
  },
  form_fields: [
    {
      type: FieldTypes.text,
      key: 'first_name',
      attributes: {
        label: "words.fields.first_name",
      },
      sizes: {
        cols: 12,
        sm: 6,
      }
    },
    {
      type: FieldTypes.text,
      key: 'last_name',
      attributes: {
        label: "words.fields.last_name",
      },
      sizes: {
        cols: 12,
        sm: 6,
      }
    },
  ]
});
</script>
