<template>
  <crud-form-update v-bind="itemInit" v-model="item" />
</template>
<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object as PropType<any>,
  },
});
const { t } = useI18n();
const item = ref({});
const itemInit = ref({
  id: props.data?.id,
  model: "users",
  infoFields: [
    { title: t("auth.full_name"), key: "full_name", sortable: false },
    { title: t("words.fields.first_name"), key: "first_name", sortable: false },
    { title: t("words.fields.last_name"), key: "last_name", sortable: false },
    { title: t("words.fields.phone"), key: "phone", sortable: false },
    { title: t("words.fields.birth_date"), key: "birth_date", sortable: false },
    { title: t("words.fields.email"), key: "email", sortable: false },
    { title: t("words.fields.activity"), key: "status", sortable: false },
  ],
  infoComponent: "table",
  formFields: [
    {
      key: "first_name",
      attributes: {
        label: t("words.fields.first_name"),
      },
      type: InputTypes.text,
      // rules: [requiredRule(t("rules.required"))],
      sizes: {
        cols: 12,
        sm: 6,
      },
    },
    {
      key: "last_name",
      attributes: {
        label: t("words.fields.last_name"),
      },
      type: InputTypes.text,
      // rules: [requiredRule(t("rules.required"))],
      sizes: {
        cols: 12,
        sm: 6,
      },
    },
    {
      key: "middle_name",
      attributes: {
        label: t("words.fields.middle_name"),
      },
      type: InputTypes.text,
      sizes: {
        cols: 12,
        sm: 6,
      },
    },
    {
      key: "password",
      attributes: {
        label: t("words.password"),
      },
      type: InputTypes.text,
      // rules: [requiredRule(t("rules.required"))],
      sizes: {
        cols: 12,
        sm: 6,
      },
    },
    {
      key: "email",
      attributes: {
        label: t("words.fields.email"),
      },
      type: InputTypes.text,
      sizes: {
        cols: 12,
        sm: 6,
      },
    },
    {
      key: "birth_date",

      type: InputTypes.date,
      attributes: {
        max: "2999-12-31",
        label: t("words.fields.birth_date"),
      },
      sizes: {
        cols: 12,
        sm: 6,
      },
    },
    {
      key: "status",
      attributes: {
        label: t("words.fields.activity"),
      },
      type: InputTypes.checkbox,
      sizes: {
        cols: 12,
        md: 3,
        sm: 6,
      },
    },
  ],
});
</script>
