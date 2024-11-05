const apiUrl = process.env.NEXT_PUBLIC_API_URL
const companyId = process.env.NEXT_PUBLIC_COMPANY_ID

const qs = require('qs');

async function getBlogs() {
    const response = await fetch(`${apiUrl}/Clients/GetAllWebPage?Language=tr&CompanyId=${companyId}&MenuId=868abcc6-c260-46b5-4de3-08dce9d46910&Pagination.Page=0&Pagination.Size=50`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

async function getBlog({ slug }) {
    const response = await fetch(`${apiUrl}/Clients/GetWebPage?Language=tr&Slug=${slug}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

export { getBlogs, getBlog }