import VillaCard from "@/components/index/villa/card/villaCard";
import { getHotel } from "@/services/villa";
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
import Pagination from "@/components/pagination/Pagination";
import VideoWithComment from "@/components/villaDetail/VideoWithComment";
import Comments from "@/components/other/comment/Comments";
import CommentForm from "@/components/other/commentForm/CommentForm";

export default function List({
  villa,
  villaDetail,
  imgs,
  totalPage,
  allCategories,
  villaId,
  villaName,
}) {
  const router = useRouter();
  const slug = router?.query?.slug;
  const categorySlug = allCategories?.data?.find(
    (item) =>
      item?.categoryDetails[0]?.name ==
      villaDetail?.data?.categories[0]?.categoryDetails[0]?.name
  )?.slug;
  const [ready, setReady] = useState(true);
  const [isDescOpen, setIsDescOpen] = useState(false);
  const [ismakeReservationButtonHidden, setMakeReservationButtonHidden] =
    useState(true);

  const activePage = parseInt(router.query.p) || 1;

  function NewPagination() {
    return (
      <Pagination
        newActivePage={activePage}
        pageCount={Math.ceil(villa?.totalCount / 20)}
      />
    );
  }

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

  if (villaDetail?.data != null) {
    return (
      <>
        <Seo
          pageTitle={"Labirent Fethiye | " + villaDetail?.data?.metaTitle}
          pageDesc={villaDetail?.data?.metaDescription}
        />
        {/* <section className={styles.breadCrumb}>
          <div className={styles.container}>
            <div className={styles.breadCrumbBox}>
              <ul className={styles.breadCrumbList}>
                <li className={styles.breadCrumbItem}>
                  <Link href="/">Anasayfa</Link>
                </li>
                {villaDetail?.data?.categories[0] && (
                  <li className={styles.breadCrumbItem}>
                    <Link href={`/villalar/${categorySlug}`}>
                      {
                        villaDetail?.data?.categories[0]?.categoryDetails[0]
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
                    {villaDetail?.data?.hotelDetails[0]?.name}
                  </div>
                  <div className={styles.villaInformation}>
                    <div className={styles.features}>
                      <div className={styles.colon}>
                        <i className={styles.pin_icon}></i>
                        <span>
                          {villaDetail?.data?.town?.district?.name} /{" "}
                          {villaDetail?.data?.town?.name}
                        </span>
                      </div>
                      <div className={styles.colon}>
                        <i className={styles.person_icon}></i>
                        <span>{villaDetail?.data?.person} Kişi</span>
                      </div>
                      <div className={styles.colon}>
                        <i className={styles.room_icon}></i>
                        <span>{villaDetail?.data?.room} Oda</span>
                      </div>
                      <div className={styles.colon}>
                        <i className={styles.bath_icon}></i>
                        <span>{villaDetail?.data?.bath} Banyo</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className={styles.right}>
                  <div className={styles.priceType}>Gecelik En Düşük</div>
                  <div className={styles.price}>
                    {" "}
                    {Math.min(1000)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                    TL -{" "}
                    {Math.max(2000)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                    TL
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div className={styles.productImagesBox}>
            <div className={styles.container}>
              <div className={styles.productImages}>
                <div className={styles.row}>
                  <Gallery photos={imgs} from="hotelList" />
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
                          villaDetail?.data?.hotelDetails[0]?.descriptionLong,
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
                  <DistanceRuler data={villaDetail?.data?.distanceRulers} />
                  {villaDetail?.data?.rooms?.length > 0 && (
                    <div className={styles.apartments}>
                      <div className={styles.container}>
                        <div className={styles.box}>
                          <div className={styles.titleBox}>
                            <div className={styles.title}>Odalar</div>
                            <div className={styles.subTitle}>
                              Apartımızın odaları
                            </div>
                          </div>
                          <ul>
                            {villaDetail?.data?.rooms.map((data, index) => (
                              <VillaCard
                                listPage={true}
                                key={"room" + index}
                                data={data}
                                photos={data?.photos}
                                from={"room"}
                              />
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* <PriceTable data={villaDetail?.data?.priceTables} /> */}
                  {/* <Calendar
                    ready={ready}
                    dates={villaDetail?.data?.reservationCalendars || []}
                  /> */}
                </div>
                {/* <div id="makeReservation" style={{ paddingTop: 20 }}>
                  <div className={styles.right}>
                    <div className={styles.general}>
                      <Reservation
                        villaId={villaId}
                        villaName={villaName}
                        prices={villaDetail?.data?.priceTables}
                        villaFirstPhoto={
                          villaDetail?.data?.photos[0]?.image || null
                        }
                        region={
                          villaDetail?.data?.town?.district?.name +
                          " / " +
                          villaDetail?.data?.town?.name
                        }
                      />
                      <FoodPackage />
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          {/* <div className={styles.dualBoxes}>
            <div className={styles.container}>
              <div className={styles.row}>
                <ul>
                  <li>
                                        <div className={styles.title}>Konum</div>
                                        <div className={styles.box} style={{ backgroundImage: `url(http://3.127.136.179:1337${villa?.attributes?.locationImage?.data?.attributes?.formats?.medium?.url})`, backgroundPosition: "center", backgroundSize: "100% 100%" }}>
                                            <div className={styles.linkBox} style={{ position: "relative", width: "50px", height: "50px", left: "15px", top: "15px" }}>
                                                <Link className={styles.blueButton} href={villa?.attributes?.locationLink ? villa?.attributes?.locationLink : '#'} target="_blank">
                                                    <span>Konum</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </li>
                  {villaDetail?.data[0]?.attributes?.video && (
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
          </div> */}
          <div className={styles.customerCommentsBox}>
            <div className={styles.container}>
              <div className={styles.customerComments}>
                <Comments commentData={villaDetail?.data?.comments} />
                <CommentForm />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  } else {
    if (typeof window !== "undefined") {
      router.replace("/404");
    }
    return null; // UI render edilmesin
  }
}

export async function getServerSideProps({ params, query }) {
  const slug = params?.slug;
  const totalPage = 1;
  const villaDetail = await getHotel(slug);
  const imgs = villaDetail?.data?.photos || [];
  return {
    props: {
      villaId: slug,
      villaName: villaDetail?.data?.hotelDetails[0]?.name || null,
      villaDetail,
      imgs,
      totalPage,
    },
  };
}
