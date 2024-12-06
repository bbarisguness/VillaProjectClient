const apiUrl = process.env.NEXT_PUBLIC_API_URL
const companyId = process.env.NEXT_PUBLIC_COMPANY_ID

async function getActivates(lang = 'tr') {
    const response = await fetch(`${apiUrl}/Clients/GetAllWebPage?CompanyId=${companyId}&Language=${lang}&MenuId=172e12c2-3f91-4f9d-1057-08dd15e9f280`)
    const data = await response.json()
    return data
}

async function getActivate({ slug, language = 'tr' }) {
    const response = await fetch(`${apiUrl}/Clients/GetWebPage?Slug=${slug}&Language=${language}`)
    const data = await response.json()
    return data
}

export { getActivates, getActivate }