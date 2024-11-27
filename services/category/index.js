const apiUrl = process.env.NEXT_PUBLIC_API_URL
const companyId = process.env.NEXT_PUBLIC_COMPANY_ID

async function getCategories(language = 'tr') {
    const response = await fetch(`${apiUrl}/Clients/GetAllCategory?Language=${language}&CompanyId=${companyId}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

async function getCategoriesHome(language = 'tr') {
    const response = await fetch(`${apiUrl}/Clients/GetAllCategory?Language=${language}&CompanyId=${companyId}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

export { getCategories, getCategoriesHome }