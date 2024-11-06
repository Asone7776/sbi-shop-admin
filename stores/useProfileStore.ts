export const useProfileStore = defineStore("profile", () => {
    const profile = ref<any | null>(null);
    const setProfile = (userData: any) => {
        profile.value = userData;
    };
    const getProfile = () => {
        return profile.value;
    };
    return {
        profile,
        setProfile,
        getProfile,
    };
});