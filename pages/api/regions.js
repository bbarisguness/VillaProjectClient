// pages/api/regions.js
import { getRegions } from "@/services/region";
import { setCache, getCache } from "@/lib/cache";

export default async function handler(req, res) {
    const { lang } = req.query;
    const data = getCache('homepageCachedRegions', lang);
    if (!data) {
        console.log("regions apiden geldi")
        const regions = await getRegions(lang);
        setCache('homepageCachedRegions', lang, regions, 3600 * 1000); // 1 saat geçerli
        return res.status(200).json(regions);
    }
    console.log("regions cacheden geldi")

    res.status(200).json(data);
}