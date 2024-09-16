const apiUrl = process.env.NEXT_PUBLIC_API_URL

const qs = require('qs');

async function getRegions() {
    const response = await fetch(`${apiUrl}/regions?populate=*`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

async function getRegion({ slug }) {
    const query = qs.stringify({
        fields: '*',
        populate: '*',
        filters: {
            slug: {
                $eq: `${slug}`,
            },
        },
    }, {
        encodeValuesOnly: true,
    });
    const response = await fetch(`${apiUrl}/regions?${query}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

export { getRegions, getRegion }