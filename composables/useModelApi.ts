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

    const modelIndex = (
        model: Models,
        params: Record<string, any> = {},
        options: Record<string, any> = {},
    ) => {
        return makeRequest<PaginatedResult<typeof models>>(
            model,
            `modelIndex-${model}`,
            "GET",
            "",
            null,
            null,
            params,
            undefined,
            options
        );
    };
    const modelShow = async (
        model: Models,
        id: any = null,
        params: Record<string, any> = {},
    ) => {
        return makeRequest(
            model,
            `modelShow-${model}`,
            "GET",
            `/${id}`,
            null,
            null,
            params,
        );
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
        //const headers = { 'Content-Type': 'multipart/form-data' };
        const headers = {};

        return makeRequest(
            model,
            `modelStore-${model}`,
            "POST",
            "",
            data,
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
        // const headers = { 'Content-Type': 'multipart/form-data' };
        const headers = {};

        return makeRequest(
            model,
            `modelUpdate-${model}`,
            "PATCH",
            `/${id}`,
            data,
            headers,
            params,
        );
    };
    const changeUrl = (url: string, params: Record<string, any>) => {
        const regular = /\{([^}]+)\}/g;
        return url.replace(regular, (find, param) => {
            const value = params[param];
            return value !== undefined ? value : "0"; // Заменил 0 на '0', чтобы типы совпадали
        });
    };

    const makeRequest = async <T>(
        model: Models,
        action: string,
        method: any,
        urlParams: string = "",
        body: any = null,
        headers: any = null,
        query: Record<string, any> = {},
        custom_url?: string,
        options?: Record<string, any>,
    ) => {
        loading.value = true;
        const modelConfig = (
            models[model] ? models[model] : model
        ) as ModelConfig;
        const {error, ...rest} = await useAPI<T>(
            `${changeUrl(
                custom_url ? custom_url + urlParams : modelConfig?.url + urlParams,
                query
            )}`,
            {
                method,
                body,
                headers,
                query,
                ...options
            }
        );
        if (error.value && import.meta.client) {
            exceptionMessage(error.value.data);
        }
        return {
            ...rest,
            error
        }
    };

    const modelRemoveMedia = async (
        model: Models,
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
        updateStatus,
        loading,
    };
};
