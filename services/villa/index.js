const apiUrl = process.env.NEXT_PUBLIC_API_URL
const companyId = process.env.NEXT_PUBLIC_COMPANY_ID

async function getVillas(page = 1) {
    const response = await fetch(`${apiUrl}/Clients/GetAllVilla?Language=tr&CompanyId=${companyId}&Size=20&Page=${page}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

async function getHotels(page = 0, size = 20) {
    const response = await fetch(`${apiUrl}/Clients/GetAllHotel?Language=tr&CompanyId=${companyId}&Size=${size}&Page=${page}`, {
        next: { revalidate: 60 }
    })
    const data = await response.json()
    return data
}

async function getHotel(hotelId) {
    const response = await fetch(`${apiUrl}/Clients/GetHotel?Slug=${hotelId}&Language=tr`, {
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
        next: { revalidate: 60 }
    })
    const data = await response.json()
    return data
}

async function getVilla(villaSlug, language = 'tr') {
    const response = await fetch(`${apiUrl}/Clients/GetVilla?slug=${villaSlug}&Language=${language}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

async function getRoom(roomSlug) {
    const response = await fetch(`${apiUrl}/Clients/GetRoom?Slug=${roomSlug}&Language=tr`, {
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

async function getVillasByFilter({ villaSearchText = "", checkIn = "", checkOut = "", person = 1, page = 0, size = 10 }) {
    const response = await fetch(`${apiUrl}/Clients/GetAllVillaSearch?CompanyId=${companyId}&Language=tr${checkIn !== '' ? `&CheckIn=${checkIn}` : ''}${checkOut !== '' ? `&CheckOut=${checkOut}` : ''}${villaSearchText !== '' ? `&Name=${villaSearchText}` : ''}&Person=${person}&Pagination.page=${page}&Pagination.size=${size}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

export { getVillas, getVilla, getNearVillas, getVillasByFilter, getVillasHome, getVillasForSale, getAllVillaByCategoryId, getHotels, getHotel, getRoom, createComment }