const Push = (data, isClearEcommerce = false) => {
    window.dataLayer = window.dataLayer || [];

    if (isClearEcommerce) {
        window.dataLayer.push({
            event: 'ecommerce_clear',
            ecommerce: null
        });
    }

    window.dataLayer.push(data);
};

export default Push;
