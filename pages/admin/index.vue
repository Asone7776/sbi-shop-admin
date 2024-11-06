<script setup lang="ts">
import ProfitExpanse from "@/components/dashboards/ProfitExpense.vue";
import TrafficDistribution from "@/components/dashboards/TrafficDistribution.vue";
import ProductSales from "@/components/dashboards/ProductSales.vue";
import TopPayingClients from "@/components/dashboards/TopPayingClients.vue";
</script>

<template>
    <v-row>
        <v-col cols="12" sm="12" lg="8">
            <ProfitExpanse />
        </v-col>
        <v-col cols="12" sm="12" lg="4">
            <div class="mb-6">
                <TrafficDistribution/>
            </div>
            <div>
                <ProductSales/>
            </div>
        </v-col>
        <v-col cols="12">
            <TopPayingClients/>
        </v-col>
    </v-row>
</template>