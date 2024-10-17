import { useEffect, useRef, useState, forwardRef } from "react";
import styles from "./reservation.module.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { useRouter } from "next/router";
import Link from "next/link";
import { getVillasByFilter } from "@/services/villa";
//import MyCalendar from "./MyCalendar";
import tr from "date-fns/locale/tr";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

export default function ReservationBox() {
  const [dateOfEntry, setDateOfEntry] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const datesOrSetters = {
    dateOfEntry,
    setDateOfEntry,
    releaseDate,
    setReleaseDate,
  };
  const date = new Date();
  const [activeMonth, setActiveMonth] = useState(date.getMonth());
  const router = useRouter();
  const query = router.query;
  const [datePlaceHolder, setdatePlaceHolder] = useState("Tarih Seçin");
  const [dateClickCount, setDateClickCount] = useState(0);
  const [dateClickCount1, setDateClickCount1] = useState(0);
  const inputRefNumberOfPeople = useRef();
  const inputRefVillaName = useRef();
  const menuRefNumberOfPeople = useRef();
  const menuRefCalendar = useRef();
  const menuRefVillaName = useRef();
  const [isNumberPeopleMenuOpen, setNumberPeople] = useState(false);
  const [isVillaNameMenuOpen, setVillaNameMenu] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [dateRange, setDateRange] = useState([]);
  const [startDate, endDate] = dateRange;

  const [numberOfAdults1, setNumberOfAdults1] = useState(1);
  const [numberOfChild1, setNumberOfChild1] = useState(0);
  const [numberOfBabies1, setNumberOfBabies1] = useState(0);
  const [filterText, setFilterText] = useState("");
  const [filterVillas, setFilterVillas] = useState([]);

  useEffect(() => {
    if (filterText.length >= 4) {
      setVillaNameMenu(true);
      getVillasByFilter({ villaSearchText: filterText }).then((res) => {
        setFilterVillas(res);
      });
    } else {
      setVillaNameMenu(false);
    }
  }, [filterText]);

  //23-1-2023 to 2023-01-23
  const changeDateFormat = (dateString) => {
    const array = dateString.split("-");
    const day = array[0].length == 1 ? "0" + array[0] : array[0];
    const month = array[1].length == 1 ? "0" + array[1] : array[1];
    const year = array[array.length - 1];
    return year + "-" + month + "-" + day;
  };

  useEffect(() => {
    if (releaseDate.length > 0) {
      const date1 = new Date(changeDateFormat(dateOfEntry));
      const date2 = new Date(changeDateFormat(releaseDate));

      if (date1.getTime() == date2.getTime()) {
        setdatePlaceHolder("Tarih Seçin");
        alert("Giriş çıkış günleri aynı olamaz");
      } else if (date1.getTime() > date2.getTime()) {
        setdatePlaceHolder("Tarih Seçin");
        alert("Çıkış tarihi giriş tarihinden önce olamaz");
      } else {
        setdatePlaceHolder(dateOfEntry + " / " + releaseDate);
      }
    }
  }, [releaseDate]);

  useEffect(() => {
    if (!openDate) {
      setActiveMonth(date.getMonth());
    }
  }, [openDate]);

  const [reservationDate, setReservationDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  useEffect(() => {
    setDateClickCount(dateClickCount + 1);
    //console.log(reservationDate);
    if (
      !(
        reservationDate.startDate.getTime() == reservationDate.endDate.getTime()
      )
    ) {
      girisveCikisTarihiniAl();
    }
  }, [reservationDate]);

  useEffect(() => {
    if (openDate) setDateClickCount(1);
    if (!openDate) setDateClickCount1(0);

    if (!openDate) {
      if (dateRange[1] == null) setDateRange([]);
    }
  }, [openDate]);

  useEffect(() => {
    if (dateClickCount != 1 && dateClickCount % 2 == 1) {
      setOpenDate(false);
    }
  }, [dateClickCount]);

  useEffect(() => {
    if (dateClickCount1 != 0) {
      if (dateClickCount1 % 2 == 0) {
        setOpenDate(false);
      }
    }
  }, [dateClickCount1]);

  const changeNumber = (operation, type) => {
    if (type == "adult") {
      operation == "+"
        ? setNumberOfAdults1(numberOfAdults1 + 1)
        : numberOfAdults1 > 0 && setNumberOfAdults1(numberOfAdults1 - 1);
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

  const handleSearch = () => {
    let startDate, endDate;

    if (dateRange.length > 0) {
      startDate = moment(dateRange[0]).format("DD-M-YYYY").toString();
      endDate = moment(dateRange[1]).format("DD-M-YYYY").toString();
    }

    // router.replace({
    //   pathname: "/searchs",
    //   query: {
    //     from: startDate,
    //     to: endDate,
    //   },
    // });

    if (dateRange.length == 2 && filterText !== "" && numberOfAdults1 !== 0) {
      router.replace({
        pathname: "/searchs",
        query: {
          ...query,
          name: filterText,
          from: startDate,
          to: endDate,
          person: numberOfAdults1,
        },
      });
    } else if (
      dateRange.length == 2 &&
      filterText !== "" &&
      numberOfAdults1 == 0
    ) {
      router.replace({
        pathname: "/searchs",
        query: {
          ...query,
          name: filterText,
          from: startDate,
          to: endDate,
        },
      });
    } else if (
      dateRange.length == 2 &&
      numberOfAdults1 !== 0 &&
      filterText == ""
    ) {
      router.replace({
        pathname: "/searchs",
        query: {
          ...query,
          from: startDate,
          to: endDate,
          person: numberOfAdults1,
        },
      });
    } else if (
      filterText !== "" &&
      numberOfAdults1 !== 0 &&
      dateRange.length !== 2
    ) {
      router.replace({
        pathname: "/searchs",
        query: { ...query, name: filterText, person: numberOfAdults1 },
      });
    } else if (
      filterText !== "" &&
      numberOfAdults1 == 0 &&
      dateRange.length !== 2
    ) {
      router.replace({
        pathname: "/searchs",
        query: { ...query, name: filterText },
      });
    } else if (
      dateRange.length == 2 &&
      filterText == "" &&
      numberOfAdults1 == 0
    ) {
      router.replace({
        pathname: "/searchs",
        query: { ...query, from: startDate, to: endDate },
      });
    } else if (
      numberOfAdults1 !== 0 &&
      dateRange.length !== 2 &&
      filterText == ""
    ) {
      router.replace({
        pathname: "/searchs",
        query: { ...query, person: numberOfAdults1 },
      });
    } else {
      alert("Lütfen geçerli arama yapınız!");
    }
  };

  function checkVillaMenuState() {
    if (filterText.length >= 4) {
      setVillaNameMenu(true);
    } else {
      setVillaNameMenu(false);
    }
  }

  const girisveCikisTarihiniAl = () => {
    let startDate = reservationDate.startDate;
    let endDate = reservationDate.endDate;
    let string =
      startDate.getDate() +
      "-" +
      (startDate.getMonth() + 1) +
      "-" +
      startDate.getFullYear() +
      " / " +
      endDate.getDate() +
      "-" +
      (endDate.getMonth() + 1) +
      "-" +
      endDate.getFullYear();
    setdatePlaceHolder(string);
  };

  //Herhangi bir state güncellendiğinde çalışan kod bloğu
  useEffect(() => {
    if (numberOfAdults1 != 0 || numberOfChild1 != 0 || numberOfBabies1 != 0) {
      inputRefNumberOfPeople.current.value = `${
        numberOfAdults1 + numberOfChild1
      } Misafir, ${numberOfBabies1} Bebek`;
    } else {
      inputRefNumberOfPeople.current.value = "2 Misafir, 1 Bebek";
    }
  });

  // Klavyeyi engelleyen özel input
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

  useEffect(() => {
    let handler = (e) => {
      //Kişi sayısı menüsü için
      if (!menuRefNumberOfPeople.current.contains(e.target)) {
        setNumberPeople(false);
      }

      //takvim menüsü için
      if (!menuRefCalendar.current.contains(e.target)) {
        setOpenDate(false);
      }
      if (!menuRefVillaName.current.contains(e.target)) {
        setVillaNameMenu(false);
      }
    };

    document.addEventListener("mouseup", handler);

    return () => {
      document.removeEventListener("mouseup", handler);
    };
  });

  //Global rezervasyon tarihleri değiştiğinde çalışan kod bloğu(search Butonuna basınca)
  // useEffect(() => {
  //     console.log(reservationStartDate + " " + reservationEndDate)
  // }, [reservationStartDate, reservationEndDate])

  return (
    <div className={styles.reservationBox}>
      <div
        ref={menuRefVillaName}
        style={{ position: "relative" }}
        className={`${styles["colon"]} ${styles["location"]}`}
      >
        <div className={styles.colonTitle}>Tesis Ara</div>
        <div className={styles.colonInput}>
          <i className={styles.searchIcon} />
          <input
            onClick={() => checkVillaMenuState()}
            ref={inputRefVillaName}
            onChange={(e) => setFilterText(e.target.value)}
            type="text"
            placeholder="Tesis Adı"
          />
        </div>
        <div
          className={`${styles["villaMenuOpen"]} ${
            isVillaNameMenuOpen ? styles["active"] : ""
          }`}
        >
          <ul>
            {filterVillas?.data?.length !== 0 ? (
              filterVillas?.data?.map((item, index) => {
                return (
                  <li key={index} style={{ display: "block" }}>
                    <Link
                      className={styles.villaLink}
                      href={`/villalar/${item?.id}`}
                    >
                      <div className={styles.title}>
                        {item?.villaDetails[0]?.name}
                      </div>
                    </Link>
                  </li>
                );
              })
            ) : (
              <li style={{ display: "block" }}>
                <div className={styles.villaLink}>
                  <div className={styles.title}>Sonuç yok</div>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div
        onClick={() => setOpenDate(true)}
        ref={menuRefCalendar}
        className={`${styles["colon"]} ${styles["date"]}`}
      >
        <div className={styles.colonTitle}>Giriş / Çıkış</div>
        <div className={styles.colonInput}>
          <i className={styles.dateIcon}></i>

          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            value={dateRange.length == 0 ? "Tarih Seçin" : dateRange}
            onChange={(update) => {
              setDateRange(update);
            }}
            monthsShown={2}
            locale={tr}
            minDate={new Date()}
            customInput={<CustomInput />} // Özelleştirilmiş input kullanımı
          />

          {/* <input
            readOnly
            type="text"
            className="loginDateInput datepicker"
            placeholder={datePlaceHolder}
          /> */}
        </div>
        {/* <DateRange
            locale={tr}
            editableDateInputs={true}
            onChange={(item) => setReservationDate(item.selection)}
            moveRangeOnFirstSelection={false}
            ranges={[reservationDate]}
            className={styles.dateRange}
            minDate={new Date()}
            months={2}
            direction="horizontal"
            showDateDisplay={false}
            showMonthAndYearPickers={false}
          /> */}
        {/* {openDate && (
          <div className={styles.calendarsContainer}>
            <MyCalendar
              dateClickCount1={dateClickCount1}
              setDateClickCount1={setDateClickCount1}
              datesOrSetters={datesOrSetters}
              min={date.getMonth()}
              setActiveMonth={setActiveMonth}
              activeMonth={activeMonth}
              month={activeMonth}
              type={0}
            />
            <MyCalendar
              dateClickCount1={dateClickCount1}
              setDateClickCount1={setDateClickCount1}
              datesOrSetters={datesOrSetters}
              setActiveMonth={setActiveMonth}
              activeMonth={activeMonth}
              month={activeMonth + 1}
              type={1}
            />
          </div>
        )} */}
      </div>
      <div
        onClick={() => setNumberPeople(true)}
        ref={menuRefNumberOfPeople}
        className={`${styles["colon"]} ${styles["numberPeople"]}`}
      >
        <div className={styles.colonTitle}>Kişi Sayısı</div>
        <div className={styles.colonInput}>
          <i className={styles.peopleIcon} />
          <input
            ref={inputRefNumberOfPeople}
            readOnly
            type="text"
            placeholder="2 Misafir, 1 Bebek"
          />
        </div>
        <div
          className={`${styles["numberPeopleOpen"]} ${
            isNumberPeopleMenuOpen ? styles["active"] : ""
          }`}
        >
          <ul>
            <li>
              <div className={styles.left}>
                <div className={styles.title}>Yetişkinler</div>
                <div className={styles.desc}>13 ve üzeri yaştakiler</div>
              </div>
              <div className={styles.right}>
                <div
                  onClick={() => changeNumber("-", "adult")}
                  className={styles.minus}
                ></div>
                <input
                  id="Adults"
                  type="text"
                  className={`${styles["input_amount"]} ${styles["input_adults"]}`}
                  value={numberOfAdults1}
                  max="99"
                  disabled
                />
                <div
                  onClick={() => changeNumber("+", "adult")}
                  className={styles.plus}
                ></div>
              </div>
            </li>
            <li>
              <div className={styles.left}>
                <div className={styles.title}>Çocuklar</div>
                <div className={styles.desc}>4-12 arasındaki yaşlar</div>
              </div>
              <div className={styles.right}>
                <div
                  onClick={() => changeNumber("-", "child")}
                  className={styles.minus}
                ></div>
                <input
                  id="Childs"
                  type="text"
                  className={`${styles["input_amount"]} ${styles["input_children"]}`}
                  value={numberOfChild1}
                  max="99"
                  disabled
                />
                <div
                  onClick={() => changeNumber("+", "child")}
                  className={styles.plus}
                ></div>
              </div>
            </li>
            <li>
              <div className={styles.left}>
                <div className={styles.title}>Bebekler</div>
                <div className={styles.desc}>0-3 arasındaki yaşlar</div>
              </div>
              <div className={styles.right}>
                <div
                  onClick={() => changeNumber("-", "babies")}
                  className={styles.minus}
                ></div>
                <input
                  id="Babies"
                  type="text"
                  className={`${styles["input_amount"]} ${styles["input_babies"]}`}
                  value={numberOfBabies1}
                  max="99"
                  disabled
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
      <button onClick={handleSearch} className={styles.searchButton}></button>
    </div>
  );
}
