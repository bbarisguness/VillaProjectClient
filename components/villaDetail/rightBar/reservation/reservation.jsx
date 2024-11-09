"use client";
import styles from "./reservation.module.css";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect, forwardRef } from "react";
import Image from "next/image";
import moment from "moment";
import { isVillaAvailable } from "@/services/reservation";
import tr from "date-fns/locale/tr";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Reservation({
  villaId,
  roomId,
  villaSlug,
  roomSlug,
  prices,
  villaName,
  villaFirstPhoto,
  region,
  priceTypeText,
}) {
  const router = useRouter();

  //console.log('villaId: ' + villaId);
  const [availible, setAvailible] = useState(false);
  const inputRefNumberOfPeople = useRef();
  const menuRefNumberOfPeople = useRef();
  const menuRefCalendar = useRef();
  const datepickerRef = useRef();

  const [numberOfAdults1, setNumberOfAdults1] = useState(1);
  const [numberOfChild1, setNumberOfChild1] = useState(0);
  const [numberOfBabies1, setNumberOfBabies1] = useState(0);

  const [dateRange, setDateRange] = useState([]);
  const [minCalendarDate, setMinCalendarDate] = useState(new Date())
  const [startDate, endDate] = dateRange;

  const [isNumberPeopleMenuOpen, setNumberPeople] = useState(false);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    let handler = (e) => {
      //Kişi sayısı menüsü için
      if (!menuRefNumberOfPeople.current.contains(e.target)) {
        setNumberPeople(false);
      }
    };

    document.addEventListener("mouseup", handler);

    if (numberOfAdults1 != 0 || numberOfChild1 != 0 || numberOfBabies1 != 0) {
      inputRefNumberOfPeople.current.value = `${
        numberOfAdults1 + numberOfChild1
      } Misafir, ${numberOfBabies1} Bebek`;
    } else {
      inputRefNumberOfPeople.current.value = "2 Misafir, 1 Bebek";
    }

    return () => {
      document.removeEventListener("mouseup", handler);
    };
  });

  useEffect(() => {
    if (dateRange?.includes(null)) {
      setDateRange([]);
    }
  }, [isCalendarOpen]);

  //Change People Number
  const changeNumber = (operation, type) => {
    if (type == "adult") {
      operation == "+"
        ? setNumberOfAdults1(numberOfAdults1 + 1)
        : numberOfAdults1 > 1 && setNumberOfAdults1(numberOfAdults1 - 1);
    } else if (type == "child") {
      operation == "+"
        ? setNumberOfChild1(numberOfChild1 + 1)
        : numberOfChild1 > 0 && setNumberOfChild1(numberOfChild1 - 1);
    } else {
      operation == "+"
        ? setNumberOfBabies1(numberOfBabies1 + 1)
        : numberOfBabies1 > 0 && setNumberOfBabies1(numberOfBabies1 - 1);
    }
  };

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <input
      value={value}
      onClick={onClick}
      ref={ref}
      readOnly // readOnly burada input'u sadece takvim seçimi için yapar
      onFocus={(e) => e.target.blur()} // Odaklanma sırasında klavyeyi engeller
      placeholder="Tarih Seçin"
    />
  ));

  async function handleClick() {
    if (dateRange[1] != null) {
      const isVillaAvailableResponse = await isVillaAvailable(
        villaId ? 0 : 1,
        villaId || roomId,
        moment(dateRange[0]).format("YYYY-MM-DD").toString(),
        moment(dateRange[1]).format("YYYY-MM-DD").toString()
      );
      if (isVillaAvailableResponse?.data?.isAvailible == false) {
        //Villa müsait
        const villaReservationLocalData = {
          checkIn: moment(dateRange[0]).format("YYYY-MM-DD").toString(),
          checkOut: moment(dateRange[1]).format("YYYY-MM-DD").toString(),
          villaId,
          roomId,
          villaSlug,
          roomSlug,
          villaName,
          totalPrice: isVillaAvailableResponse?.data?.totalPrice,
          priceType: isVillaAvailableResponse?.data?.priceType,
          reservationItems: [],
          adult: numberOfAdults1,
          child: numberOfChild1,
          baby: numberOfBabies1,
          expiryDate: Math.floor(new Date().getTime() / 1000),
          villaFirstPhoto,
          region,
        };
        localStorage.setItem(
          "reservation",
          JSON.stringify(villaReservationLocalData)
        );
        router.push("/rezervasyon");
      } else {
        alert("Seçtiğiniz Tarihler Tesisimiz Müsait Değildir");
      }
    } else {
      console.log("Tarih seçin");
    }
  }

  return (
    <div className={styles.top}>
      {availible && (
        <div className={styles.modalWrapper}>
          <div className={`${styles["modal"]}`}>
            <Image alt="" src="/images/alert.png" width={44} height={38} />
            <span className={styles.modalTitle}>Uyarı!</span>
            <p>
              Seçtiğiniz tarihler arasında villa müsait değildir. Lütfen
              villanın müsaitlik takvimini kontrol ediniz.
            </p>
            <div
              onClick={() => setAvailible(false)}
              className={styles.modalButton}
            >
              Anladım
            </div>
          </div>
        </div>
      )}

      <div className={styles.reservationBox}>
        <div className={styles.reservationTitleText}>
          <div className={styles.textTop}>
            <div className={styles.price}>
              {priceTypeText}
              {prices?.length > 0
                ? Math.min(...prices?.map((o) => o.price))
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                : 0}
            </div>
          </div>
          <div className={styles.textBottom}>
            <span>Başlayan Fiyatlarla(Gecelik)</span>
          </div>
        </div>
        <div
          ref={menuRefCalendar}
          style={{ position: "relative" }}
          className={styles.colon}
        >
          <div className={styles.colonTitle}>Giriş / Çıkış</div>
          <div
            onClick={() => {
              datepickerRef.current.input.blur();
            }}
            className={styles.colonInput}
          >
            <i className={styles.loginDateIcon}></i>
            <div className="date-picker-reservation">
              <DatePicker
                ref={datepickerRef}
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                monthsShown={1}
                value={dateRange.length == 0 ? "Tarih Seçin" : dateRange}
                onChange={(update) => {
                  setMinCalendarDate(new Date(update[0]).setDate(new Date(update[0]).getDate() + 1))
                  setDateRange(update);
                  setTimeout(() => {
                    datepickerRef.current.input.blur();
                  }, 1);
                }}
                locale={tr}
                minDate={minCalendarDate}
                width="100%"
                customInput={<CustomInput />}
                onCalendarOpen={() => setIsCalendarOpen(true)} // Takvim açıldığında
                onCalendarClose={() => {setIsCalendarOpen(false); setMinCalendarDate(new Date())}} // Takvim kapandığında
              />
            </div>
          </div>
        </div>
        <div ref={menuRefNumberOfPeople} className={styles.colon}>
          <div className={styles.colonTitle}>Kişi Sayısı</div>
          <div
            onClick={() => setNumberPeople(!isNumberPeopleMenuOpen)}
            className={styles.colonInput}
          >
            <div className={styles.peopleIcon}></div>
            <input
              style={{ cursor: "pointer" }}
              ref={inputRefNumberOfPeople}
              type="text"
              placeholder="0 Misafir, 0 Bebek"
              readOnly
            ></input>
          </div>
          <div
            className={`${styles["numberPeopleOpen"]} ${
              isNumberPeopleMenuOpen && styles["active"]
            }`}
          >
            <ul>
              <li>
                <div className={styles.leftPeople}>
                  <div className={styles.title}>Yetişkinler</div>
                  <div className={styles.desc}>13 ve üzeri yaştakiler</div>
                </div>
                <div className={styles.rightPeople}>
                  <div
                    onClick={() =>
                      numberOfAdults1 != 0 && changeNumber("-", "adult")
                    }
                    className={styles.minus}
                  ></div>
                  <input
                    type={styles.text}
                    disabled
                    value={numberOfAdults1}
                    max={99}
                  />
                  <div
                    onClick={() => changeNumber("+", "adult")}
                    className={styles.plus}
                  ></div>
                </div>
              </li>
              <li>
                <div className={styles.leftPeople}>
                  <div className={styles.title}>Çocuklar</div>
                  <div className={styles.desc}>13 ve üzeri yaştakiler</div>
                </div>
                <div className={styles.rightPeople}>
                  <div
                    onClick={() =>
                      numberOfChild1 != 0 && changeNumber("-", "child")
                    }
                    className={styles.minus}
                  ></div>
                  <input
                    type={styles.text}
                    disabled
                    value={numberOfChild1}
                    max={99}
                  />
                  <div
                    onClick={() => changeNumber("+", "child")}
                    className={styles.plus}
                  ></div>
                </div>
              </li>
              <li>
                <div className={styles.leftPeople}>
                  <div className={styles.title}>Bebekler</div>
                  <div className={styles.desc}>13 ve üzeri yaştakiler</div>
                </div>
                <div className={styles.rightPeople}>
                  <div
                    onClick={() =>
                      numberOfBabies1 != 0 && changeNumber("-", "babies")
                    }
                    className={styles.minus}
                  ></div>
                  <input
                    type={styles.text}
                    disabled
                    value={numberOfBabies1}
                    max={99}
                  />
                  <div
                    onClick={() => changeNumber("+", "babies")}
                    className={styles.plus}
                  ></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.linkBox}>
          <button className={styles.blueButtonArrow} onClick={handleClick}>
            <span>Villa Müsaitliği Sorgula</span>
          </button>
        </div>
      </div>
    </div>
  );
}
