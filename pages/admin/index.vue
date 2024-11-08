<script setup lang="ts">
import TrafficDistribution from "@/components/dashboards/TrafficDistribution.vue";
import ProductSales from "@/components/dashboards/ProductSales.vue";
import TopPayingClients from "@/components/dashboards/TopPayingClients.vue";
</script>

<template>
  <v-row>
    <v-col cols="12" sm="12" lg="6">
      <TrafficDistribution/>
    </v-col>
    <v-col cols="12" sm="12" lg="6">
      <ProductSales/>
    </v-col>
    <v-col cols="12">
      <TopPayingClients/>
    </v-col>
  </v-row>
</template>