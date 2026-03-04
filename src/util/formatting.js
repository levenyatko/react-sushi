export function formatCurrency(value, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(value);
}

export function getImageUrl(image) {
    return image.startsWith('http') 
        ? image 
        : `${import.meta.env.VITE_IMAGE_CDN_URL}/${image}`;
}