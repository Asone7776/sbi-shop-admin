import {useTheme} from "vuetify";

export const useThemeMode = () => {
    const theme = useTheme();
    const currentMode = useCookie("theme-mode");
    const themeSwitchPosition = computed(() => {
        return theme.global.name.value === 'myCustomDarkTheme';
    });
    const setThemeModeFromStorage = () => {
        theme.global.name.value =
            currentMode != undefined && currentMode.value
                ? currentMode.value
                : 'myCustomLightTheme'
    };
    const toggleTheme = () => {
        theme.global.name.value = theme.global.name.value === 'myCustomDarkTheme' ? 'myCustomLightTheme' : 'myCustomDarkTheme';
        currentMode.value = theme.global.name.value;
    };

    const computedValue = computed<any>({
        get() {
            return theme.global.name.value !== 'myCustomDarkTheme';
        },
        set() {
            toggleTheme();
        },
    });

    return {
        theme,
        setThemeModeFromStorage,
        toggleTheme,
        themeSwitchPosition,
        computedValue
    };
};
