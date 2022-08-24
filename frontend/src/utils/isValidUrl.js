const isValidUrl = (url) => {
    try {
        new URL(url);
    } catch (evt) {
        return false;
    }
    return true;
};

export default isValidUrl;