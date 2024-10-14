const apiUrl = process.env.NEXT_PUBLIC_API_URL
const companyId = process.env.NEXT_PUBLIC_COMPANY_ID

const qs = require('qs');

async function getRegions() {
    const response = await fetch(`${apiUrl}/Clients/GetAllWebPage?Language=tr&CompanyId=${companyId}&MenuId=82FA2F5B-C87A-4E5D-29A9-08DCE9D62FAD`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

async function getRegion({ slug }) {
    const response = await fetch(`${apiUrl}/Clients/GetWebPage?Id=${slug}&Language=tr`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

export { getRegions, getRegion }