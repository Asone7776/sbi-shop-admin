export default defineNuxtRouteMiddleware((to, from) => {
    const {token} = useToken();
    const localePath = useLocalePath();
    // for test case
    if (token.value) {
        return navigateTo(localePath('admin'));
    }
});
