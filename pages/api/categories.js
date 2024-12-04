// pages/api/categories.js
import { getCategories } from "@/services/category";
import { setCache, getCache } from "@/lib/cache";

export default async function handler(req, res) {
    const { lang } = req.query;
    const data = getCache('homepageCachedCategories', lang);
    if (!data) {
        console.log("category apiden geldi")
        const categories = await getCategories(lang);
        setCache('homepageCachedCategories', lang, categories, 3600 * 1000); // 1 saat geçerli
        return res.status(200).json(categories);
    }
    console.log("category cacheden geldi")

    res.status(200).json(data);
}