<template>
  <v-dialog v-model="props.modelValue" transition="dialog-bottom-transition" width="auto">
    <v-card v-click-outside="closeModal">
      <v-toolbar density="comfortable">
        <v-spacer/>
        <v-btn icon="mdi-close" density="comfortable" size="large" variant="text" color="error" @click="closeModal"/>
      </v-toolbar>
      <v-card-text>
        {{ title ? title : defaultValue }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn density="comfortable" size="large" variant="flat" color="lime" @click="confirmActions">{{
            $t("words.yes")
          }}
        </v-btn>
        <v-btn density="comfortable" size="large" variant="flat" color="error" @click="closeModal">{{ $t("words.no") }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const {t} = useI18n();
const defaultValue = t('words.sureToDelete');
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
    required: true,
  },
  title: {
    type: String,
    required: false,
  }
});

const emits = defineEmits(["update:modelValue", "confirmAction"]);

const closeModal = () => {
  emits("update:modelValue", false);
};
const confirmActions = () => {
  emits("confirmAction");
  closeModal();
};
</script>

<style lang="scss">
.v-toolbar-title__placeholder {
  white-space: normal;
}
</style>