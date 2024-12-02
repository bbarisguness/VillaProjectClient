// pages/api/categories.js
import { getRegions } from "@/services/region";

let cache = {}; // Cache'i tutmak için bir değişken
let lastFetchTimes = {}; // Son fetch zamanını kontrol etmek için bir değişken
const CACHE_DURATION = 1000 * 60 * 5; // 5 dakika

export default async function handler(req, res) {
    const { lang } = req.query;
    const now = Date.now();

    // Eğer ilgili dil için cache güncel değilse veya hiç yoksa veriyi fetch et
    if (!cache[lang] || now - (lastFetchTimes[lang] || 0) > CACHE_DURATION) {
        const regions = await getRegions(lang);
        cache[lang] = regions;
        lastFetchTimes[lang] = now;
    }

    res.status(200).json(cache[lang]);
}
