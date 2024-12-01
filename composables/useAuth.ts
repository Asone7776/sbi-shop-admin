import type {GetMeData, SignInData, UserData} from "~/types/user";

export const useAuth = () => {
    const {$api, $localePath} = useNuxtApp();
    const {token} = useToken();
    const loading = ref<boolean>(false);
    const profileStore = useProfileStore();
    const {profile} = storeToRefs(profileStore);
    const {setProfile} = profileStore;

    const clearProfileAll = () => {
        token.value = null;
        setProfile(null);
    };

    const signOut = () => {
        clearProfileAll();
        return navigateTo($localePath("/auth/login"));
    };

    const signIn = async (body: any) => {
        loading.value = true;
        try {
            const {data} = await $api<SignInData>('/auth/sign-in', {
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

    const getProfileMe = async (data?: UserData) => {
        if (!data) {
            if (token.value) {
                try {
                    const {data: user} = await $api<GetMeData>("/auth/me");
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
                setProfile(data);
            }
        }
    };


    return {
        loading,
        profile,
        getProfileMe,
        signOut,
        signIn,
        clearProfileAll,
    };
};
