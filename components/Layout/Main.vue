<template>
  <v-navigation-drawer floating left v-model="sDrawer" app class="leftSidebar ml-sm-5 mt-sm-5 bg-containerBg"
                       elevation="10"
                       width="270">
    <div class="pa-5 pl-4 ">
      <LayoutFullLogoDark/>
    </div>
    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <perfect-scrollbar class="scrollnavbar bg-containerBg overflow-y-hidden">
      <v-list class="py-4 px-4 bg-containerBg">
        <!---Menu Loop -->
        <template v-for="(item, i) in sidebarMenu">
          <!---Item Sub Header -->
          <LayoutFullVerticalSidebarNavGroup :item="item" v-if="item.header" :key="item.title"/>
          <!---Single Item-->
          <LayoutFullVerticalSidebarNavItem :item="item" v-else class="leftPadding"/>
          <!---End Single Item-->
        </template>
      </v-list>
    </perfect-scrollbar>
    <template v-slot:append>
      <v-btn @click.prevent="signOut" block variant="flat" color="primary" append-icon="mdi-exit-run">
        Exit
      </v-btn>
    </template>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
const {profile, signOut} = useAuth();
import {ref, shallowRef} from 'vue';
import sidebarItems from '@/components/Layout/Full/vertical-sidebar/sidebarItem';

const sidebarMenu = shallowRef(sidebarItems);
const sDrawer = ref(true);

</script>
