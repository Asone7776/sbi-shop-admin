import {
    UsersIcon
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
    // {header: 'ui'},
    {
        title: "Пользователи",
        icon: UsersIcon,
        to: "/admin/users",

    },
    {
        title: "Бренды",
        icon: UsersIcon,
        to: "/admin/brands",

    },

];

export default sidebarItem;
  