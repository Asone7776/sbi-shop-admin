export function getBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

export const formatPriceProduct = (price: number | string) => {
    const n = String(price),
        p = n.indexOf(".");

    return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, (m, i) =>
        p < 0 || i < p ? `${m} ` : m
    );
};
