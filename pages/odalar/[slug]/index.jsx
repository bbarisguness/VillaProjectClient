import VillaCard from "@/components/index/villa/card/villaCard";
import { getRoom, createComment } from "@/services/villa";
import "@/styles/styles.css";
import { useRouter } from "next/router";

// villa detay
import Link from "next/link";
import styles from "./page.module.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import FoodPackage from "@/components/villaDetail/rightBar/foodPackage/foodPackage";
import Reservation from "@/components/villaDetail/rightBar/reservation/reservation";
import Calendar from "@/components/villaDetail/leftBar/calendar/calendar";
import DistanceRuler from "@/components/villaDetail/leftBar/distanceRuler/distanceRuler";
import Gallery from "@/components/villaDetail/leftBar/gallery/gallery";
import PriceTable from "@/components/villaDetail/leftBar/priceTable/priceTable";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from "lightgallery/plugins/video";
import { useEffect, useState } from "react";
import Seo from "@/components/seo";
import VideoWithComment from "@/components/villaDetail/VideoWithComment";
import { Rating } from "react-simple-star-rating";
import * as Yup from "yup";
import { Formik } from "formik";
import { priceTypes } from "@/data/data";
import { getPriceRange } from "@/utils/globalUtils";
import Comments from "@/components/other/Comments";

export default function List({
  roomDetail,
  nearVillas,
  imgs,
  totalPage,
  roomId,
  villaName,
}) {
  console.log(roomDetail)
  const currentPriceTypeText = priceTypes?.find(
    (item) => item?.type == roomDetail?.data?.priceType
  )?.text;
  const router = useRouter();
  const [ready, setReady] = useState(true);
  const [isDescOpen, setIsDescOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [ismakeReservationButtonHidden, setMakeReservationButtonHidden] =
    useState(false);

  const observeElementVisibility = function (
    element_id,
    enterCallback,
    exitCallback
  ) {
    const element = document.getElementById(element_id);

    if (element) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Element görünür hale geldiğinde çalışacak
            enterCallback();
          } else {
            // Element görünümden çıktığında çalışacak
            exitCallback();
          }
        });
      });

      observer.observe(element); // Elementi gözlemlemeye başla
    }
  };

  const handleRating = (rate) => {
    setRating(rate);
    // other logic
  };

  const scrolltoHash = function (element_id) {
    const element = document.getElementById(element_id);
    element?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });

    observeElementVisibility(
      "makeReservation",
      () => {
        setMakeReservationButtonHidden(true);
      },
      () => {
        setMakeReservationButtonHidden(false);
      }
    );
  };

  if (roomDetail?.data) {
    return (
      <>
        <Seo
          pageTitle={roomDetail?.data?.roomDetails[0]?.name}
          pageDesc={roomDetail?.data[0]?.attributes?.metaDescription}
        />
        {/* <section className={styles.breadCrumb}>
          <div className={styles.container}>
            <div className={styles.breadCrumbBox}>
              <ul className={styles.breadCrumbList}>
                <li className={styles.breadCrumbItem}>
                  <Link href="/">Anasayfa</Link>
                </li>
                {roomDetail?.data?.categories[0] && (
                  <li className={styles.breadCrumbItem}>
                    <Link href={`/villalar/${categorySlug}`}>
                      {
                        roomDetail?.data?.categories[0]?.categoryDetails[0]
                          ?.name
                      }
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </section> */}
        {!ismakeReservationButtonHidden && (
          <div
            onClick={() => scrolltoHash("makeReservation")}
            className={styles.makeAReservation}
          >
            <span>Rezervasyon Yap</span>
          </div>
        )}
        <section
          className={`${styles["contentDetail"]} ${styles["villaDetail"]}`}
        >
          <div className={styles.detailTitleBox}>
            <div className={styles.container}>
              <div className={styles.box}>
                <div className={styles.left}>
                  <div className={styles.detailTitle}>
                    {roomDetail?.data?.roomDetails[0]?.name}
                  </div>
                  <div className={styles.villaInformation}>
                    <div className={styles.features}>
                      <div className={styles.colon}>
                        <i className={styles.pin_icon}></i>
                        <span>
                          {roomDetail?.data?.town?.district?.name} /{" "}
                          {roomDetail?.data?.town?.name}
                        </span>
                      </div>
                      <div className={styles.colon}>
                        <i className={styles.person_icon}></i>
                        <span>{roomDetail?.data?.person} Kişi</span>
                      </div>
                      <div className={styles.colon}>
                        <i className={styles.room_icon}></i>
                        <span>{roomDetail?.data?.room} Oda</span>
                      </div>
                      <div className={styles.colon}>
                        <i className={styles.bath_icon}></i>
                        <span>{roomDetail?.data?.bath} Banyo</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.right}>
                  <div className={styles.priceType}>Gecelik En Düşük</div>
                  <div className={styles.price}>
                    {getPriceRange(
                      roomDetail?.data?.priceTables,
                      currentPriceTypeText
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.productImagesBox}>
            <div className={styles.container}>
              <div className={styles.productImages}>
                <div className={styles.row}>
                  <Gallery photos={imgs} from={"roomDetail"} />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.villaDetailContentBox}>
            <div className={styles.container}>
              <div className={styles.villaDetailContent}>
                <div className={styles.left}>
                  <div className={styles.villaDetailTitle}>Villa Açıklama</div>
                  <div className={styles.villaDetailDesc}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          roomDetail?.data?.roomDetails[0]?.descriptionLong,
                      }}
                      style={{ whiteSpace: "pre-line" }}
                      className={`${styles["desc"]} ${
                        isDescOpen && styles["active"]
                      }`}
                    ></div>
                    <div
                      className={`${styles["readMore"]} ${
                        isDescOpen && styles["active"]
                      }`}
                    >
                      <div className={styles.allButton}>
                        <span
                          onClick={() => setIsDescOpen(true)}
                          className={styles.first}
                        >
                          Devamı...
                        </span>
                        <span
                          onClick={() => setIsDescOpen(false)}
                          className={styles.last}
                        >
                          Kapat...
                        </span>
                      </div>
                    </div>
                  </div>
                  <DistanceRuler data={roomDetail?.data?.distanceRulers} />
                  <PriceTable
                    priceTypeNumber={roomDetail?.data?.priceType || 1}
                    data={roomDetail?.data?.priceTables}
                  />
                  <Calendar
                    ready={ready}
                    dates={roomDetail?.data?.reservationCalendars || []}
                    calendarPrices={roomDetail?.data?.prices || []}
                    priceTypeText={currentPriceTypeText}
                  />
                </div>
                <div id="makeReservation" style={{ paddingTop: 20 }}>
                  <div className={styles.right}>
                    <div className={styles.general}>
                      <Reservation
                        priceTypeText={currentPriceTypeText}
                        roomId={roomId}
                        villaName={villaName}
                        prices={roomDetail?.data?.priceTables}
                        villaFirstPhoto={
                          roomDetail?.data?.photos[0]?.image || null
                        }
                        region={
                          roomDetail?.data?.town?.district?.name +
                          " / " +
                          roomDetail?.data?.town?.name
                        }
                      />
                      {/* <FoodPackage /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.dualBoxes}>
            <div className={styles.container}>
              <div className={styles.row}>
                <ul>
                  {/* <li>
                                        <div className={styles.title}>Konum</div>
                                        <div className={styles.box} style={{ backgroundImage: `url(http://3.127.136.179:1337${villa?.attributes?.locationImage?.data?.attributes?.formats?.medium?.url})`, backgroundPosition: "center", backgroundSize: "100% 100%" }}>
                                            <div className={styles.linkBox} style={{ position: "relative", width: "50px", height: "50px", left: "15px", top: "15px" }}>
                                                <Link className={styles.blueButton} href={villa?.attributes?.locationLink ? villa?.attributes?.locationLink : '#'} target="_blank">
                                                    <span>Konum</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </li> */}
                  {roomDetail?.data[0]?.attributes?.video && (
                    <li className={styles.popupImage}>
                      <div className={styles.title}>Tanıtım Videosu</div>
                      <div className={styles.box}>
                        <LightGallery
                          plugins={[lgZoom, lgVideo]}
                          elementClassNames={styles.videoContainer}
                        >
                          <a data-src="https://www.youtube.com/embed/cFYXWYyYcB0">
                            <div className={styles.imageBox}>
                              <div
                                className={styles.img}
                                style={{
                                  backgroundImage: `url(${imgs?.data[0]?.attributes?.photo?.data?.attributes?.url})`,
                                }}
                              ></div>
                            </div>
                          </a>
                        </LightGallery>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.customerCommentsBox}>
            <div className={styles.container}>
              <div className={styles.customerComments}>
                {/* <Comments /> */}
                <div className={styles.commentForm}>
                  <div className={styles.title}>Yorumunuzu Bekliyoruz</div>
                  <div className={styles.row}>
                    <ul className={styles.commentUl}>
                      <li className={styles.commentLi}>
                        <div className={styles.textandRating}>
                          <div className={styles.text}>Temizlik</div>
                          <div
                            className={`${styles["stars"]} ${styles["active"]}`}
                          >
                            <div className={styles.starItems} rating="5">
                              <div
                                className={`${styles["starItem"]} ${styles["active"]}`}
                              >
                                <div className={styles.star}></div>
                              </div>
                              <div
                                className={`${styles["starItem"]} ${styles["active"]}`}
                              >
                                <div className={styles.star}></div>
                              </div>
                              <div
                                className={`${styles["starItem"]} ${styles["active"]}`}
                              >
                                <div className={styles.star}></div>
                              </div>
                              <div
                                className={`${styles["starItem"]} ${styles["active"]}`}
                              >
                                <div className={styles.star}></div>
                              </div>
                              <div
                                className={`${styles["starItem"]} ${styles["active"]}`}
                              >
                                <div className={styles.star}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className={styles.commentLi}>
                        <div className={styles.textandRating}>
                          <div className={styles.text}>Doğruluk</div>
                          <div
                            className={`${styles["stars"]} ${styles["active"]}`}
                          >
                            <div className={styles.starItems} rating="5">
                              <div
                                className={`${styles["starItem"]} ${styles["active"]}`}
                              >
                                <div className={styles.star}></div>
                              </div>
                              <div
                                className={`${styles["starItem"]} ${styles["active"]}`}
                              >
                                <div className={styles.star}></div>
                              </div>
                              <div
                                className={`${styles["starItem"]} ${styles["active"]}`}
                              >
                                <div className={styles.star}></div>
                              </div>
                              <div
                                className={`${styles["starItem"]} ${styles["active"]}`}
                              >
                                <div className={styles.star}></div>
                              </div>
                              <div
                                className={`${styles["starItem"]} ${styles["active"]}`}
                              >
                                <div className={styles.star}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className={styles.commentLi}>
                        <div className={styles.textandRating}>
                          <div className={styles.text}>İletişim</div>
                          <div
                            className={`${styles["stars"]} ${styles["active"]}`}
                          >
                            <div className={styles.starItems} rating="5">
                              <div
                                className={`${styles["starItem"]} ${styles["active"]}`}
                              >
                                <div className={styles.star}></div>
                              </div>
                              <div
                                className={`${styles["starItem"]} ${styles["active"]}`}
                              >
                                <div className={styles.star}></div>
                              </div>
                              <div
                                className={`${styles["starItem"]} ${styles["active"]}`}
                              >
                                <div className={styles.star}></div>
                              </div>
                              <div
                                className={`${styles["starItem"]} ${styles["active"]}`}
                              >
                                <div className={styles.star}></div>
                              </div>
                              <div
                                className={`${styles["starItem"]} ${styles["active"]}`}
                              >
                                <div className={styles.star}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className={styles.commentLi}>
                        <div className={styles.textandRating}>
                          <div className={styles.text}>Konum</div>
                          <div
                            className={`${styles["stars"]} ${styles["active"]}`}
                          >
                            <div className={styles.starItems} rating="5">
                              <div
                                className={`${styles["starItem"]} ${styles["active"]}`}
                              >
                                <div className={styles.star}></div>
                              </div>
                              <div
                                className={`${styles["starItem"]} ${styles["active"]}`}
                              >
                                <div className={styles.star}></div>
                              </div>
                              <div
                                className={`${styles["starItem"]} ${styles["active"]}`}
                              >
                                <div className={styles.star}></div>
                              </div>
                              <div
                                className={`${styles["starItem"]} ${styles["active"]}`}
                              >
                                <div className={styles.star}></div>
                              </div>
                              <div
                                className={`${styles["starItem"]} ${styles["active"]}`}
                              >
                                <div className={styles.star}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className={styles.commentLi}>
                        <div className={styles.textandRating}>
                          <div className={styles.text}>Giriş</div>
                          <div
                            className={`${styles["stars"]} ${styles["active"]}`}
                          >
                            <div className={styles.starItems} rating="5">
                              <div
                                className={`${styles["starItem"]} ${styles["active"]}`}
                              >
                                <div className={styles.star}></div>
                              </div>
                              <div
                                className={`${styles["starItem"]} ${styles["active"]}`}
                              >
                                <div className={styles.star}></div>
                              </div>
                              <div
                                className={`${styles["starItem"]} ${styles["active"]}`}
                              >
                                <div className={styles.star}></div>
                              </div>
                              <div
                                className={`${styles["starItem"]} ${styles["active"]}`}
                              >
                                <div className={styles.star}></div>
                              </div>
                              <div
                                className={`${styles["starItem"]} ${styles["active"]}`}
                              >
                                <div className={styles.star}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className={styles.commentLi}>
                        <div className={styles.textandRating}>
                          <div className={styles.text}>Kalite/fiyat oranı</div>
                          <div
                            className={`${styles["stars"]} ${styles["active"]}`}
                          >
                            <div className={styles.starItems} rating="5">
                              <div
                                className={`${styles["starItem"]} ${styles["active"]}`}
                              >
                                <div className={styles.star}></div>
                              </div>
                              <div
                                className={`${styles["starItem"]} ${styles["active"]}`}
                              >
                                <div className={styles.star}></div>
                              </div>
                              <div
                                className={`${styles["starItem"]} ${styles["active"]}`}
                              >
                                <div className={styles.star}></div>
                              </div>
                              <div
                                className={`${styles["starItem"]} ${styles["active"]}`}
                              >
                                <div className={styles.star}></div>
                              </div>
                              <div
                                className={`${styles["starItem"]} ${styles["active"]}`}
                              >
                                <div className={styles.star}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <Formik
                    initialValues={{
                      form_email: "",
                      form_name: "",
                      form_surname: "",
                      form_phone: "",
                      form_message: "",
                      form_rating: 0,
                    }}
                    validationSchema={Yup.object({
                      form_email: Yup.string().required(
                        "Bu alan boş bırakılamaz"
                      ),
                      form_name: Yup.string().required(
                        "Bu alan boş bırakılamaz"
                      ),
                      form_surname: Yup.string().required(
                        "Bu alan boş bırakılamaz"
                      ),
                      form_phone: Yup.string().required(
                        "Bu alan boş bırakılamaz"
                      ),
                      form_message: Yup.string().required(
                        "Bu alan boş bırakılamaz"
                      ),
                      form_rating: Yup.number()
                        .transform((value, originalValue) =>
                          originalValue === "" ? null : value
                        )
                        .required("Puan verin")
                        .min(0.5, "Lütfen puan verin"),
                    })}
                    onSubmit={async (values, { resetForm }) => {
                      const response = await createComment(1, {
                        ...values,
                        id: roomDetail?.data?.hotelId,
                      });
                      if (response.statusCode == 200) {
                        alert("Yorum gönderildi");
                        resetForm();
                      }
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
                      <form id={styles.commentForm} onSubmit={handleSubmit}>
                        <ul>
                          <li
                            className={styles.full}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              flexDirection: "column",
                            }}
                          >
                            <span style={{ fontSize: 22 }}>Puanınız</span>
                            <Rating
                              transition
                              onClick={(value) => {
                                handleRating(value);
                                setFieldValue("form_rating", value);
                              }}
                              allowFraction
                            />
                            {errors.form_rating && touched.form_rating && (
                              <div className={styles.inputFeedback}>
                                {errors.form_rating}
                              </div>
                            )}
                          </li>
                          <li className={styles.full}>
                            <div className={styles.inputBox}>
                              <div className={styles.inputName}>
                                Villa için Yorumunuz
                              </div>
                              <textarea
                                name="form_message"
                                rows="4"
                                cols="50"
                                placeholder="•••"
                                value={values.form_message}
                                onChange={handleChange}
                              ></textarea>
                              {errors.form_message && touched.form_message && (
                                <div className={styles.inputFeedback}>
                                  {errors.form_message}
                                </div>
                              )}
                            </div>
                          </li>
                          <li>
                            <div className={styles.inputBox}>
                              <div className={styles.inputName}>Ad</div>
                              <input
                                name="form_name"
                                value={values.form_name}
                                onChange={handleChange}
                                type="text"
                                className={styles.form_name}
                                placeholder="•••••"
                              />
                              {errors.form_name && touched.form_name && (
                                <div className={styles.inputFeedback}>
                                  {errors.form_name}
                                </div>
                              )}
                            </div>
                          </li>
                          <li>
                            <div className={styles.inputBox}>
                              <div className={styles.inputName}>Soyad</div>
                              <input
                                type="text"
                                className={styles.form_surname}
                                name="form_surname"
                                placeholder="•••••"
                                onChange={handleChange}
                                value={values.form_surname}
                              />
                              {errors.form_surname && touched.form_surname && (
                                <div className={styles.inputFeedback}>
                                  {errors.form_surname}
                                </div>
                              )}
                            </div>
                          </li>
                          <li>
                            <div className={styles.inputBox}>
                              <div className={styles.inputName}>
                                Telefon Numaranız
                              </div>
                              <input
                                type="text"
                                className={styles.form_phone}
                                name="form_phone"
                                placeholder="(•••) ••• •• ••"
                                onChange={handleChange}
                                value={values.form_phone}
                              />
                              {errors.form_phone && touched.form_phone && (
                                <div className={styles.inputFeedback}>
                                  {errors.form_phone}
                                </div>
                              )}
                            </div>
                          </li>
                          <li>
                            <div className={styles.inputBox}>
                              <div className={styles.inputName}>
                                Email Adresiniz
                              </div>
                              <input
                                type="text"
                                className={styles.form_email}
                                name="form_email"
                                placeholder="•••••••••"
                                onChange={handleChange}
                                value={values.form_email}
                              />
                              {errors.form_email && touched.form_email && (
                                <div className={styles.inputFeedback}>
                                  {errors.form_email}
                                </div>
                              )}
                            </div>
                          </li>
                        </ul>
                        <div className={styles.linkBox}>
                          <button
                            type={"submit"}
                            className={`${styles["blueButtonArrow"]} ${styles["sendCommentForm"]}`}
                          >
                            <span>Yorumu Gönder</span>
                          </button>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
          {/* {nearVillas?.data?.length > 0 && (
            <div className={styles.apartments}>
              <div className={styles.container}>
                <div className={styles.box}>
                  <div className={styles.titleBox}>
                    <div className={styles.title}>Yakınındaki Villalar</div>
                    <div className={styles.subTitle}>
                      Villalarımız arasından en seçkinlerini sizler için
                      derledik.
                    </div>
                  </div>
                  <ul>
                    {nearVillas?.data?.map((data, index) => (
                      <VillaCard
                        listPage={true}
                        key={index}
                        data={data}
                        photos={data?.photos}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )} */}
        </section>
      </>
    );
  } else {
    useEffect(() => {
      router.replace("/404");
    }, []);
  }
}

export async function getServerSideProps({ params, query }) {
  const slug = params?.slug;
  const totalPage = 1;
  const roomDetail = await getRoom(slug);
  const imgs = roomDetail?.data?.photos || [];
  return {
    props: {
      roomId: slug,
      villaName: roomDetail?.data?.roomDetails[0]?.name,
      roomDetail,
      imgs,
      totalPage,
    },
  };
}
