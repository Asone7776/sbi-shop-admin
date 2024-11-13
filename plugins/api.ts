export default defineNuxtPlugin((nuxtApp) => {
    const profileStore = useProfileStore();
    const app = useNuxtApp();
    const {token} = useToken();
    const {setProfile} = profileStore;
    const clearProfileAll = () => {
        token.value = null;
        setProfile(null);
    };
    const signOut = () => {
        clearProfileAll();
        navigateTo(app.$localePath("/auth/login"));
    };
    const api = $fetch.create({
        baseURL: nuxtApp.$config.public.baseURL,
        onRequest({request, options, error}) {
            const {token} = useToken();
            if (token.value) {
                const headers = options.headers ||= {}
                if (Array.isArray(headers)) {
                    headers.push(['Authorization', `Bearer ${token.value}`])
                } else if (headers instanceof Headers) {
                    headers.set('Authorization', `Bearer ${token.value}`)
                } else {
                    headers.Authorization = `Bearer ${token.value}`
                }
            }
            // headers['ori']
        },
    })
    return {
        provide: {
            api,
            signOut
        }
    }
})
