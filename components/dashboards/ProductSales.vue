<script setup lang="ts">
</script>
<template>
    <v-card elevation="10" class="withbg h-100">
        <v-card-item class="pa-6">
            <div class="d-flex align-center justify-space-between pt-sm-2">
                <v-card-title class="text-h5">Product Sales</v-card-title>
                <v-btn  size="small" icon class="bg-error">
                    <v-avatar size="20" class="text-surface">
                        <CurrencyDollarIcon size="20" />
                    </v-avatar>
                </v-btn>
            </div>
            <v-row>
                <v-col cols="12">
                    <div class="mt-2">
                        <h3 class="text-h4">$6,820</h3>
                        <div class="mt-2">
                            <v-avatar class="bg-lighterror text-accent" size="20">
                                <ArrowDownRightIcon class="text-error" size="15" />
                            </v-avatar>
                            <span class="text-subtitle-1 ml-2 font-weight-bold">+9%</span>
                            <span class="text-subtitle-1 text-muted ml-2">last year</span>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-card-item>
    </v-card>
</template>
