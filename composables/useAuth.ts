export const useAuth = () => {
    const {$api, $localePath} = useNuxtApp();
    const {token} = useToken();
    const loading = ref<boolean>(false);
    const profileStore = useProfileStore();
    const {profile} = storeToRefs(profileStore);
    const {setProfile} = profileStore;
    const app = useNuxtApp();

    const clearProfileAll = () => {
        token.value = null;
        setProfile(null);
    };

    const signOut = () => {
        clearProfileAll();
        return navigateTo(app.$localePath("/auth/login"));
    };

    const signIn = async (body: any) => {
        loading.value = true;
        try {
            const {data} = await $api('/auth/sign-in', {
                method: 'POST',
                body: {
                    ...body,
                },
            });
            if (data) {
                await getProfileMe(data);
                navigateTo("/admin");
            }
        } catch (error: any) {
            if (error.data && error.data.message) {
                exceptionMessage(error.data);
            }
        } finally {
            loading.value = false;
        }
    };

    const getProfileMe = async (data?: any) => {
        if (!data) {
            if (token.value) {
                try {
                    const {data: user} = await $api("/auth/me");
                    if (user) {
                        setProfile(user);
                    }
                } catch (error: any) {
                    if (error.data && error.data.message) {
                        exceptionMessage(error.data);
                    }
                }
            }
        } else {
            if (data?.access_token) {
                const {access_token} = data;
                token.value = access_token;
                delete data.access_token;
                delete data.expires;
                setProfile(data);
            }
        }
    };

    // const updateProfileDetails = async (data: UpdateUser) => {
    //     updateLoading.value = true;
    //     const { data: user, error } = await useMakeRequest<
    //         SuccessUserUpdate,
    //         ErrorResponse
    //     >(true, "/main/users", "update-details", "PUT", data);
    //     if (user.value) {
    //         updateLoading.value = false;
    //         setProfile(user.value.data);
    //         successMessage("Профиль обновлён");
    //     }
    //     if (error.value) {
    //         updateLoading.value = false;
    //         if (error.value.data && error.value.data.message) {
    //             exceptionMessage(error.value.data);
    //         }
    //     }
    // };

    return {
        loading,
        profile,
        getProfileMe,
        signOut,
        signIn,
        clearProfileAll,
    };
};
