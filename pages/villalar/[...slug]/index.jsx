import VillaCard from "@/components/index/villa/card/villaCard";
import {
  getAllVillaByCategoryId,
  getVilla,
  getNearVillas,
  createComment,
} from "@/services/villa";
import "@/styles/styles.css";
import { getCategories } from "@/services/category";
import { useRouter } from "next/router";
import * as Yup from "yup";
import CommentForm from "@/components/other/commentForm/CommentForm";

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
import { priceTypes } from "@/data/data";
import { getPriceRange } from "@/utils/globalUtils";
import Comments from "@/components/other/comment/Comments";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-video.css";

export default function List({
  villa,
  villaDetail,
  nearVillas,
  imgs,
  totalPage,
  allCategories,
  category,
  villaId,
  villaName,
}) {
  const currentPriceTypeText = priceTypes?.find(
    (item) => item?.type == villaDetail?.data?.priceType
  )?.text;
  const router = useRouter();
  const slug = router?.query?.slug;
  const categorySlug = villaDetail?.data?.categories
    ? allCategories?.data?.find(
        (item) =>
          item?.categoryDetails[0]?.name ==
          villaDetail?.data?.categories[0]?.categoryDetails[0]?.name
      )?.slug
    : null;
  const [ready, setReady] = useState(true);
  const [isDescOpen, setIsDescOpen] = useState(false);
  const [ismakeReservationButtonHidden, setMakeReservationButtonHidden] =
    useState(!villaDetail?.data?.onlineReservation);
  const activePage = parseInt(router.query.p) || 1;

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

  if (villa && slug.length == 1 && villa?.data?.length > 0) {
    return (
      <>
        <Seo
          pageTitle={"Labirent Fethiye | " + category?.categoryDetails[0]?.name}
          pageDesc={
            "Labirent Fethiye Kiralık " + category?.categoryDetails[0]?.name
          }
        />
        <section className="listPage_contentDetail listPage_villasDetail">
          <div className="villas">
            <div className="listPage_container">
              <div className="box">
                <div className="top">
                  <div className="titleBox">
                    <div className="title">
                      {category?.categoryDetails[0]?.name}
                    </div>
                    <div className="subTitle">
                      Toplam {villa?.totalCount} adet tesis bulunmaktadır.
                    </div>
                  </div>
                </div>
                <div className="bottom">
                  <div className="row">
                    <ul>
                      {villa?.data?.map((villa, index) => (
                        <VillaCard
                          listPage={true}
                          key={index}
                          data={villa}
                          photos={villa?.photos}
                        />
                      ))}
                    </ul>
                  </div>
                </div>
                <Pagination
                  newActivePage={activePage}
                  pageCount={Math.ceil(villa?.totalCount / 20)}
                />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  } else if (slug.length == 1 && villaDetail?.data) {
    return (
      <>
        <Seo
          pageTitle={"Labirent Fethiye | " + villaDetail?.data?.metaTitle}
          pageDesc={villaDetail?.data?.metaDescription}
        />
        <section className={styles.breadCrumb}>
          <div className={styles.container}>
            <div className={styles.breadCrumbBox}>
              <ul className={styles.breadCrumbList}>
                <li className={styles.breadCrumbItem}>
                  <Link href="/">Anasayfa</Link>
                </li>
                {villaDetail?.data?.categories && (
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
        </section>
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
                    {villaDetail?.data?.villaDetails[0]?.name}
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
                <div className={styles.right}>
                  <div className={styles.priceType}>Gecelik En Düşük</div>
                  <div className={styles.price}>
                    {getPriceRange(
                      villaDetail?.data?.priceTables,
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
                  <Gallery photos={imgs} />
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
                          villaDetail?.data?.villaDetails[0]?.descriptionLong,
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
                  <PriceTable
                    priceTypeNumber={villaDetail?.data?.priceType || 1}
                    data={villaDetail?.data?.priceTables}
                    currencies={villaDetail?.data?.currencies}
                  />
                  <Calendar
                    ready={ready}
                    dates={villaDetail?.data?.reservationCalendars || []}
                    calendarPrices={villaDetail?.data?.prices || []}
                    priceTypeText={currentPriceTypeText}
                  />
                </div>
                {villaDetail?.data?.onlineReservation && (
                  <div id="makeReservation" style={{ paddingTop: 20 }}>
                    <div className={styles.right}>
                      <div className={styles.general}>
                        <Reservation
                          priceTypeText={currentPriceTypeText}
                          villaId={villaId}
                          villaName={villaName}
                          prices={villaDetail?.data?.priceTables}
                          villaFirstPhoto={
                            villaDetail?.data?.photos
                              ? villaDetail?.data?.photos[0]?.image
                              : null
                          }
                          region={
                            villaDetail?.data?.town?.district?.name +
                            " / " +
                            villaDetail?.data?.town?.name
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
          </div>
          <div className={styles.customerCommentsBox}>
            <div className={styles.container}>
              <div className={styles.customerComments}>
                <Comments commentData={villaDetail?.data?.comments} />
                <CommentForm />
              </div>
            </div>
          </div>
          {nearVillas?.data?.length > 0 && (
            <div className={styles.apartments}>
              <div className={styles.container}>
                <div className={styles.box}>
                  <div className={styles.titleBox}>
                    <div className={styles.title}>Önerilen Villalar</div>
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
          )}
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
  const allCategories = await getCategories();
  const willGetVillaDetail =
    allCategories?.data?.find((item) => item?.slug == slug[0]) || true;
  const villa =
    (await getAllVillaByCategoryId(
      allCategories?.data?.find((item) => item?.slug == slug[0])?.id,
      query?.p ? query?.p - 1 : 0
    )) || [];
  const totalPage = 1;
  const villaDetail =
    willGetVillaDetail == true ? await getVilla(slug[0]) : null;
  const nearVillas =
    willGetVillaDetail == true
      ? await getNearVillas(villaDetail?.data?.town?.id, villaDetail.id)
      : [];
  const imgs = villaDetail?.data?.photos || [];
  return {
    props: {
      villaId: slug[0],
      villaName: villaDetail?.data?.villaDetails[0]?.name || null,
      villa,
      villaDetail,
      nearVillas,
      imgs,
      totalPage,
      allCategories,
      category:
        villaDetail == null
          ? allCategories?.data?.find((item) => item?.slug == slug[0])
          : "yok",
    },
  };
}
