import type {TablePage} from "~/types/table";

interface CardItem {
    title: string;
    value?: number | string;
    component: string;
    permissions: string[];
}

export interface QueryCard {
    value?: string;
    name: string;
    active_tab: number;
    data: Record<string, any>;
}

type CardData = Record<TablePage, CardItem>;

export default defineNuxtPlugin(() => {
    const cardList: CardData = {
        ModelBrand: {
            title: "Бренд",
            value: undefined,
            component: "ModelBrandCard",
            permissions: [],
        },
        ModelUser: {
            title: "Пользователь",
            value: undefined,
            component: "ModelUserCard",
            permissions: [],
        },
        ModelNews: {
            title: "Новость",
            value: undefined,
            component: "ModelNewsCard",
            permissions: [],
        },
    };

    const parseQueryCards = (query: Record<string, any>): QueryCard[] => {
        try {
            const _card = decodeURIComponent(query._card || "[]");
            return JSON.parse(_card) || [];
        } catch {
            return [];
        }
    };

    const updateQueryCards = (router: any, cards: QueryCard[]) => {
        const query = {...router.currentRoute.value.query};
        if (cards.length) {
            query["_card"] = encodeURIComponent(JSON.stringify(cards));
        } else {
            delete query["_card"];
        }
        router.replace({query});
    };

    const cardOpen = (card: TablePage, id?: string, data: Record<string, any> = {}) => {
        const router = useRouter();
        if (!cardList[card]) return false;

        const active_tab = getCurrentActiveTabByCardName(card);
        let cards = parseQueryCards(router.currentRoute.value.query);

        if (cards.some(c => c.name === card && c.value === id)) return false;

        cards = cards.filter(c => c.name !== card || c.value !== id);

        cards.unshift({
            ...cardList[card],
            value: id,
            name: card,
            active_tab,
            data,
        });

        updateQueryCards(router, cards);
    };

    const cardOpenedList = (): QueryCard[] => {
        const router = useRouter();
        return parseQueryCards(router.currentRoute.value.query);
    };

    const cardClose = (card: TablePage, id: string | null): void => {
        const router = useRouter();
        let cards = parseQueryCards(router.currentRoute.value.query);
        cards = cards.filter(c => !(c.name === card && c.value === id));
        updateQueryCards(router, cards);
    };

    const findAndChangeCardTab = (card_name: TablePage, active_tab: number = 0) => {
        const router = useRouter();
        let cards = parseQueryCards(router.currentRoute.value.query);

        cards = cards.map(card => {
            if (card.name === card_name) card.active_tab = active_tab;
            return card;
        });

        updateQueryCards(router, cards);
    };

    const findAndChangeCardParams = (card_name: TablePage, params: any) => {
        const router = useRouter();
        let cards = parseQueryCards(router.currentRoute.value.query);

        cards = cards.map(card => {
            if (card.name === card_name) card.data = params;
            return card;
        });

        updateQueryCards(router, cards);
    };

    const getCurrentActiveTabByCardName = (card_name: TablePage): number => {
        const router = useRouter();
        const cards = parseQueryCards(router.currentRoute.value.query);
        return cards.find(card => card.name === card_name)?.active_tab || 0;
    };

    const closeAllCards = () => {
        const router = useRouter();
        updateQueryCards(router, []);
    };

    return {
        provide: {
            cardOpen,
            cardClose,
            cardList,
            cardOpenedList,
            findAndChangeCardTab,
            getCurrentActiveTabByCardName,
            findAndChangeCardParams,
            closeAllCards
        },
    };
});
