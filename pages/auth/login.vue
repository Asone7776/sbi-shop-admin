<template>
  <div class="authentication">
    <v-container fluid class="pa-3">
      <v-row class="h-100vh d-flex justify-center align-center">
        <v-col cols="12" class="d-flex align-center">
          <v-card rounded="xl" elevation="10" class="px-sm-1 px-0 mx-auto index-2" max-width="450">
            <v-card-item class="pa-sm-8">
              <div class="justify-center">
                <LayoutFullLogoDark/>
              </div>
              <AuthLoginForm/>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "blank",
  middleware: "guest",
});
</script>
