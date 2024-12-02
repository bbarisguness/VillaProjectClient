const apiUrl = process.env.NEXT_PUBLIC_API_URL
const companyId = process.env.NEXT_PUBLIC_COMPANY_ID

async function getBlogs(Language = 'tr') {
    const response = await fetch(`${apiUrl}/Clients/GetAllWebPage?Language=${Language}&CompanyId=${companyId}&MenuId=868abcc6-c260-46b5-4de3-08dce9d46910&Pagination.Page=0&Pagination.Size=50`, {
        next: { revalidate: 60 }
    })
    const data = await response.json()
    return data
}

async function getBlog({ slug, language }) {
    const response = await fetch(`${apiUrl}/Clients/GetWebPage?Language=${language}&Slug=${slug}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

export { getBlogs, getBlog }