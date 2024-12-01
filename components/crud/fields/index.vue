<template>
  <v-row>
    <template v-for="(field, key) in form_fields"
              :key="key"
    >
      <v-col
          :cols="field?.sizes?.cols"
          :md="field?.sizes?.md"
          :sm="field?.sizes?.sm"
          v-show="field.type !== FieldTypes.hidden && !field?.attributes?.is_hidden"
          :class="field?.attributes?.no_padding ? 'pa-0 pb-0' : 'pb-0'"
      >
        <component
            :is="`crud-fields-types-${field.type}`"
            :defaultValue="field?.defaultValue"
            v-model="computedValue[field.key]"
            :item="modelValue"
            :model="field?.model"
            :object="field?.object"
            :params="field?.params"
            :mask="field?.mask"
            :items="field?.items"
            :localeKey="field?.localeKey"
            :autofocus="field?.autofocus"
            :rules="field?.attributes?.rules"
            :attributes="{
            ...field?.attributes,
            loading: loading,
            disabled: field?.attributes?.disabled
              ? field.attributes.disabled
              : loading,
          }"
            :location_brand_attributes="field?.location_brand_attributes"
            :location_attributes="field?.location_attributes"
            :key_for_location_id="field?.key_for_location_id"
            :custom_url="field?.custom_url"
            :send="send"
            :crud_model="model"
            @make-submit="$emit('make-submit')"
        />
      </v-col>
    </template>
  </v-row>
</template>

<script setup lang="ts">
import {FieldTypes, type FormFields} from "~/types/form";
import {Models} from "~/types/models";

const props = defineProps({
  send: {
    type: Function,
    required: false,
    default: () => {
    },
  },
  form_fields: {
    type: Array as PropType<FormFields>,
    required: true,
  },
  modelValue: {},
  loading: {
    type: Boolean,
    default: false,
  },
  model: {
    type: String as PropType<Models>,
    required: true,
  },
});
const emits = defineEmits(["update:modelValue", "make-submit"]);
const computedValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emits("update:modelValue", value);
  },
});
</script>
