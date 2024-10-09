const apiUrl = process.env.NEXT_PUBLIC_API_URL

async function getPhotos() {
    const response = await fetch(`${apiUrl}/photos?populate=*`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

export { getPhotos }