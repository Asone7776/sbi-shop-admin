<template>
  <NuxtLayout name="404">
    <v-theme-provider>
      <div class="not_found_card">
        <v-empty-state title="" image="/images/teamwork.png">
          <template v-slot:text>
            <div class="text-h4 mt-5">
              {{ error?.statusCode ? `Ошибка - ${error?.statusCode}` : 'Страница не найдена' }}
            </div>
          </template>
          <template v-slot:actions>
            <v-btn class="mt-2" color="success" @click="handleError">
              На главную
            </v-btn>
          </template>
        </v-empty-state>
      </div>
    </v-theme-provider>
  </NuxtLayout>
</template>
<script setup lang="ts">
import type {NuxtError} from '#app'

defineProps({
  error: Object as () => NuxtError
})

const handleError = () => clearError({redirect: '/'})
</script>
<style scoped lang="scss">
.not_found_card {
  height: 100vh;
}
</style>