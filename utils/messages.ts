import {toast} from "vue3-toastify";


const toastOptions = {
    autoClose: 3000,
};

export const successMessage = (text: string) => {
    if (import.meta.client) {
        toast.success(text, {
            ...toastOptions,
        });
    }
};

export const failureMessage = (text: string) => {
    if (import.meta.client) {
        toast.error(text, {
            ...toastOptions,
        });
    }
};


export const exceptionMessage = (data: any) => {
    if (import.meta.client) {
        try {
            let k = 0;
            if (data.message && Object.keys(data.message).length) {
                data.message.forEach((item: string) => {
                    setTimeout(() => {
                        toast.error(item, {
                            ...toastOptions,
                        });
                    }, 100 * k);
                });
            } else {
                toast.error(data.message, {
                    ...toastOptions,
                });
            }
        } catch (error) {
            toast.error('Неизвестная ошибка', {
                ...toastOptions,
            });
        }
    }
};
