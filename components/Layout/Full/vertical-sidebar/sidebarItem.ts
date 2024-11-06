import {
    LayoutDashboardIcon, BorderAllIcon,
    AlertCircleIcon,
    CircleDotIcon,
    BoxMultiple1Icon,
    LoginIcon, MoodHappyIcon, ApertureIcon, UserPlusIcon
} from 'vue-tabler-icons';

export interface menu {
    header?: string;
    title?: string;
    icon?: any;
    to?: string;
    chip?: string;
    BgColor?: string;
    chipBgColor?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: menu[];
    disabled?: boolean;
    type?: string;
    subCaption?: string;
}

const sidebarItem: menu[] = [
    {header: 'ui'},
    {
        title: "Alert",
        icon: AlertCircleIcon,
        to: "/admin/ui-components/alerts",

    },
    {
        title: "Button",
        icon: CircleDotIcon,
        to: "/admin/ui-components/buttons",
    },
    {
        title: "Cards",
        icon: BoxMultiple1Icon,
        to: "/admin/ui-components/cards",
    },
    {
        title: "Tables",
        icon: BorderAllIcon,
        to: "/admin/ui-components/tables",
    },

];

export default sidebarItem;
  