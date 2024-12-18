const apiUrl = "https://labirentapp.testgrande.com/api"

async function getBlogs(Language = 'tr') {
    const response = await fetch(`${apiUrl}/Clients/GetAllWebPage?Language=${Language}&Slug=blogs`, {
        cache: 'no-store'
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