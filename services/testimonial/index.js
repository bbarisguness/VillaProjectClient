const apiUrl = process.env.NEXT_PUBLIC_API_URL

const qs = require('qs');

async function getTestimonials() {
    const query = qs.stringify({
        fields: '*',
        populate: [
            'villa.photos.photo'
        ],
        filters: {
            showHomePage: {
                $eq: true
            },
        },
        pagination: {
            start: 0,
            limit: 10,
        },
    }, {
        encodeValuesOnly: true,
    });
    const response = await fetch(`${apiUrl}/testimonials?${query}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

export { getTestimonials }