const apiUrl = process.env.NEXT_PUBLIC_API_URL

const qs = require('qs');

async function getPhotos() {
    const response = await fetch(`${apiUrl}/photos?populate=*`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

async function getCoverPhotoVilla({ id }) {
    const query = qs.stringify({
        fields: '*',
        populate: '*',
        filters: {
            villa: {
                id: {
                    $eq: id
                },
            },
            line: 0,
        },
    }, {
        encodeValuesOnly: true,
    });
    const response = await fetch(`${apiUrl}/photos?${query}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

export { getPhotosVilla, getPhotos, getCoverPhotoVilla }