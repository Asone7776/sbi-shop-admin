<template>
  <list v-bind="model"/>
</template>
<script setup lang="ts">
import {type ListProps} from "~/types/list";
import {Models} from "~/types/models";

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
    ]
  },
  // params: {
  //   page: 1,
  //   perPage: 2,
  // }
  // headers: [
  //   {
  //     title: "",
  //     key: "id",
  //     sortable: false,
  //     width: "0",
  //     label: t("words.constants.details"),
  //   },
  //   {title: t("Имя"), key: "first_name", sortable: false},
  //   {title: t("Фамилия"), key: "last_name", sortable: false},
  //   {title: t("Email"), key: "email", sortable: false},
  //   {
  //     title: "",
  //     key: "actions",
  //     sortable: false,
  //     align: "end",
  //     width: "150px",
  //   },
  // ],
  // attributes: {
  //   itemTitle: "title",
  // },
  // formFields: [
  //   {
  //     key: "first_name",
  //     attributes: {
  //       label: t("words.fields.first_name"),
  //     },
  //     type: 'text',
  //     // rules: [requiredRule(t("rules.required"))],
  //     sizes: {
  //       cols: 12,
  //       sm: 6,
  //     },
  //   },
  //   {
  //     key: "last_name",
  //     attributes: {
  //       label: t("words.fields.last_name"),
  //     },
  //     type: 'text',
  //     // rules: [requiredRule(t("rules.required"))],
  //     sizes: {
  //       cols: 12,
  //       sm: 6,
  //     },
  //   },
  //   {
  //     key: "middle_name",
  //     attributes: {
  //       label: t("words.fields.middle_name"),
  //     },
  //     type: 'text',
  //     sizes: {
  //       cols: 12,
  //       sm: 6,
  //     },
  //   },
  //   {
  //     key: "password",
  //     attributes: {
  //       label: t("words.password"),
  //     },
  //     type: 'text',
  //     // rules: [requiredRule(t("rules.required"))],
  //     sizes: {
  //       cols: 12,
  //       sm: 6,
  //     },
  //   },
  //   {
  //     key: "phone",
  //     attributes: {
  //       disabled_prefix: true,
  //     },
  //     type: "phone-prefix",
  //     sizes: {
  //       cols: 12,
  //       sm: 6,
  //     },
  //   },
  //   {
  //     key: "email",
  //     attributes: {
  //       label: t("words.fields.email"),
  //     },
  //     type: 'text',
  //     sizes: {
  //       cols: 12,
  //       sm: 6,
  //     },
  //   },
  //   {
  //     key: "birth_date",
  //
  //     type: 'date',
  //     attributes: {
  //       max: "2999-12-31",
  //       label: t("words.fields.birth_date"),
  //     },
  //     sizes: {
  //       cols: 12,
  //       sm: 6,
  //     },
  //   },
  //   {
  //     key: "status",
  //     attributes: {
  //       label: t("words.fields.activity"),
  //     },
  //     type: 'checkbox',
  //     sizes: {
  //       cols: 12,
  //       md: 3,
  //       sm: 6,
  //     },
  //   },
  // ],
});
</script>
