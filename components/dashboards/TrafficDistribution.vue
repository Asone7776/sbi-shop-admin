<script setup lang="ts">
import {useTheme} from 'vuetify';

const theme = useTheme();
</script>
<template>
  <v-card elevation="10" class="withbg pa-3 h-100">
    <v-card-item>
      <div class="d-sm-flex align-center justify-space-between pt-sm-2">
        <v-card-title class="text-h5">Traffic Distribution</v-card-title>
      </div>
      <v-row>
        <v-col cols="6" sm="7">
          <div class="mt-6">
            <h3 class="text-h4">$36,358</h3>
            <div class="mt-2">
              <v-avatar class="bg-lightsuccess text-success" size="20">
                <ArrowUpLeftIcon size="15"/>
              </v-avatar>
              <span class="text-subtitle-2 ml-2 font-weight-bold">+9%</span>
              <span class="text-subtitle-2 text-muted ml-2">last year</span>
            </div>
            <div class="d-flex align-center mt-4 ml-1">
              <h6 class="text-subtitle-2 text-muted">
                <v-icon icon="mdi mdi-checkbox-blank-circle" class="mr-1" size="10"
                        color="primary"></v-icon>
                Oragnic
              </h6>
              <h6 class="text-subtitle-2 text-muted pl-5">
                <v-icon icon="mdi mdi-checkbox-blank-circle" class="mr-1" size="10" color="error"></v-icon>
                Refferal
              </h6>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card-item>
  </v-card>
</template>