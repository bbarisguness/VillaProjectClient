const apiUrl = process.env.NEXT_PUBLIC_API_URL
const companyId = process.env.NEXT_PUBLIC_COMPANY_ID

const qs = require('qs');

async function getCategories() {
    const response = await fetch(`${apiUrl}/Clients/GetAllCategory?Language=tr&CompanyId=${companyId}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

async function getCategoriesHome() {
    const response = await fetch(`${apiUrl}/Clients/GetAllCategory?Language=tr&CompanyId=${companyId}`, {
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

export { getCategories, getCategory, getCategorySlug, getCategoriesHome }