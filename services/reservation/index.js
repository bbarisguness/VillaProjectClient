import { connect } from "formik";
import moment from "moment";
import { SendMail } from "@/utils/sendMail";
import { dateToDotFormat } from "@/utils/date";

const apiUrl = process.env.NEXT_PUBLIC_API_URL
const companyId = process.env.NEXT_PUBLIC_COMPANY_ID

const qs = require("qs");
var async = require("async");

//sonuc false dönerse villa müsait demek oluyor, true dönerse müsait değil
//type 0 ise villa, 1 ise apart
async function isVillaAvailable(type = 0, villaId, checkInDate, checkOutDate) {
  const response = await fetch(`${apiUrl}/Clients/ReservationIsAvailible?${type == 0 ? 'VillaId' : 'RoomId'}=${villaId}&CheckIn=${checkInDate}&CheckOut=${checkOutDate}`, {
    cache: "no-store",
  });
  const data = await response.json();
  return data
}

async function getPrice({ villaId, checkIn, checkOut, adult, child, baby }) {
  var result = null;
  const nowDate = new Date();
  // isAvailable.begin
  const queryIsAvailableQ = qs.stringify(
    {
      fields: "id",
      filters: {
        $and: [
          { villa: { id: { $eq: villaId } } },
          {
            $or: [
              {
                $and: [
                  { checkIn: { $gt: checkIn } },
                  { checkIn: { $lt: checkOut } },
                ],
              },
              {
                $and: [
                  { checkIn: { $lte: checkIn } },
                  { checkOut: { $gt: checkIn } },
                ],
              },
              {
                $and: [
                  { checkIn: { $lt: checkOut } },
                  { checkOut: { $gte: checkOut } },
                ],
              },
            ],
          },
          {
            reservationStatus: { $ne: '110' }
          }
        ],
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const responseIsAvailable = await fetch(
    `${apiUrl}/reservations?${queryIsAvailableQ}`,
    {
      cache: "no-store",
    }
  );
  const dataIsAvailable = await responseIsAvailable.json();
  // isAvailable.end
  if (dataIsAvailable?.data?.length > 0) {
    return result;
  } else {
  }
  var reservationItems = [];
  // getPrice.begin
  const query = qs.stringify(
    {
      fields: ["checkIn", "checkOut", "price"],
      sort: ["checkIn:asc"],
      filters: {
        $and: [
          { villa: { id: { $eq: villaId } } },
          {
            $or: [
              {
                $and: [
                  { checkIn: { $gt: checkIn } },
                  { checkIn: { $lte: checkOut } },
                ],
              },
              {
                $and: [
                  { checkIn: { $lte: checkIn } },
                  { checkOut: { $gte: checkIn } },
                ],
              },
              {
                $and: [
                  { checkIn: { $lte: checkOut } },
                  { checkOut: { $gte: checkOut } },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const response = await fetch(`${apiUrl}/price-dates?${query}`, {
    cache: "no-store",
  });
  const data = await response.json();
  // getPrice.end

  // totalPrice.begin
  var checkOutDate = new Date(checkOut);
  var fakeDate = new Date(checkIn);
  var days = [];
  var totalPrice = 0;
  while (fakeDate < checkOutDate) {
    days.push(moment(fakeDate).format("YYYY-MM-DD").toString());
    fakeDate.setDate(fakeDate.getDate() + 1);
  }

  // days.map((item) => {
  //     const currentDate = new Date(item)

  //     data?.data?.map((date) => {
  //         const checkInDate = new Date(date.attributes.checkIn)
  //         const checkOutDate = new Date(date.attributes.checkOut)
  //         if (currentDate >= checkInDate && currentDate <= checkOutDate) {
  //             totalPrice += date?.attributes?.price
  //             reservationItems.push({ day: moment(currentDate).format('YYYY-MM-DD').toString(), price: date?.attributes?.price })
  //         }
  //     })
  // })
  // totalPrice.end

  async.each(
    days,
    function (item, callback) {
      const currentDate = new Date(item);
      data?.data?.map((date) => {
        const checkInDate = new Date(date.attributes.checkIn);
        const checkOutDate = new Date(date.attributes.checkOut);
        if (currentDate >= checkInDate && currentDate <= checkOutDate) {
          totalPrice += date?.attributes?.price;
          reservationItems.push({
            day: moment(currentDate).format("YYYY-MM-DD").toString(),
            price: date?.attributes?.price,
          });
        }
      });
      callback();
    },
    function () {
      result = {
        checkIn,
        checkOut,
        villaId,
        totalPrice,
        reservationItems,
        adult,
        child,
        baby,
        expiryDate: Math.floor(nowDate.getTime() / 1000),
      };
    }
  );

  return result;
}

async function createReservation1(person) {
  const reservation = {
    checkIn: "2024-02-21",
    checkOut: "2024-02-28",
    amount: 10000,
    total: 10000,
    // reservation_infos: {
    //     connect: [dataReservationInfo?.data?.id]
    // },
    villa: {
      connect: [5],
    },
  };

  const response = await fetch(`${apiUrl}/reservations`, {
    method: "POST",
    body: JSON.stringify({
      data: reservation,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  // console.log(data);
  const reservationInfo = {
    name: person.data.name,
    surname: person.data.surname,
    phone: person.data.phone,
    email: person.data.email,
    owner: true,
    peopleType: "Adult",
    reservation: {
      connect: [data.data.id],
    },
  };

  const responseReservationInfo = await fetch(`${apiUrl}/reservation-infos`, {
    method: "POST",
    body: JSON.stringify({
      data: reservationInfo,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const dataReservationInfo = await responseReservationInfo.json();

  // var reservationItems = []
  // const localstr = JSON.parse(localStorage.getItem('reservation'))

  // reservationItems = localstr.reservationItems
  // reservationItems.map((item, i) => {
  //     reservationItems[i] = {
  //         day: item.day,
  //         price: item.price,
  //         reservation: {
  //             connect: [data.data.id]
  //         }
  //     }
  // })

  // const responseReservationItem = await fetch(`${apiUrl}/reservation-items`, {
  //     method: 'POST',
  //     body: {
  //         data: reservationItems
  //     },
  //     headers: {
  //         'Content-Type': 'application/json'
  //     }
  // })
  // const dataReservationItem = await responseReservationItem.json()

  // console.log(dataReservationInfo?.data?.id);

  return data;
}

//type 0 ise villa, 1 ise apart
async function createReservation(type = 0,
  reservationData,
  personData,
  villaName
) {
  // ReservationCreate.Begin

  const reservation = {
    CompanyId: companyId,
    [type == 0 ? 'VillaId' : 'RoomId']: type == 0 ? reservationData?.villaId : reservationData?.roomId,
    CheckIn: reservationData.checkIn,
    CheckOut: reservationData.checkOut,
    Discount: 2000,
    IdNo: personData.idNo,
    Name: personData.name,
    Surname: personData.surname,
    Phone: personData.phone,
    Email: personData.email
  };

  const formData = new FormData();

  Object.entries(reservation).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const response = await fetch(`${apiUrl}/Clients/ReservationCreate`, {
    method: "POST",
    body: formData,
  });

  // const response = await fetch(`${apiUrl}/Clients/ReservationCreate`, {
  //   method: "POST",
  //   body: JSON.stringify({
  //     ...reservation
  //   }),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  if (!response.ok) {
    return response.json()
  }

  const mailResult = await SendMail('template_n90pb1d', { villaName: villaName, nameAndSurname: personData.name + ' ' + personData.surname, email: personData.email, phone: personData.phone, startDate: dateToDotFormat(reservationData.checkIn), endDate: dateToDotFormat(reservationData.checkOut), to_email: "tevfikk.durmus@gmail.com" })
  // ReservationCreate.End

  return response.json();
}

async function searchReservation({ reservationNumber }) {
  const response = await fetch(`${apiUrl}/Clients/GetReservation/?Language=tr&ReservationNumber=${reservationNumber}`, {
    cache: 'no-store'
  })
  const data = await response.json()
  return data
}

export { getPrice, createReservation, searchReservation, isVillaAvailable };
