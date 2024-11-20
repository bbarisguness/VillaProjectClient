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
import dynamic from "next/dynamic";

// villa detay
import Link from "next/link";
import styles from "./page.module.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import FoodPackage from "@/components/villaDetail/rightBar/foodPackage/foodPackage";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from "lightgallery/plugins/video";
import { useEffect, useState } from "react";
import Seo from "@/components/seo";
import Pagination from "@/components/pagination/Pagination";
import { priceTypes } from "@/data/data";
import { getPriceRange } from "@/utils/globalUtils";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-video.css";

const VillaCard = dynamic(
  () => import("@/components/index/villa/card/villaCard"),
  {
    ssr: true,
  }
);

const DetailTitleBox = dynamic(
  () => import("@/components/villaDetail/detailTitleBox/detailTitleBox"),
  {
    ssr: true,
  }
);

const ProductImageBox = dynamic(
  () => import("@/components/villaDetail/productImageBox/productImageBox"),
  {
    ssr: true,
  }
);

const DetailDesc = dynamic(
  () => import("@/components/villaDetail/detailDesc/detailsDesc"),
  {
    ssr: true,
  }
);

const DistanceRuler = dynamic(
  () => import("@/components/villaDetail/leftBar/distanceRuler/distanceRuler"),
  {
    ssr: true,
  }
);

const PriceTable = dynamic(
  () => import("@/components/villaDetail/leftBar/priceTable/priceTable"),
  {
    ssr: true,
  }
);

const Calendar = dynamic(
  () => import("@/components/villaDetail/leftBar/calendar/calendar"),
  {
    ssr: true,
  }
);

const Reservation = dynamic(
  () => import("@/components/villaDetail/rightBar/reservation/reservation"),
  {
    ssr: false,
  }
);

const Comments = dynamic(() => import("@/components/other/comment/Comments"), {
  ssr: true,
});

const CommentForm = dynamic(
  () => import("@/components/other/commentForm/CommentForm"),
  {
    ssr: true,
  }
);

export default function List({
  villa,
  villaDetail,
  nearVillas,
  imgs,
  totalPage,
  allCategories,
  category,
  villaSlug,
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
          pageTitle={"Labirent Fethiye | " + villa?.data[0]?.categoryMetaTitle}
          pageDesc={
            "Labirent Fethiye Kiralık " +
            villa?.data[0]?.categoryMetaDescription
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
  } else if (slug.length == 1 && villaDetail?.data != null) {
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
          <DetailTitleBox
            villaDetail={villaDetail}
            currentPriceTypeText={currentPriceTypeText}
          />
          <ProductImageBox imgs={imgs} />
          <div className={styles.villaDetailContentBox}>
            <div className={styles.container}>
              <div className={styles.villaDetailContent}>
                <div className={styles.left}>
                  <DetailDesc
                    villaDetail={villaDetail}
                    isDescOpen={isDescOpen}
                    setIsDescOpen={setIsDescOpen}
                  />
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
                          villaId={villaDetail?.data?.id}
                          villaSlug={villaSlug}
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
    if (typeof window !== "undefined") {
      router.replace("/404");
    }
    return null; // UI render edilmesin
  }
}

export async function getServerSideProps({ params, query }) {
  const slug = params?.slug;
  const allCategories = getCategories();

  // İlgili kategori verisini bulmak
  const categoryPromise = allCategories.then(
    (categories) =>
      categories?.data?.find((item) => item?.slug == slug[0]) || true
  );

  const villaPromise = categoryPromise.then((category) =>
    getAllVillaByCategoryId(category?.id, query?.p ? query?.p - 1 : 0)
  );

  const villaDetailPromise = categoryPromise.then((category) =>
    category == true ? getVilla(slug[0]) : null
  );

  const nearVillasPromise = villaDetailPromise.then((villaDetail) =>
    villaDetail?.data != null
      ? getNearVillas(villaDetail?.data?.town?.id, villaDetail.id)
      : []
  );

  // Paralel olarak verileri al
  const [allCategoriesData, villa, villaDetail, nearVillas] = await Promise.all(
    [allCategories, villaPromise, villaDetailPromise, nearVillasPromise]
  );

  const totalPage = 1;
  const imgs = villaDetail?.data?.photos || [];
  const category =
    villaDetail == null
      ? allCategoriesData?.data?.find((item) => item?.slug == slug[0])
      : "yok";

  return {
    props: {
      villaSlug: slug[0],
      villaName: villaDetail?.data?.villaDetails[0]?.name || null,
      villa,
      villaDetail,
      nearVillas,
      imgs,
      totalPage,
      allCategories: allCategoriesData,
      category,
    },
  };
}
