// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import VueTablerIcons from "vue-tabler-icons";
import PerfectScrollbar from "vue3-perfect-scrollbar";
import {createVuetify} from 'vuetify'
import {
    BLUE_THEME,
} from "@/theme/LightTheme";

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        ssr: true,
        theme: {
            defaultTheme: "BLUE_THEME",
            themes: {
                BLUE_THEME,
            },
        },
        defaults: {
            VCard: {
                rounded: "xl",
            },
            VTextField: {
                variant: "outlined",
                density: "comfortable",
                color: "primary",
            },
            VTextarea: {
                variant: "outlined",
                density: "comfortable",
                color: "primary",
            },
            VSelect: {
                variant: "outlined",
                density: "comfortable",
                color: "primary",
            },
            VListItem: {
                minHeight: "45px",
            },
            VTooltip: {
                location: "top",
            },
        },
    })
    app.vueApp.use(vuetify)
    app.vueApp.use(VueTablerIcons)
    app.vueApp.use(PerfectScrollbar)
})