import type {UseFetchOptions} from 'nuxt/app'

export function useAPI<T>(
    url: string | (() => string),
    options?: UseFetchOptions<T>,
) {
    return useLazyFetch(url, {
        ...options,
        $fetch: useNuxtApp().$api,
        onResponseError: async (context) => {
            if (context.response.status === 401) {
                useNuxtApp().$signOut();
            }

            setTimeout(() => {
                exceptionMessage(context.response._data)
            }, 100);
        },
    })
}
