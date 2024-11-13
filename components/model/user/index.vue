<template>
  <list v-bind="model"/>
</template>
<script setup lang="ts">
import {type ListProps} from "~/types/list";
import {Models} from "~/types/models";
import {FormTypes} from "~/types/form";

const model = reactive<ListProps>({
  model: Models.user,
  has_search: true,
  has_add: true,
  table: {
    headers: [
      {
        title: 'ID',
        align: "start",
        sortable: false,
        key: 'id',
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
    ],
    pagination_options: [1, 5, 10],
  },
  form_fields: [
    {
      type: FormTypes.text,
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
      type: FormTypes.text,
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
