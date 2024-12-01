<template>
  <v-locale-provider>
    <v-app>
      <Page/>
      <LayoutMain/>
      <v-main>
        <v-container fluid class="page-wrapper bg-background px-sm-5 px-4 rounded-lg">
          <slot/>
        </v-container>
      </v-main>
    </v-app>
  </v-locale-provider>
</template>
<script setup>
const {setProfile} = useProfileStore();
const {data} = await useAPI('/auth/me');
if (data.value) {
  setProfile(data.value);
}
</script>