import JsonFormData from "json-form-data";

interface ModelConfig {
    url: string;
    name: string;
}

export const useModelApi = () => {
    const models: Record<string, ModelConfig> = {
        media: {
            url: "/business/media",
            name: "Список медиа",
        },
        folder: {
            url: "/business/folders",
            name: "Системные файлы",
        },
        payment: {
            url: "/business/payments",
            name: "Методы платежей",
        },
        product_inventarisation_item: {
            url: "/business/product-inventarisation-items",
            name: "Методы платежей",
        },
        location: {
            url: "/business/locations",
            name: "Локации",
        },
        product_reprice_item: {
            url: "/business/product-reprice-items",
            name: "Переоценка товаров",
        },
        product_reprice_locations: {
            url: "/business/product-reprice-locations",
            name: "Локации переоценки",
        },
        product_price: {
            url: "/business/product_prices",
            name: "Цены на товары в локациях",
        },
        plan_group: {
            url: "/business/plan-groups",
            name: "Локации",
        },
        supplier: {
            url: "/business/suppliers",
            name: "Поставщики",
        },
        role: {
            url: "/business/roles",
            name: "Роли",
        },
        serial: {
            url: "/business/serials",
            name: "Серийные номера",
        },
        order_purchase: {
            url: "/business/order_purchases",
            name: "Покупки товаров",
        },
        product_category: {
            // url: "/business/product-categories",
            url: "https://ferma.api.dev.smartblax.uz/api/v1/business/product-categories",
            name: "Категории",
        },
        product: {
            url: "/business/products",
            name: "Товары",
        },
        label: {
            url: "/business/labels",
            name: "Свойства товаров",
        },
        field: {
            url: "/business/fields",
            name: "Поля свойств",
        },
        location_brand: {
            url: "/business/location-brands",
            name: "Бренды-локаций",
        },
        product_group: {
            url: "/business/product-groups",
            name: "Группы товаров",
        },
        cash_register: {
            url: "/business/cash-registers",
            name: "Кассы",
        },
        cash_shift: {
            url: "/business/integrations/cash-shifts",
            name: "Кассовые смены",
        },
        stickers: {
            url: "/business/stickers",
            name: "Шаблоны чека",
        },
        // TODO: users to user
        users: {
            url: "/business/users",
            name: "Сотрудники",
        },
        clients: {
            url: "/business/clients",
            name: "Клиенты",
        },
        client_actions: {
            url: "/business/clients/actions",
            name: "Действия клиента",
        },
        client_cards: {
            url: "/business/client-cards",
            name: "Карточки клиента",
        },
        integration_groups: {
            url: "/business/integrations/groups",
            name: "Группы интеграций",
        },
        integration_groups_items: {
            url: "/business/integrations/groups/items",
            name: "Вложенности группы интеграций",
        },
        confirm: {
            url: "/business/integrations/confirms",
            name: "Подтверждения",
        },
        colors: {
            url: "/business/colors",
            name: "Цвета",
        },
        integrations: {
            url: "/business/integrations",
            name: "Интеграции",
        },
        orders: {
            url: "/business/orders",
            name: "Заказы",
        },
        posts_main: {
            url: "/main/admin/posts",
            name: "Посты",
        },
        posts_show: {
            url: "/main/posts",
            name: "Посты",
        },
        product_brand: {
            url: "https://ferma.api.dev.smartblax.uz/api/v1/business/product-brands",
            name: "Бренды",
        },
        ticket_categories: {
            url: "/business/ticket_categories",
            name: "Категории тикетов",
        },
        global_category: {
            url: "/business/categories",
            name: "Категории",
        },
        condition: {
            url: "business/integrations/conditions",
            name: "Условия",
        },
        "confirm-request": {
            url: "/business/integrations/confirm-requests",
            name: "Подтверждения",
        },
        log: {
            url: "business/logs",
            name: "Логи",
        },
        record: {
            url: "business/data-io-records",
            name: "Загрузки",
        },
        download: {
            url: "business/data-io-records/my-list",
            name: "Мои загрузки",
        },
        stock: {
            url: "/business/stocks",
            name: "Сток",
        },
        stock_action: {
            url: "business/stocks/actions",
            name: "Движения стока",
        },
        product_price_report: {
            url: "business/report/product_price_reports",
            name: "Материальный отчёт",
        },
        access: {
            url: "/business/accesses",
            name: "Доступы",
        },
        bonus: {
            url: "business/users/bonuses",
            name: "Бонусы сотрудника",
        },
        import: {
            url: "business/product-imports",
            name: "Приход",
        },
        transfer: {
            url: "business/transfers",
            name: "Перемещение",
        },
        reprice: {
            url: "/business/product-reprices",
            name: "Переоценка",
        },
        order_purchase_report: {
            url: "/business/report/order_purchase_reports",
            name: "Реестр покупок ",
        },
        integration_model: {
            url: "/business/integration_models",
            name: "Интеграции акций",
        },
        product_import_item: {
            url: "business/product-import-items",
            name: "Товары в приходе",
        },
        sale_correction: {
            url: "business/order/corrections",
            name: "Коррекция продажи",
        },
        manual_actions: {
            url: "business/manual-actions",
            name: "Системные операции",
        },
    };
    const {$api} = useNuxtApp();
    const loading = ref(false);

    const modelIndex = async (
        model: string,
        params: Record<string, any> = {},
    ) => {
        return makeRequest(
            model,
            `modelIndex-${model}`,
            "GET",
            "",
            null,
            null,
            params,
        );
    };

    const modelShow = async (
        model: string,
        id: any = null,
        params: Record<string, any> = {},
    ) => {
        const response = await makeRequest(
            model,
            `modelShow-${model}`,
            "GET",
            `/${id}`,
            null,
            null,
            params,
        );
        return convertShow(model, response);
    };

    const convertShow = (model: string, data: any) => {
        if (model === "clients") {
            const media = data?.data?.media;
            const media_types =
                media &&
                Array.isArray(media) &&
                media.map((item) => item.collection_name);
            const custom_media: any = [];
            media.forEach((item: any) => {
                if (media_types.includes(item.collection_name)) {
                    custom_media[item.collection_name] = item && item.id ? [item] : [];
                }
            });
            data.data["media[passport_front]"] = custom_media["passport_front"];
            data.data["media[passport_back]"] = custom_media["passport_back"];
            data.data["media[passport_selfie]"] = custom_media["passport_selfie"];
        }
        if (model === "role") {
            data.data["permissions"] = data.data.permissions_ids;
            delete data.data.permissions_ids;
        }
        return data;
    };

    const modelDestroy = async (
        model: string,
        id: any = null,
        params: Record<string, any> = {},
    ) => {
        return makeRequest(
            model,
            `modelDestroy-${model}`,
            "DELETE",
            `/${id}`,
            null,
            null,
            params,
        );
    };

    const modelStore = async (
        model: string,
        fields: any[] = [],
        data: Record<string, any> = {},
        params: Record<string, any> = {},
    ) => {
        const body = JsonFormData(convertItem(fields, data), false);
        //const headers = { 'Content-Type': 'multipart/form-data' };
        const headers = {};

        return makeRequest(
            model,
            `modelStore-${model}`,
            "POST",
            "",
            body,
            headers,
            params,
        );
    };

    const modelUpdate = async (
        model: string,
        id: any,
        fields: any[] = [],
        data: Record<string, any> = {},
        params: Record<string, any> = {},
        _updateTime = true,
    ) => {
        const body = JsonFormData(convertItem(fields, data, model));
        body.append("_method", "PUT");
        // const headers = { 'Content-Type': 'multipart/form-data' };
        const headers = {};

        return makeRequest(
            model,
            `modelUpdate-${model}`,
            "POST",
            `/${id}`,
            body,
            headers,
            params,
        );
    };
    const convertItem = (
        fields: any[] = [],
        data: Record<string, any> = {},
        model?: string
    ): Record<string, any> => {
        const updateData: Record<string, any> = {...data};
        fields.forEach((field) => {
            if (field?.type === "location-brand-location") {
                updateData["location_brand_id"] = updateData["location_brand_id"]
                    ? updateData["location_brand_id"].id
                    : undefined;
                updateData["location_id"] = updateData["location_id"]
                    ? updateData["location_id"].id
                    : undefined;
                updateData["locations"] =
                    updateData["locations[]"] && updateData["locations[]"].length > 0
                        ? updateData["locations[]"].map((loc: any) => loc.id)
                        : [];
                updateData["locations[]"] = undefined;
            }
            if (field?.type === "role-permissions") {
                updateData["role_id"] = updateData["role_id"]
                    ? updateData["role_id"].id
                    : undefined;
                if (field?.attributes?.disabled) {
                    delete updateData["permissions"];
                }
            }

            const key = field?.key;
            const keys = key?.split(".");
            if (!key) {
                return;
            }
            let currentValue = updateData;
            for (let i = 0; i < keys?.length - 1; i++) {
                const subKey = keys[i];
                if (!currentValue.hasOwnProperty(subKey)) {
                    currentValue[subKey] = {};
                }
                currentValue = currentValue[subKey];
            }
            const lastKey = keys[keys.length - 1];
            if (
                data?.hasOwnProperty(key) &&
                typeof data[key] === "object" &&
                data[key]?.hasOwnProperty("id")
            ) {
                currentValue[lastKey] = data[key];
                currentValue[`${lastKey}_id`] = data[key].id;
                delete currentValue[lastKey];
            } else {
                currentValue[lastKey] = data[key];
            }
            if (
                field?.attributes?.multiple &&
                data.hasOwnProperty(key) &&
                Array.isArray(data[key])
            ) {
                currentValue[lastKey] = data[key].map((item: any) => item?.id);
            }
            if (field?.attributes?.type === "number" && data.hasOwnProperty(key)) {
                currentValue[lastKey] = data[key]
                    ? String(data[key]).replaceAll(" ", "")
                    : undefined;
            }
        });

        if (updateData.translates) {
            let translates = updateData.translates;
            for (let key in translates) {
                if (translates[key]) {
                    updateData[key] = translates[key];
                }
            }
            delete updateData.translates;
        }
        if (updateData.coordinates && updateData.coordinates.length > 1) {
            updateData["lat"] = updateData.coordinates[0];
            updateData["lng"] = updateData.coordinates[1];
            delete updateData.coordinates;
        }
        if (updateData?.phone) {
            updateData["phone"] = updateData["phone"].replaceAll("-", "");
        }
        if (updateData?.media) {
            updateData["media"] = updateData?.media.filter(
                (media_item: any) => !media_item.id
            );
        }
        if (
            updateData["media[passport_front]"] &&
            Array.isArray(updateData["media[passport_front]"])
        ) {
            updateData["media[passport_front]"] = undefined;
        }
        if (
            updateData["media[passport_back]"] &&
            Array.isArray(updateData["media[passport_back]"])
        ) {
            updateData["media[passport_back]"] = undefined;
        }
        if (
            updateData["media[passport_selfie]"] &&
            Array.isArray(updateData["media[passport_selfie]"])
        ) {
            updateData["media[passport_selfie]"] = undefined;
        }
        if (model && model === "serial") {
            updateData.product = undefined;
            updateData.created_at = undefined;
            updateData.status = undefined;
            if (updateData?.values && Array.isArray(updateData.values)) {
                updateData.values = updateData.values.map((item) => item.value);
            }
        }
        if (updateData?.work_days) {
            let work_days: any = [];
            if (data.work_days) {
                data.work_days.forEach((item: any) => {
                    let start = null;
                    let end = null;
                    // @ts-ignore
                    if (item.start) {
                        // @ts-ignore
                        start = formatDateToHM(item.start);
                    }
                    if (item.end) {
                        // @ts-ignore
                        end = formatDateToHM(item.end);
                    }
                    if (item.active) {
                        work_days.push({
                            day: item.day,
                            start,
                            end,
                        });
                    }
                });
            }
            updateData.work_days = work_days;
        }
        return updateData;
    };

    const changeUrl = (url: string, params: Record<string, any>) => {
        const regular = /\{([^}]+)\}/g;
        return url.replace(regular, (find, param) => {
            const value = params[param];
            return value !== undefined ? value : "0"; // Заменил 0 на '0', чтобы типы совпадали
        });
    };

    const makeRequest = async (
        model: string,
        action: string,
        method: any,
        urlParams: string = "",
        body: any = null,
        headers: any = null,
        query: Record<string, any> = {},
    ) => {
        loading.value = true;
        try {
            const modelConfig = (
                models[model] ? models[model] : model
            ) as ModelConfig;
            const {data} = await $api(
                `${changeUrl(modelConfig?.url + urlParams, query)}`, {
                    method,
                    body,
                    headers,
                    query
                }
            );
            loading.value = false;
            if (
                action === `modelUpdate-${model}` ||
                action === `modelStore-${model}` ||
                action === `modelDestroy-${model}` ||
                action === `modelRemoveMedia-${model}`
            ) {
            }

            if (data) {
                switch (action) {
                    case `modelUpdate-${model}`:
                        successMessage("Успешно");
                        break;
                    case `modelStore-${model}`:
                        successMessage("Добавлено");
                        break;
                    case `modelDestroy-${model}`:
                        successMessage("Удалено");
                        break;
                    case `modelRemoveMedia-${model}`:
                        successMessage("Удалено");
                        break;
                }
                return data;
            }
            return null;
        } catch (error) {
            loading.value = false;
            exceptionMessage({message: "Ошибка при получении данных"});
            return null;
        }
    };

    const modelRemoveMedia = async (
        model: string,
        id: number,
        item_id: number,
        params: Record<string, any> = {},
    ) => {
        return makeRequest(
            model,
            `modelRemoveMedia-${model}`,
            "GET",
            `/${item_id}/media/remove/${id}`,
            null,
            null,
            params,
        );
    };

    const updateStatus = async (
        model: string,
        id: number,
        body: any,
        method: string = "PUT",
        params: Record<string, any> = {},
    ) => {
        return makeRequest(
            model,
            `modelUpdateStatus-${model}`,
            method,
            `/${id}`,
            body,
            null,
            params,
        );
    };

    return {
        modelIndex,
        modelShow,
        modelDestroy,
        modelStore,
        modelUpdate,
        modelRemoveMedia,
        convertShow,
        updateStatus,
        loading,
    };
};
