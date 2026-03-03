export const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

export function getImageUrl(image) {
    return image.startsWith('http') 
        ? image 
        : `${import.meta.env.VITE_IMAGE_CDN_URL}/${image}`;
}