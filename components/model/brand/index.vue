<template>
  <list v-bind="model"/>
</template>
<script setup lang="ts">
import {type ListProps} from "~/types/list";
import {Models} from "~/types/models";

const model = reactive<ListProps>({
  model: Models.brand,
  has_search: true,
  has_add: true,
  table: {
    headers: [
      {
        title: 'Название',
        align: 'start',
        sortable: false,
        key: 'name',
      },
      {
        title: 'Описание',
        align: 'start',
        sortable: false,
        key: 'description',
      },
    ],
  }
});
</script>
