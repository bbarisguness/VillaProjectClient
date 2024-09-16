import { connect } from "formik";
import moment from "moment";
import { SendMail } from "@/utils/sendMail";
import { dateToDotFormat } from "@/utils/date";

const apiUrl = process.env.NEXT_PUBLIC_API_URL

const qs = require("qs");
var async = require("async");

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

async function createReservation(
  reservationData,
  personData,
  reservationItems,
  transferType,
  villaName
) {
  const customerTransferType = await transferType === 1 ? '110' : '100'
  // ReservationCreate.Begin
  const reservation = {
    checkIn: reservationData.checkIn,
    checkOut: reservationData.checkOut,
    amount: reservationData.totalPrice,
    total: reservationData.totalPrice,
    customerPaymentType: customerTransferType,
    villa: {
      connect: [reservationData.villaId],
    },
    homeOwner: false
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
  // console.log("response", response);
  if (!response.ok) {
    return false;
  }

  //console.log(reservationData);
  //console.log(personData);
  //console.log(villaName);

  const mailResult = await SendMail('template_n90pb1d', { villaName: villaName, nameAndSurname: personData.data.name + ' ' + personData.data.surname, email: personData.data.email, phone: personData.data.phone, startDate: dateToDotFormat(reservationData.checkIn), endDate: dateToDotFormat(reservationData.checkOut), to_email: "tevfikk.durmus@gmail.com" })

  const reservationResult = await response.json();

  // ReservationCreate.End

  // ReservationInfo.Begin
  const reservationInfo = {
    name: personData.data.name,
    surname: personData.data.surname,
    idNo: personData.data.idNo,
    phone: personData.data.phone,
    email: personData.data.email,
    owner: true,
    peopleType: "Adult",
    reservation: {
      connect: [reservationResult.data.id],
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
  if (!responseReservationInfo.ok) {
    await fetch(`${apiUrl}/reservations/${reservationResult.data.id}`, {
      method: "DELETE",
    });
    return false;
  }
  const dataReservationInfo = await responseReservationInfo.json();
  // ReservationInfo.End

  reservationItems.map(async (item) => {
    await fetch(`${apiUrl}/reservation-items`, {
      method: "POST",
      body: JSON.stringify({
        data: {
          day: item.day,
          price: item.price,
          reservation: {
            connect: [reservationResult.data.id],
          },
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

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

  return true;
}

async function searchReservation({ reservationNumber }) {
  const query = qs.stringify({
    fields: '*',
    populate: '*',
    filters: {
      reservationNumber: {
        $eq: `${reservationNumber}`,
      },
    },
  }, {
    encodeValuesOnly: true,
  });
  const response = await fetch(`${apiUrl}/reservations?${query}`, {
    cache: 'no-store'
  })
  const data = await response.json()
  return data
}

export { getPrice, createReservation, searchReservation };
