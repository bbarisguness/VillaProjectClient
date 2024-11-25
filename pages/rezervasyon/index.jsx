"use client";
import styles from "./page.module.css";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import citiess from "../../data/tr.json";
var qs = require("qs");
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { createReservation } from "@/services/reservation";
import { getPrice, isVillaAvailable } from "@/services/reservation";
import Seo from "@/components/seo";
import moment from "moment";
import { priceTypes } from "@/data/data";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { capitalizeWords } from "@/utils/globalUtils";

export default function Reservation() {
  const { t } = useTranslation("common");
  let localPersonInfoData;
  if (typeof localStorage !== "undefined") {
    localPersonInfoData = JSON.parse(localStorage.getItem("personInfo"));
  } else {
    localPersonInfoData = null;
  }
  // const lcalPersonInfoData = JSON.parse(localStorage.getItem("personInfo"));
  const router = useRouter();
  const refOfCityMenu = useRef();
  const refOfStateMenu = useRef();
  const [isVilla, setIsVilla] = useState(false);
  const [isPageLoading, setLoading] = useState(true);
  const [reservationItems, setreservationItems] = useState([]);
  const [completedReservationData, setCompletedReservationData] = useState("");
  const priceTypeText = priceTypes?.find(
    (item) => item?.type == reservationItems?.priceType
  )?.text;
  const [citys, setCitys] = useState(null);
  const [villa, setVilla] = useState([]);
  const turkishDays = [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
  ];
  const turkishMonths = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  useEffect(() => {
    setCitys(citiess.data);
    const localData = JSON.parse(localStorage.getItem("reservation")) || null;

    if (!localData) {
      router.push("/");
    } else {
      setLoading(false);
    }

    setreservationItems(localData);
    setIsVilla(localData?.villaId ? true : false);

    return () => {
      localStorage.removeItem("reservation");
      localStorage.removeItem("personInfo");
    };
  }, []);

  useEffect(() => {
    //Menülerin dışında bir yere tıklandığı zaman menülerin kapanması için
    let handler = (e) => {
      if (activeStep == 0) {
        //İl memüsü için
        // if (!refOfCityMenu.current.contains(e.target)) {
        //     setisCitySelectionOpened(false)
        // }
        //İlçe menüsü için
        // if (!refOfStateMenu.current.contains(e.target)) {
        //     setisDistrictSelectionOpened(false)
        // }
      }
    };
    document.addEventListener("mouseup", handler);
    return () => {
      document.removeEventListener("mouseup", handler);
    };
  });

  useEffect(() => {
    if (reservationItems) {
      //console.log(reservationItems)
      //console.log(`Veriler local storageye eklendikten sonra geçen süre : ${Math.floor(new Date().getTime() / 1000) - reservationItems[0].expiryDate} saniye`
      //1 saat sonra local storagedeki veriler otomatik olarak silinir ve anasayfaya yönlendirilir
      if (
        Math.floor(new Date().getTime() / 1000) - reservationItems.expiryDate >
        3600
      ) {
        localStorage.removeItem("reservation");
        router.push("/");
      }
    }
  }, [reservationItems]);

  //days(getDateString('g'),getDateString('c'))

  const [activeStep, setActiveStep] = useState(0);
  // useEffect(() => {
  //     if (activeStep == 2) {
  //         setTimeout(() => {
  //             localStorage.removeItem("reservationItems")
  //             router.push("/")
  //         }, 3000)
  //     }
  // }, [activeStep])
  const [transferType, settransferType] = useState(1); // 0 = creditCard, 1= transfer

  const [isCitySelectionOpened, setisCitySelectionOpened] = useState(false);

  const [isDistrictSelectionOpened, setisDistrictSelectionOpened] =
    useState(false);

  const phoneFormat = (string) => {
    // Rakam dışındaki karakterleri temizle
    let cleaned = ("" + string).replace(/\D/g, "").replace(/^0+/, "");

    // Format: (•••) ••• •• ••
    let formattedNumber = "";

    if (cleaned.length > 0) {
      formattedNumber += "(" + cleaned.substring(0, 3);
    }

    if (cleaned.length >= 4) {
      formattedNumber += ") " + cleaned.substring(3, 6);
    }

    if (cleaned.length >= 7) {
      formattedNumber += " " + cleaned.substring(6, 8);
    }

    if (cleaned.length >= 9) {
      formattedNumber += " " + cleaned.substring(8, 10);
    }

    return formattedNumber;
  };

  //20 Kasım 2021 Salı formatında metin döndürür
  const getDateString = (girismiCikismi = "g") => {
    if (reservationItems?.length != 0) {
      let dateArray =
        girismiCikismi == "g"
          ? reservationItems.checkIn.split("-")
          : reservationItems.checkOut.split("-");
      let year = dateArray[0];
      let month = dateArray[1][0] == "0" ? dateArray[1][1] : dateArray[1];
      let day =
        dateArray[dateArray.length - 1][0] == "0"
          ? dateArray[dateArray.length - 1][1]
          : dateArray[dateArray.length - 1];

      let date = new Date(year, month - 1, day);
      let dayName = turkishDays[date.getDay()];
      let monthName = turkishMonths[date.getMonth()];

      return `${day} ${monthName} ${year} ${dayName}`;
    }

    return girismiCikismi == "g" ? t("entrance") : t("exit");
  };

  //#region Rezervasyon Günleri
  const [isDayReady, setIsDayReady] = useState(false);
  async function days(firstDay, lastDay) {
    //debugger
    //var day = new Date(firstDay)

    var day = new Date(firstDay);

    while (day <= new Date(lastDay)) {
      day.setDate(day.getDate() + 1);

      // burada oluşturulan günlerin price bilgileri apiden çekilecek
    }
    setIsDayReady(true);
  }

  if (reservationItems?.length > 0) {
    if (reservationItems[0].startDate) {
      if (!isDayReady) {
        days(
          reservationItems[0].startDate.toString(),
          reservationItems[0].endDate.toString()
        );
      }
    }
  }
  //#endregion

  function submitFormPerson(values) {
    const person = {
      data: {
        name: values.name,
        surname: values.surname,
        idNo: values.idNo,
        email: values.email,
        phone: values.phone,
      },
    };

    // createReservation(person).then((res) => {
    //     console.log(res);
    // })

    // //alert("burda")

    // //dispatch(changePersonInfo(person))

    // //localStorage.setItem('reservationItems', JSON.stringify(items));

    localStorage.setItem("personInfo", JSON.stringify(person));

    // //console.log(localStorage.getItem('personInfo'));

    // //console.log(values)
    setActiveStep(1);
    window.scrollTo(0, 0);
  }

  async function submitFormPay(values) {
    const personData = JSON.parse(localStorage.getItem("personInfo"));
    const reservationData = JSON.parse(localStorage.getItem("reservation"));

    if (transferType == 1) {
      const availableResponse = await isVillaAvailable(
        reservationData?.villaId ? 0 : 1,
        values?.villaId ? values?.villaId : values?.roomId,
        values.checkIn,
        values.checkOut
      );

      if (availableResponse?.data?.isAvailible == false) {
        const createResponse = await createReservation(
          reservationData?.villaId ? 0 : 1,
          reservationData,
          personData?.data,
          values.villaName
        );
        if (createResponse?.statusCode == 200) {
          //console.log(createResponse?.data);
          setActiveStep(2);
          setCompletedReservationData(createResponse?.data);
        } else {
          alert(createResponse?.message || t("aProblemOccurred"));
        }
      } else {
        alert(t("facilityNotAvailableMessage"));
        router.back();
      }
    } else {
      // kredi kartı ile ödeme doğrula ve ardından rezervasyonu oluştur
      // if(!paymetStatus)
      // {
      //     // kredi kartı ödeme hatası hiç bir yere gitme
      // }
      console.log(values);
    }

    //setActiveStep(2)
    //window.scrollTo(0, 0)
  }

  return (
    <>
      <Seo
        pageTitle={"Labirent Fethiye | Rezervasyon Oluştur"}
        pageDesc={"Labirent Fethiye Rezervasyon Oluşturma"}
      />
      <section className={`${styles["contentDetail"]}`}>
        {isPageLoading && (
          <div className={"loadingBox"}>
            <div className="loadingEffect">
              <div className="loadingLogo">
                <div
                  className="loadingLogo"
                  style={{ backgroundImage: "url(/images/labirent.png)" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div className={styles.stepMenuBox}>
          <div className={styles.container}>
            <ul>
              <li className={activeStep == 0 ? styles.active : ""}>
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    if (activeStep > 0 && activeStep != 2) {
                      setActiveStep(0);
                    }
                  }}
                  href="#"
                >
                  <div className={styles.imageBg}>
                    <div className={styles.imageBox}>
                      <i className={styles.firstIcon}></i>
                    </div>
                  </div>
                  <div className={styles.textBox}>
                    <div className={styles.text}>
                      {t("personalInformation")}
                    </div>
                    <div className={styles.number}>01</div>
                  </div>
                </Link>
              </li>
              <li className={activeStep == 1 ? styles.active : ""}>
                <Link onClick={(e) => e.preventDefault()} href="#">
                  <div className={styles.imageBg}>
                    <div className={styles.imageBox}>
                      <i className={styles.secondIcon}></i>
                    </div>
                  </div>
                  <div className={styles.textBox}>
                    <div className={styles.text}>
                      {t("completeReservation")}
                    </div>
                    <div className={styles.number}>02</div>
                  </div>
                </Link>
              </li>
              <li className={activeStep == 2 ? styles.active : ""}>
                <Link onClick={(e) => e.preventDefault()} href="#">
                  <div className={styles.imageBg}>
                    <div className={styles.imageBox}>
                      <i className={styles.thirdIcon}></i>
                    </div>
                  </div>
                  <div className={styles.textBox}>
                    <div className={styles.text}>{t("startYourVacation")}</div>
                    <div className={styles.number}>03</div>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.rezervationBox}>
          <div className={styles.container}>
            <div className={styles.reservation}>
              <div className={styles.left}>
                {activeStep == 0 && (
                  <div className={styles.personInfoBox}>
                    <div className={styles.subTitle}>
                      {t("personalInformation")}
                    </div>
                    <Formik
                      initialValues={{
                        name: localPersonInfoData?.data?.name || "",
                        surname: localPersonInfoData?.data?.surname || "",
                        idNo: localPersonInfoData?.data?.idNo || "",
                        email: localPersonInfoData?.data?.email || "",
                        phone: localPersonInfoData?.data?.phone || "",
                        stateAreaClicked: false,
                      }}
                      validationSchema={Yup.object({
                        name: Yup.string().required(
                          t("thisFieldCannotBeLeftBlank")
                        ),
                        surname: Yup.string().required(
                          t("thisFieldCannotBeLeftBlank")
                        ),
                        idNo: Yup.string()
                          .length(11, t("IdNumberMustBeDigits", { digit: 11 }))
                          .test(
                            "no-leading-zero",
                            t("IdNumberCannotStartWith0", { number: 0 }),
                            (value) => value && !value.startsWith("0")
                          )
                          .required(t("thisFieldCannotBeLeftBlank")),
                        phone: Yup.string()
                          .length(15, t("pleaseEnterAValidPhoneNumber"))
                          .required(t("thisFieldCannotBeLeftBlank")),
                      })}
                      onSubmit={(values) => {
                        submitFormPerson(values);
                      }}
                    >
                      {({
                        values,
                        errors,
                        handleChange,
                        handleSubmit,
                        handleReset,
                        dirty,
                        isSubmitting,
                        touched,
                        setFieldValue,
                      }) => (
                        <form onSubmit={handleSubmit}>
                          <ul>
                            <li>
                              <div className={styles.inputBox}>
                                <div className={styles.inputName}>
                                  {t("yourName")}
                                </div>
                                <input
                                  name="name"
                                  value={values.name}
                                  onChange={handleChange}
                                  type="text"
                                  placeholder="•••••"
                                  minLength="2"
                                  maxLength="30"
                                />
                                {errors.name && touched.name && (
                                  <div className={styles.inputFeedback}>
                                    {errors.name}
                                  </div>
                                )}
                              </div>
                            </li>
                            <li>
                              <div className={styles.inputBox}>
                                <div className={styles.inputName}>
                                  {t("yourSurname")}
                                </div>
                                <input
                                  name="surname"
                                  value={values.surname}
                                  onChange={handleChange}
                                  type="text"
                                  placeholder="•••••"
                                  minLength="2"
                                  maxLength="30"
                                />
                                {errors.surname && touched.surname && (
                                  <div className={styles.inputFeedback}>
                                    {errors.surname}
                                  </div>
                                )}
                              </div>
                            </li>
                            <li>
                              <div className={styles.inputBox}>
                                <div className={styles.inputName}>
                                  {t("idNo")}
                                </div>
                                <input
                                  name="idNo"
                                  value={values.idNo}
                                  onChange={(e) => {
                                    const numericValue = e.target.value.replace(
                                      /\D/g,
                                      ""
                                    ); // Rakam olmayan karakterleri kaldırır
                                    handleChange({
                                      target: {
                                        name: "idNo",
                                        value: numericValue,
                                      },
                                    });
                                  }}
                                  type="text"
                                  placeholder="•••••"
                                  minLength="2"
                                  maxLength="11"
                                />
                                {errors.idNo && touched.idNo && (
                                  <div className={styles.inputFeedback}>
                                    {errors.idNo}
                                  </div>
                                )}
                              </div>
                            </li>
                            <li>
                              <div className={styles.inputBox}>
                                <div className={styles.inputName}>
                                  {t("eMail")}
                                </div>
                                <input
                                  name="email"
                                  value={values.email}
                                  onChange={handleChange}
                                  type="text"
                                  placeholder="•••••••••"
                                  maxLength="50"
                                />
                                {errors.email && touched.email && (
                                  <div className={styles.inputFeedback}>
                                    {errors.email}
                                  </div>
                                )}
                              </div>
                            </li>
                            <li>
                              <div className={styles.inputBox}>
                                <div className={styles.inputName}>
                                  {t("phone")}
                                </div>
                                <input
                                  name="phone"
                                  value={values.phone}
                                  onChange={(e) =>
                                    setFieldValue(
                                      "phone",
                                      phoneFormat(e.target.value)
                                    )
                                  }
                                  type="text"
                                  placeholder="(•••) ••• •• ••"
                                  maxLength="15"
                                />
                                {errors.phone && touched.phone && (
                                  <div className={styles.inputFeedback}>
                                    {errors.phone}
                                  </div>
                                )}
                              </div>
                            </li>
                            {/* <li>
                                                        <div className={styles.inputBox}>
                                                            <div className={styles.inputName}>İl</div>
                                                            {
                                                                errors.city && touched.city && (
                                                                    <div className={styles.inputFeedback}>
                                                                        {errors.city}
                                                                    </div>
                                                                )
                                                            }
                                                            <span ref={refOfCityMenu} onClick={() => setisCitySelectionOpened(!isCitySelectionOpened)} className={`${styles['form_city']} ${values.stateAreaClicked && styles['requareClick']} ${isCitySelectionOpened ? styles['opened'] : ''}`}>
                                                                <span className={styles.selectedItem}>{values.city == '' ? 'İl Seçiniz' : values.city}</span>
                                                                <span className={styles.selection_arrow}></span>
                                                                {isCitySelectionOpened && (<div className={styles.cityDropMenu}>
                                                                    {
                                                                        citys?.map(city => (
                                                                            <span key={city.il_adi} onClick={() => { setFieldValue('city', city.il_adi); setFieldValue('stateAreaClicked', false) }} className={styles.dropMenuItem}>{city.il_adi}</span>
                                                                        ))
                                                                    }
                                                                </div>)}
                                                            </span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className={styles.inputBox}>
                                                            <div className={styles.inputName}>İlçe</div>
                                                            {
                                                                errors.ilce && touched.ilce && (
                                                                    <div className={styles.inputFeedback}>
                                                                        {errors.ilce}
                                                                    </div>
                                                                )
                                                            }
                                                            <span ref={refOfStateMenu} onClick={() => { if (values.city != "") { setisDistrictSelectionOpened(!isDistrictSelectionOpened) } else { setFieldValue('stateAreaClicked', true) } }} className={`${styles['form_city']} ${isDistrictSelectionOpened ? styles['opened'] : ''}`}>
                                                                <span className={styles.selectedItem}>{values.ilce == '' ? 'İlçe Seçiniz' : values.ilce}</span>
                                                                <span className={styles.selection_arrow}></span>
                                                                {isDistrictSelectionOpened && (<div className={styles.cityDropMenu}>
                                                                    {
                                                                        citiess.data.filter(il => il.il_adi == values.city)[0].ilceler?.map(ilce => (
                                                                            <span key={ilce.ilce_adi} onClick={() => setFieldValue('ilce', ilce.ilce_adi)} className={styles.dropMenuItem}>{ilce.ilce_adi}</span>
                                                                        ))
                                                                    }
                                                                </div>)}
                                                            </span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className={styles.inputBox}>
                                                            <div className={styles.inputName}>Posta Kodu</div>
                                                            <input name="zipCode" value={values.zipCode} onChange={handleChange} type="text" placeholder="•••••" minLength="5" maxLength="5" />
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className={styles.inputBox}>
                                                            <div className={styles.inputName}>Tc No *</div>
                                                            <input name="tcNo" value={values.tcNo} onChange={handleChange} type="text" placeholder="•••••••••••" minLength="11" maxLength="11" />
                                                        </div>
                                                    </li>
                                                    <li className={styles.full}>
                                                        <div className={styles.inputBox}>
                                                            <div className={styles.inputName}>Adres</div>
                                                            <input name="address" value={values.address} onChange={handleChange} type="text" placeholder="•••" maxLength="100" />
                                                        </div>
                                                    </li>
                                                    <li className={styles.full}>
                                                        <div className={styles.inputBox}>
                                                            <div className={styles.inputName}>Varsa Notunuz</div>
                                                            <textarea name="note" value={values.note} onChange={handleChange} rows="4" cols="50" maxLength="300" placeholder="•••"></textarea>
                                                        </div>
                                                    </li> */}
                          </ul>
                          <div
                            className={styles.linkBox}
                            style={{ justifyContent: "flex-end" }}
                          >
                            <button
                              className={styles.blueButtonArrow}
                              type="submit"
                            >
                              <span>{t("continue")}</span>
                            </button>
                          </div>
                        </form>
                      )}
                    </Formik>
                  </div>
                )}

                {activeStep == 1 && (
                  <div className={styles.paymentBox}>
                    <div className={styles.subTitle}>{t("payWith")}</div>
                    <div className={styles.payment}>
                      <div className={styles.paymentType}>
                        <ul>
                          <li className={`${styles["creditCard"]}`}>
                            <Link onClick={(e) => e.preventDefault()} href="#">
                              <div className={styles.imageBox}>
                                <i className={styles.creditCardIcon}></i>
                              </div>
                              <div className={styles.textBox}>
                                <div className={styles.title}>
                                  {t("paymentByCreditCard")} ( {t("soon")}! )
                                </div>
                                <div className={styles.desc}>
                                  {t("paymentByCreditCardMessage")}.
                                </div>
                              </div>
                            </Link>
                          </li>
                          <li
                            className={`${styles["transfer"]} ${
                              transferType == 1 && styles["active"]
                            }`}
                          >
                            <Link
                              onClick={(e) => {
                                e.preventDefault();
                                settransferType(1);
                              }}
                              href="#"
                            >
                              <div className={styles.imageBox}>
                                <i className={styles.transferIcon}></i>
                              </div>
                              <div className={styles.textBox}>
                                <div className={styles.title}>
                                  {t("paymentByMoneyOrder")}
                                </div>
                                <div className={styles.desc}>
                                  {t("paymentByMoneyOrderMessage")}.
                                </div>
                              </div>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className={styles.paymentInformation}>
                        <div
                          className={`${styles["creditCardBox"]} ${
                            transferType == 0 ? styles["active"] : ""
                          }`}
                        >
                          <Formik
                            initialValues={{
                              cardNo: "",
                              lastDate: "",
                              securityCode: "",
                            }}
                            validationSchema={Yup.object({
                              cardNo: Yup.string(),
                              lastDate: Yup.string(),
                              securityCode: Yup.string(),
                            })}
                            onSubmit={(values) => {
                              submitFormPay(values);

                              //console.log(values)
                              //console.log(transferType);
                              // setActiveStep(2)
                              // window.scrollTo(0, 0)
                            }}
                          >
                            {({
                              values,
                              errors,
                              handleChange,
                              handleSubmit,
                              handleReset,
                              dirty,
                              isSubmitting,
                              touched,
                            }) => (
                              <form onSubmit={handleSubmit}>
                                <ul>
                                  <li className={styles.full}>
                                    <div className={styles.inputBox}>
                                      <div className={styles.inputName}>
                                        {t("cardNo")}
                                      </div>
                                      <input
                                        onChange={handleChange}
                                        name="cardNo"
                                        type="text"
                                        placeholder="•••• •••• •••• ••••"
                                        minLength="19"
                                        maxLength="19"
                                      />
                                    </div>
                                  </li>
                                  <li>
                                    <div className={styles.inputBox}>
                                      <div className={styles.inputName}>
                                        {t("expirationDate")}
                                      </div>
                                      <input
                                        onChange={handleChange}
                                        name="lastDate"
                                        type="text"
                                        placeholder="•• / ••"
                                        minLength="7"
                                        maxLength="7"
                                      />
                                    </div>
                                  </li>
                                  <li>
                                    <div className={styles.inputBox}>
                                      <div className={styles.inputName}>
                                        CVV
                                      </div>
                                      <input
                                        onChange={handleChange}
                                        name="securityCode"
                                        type="text"
                                        placeholder="•••"
                                        minLength="3"
                                        maxLength="3"
                                      />
                                    </div>
                                  </li>
                                </ul>
                                <div className={styles.linkBox}>
                                  <button
                                    className={styles.blueButtonArrow}
                                    type="submit"
                                  >
                                    <span>{t("continue")}</span>
                                  </button>
                                </div>
                              </form>
                            )}
                          </Formik>
                        </div>
                        <div
                          className={`${styles["transferbox"]} ${
                            transferType == 1 ? styles["active"] : ""
                          }`}
                        >
                          <ul>
                            <li>
                              <div className={styles.title}>{t("bank")}</div>
                              <div className={styles.desc}>Garanti Bankası</div>
                            </li>
                            <li>
                              <div className={styles.title}>
                                {t("accountOwner")}
                              </div>
                              <div className={styles.desc}>Labirent Villa</div>
                            </li>
                            <li>
                              <div className={styles.title}>{t("iban")}</div>
                              <div className={styles.desc}>
                                TR54 0000 0000 0000 0000 0000 00
                              </div>
                            </li>
                            <li>
                              <div className={styles.title}>
                                {t("yourOrderNumber")}
                              </div>
                              <div className={styles.desc}>2038390</div>
                            </li>
                            <li className={styles.full}>
                              <div className={styles.desc}>
                                *{t("paymentByMoneyOrderDesc")}.
                              </div>
                            </li>
                          </ul>
                          <div className={styles.linkBox}>
                            <Link
                              onClick={(e) => {
                                e.preventDefault();
                                submitFormPay(
                                  reservationItems
                                ); /*setActiveStep(2); window.scrollTo(0, 0) */
                              }}
                              href="#"
                              className={styles.blueButtonArrow}
                            >
                              <span>{t("createReservation")}</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeStep == 2 && (
                  <div className={styles.successMessage}>
                    <div className={styles.iconBox}>
                      <i></i>
                    </div>
                    <div className={styles.textBox}>
                      <div className={styles.title}>
                        {t("thanks")}. {t("createdReservationMessage")}.
                      </div>
                      <div className={styles.desc}>
                        {t("createdReservationDesc")}.
                      </div>
                    </div>
                    <div className={styles.controls}>
                      <div
                        style={{
                          width: 300,
                          height: 250,
                          backgroundPosition: "center",
                          borderRadius: 20,
                          backgroundImage: reservationItems?.villaFirstPhoto
                            ? reservationItems?.villaId
                              ? `url(${
                                  process.env.NEXT_PUBLIC_APIPHOTOS_URL +
                                  "k_" +
                                  reservationItems?.villaFirstPhoto
                                })`
                              : `url(${
                                  process.env.NEXT_PUBLIC_APIROOMPHOTOS_URL +
                                  "k_" +
                                  reservationItems?.villaFirstPhoto
                                })`
                            : "none",
                        }}
                      ></div>
                      <div className={styles.reservationInfosContainer}>
                        <div className={styles.area1}>
                          <div className={styles.reservationInfos}>
                            <span className={styles.title}>
                              {t("reservationInfos")}
                            </span>
                            <span>Giriş {reservationItems?.checkIn}</span>
                            <span>Çıkış {reservationItems?.checkOut}</span>
                            <span>
                              {moment
                                .duration(
                                  moment(
                                    reservationItems?.checkOut,
                                    "YYYY-MM-DD"
                                  ).diff(
                                    moment(
                                      reservationItems?.checkIn,
                                      "YYYY-MM-DD"
                                    )
                                  )
                                )
                                .asDays()}{" "}
                              {capitalizeWords(t("night"))}
                            </span>
                            <span>
                              {t("price")}{" "}
                              {reservationItems?.totalPrice
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                              {priceTypeText}
                            </span>
                          </div>
                          <div className={styles.reservationInfos}>
                            <span className={styles.title}>
                              {t("customerInformation")}
                            </span>
                            <span>
                              {completedReservationData?.reservationInfos?.name}{" "}
                              {
                                completedReservationData?.reservationInfos
                                  ?.surname
                              }
                            </span>
                            <span>
                              {
                                completedReservationData?.reservationInfos
                                  ?.email
                              }
                            </span>
                            <span>
                              {
                                completedReservationData?.reservationInfos
                                  ?.phone
                              }
                            </span>
                          </div>
                        </div>
                        <div className={styles.reservationInfos}>
                          <span className={styles.title}>
                            {t("yourReservationNumber")}
                          </span>
                          <span className={styles.title}>
                            {completedReservationData?.reservationNumber}
                          </span>
                          <Link
                            style={{ textDecoration: "underline" }}
                            href={`/${isVilla ? "villalar" : "odalar"}/${
                              reservationItems?.villaSlug ||
                              reservationItems?.roomSlug
                            }`}
                          >
                            {t("goToFacilityDetails")}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {activeStep !== 2 && (
                <div className={styles.right}>
                  <div className={styles.top}>
                    <div className={styles.imageBox}>
                      <div
                        className={styles.img}
                        style={{
                          backgroundImage: reservationItems?.villaFirstPhoto
                            ? reservationItems?.villaId
                              ? `url(${
                                  process.env.NEXT_PUBLIC_APIPHOTOS_URL +
                                  "k_" +
                                  reservationItems?.villaFirstPhoto
                                })`
                              : `url(${
                                  process.env.NEXT_PUBLIC_APIROOMPHOTOS_URL +
                                  "k_" +
                                  reservationItems?.villaFirstPhoto
                                })`
                            : "none",
                        }}
                      ></div>
                    </div>
                    <div className={styles.textBox}>
                      <div className={styles.title}>
                        {reservationItems?.villaName}
                      </div>
                      <div className={styles.desc}>
                        {reservationItems?.region || "yok"}
                      </div>
                    </div>
                  </div>
                  <div className={styles.bottom}>
                    <ul>
                      <li>
                        <div className={styles.visitorNumberBox}>
                          <div className={styles.visitorBox}>
                            <span>
                              {reservationItems &&
                                `${reservationItems.adult} Yetişkin, ${reservationItems.child} Çocuk, ${reservationItems.baby} Bebek`}
                            </span>
                          </div>
                          {/* <div className={styles.changeButton}>
                            <Link onClick={(e) => e.preventDefault()} href="#">
                              Değiştir
                            </Link>
                          </div> */}
                        </div>
                      </li>
                      <li>
                        <div className={styles.dateBox}>
                          <div className={styles.date}>
                            <div className={styles.title}>Giriş</div>
                            <div className={styles.textBox}>
                              <span>
                                {reservationItems && getDateString("g")}
                              </span>
                            </div>
                          </div>
                          <div className={styles.date}>
                            <div className={styles.title}>Çıkış</div>
                            <div className={styles.textBox}>
                              <span>
                                {reservationItems && getDateString("c")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className={styles.priceBox}>
                          <span>
                            {moment
                              .duration(
                                moment(
                                  reservationItems?.checkOut,
                                  "YYYY-MM-DD"
                                ).diff(
                                  moment(
                                    reservationItems?.checkIn,
                                    "YYYY-MM-DD"
                                  )
                                )
                              )
                              .asDays()}{" "}
                            Gece{" "}
                          </span>
                          <span>
                            {[reservationItems?.totalPrice]
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                            {priceTypeText}
                          </span>
                        </div>
                        {/* <div className={styles.priceBox}>
                                        <span>3715 ₺ <i></i></span>
                                        <span>400 ₺</span>
                                    </div> */}
                      </li>
                      <li>
                        <div className={styles.priceBox}>
                          <span>{t("advancePayment")}</span>
                          <span>
                            {((reservationItems?.totalPrice * 30) / 100)
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                            {priceTypeText}
                          </span>
                        </div>
                        <div className={styles.priceBox}>
                          <span>{t("paymentUponEntry")}</span>
                          <span>
                            {(
                              reservationItems?.totalPrice -
                              (reservationItems?.totalPrice * 30) / 100
                            )
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                            {priceTypeText}
                          </span>
                        </div>
                        <div className={styles.priceBox}>
                          <span>{t("total")}</span>
                          <span>
                            <strong>
                              {[reservationItems?.totalPrice]
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                              {priceTypeText}
                            </strong>
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return { props: { ...(await serverSideTranslations(locale, ["common"])) } };
}
