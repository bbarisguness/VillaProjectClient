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
import { priceTypes } from "@/data/data";
import { getPriceRange } from "@/utils/globalUtils";
import Comments from "@/components/other/comment/Comments";
import CommentForm from "@/components/other/commentForm/CommentForm";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-video.css";

export default function List({
  roomDetail,
  nearVillas,
  imgs,
  totalPage,
  roomId,
  villaName,
}) {
  const currentPriceTypeText = priceTypes?.find(
    (item) => item?.type == roomDetail?.data?.priceType
  )?.text;
  const router = useRouter();
  const [ready, setReady] = useState(true);
  const [isDescOpen, setIsDescOpen] = useState(false);
  const [ismakeReservationButtonHidden, setMakeReservationButtonHidden] =
    useState(!roomDetail?.data?.onlineReservation);

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
          pageTitle={roomDetail?.data?.metaTitle}
          pageDesc={roomDetail?.data?.metaDescription}
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
                    currencies={roomDetail?.data?.currencies}
                  />
                  <Calendar
                    ready={ready}
                    dates={roomDetail?.data?.reservationCalendars || []}
                    calendarPrices={roomDetail?.data?.prices || []}
                    priceTypeText={currentPriceTypeText}
                  />
                </div>
                {roomDetail?.data?.onlineReservation && (
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
                )}
              </div>
            </div>
          </div>
          {roomDetail?.data[0]?.attributes?.video && (
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
          )}
          <div className={styles.customerCommentsBox}>
            <div className={styles.container}>
              <div className={styles.customerComments}>
                {/* <Comments /> */}
                <CommentForm />
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
