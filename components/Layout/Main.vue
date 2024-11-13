<template>
  <div>
    <v-app-bar flat prominent name="app-bar" class="px-4" color="primary" density="default">
      <v-app-bar-nav-icon :active="sDrawer" @click="sDrawer = !sDrawer"/>
    </v-app-bar>
    <v-navigation-drawer v-model="sDrawer"
                         left
                         floating
                         permanent
    >
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
        <div class="pa-2">
          <v-btn @click.prevent="signOut" block variant="flat" color="primary" append-icon="mdi-exit-run">
            Exit
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>
<script setup lang="ts">
const {signOut} = useAuth();
import {ref, shallowRef} from 'vue';
import sidebarItems from '@/components/Layout/Full/vertical-sidebar/sidebarItem';

const sidebarMenu = shallowRef(sidebarItems);
const sDrawer = ref(true);

</script>
