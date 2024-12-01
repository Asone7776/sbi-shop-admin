<template>
  <div>
    <v-btn
        variant="flat"
        density="comfortable"
        color="error"
        icon="mdi-delete"
        @click="confirm_is_open=true"
    />
    <crud-modal-confirm
        v-model="confirm_is_open"
        v-on:confirm-action="onConfirm"
    />
  </div>
</template>
<script setup lang="ts">
import {Models} from "~/types/models";
import {useModelApi} from "~/composables/useModelApi";

const {modelDestroy} = useModelApi();
const props = defineProps({
  model: {
    type: String as PropType<Models>,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  }
});
const emits = defineEmits(['reload']);
const confirm_is_open = ref(false);

const onConfirm = async () => {
  confirm_is_open.value = false;
  await modelDestroy(props.model, props.id);
  emits('reload');
}
</script>