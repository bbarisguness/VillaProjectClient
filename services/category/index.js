const apiUrl = process.env.NEXT_PUBLIC_API_URL

const qs = require('qs');

async function getCategories() {
    const query = qs.stringify({
        fields: '*',
        sort: ['line:asc']
    }, {
        encodeValuesOnly: true,
    });
    const response = await fetch(`${apiUrl}/categories?${query}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

async function getCategoriesHome() {
    const query = qs.stringify({
        fields: '*',
        sort: ['line:asc'],
        pagination: {
            limit: 6,
        },
    }, {
        encodeValuesOnly: true,
    });
    const response = await fetch(`${apiUrl}/categories?${query}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

async function getCategory({ id }) {
    const response = await fetch(`${apiUrl}/getCategory/${id}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

async function getCategorySlug({ slug }) {
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
    const response = await fetch(`${apiUrl}/categories?${query}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

export { getCategories, getCategory, getCategorySlug,getCategoriesHome }