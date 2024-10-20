const apiUrl = process.env.NEXT_PUBLIC_API_URL
const companyId = process.env.NEXT_PUBLIC_COMPANY_ID

const qs = require('qs');

async function getVillas(page = 1) {
    const response = await fetch(`${apiUrl}/Clients/GetAllVilla?Language=tr&CompanyId=${companyId}&Size=20&Page=${page}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

async function getHotels(page = 0, size = 20) {
    const response = await fetch(`${apiUrl}/Clients/GetAllHotel?Language=tr&CompanyId=${companyId}&Size=${size}&Page=${page}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

async function getHotel(hotelId) {
    const response = await fetch(`${apiUrl}/Clients/GetHotel?Id=${hotelId}&Language=tr`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

async function getAllVillaByCategoryId(categoryId, page = 0) {
    const response = await fetch(`${apiUrl}/Clients/GetAllVillaByCategoryId?Language=tr&CompanyId=${companyId}&CategoryId=${categoryId}&Size=20&Page=${page}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

async function getVillasForSale(page = 0, size = 20) {
    const response = await fetch(`${apiUrl}/Clients/GetAllVillaSale?Language=tr&CompanyId=${companyId}&Page=${page}&Size=${size}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

async function getVillasHome(size = 8, page = 0, categoryId) {
    const response = await fetch(`${apiUrl}/Clients/GetAllVillaByCategoryId?Language=tr&CompanyId=${companyId}&CategoryId=${categoryId}&Size=${size}&Page=${page}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

async function getVilla(villaId) {
    const response = await fetch(`${apiUrl}/Clients/GetVilla?Id=${villaId}&Language=tr`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

async function getRoom(roomId) {
    const response = await fetch(`${apiUrl}/Clients/GetRoom?Id=${roomId}&Language=tr`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

async function getVillaSale({ slug }) {
    const query = qs.stringify({
        fields: '*',
        populate: [
            "price_dates",
            "price_tables",
            "categories",
            "distance_rulers",
            "photos",
            "reservations",
            "photos.photo"
        ],
        filters: {
            slug: {
                $eqi: `${slug}`,
            },
            isSale: {
                $eq: true
            },
        },
    }, {
        encodeValuesOnly: true,
    });
    const response = await fetch(`${apiUrl}/villas?${query}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

async function getVillaCategory({ category, page, size }) {
    const query = qs.stringify({
        fields: '*',
        sort: ['line:asc'],
        populate: ['photos.photo', 'categories', 'price_tables'],
        pagination: {
            page: page,
            pageSize: size,
        },
        filters: {
            categories: {
                slug: {
                    $eq: `${category}`,
                },
            },
            isRent: {
                $eq: true
            },
        },
    }, {
        encodeValuesOnly: true,
    });
    const response = await fetch(`${apiUrl}/villas?${query}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

//type 0 ise VillaId, 1 ise HotelId
async function createComment(type = 0,
    data
) {
    // ReservationCreate.Begin

    const reservation = {
        [type == 0 ? 'VillaId' : 'HotelId']: data?.id,
        Title: "",
        CommentText: data?.form_message,
        Rating: data?.form_rating,
        Name: data?.form_name,
        Surname: data?.form_surname,
        Phone: data?.form_phone,
        Email: data?.form_email
    };

    const formData = new FormData();

    Object.entries(reservation).forEach(([key, value]) => {
        formData.append(key, value);
    });

    const response = await fetch(`${apiUrl}/Clients/CreateComment`, {
        method: "POST",
        body: formData,
    });
    return response.json()
    // ReservationCreate.End
}

async function getNewVillas() {
    const today = new Date()
    const isoDate = today.toISOString()

    const query = qs.stringify({
        fields: '*',
        populate: ['photos.photo', 'categories', 'price_tables'],
        pagination: {
            page: 1,
            pageSize: 4,
        },
        sort: {
            createdAt: "DESC",
        },
        filters: {
            createdAt: {
                $lte: `${isoDate}`,
            },
            isRent: {
                $eq: true
            },
        },
    }, {
        encodeValuesOnly: true,
    });
    const response = await fetch(`${apiUrl}/villas?${query}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

async function getRandomFourVilla(data, currentVillaId) {
    let withoutCurrentVillaData = data.data.filter(item => item.id != currentVillaId)
    if (withoutCurrentVillaData.length <= 4) {
        return withoutCurrentVillaData
    }

    let randomFourVilla = []

    for (let index = 0; index < 4; index++) {
        let randomIndex = Math.floor(Math.random() * withoutCurrentVillaData.length)
        randomFourVilla.push(withoutCurrentVillaData[randomIndex])
        withoutCurrentVillaData.splice(randomIndex, 1)
    }

    return {
        data: randomFourVilla
    }
}

async function getNearVillas(townId, currentVillaId) {
    const response = await fetch(`${apiUrl}/Clients/GetAllVillaNearby?CompanyId=${companyId}&Language=tr&TownId=${townId}&Size=4`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return await getRandomFourVilla(data, currentVillaId)
}


async function getVillasFilter({ checkIn, checkOut, name, person, page, size }) {
    const query = `${apiUrl}/reservations?sort[0]=checkIn:asc&filters[$or][0][$and][0][checkIn][$lte]=${checkIn}&filters[$or][0][$and][1][checkOut][$gt]=${checkIn}&filters[$or][1][$and][0][checkIn][$lt]=${checkOut}&filters[$or][1][$and][1][checkOut][$gte]=${checkOut}&filters[$or][2][$and][0][checkIn][$gte]=${checkIn}&filters[$or][2][$and][1][checkIn][$lt]=${checkOut}&populate[villa][fields][0]=id&populate[villa][fields][1]=name&fields[0]=id&fields[1]=checkIn&fields[2]=checkOut`
    const response = await fetch(`${query}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    let reserveVillas = []
    data?.data?.map((item) => (
        reserveVillas.push(item?.attributes?.villa?.data?.id)
    ))

    const query1 = qs.stringify({
        populate: ['photos.photo', 'categories', 'price_tables'],
        sort: ['name:asc'],
        pagination: {
            page: page,
            pageSize: size,
        },
        filters: {
            $and: [
                {
                    id: {
                        $notIn: reserveVillas,
                    }
                },
                {
                    name: {
                        $containsi: name || '',
                    }
                },
                {
                    person: {
                        $gte: person || 0,
                    }
                },
                {
                    $or: [
                        {
                            $and: [
                                {
                                    isSale: { $eq: true }
                                },
                                {
                                    isRent: { $eq: true }
                                },
                            ]
                        },
                        {
                            $and: [
                                {
                                    isSale: { $eq: false }
                                },
                                {
                                    isRent: { $eq: true }
                                },
                            ]
                        }
                    ]
                }
            ]
        }
    }, {
        encodeValuesOnly: true,
    });
    const response1 = await fetch(`${apiUrl}/villas?${query1}`, {
        cache: 'no-store'
    })
    const data1 = await response1.json()
    return data1
}

async function getVillasByFilter({ villaSearchText = "", checkIn = "", checkOut = "", person = 1, page = 0, size = 10 }) {
    const response = await fetch(`${apiUrl}/Clients/GetAllVillaSearch?CompanyId=${companyId}&Language=tr${checkIn !== '' ? `&CheckIn=${checkIn}` : ''}${checkOut !== '' ? `&CheckOut=${checkOut}` : ''}${villaSearchText !== '' ? `&Name=${villaSearchText}` : ''}&Person=${person}&Pagination.page=${page}&Pagination.size=${size}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

export { getVillas, getVillaCategory, getVilla, getNewVillas, getNearVillas, getVillasFilter, getVillasByFilter, getVillasHome, getVillasForSale, getVillaSale, getAllVillaByCategoryId, getHotels, getHotel, getRoom, createComment }