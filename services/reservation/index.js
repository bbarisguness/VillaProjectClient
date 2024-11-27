import { SendMail } from "@/utils/sendMail";
import { dateToDotFormat } from "@/utils/date";

const apiUrl = process.env.NEXT_PUBLIC_API_URL
const companyId = process.env.NEXT_PUBLIC_COMPANY_ID

//sonuc false dönerse villa müsait demek oluyor, true dönerse müsait değil
//type 0 ise villa, 1 ise apart
async function isVillaAvailable(type = 0, villaId, checkInDate, checkOutDate) {
  const response = await fetch(`${apiUrl}/Clients/ReservationIsAvailible?${type == 0 ? 'VillaId' : 'RoomId'}=${villaId}&CheckIn=${checkInDate}&CheckOut=${checkOutDate}`, {
    cache: "no-store",
  });
  const data = await response.json();
  return data
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

  const mailResult = await SendMail('template_n90pb1d', { villaName: villaName, nameAndSurname: personData.name + ' ' + personData.surname, email: personData.email, phone: personData.phone, startDate: dateToDotFormat(reservationData.checkIn), endDate: dateToDotFormat(reservationData.checkOut), to_email: "bbarisguness@gmail.com" })
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

export { createReservation, searchReservation, isVillaAvailable };
