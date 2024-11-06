export const useToken = () => {
    const token = useCookie("token");
    return {
        token,
    };
};
