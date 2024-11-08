import type {PaginatedResult} from "~/types/list";

interface ModelConfig {
    url: string;
    name: string;
}

import {Models} from "~/types/models";

export const useModelApi = () => {
    const models: Record<Models, ModelConfig> = {
        user: {
            url: "/admin/users",
            name: "Пользователи",
        },
        brand: {
            url: "/admin/brands",
            name: "Бренды",
        },
    };

    const loading = ref(false);

    const modelIndex = async (
        model: Models,
        params: Record<string, any> = {},
    ): Promise<PaginatedResult<Models>> => {
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
        model: Models,
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
        if (model === "schedule_transactions" || model === "finance_transactions") {
            data.data["finance_sub_category_transaction"] =
                data?.data?.finance_category_transaction;
            data.data["finance_category_transaction"] =
                data?.data?.finance_category_transaction?.finance_category_transaction;
        }
        if (model === "access") {
            data.data["user_id"] = data?.data["user"]?.id;
            delete data.data["user"];
            delete data.data["permission_keys"];
            delete data.data["role"];
        }
        return data;
    };

    const modelDestroy = async (
        model: Models,
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
        model: Models,
        fields: any[] = [],
        data: Record<string, any> = {},
        params: Record<string, any> = {},
    ) => {
        const body = convertItem(fields, data);
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
        model: Models,
        id: any,
        fields: any[] = [],
        data: Record<string, any> = {},
        params: Record<string, any> = {},
    ) => {
        const body = convertItem(fields, data, model);
        // const headers = { 'Content-Type': 'multipart/form-data' };
        const headers = {};

        return makeRequest(
            model,
            `modelUpdate-${model}`,
            "PATCH",
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
                updateData["location_brands"] = updateData["location_brands"]?.map(
                    (item: any) => item?.id
                );
                updateData["location_brand_id"] = updateData["location_brand"]?.id
                    ? updateData["location_brand"]?.id
                    : undefined;
                delete updateData["location_brand"];
                updateData["location_id"] = updateData["location_id"]
                    ? updateData["location_id"]?.id
                    : undefined;
                updateData["locations"] =
                    updateData["locations"] && updateData["locations"].length > 0
                        ? updateData["locations"].map((loc: any) => loc.id)
                        : [];
                updateData["user_id"] = updateData["user"]
                    ? updateData["user"]?.id
                    : undefined;
            }
            if (field?.type === "role-permissions") {
                updateData["role_id"] = updateData["role_id"]
                    ? updateData["role_id"].id
                    : undefined;
                if (field?.attributes?.disabled) {
                    delete updateData["permissions"];
                }
            }
            if (field?.type === "category-transaction-name") {
                updateData["finance_category_transaction_id"] = updateData[
                    "finance_category_transaction"
                    ]
                    ? updateData["finance_category_transaction"].id
                    : undefined;
                delete updateData["finance_category_transaction"];
                updateData["name"] = updateData["name"]?.hasOwnProperty("id")
                    ? updateData["name"].name
                    : updateData["name"];
            }
            if (field.type === "text-locales") {
                Object.keys(updateData.translates).forEach((lang) => {
                    if (!updateData.translates[lang].title) {
                        delete updateData.translates[lang];
                    }
                });
            }
            if (field?.type === "currencies") {
                updateData["currencies"] =
                    updateData["currencies"] &&
                    Array.isArray(updateData["currencies"]) &&
                    updateData["currencies"].map((currency: any) => {
                        return {
                            id: Number(currency.id),
                            is_main: currency?.is_main ? currency.is_main : false,
                        };
                    });
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
                currentValue[lastKey] = data[key].map((item: any) =>
                    typeof item === "object" && item !== null
                        ? item.hasOwnProperty("id")
                            ? item.id
                            : item
                        : item
                );
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
            console.log(updateData);
            updateData["media"] = updateData?.media?.filter(
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
        model: Models,
        action: string,
        method: any,
        urlParams: string = "",
        body: any = null,
        headers: any = null,
        query: Record<string, any> = {},
        custom_url?: string
    ): Promise<any> => {
        loading.value = true;
        try {
            const modelConfig = (
                models[model] ? models[model] : model
            ) as ModelConfig;
            const {data, error} = await useAPI(
                `${changeUrl(
                    custom_url ? custom_url + urlParams : modelConfig?.url + urlParams,
                    query
                )}`,
                {
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
                // updateStamp();
            }

            if (data.value) {
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
                return data.value;
            }
            if (error.value) {
                exceptionMessage(error.value.data);
            }
        } catch (error) {
            loading.value = false;
            exceptionMessage({message: "Ошибка при получении данных"});
        }
    };

    const modelRemoveMedia = async (
        model: Models,
        id: number,
        item_id: number,
        params: Record<string, any> = {},
    ) => {
        console.log(model);
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
        model: Models,
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
