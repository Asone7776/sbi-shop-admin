import vuetify, {transformAssetUrls} from 'vite-plugin-vuetify'

export default defineNuxtConfig({
    ssr: true,
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},
    spaLoadingTemplate: 'spa-loading-template.html',
    routeRules: {
        "/": {
            redirect: "/admin",
        },
        '/api/**': {
            proxy: {to: "http://localhost:8888/api/**",},
        }
    },
    app: {
        head: {
            title: "SBI-ADMIN-SHOP",
        },
    },
    css: ['vue3-toastify/dist/index.css', '~/assets/scss/style.scss'],
    runtimeConfig: {
        public: {
            baseURL: process.env.BASE_URL || "http://localhost:8888/api/",
            SOCKET_SERVER: process.env.SOCKET_SERVER,
        },
    },
    build: {
        transpile: ['vuetify'],
    },
    components: {
        dirs: [
            {
                path: "~/components",
                global: true,
            },
        ],
    },
    nitro: {
        serveStatic: true,
    },
    sourcemap: {server: false, client: false},
    devServerHandlers: [],
    modules: ["@nuxtjs/i18n", '@pinia/nuxt',
        (_options, nuxt) => {
            nuxt.hooks.hook('vite:extendConfig', (config) => {
                // @ts-expect-error
                config.plugins.push(vuetify({autoImport: true}))
            })
        },
    ],
    vite: {
        vue: {
            template: {
                transformAssetUrls: {
                    ...transformAssetUrls,
                    'v-img': ['src']
                },
            },
        },
    },
    i18n: {
        locales: [
            {code: "en", file: "en.ts", name: "English"},
            {code: "ru", file: "ru.ts", name: "Русский"},
            {code: "uz", file: "uz.ts", name: "Uzbek"},
        ],
        lazy: true,
        langDir: 'lang',
        defaultLocale: 'ru'
    }
})