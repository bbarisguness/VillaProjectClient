const apiUrl = "https://labirentapp.testgrande.com/api"

async function getCategories(language = 'tr') {
    const response = await fetch(`${apiUrl}/Clients/GetAllCategory?Language=${language}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

export { getCategories }