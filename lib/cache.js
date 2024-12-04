const cache = new Map();

/**
 * Cache'e veri ekler
 * @param {string} key - Cache anahtarı
 * @param {string} locale - Dil seçeneği (örn: "en", "tr")
 * @param {any} value - Saklanacak veri
 * @param {number} ttl - Verinin saklanma süresi (ms cinsinden)
 */
export const setCache = (key, locale, value, ttl) => {
    const cacheKey = `${key}:${locale}`; // Dil bilgisini anahtarın bir parçası yap
    const expiry = Date.now() + ttl;
    cache.set(cacheKey, { value, expiry });
};

/**
 * Cache'den veri çeker
 * @param {string} key - Cache anahtarı
 * @param {string} locale - Dil seçeneği (örn: "en", "tr")
 * @returns {any|null} Cache'deki veri veya null
 */
export const getCache = (key, locale) => {
    const cacheKey = `${key}:${locale}`; // Anahtara dil bilgisini dahil et
    const data = cache.get(cacheKey);
    if (!data) return null;

    if (Date.now() > data.expiry) {
        cache.delete(cacheKey); // Süresi dolmuş veriyi sil
        return null;
    }

    return data.value;
};