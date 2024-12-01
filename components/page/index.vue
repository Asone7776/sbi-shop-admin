<template>
  <v-navigation-drawer
      touchless
      floating
      temporary
      location="right"
      width="1300"
      v-model="menu"
  >
      <pre>
        {{ $cardOpenedList() }}
      </pre>
    <!--      <EntityNavParent-->
    <!--        v-if="$cardOpenedList().length > 0"-->
    <!--        :queries="$cardOpenedList()"-->
    <!--      />-->
  </v-navigation-drawer>
</template>
<script setup lang="ts">
const {$closeAllCards, $cardOpenedList} = useNuxtApp();
const opened = ref($cardOpenedList().length > 0);
const menu = computed({
  get() {
    return $cardOpenedList().length > 0;
  },
  set(value: boolean) {
    if (!value && opened.value) {
      $closeAllCards();
      opened.value = false;
    } else {
      opened.value = true;
    }
  },
});
</script>