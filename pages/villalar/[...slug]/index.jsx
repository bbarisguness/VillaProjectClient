import VillaCard from "@/components/index/villa/card/villaCard";
import {
  getVillaCategory,
  getVilla,
  getNearVillas,
  getVillas,
} from "@/services/villa";
import "@/styles/styles.css";
import { getCategorySlug } from "@/services/category";
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
import { getPhotosVilla } from "@/services/photo";
import Seo from "@/components/seo";
import Pagination from "@/components/pagination/Pagination";
import VideoWithComment from "@/components/villaDetail/VideoWithComment";

export default function List({
  villa,
  category,
  villaDetail,
  nearVillas,
  imgs,
  totalPage,
}) {
  const router = useRouter();
  const slug = router?.query?.slug;
  const [ready, setReady] = useState(true);
  const [isDescOpen, setIsDescOpen] = useState(false);
  const [ismakeReservationButtonHidden, setMakeReservationButtonHidden] =
    useState(false);

  const activePage = parseInt(router.query.p) || 1;

  function NewPagination() {
    return <Pagination newActivePage={activePage} pageCount={totalPage} />;
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

  if (villa && slug.length == 1 && villa?.data?.length > 0) {
    return (
      <>
        <Seo
          pageTitle={category?.data[0]?.attributes?.metaTitle}
          pageDesc={category?.data[0]?.attributes?.metaDescription}
        />
        <section className="listPage_contentDetail listPage_villasDetail">
          <div className="villas">
            <div className="listPage_container">
              <div className="box">
                <div className="top">
                  <div className="titleBox">
                    <div className="title">
                      {category?.data[0]?.attributes?.name}
                    </div>
                    <div className="subTitle">
                      Toplam {villa?.meta?.pagination?.total} adet tesis
                      bulunmaktadır.
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
                          photos={villa.attributes.photos.data}
                        />
                      ))}
                    </ul>
                  </div>
                </div>
                {/* <Pagination
                  setNewActivePage={setNewActivePage}
                  newActivePage={newActivePage}
                  pageCount={villaData.meta.pagination.pageCount}
                /> */}
              </div>
            </div>
          </div>
          {villa?.data?.length > 0 && <NewPagination />}
        </section>
      </>
    );
  } else if (slug.length == 2 && villaDetail?.data?.length > 0) {
    return (
      <>
        <Seo
          pageTitle={villaDetail?.data[0]?.attributes?.metaTitle}
          pageDesc={villaDetail?.data[0]?.attributes?.metaDescription}
        />
        <section className={styles.breadCrumb}>
          <div className={styles.container}>
            <div className={styles.breadCrumbBox}>
              <ul className={styles.breadCrumbList}>
                <li className={styles.breadCrumbItem}>
                  <Link href="/">Anasayfa</Link>
                </li>
                <li className={styles.breadCrumbItem}>
                  <Link
                    href={`/villalar/${villaDetail?.data[0]?.attributes?.categories?.data[0]?.attributes?.slug}`}
                  >
                    {
                      villaDetail?.data[0]?.attributes?.categories?.data[0]
                        ?.attributes?.name
                    }
                  </Link>
                </li>
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
                    {villaDetail?.data[0]?.attributes?.name}
                  </div>
                  <div className={styles.villaInformation}>
                    <div className={styles.features}>
                      <div className={styles.colon}>
                        <i className={styles.pin_icon}></i>
                        <span>{villaDetail?.data[0]?.attributes?.region}</span>
                      </div>
                      <div className={styles.colon}>
                        <i className={styles.person_icon}></i>
                        <span>
                          {villaDetail?.data[0]?.attributes?.person} Kişi
                        </span>
                      </div>
                      <div className={styles.colon}>
                        <i className={styles.room_icon}></i>
                        <span>
                          {villaDetail?.data[0]?.attributes?.person} Oda
                        </span>
                      </div>
                      <div className={styles.colon}>
                        <i className={styles.bath_icon}></i>
                        <span>
                          {villaDetail?.data[0]?.attributes?.bath} Banyo
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.right}>
                  <div className={styles.priceType}>Gecelik En Düşük</div>
                  <div className={styles.price}>
                    {" "}
                    {Math.min(
                      ...villaDetail?.data[0]?.attributes?.price_tables?.data.map(
                        (o) => o.attributes.price
                      )
                    )
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                    TL -{" "}
                    {Math.max(
                      ...villaDetail?.data[0]?.attributes?.price_tables?.data.map(
                        (o) => o.attributes.price
                      )
                    )
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                    TL
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
                          villaDetail?.data[0]?.attributes?.descriptionLong,
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
                  <DistanceRuler
                    data={
                      villaDetail?.data[0]?.attributes?.distance_rulers?.data
                    }
                  />
                  <PriceTable
                    data={villaDetail?.data[0]?.attributes?.price_tables?.data}
                  />
                  <Calendar
                    ready={ready}
                    dates={villaDetail?.data[0]?.attributes?.reservations?.data}
                  />
                </div>
                <div id="makeReservation" style={{ paddingTop: 20 }}>
                  <div className={styles.right}>
                    <div className={styles.general}>
                      <Reservation
                        villaId={villaDetail?.data[0]?.id}
                        prices={villaDetail?.data[0]?.attributes?.price_tables}
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
                <div className={styles.title}>4,91 · 11 değerlendirme</div>
                <div className={styles.commentRating}>
                  <ul>
                    <li>
                      <div className={styles.name}>Temizlik</div>
                      <div className={styles.rating}>
                        <div className={styles.graphic}>
                          <span></span>
                        </div>
                        <div className={styles.rate}>1.8</div>
                      </div>
                    </li>
                    <li>
                      <div className={styles.name}>İletişim</div>
                      <div className={styles.rating}>
                        <div className={styles.graphic}>
                          <span></span>
                        </div>
                        <div className={styles.rate}>2.5</div>
                      </div>
                    </li>
                    <li>
                      <div className={styles.name}>Giriş</div>
                      <div className={styles.rating}>
                        <div className={styles.graphic}>
                          <span></span>
                        </div>
                        <div className={styles.rate}>5.0</div>
                      </div>
                    </li>
                    <li>
                      <div className={styles.name}>Doğruluk</div>
                      <div className={styles.rating}>
                        <div className={styles.graphic}>
                          <span></span>
                        </div>
                        <div className={styles.rate}>4.7</div>
                      </div>
                    </li>
                    <li>
                      <div className={styles.name}>Konum</div>
                      <div className={styles.rating}>
                        <div className={styles.graphic}>
                          <span></span>
                        </div>
                        <div className={styles.rate}>3.9</div>
                      </div>
                    </li>
                    <li>
                      <div className={styles.name}>Kalite/fiyat oranı</div>
                      <div className={styles.rating}>
                        <div className={styles.graphic}>
                          <span></span>
                        </div>
                        <div className={styles.rate}>4.7</div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className={styles.comments}>
                  <ul>
                    <li>
                      <div className={styles.imageBox}>
                        <div className={styles.img}>
                          <img src="/images/person-1.png" alt="" />
                        </div>
                      </div>
                      <div className={styles.name}>Ali Tufan</div>
                      <div className={styles.dateandRating}>
                        <div className={styles.date}>
                          April 6, 2021 at 3:21 AM
                        </div>
                        <div className={styles.stars}>
                          <div className={styles.starItems}>
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
                          <div className={styles.text}>(5 reviews)</div>
                        </div>
                      </div>
                      <div className={styles.descBox}>
                        Every single thing we tried with John was delicious!
                        Found some awesome places we would definitely go back to
                        on our trip. John was also super friendly and passionate
                        about Beşiktaş and Istanbul.{" "}
                      </div>
                    </li>
                    <li>
                      {/* <LightGallery
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
                        </LightGallery> */}

                      <div className={styles.imageBox}>
                        <div className={styles.img}>
                          <img src="/images/person-3.png" alt="" />
                        </div>
                        <VideoWithComment />
                      </div>
                      <div className={styles.name}>Ali Tufan</div>
                      <div className={styles.dateandRating}>
                        <div className={styles.date}>
                          April 6, 2021 at 3:21 AM
                        </div>
                        <div className={styles.stars}>
                          <div className={styles.starItems}>
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
                          <div className={styles.text}>(5 reviews)</div>
                        </div>
                      </div>
                      <div className={styles.descBox}>
                        Every single thing we tried with John was delicious!
                        Found some awesome places we would definitely go back to
                        on our trip. John was also super friendly and passionate
                        about Beşiktaş and Istanbul.{" "}
                      </div>
                    </li>
                    <li>
                      <div className={styles.imageBox}>
                        <div className={styles.img}>
                          <img src="/images/person-2.png" alt="" />
                        </div>
                      </div>
                      <div className={styles.name}>Ali Tufan</div>
                      <div className={styles.dateandRating}>
                        <div className={styles.date}>
                          April 6, 2021 at 3:21 AM
                        </div>
                        <div className={styles.stars}>
                          <div className={styles.starItems}>
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
                          <div className={styles.text}>(5 reviews)</div>
                        </div>
                      </div>
                      <div className={styles.descBox}>
                        Every single thing we tried with John was delicious!
                        Found some awesome places we would definitely go back to
                        on our trip. John was also super friendly and passionate
                        about Beşiktaş and Istanbul.{" "}
                      </div>
                    </li>
                  </ul>
                  <div className={styles.linkBox}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      className={styles.blueButtonArrowOpa}
                    >
                      <span>45 değerlendirmenin tümünü göster</span>
                    </a>
                  </div>
                </div>
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
                  <form id={styles.commentForm}>
                    <ul>
                      <li className={styles.full}>
                        <div className={styles.inputBox}>
                          <div className={styles.inputName}>
                            Villa için Yorumunuz
                          </div>
                          <textarea
                            id="form_message"
                            name="form_message"
                            rows="4"
                            cols="50"
                            placeholder="•••"
                            required
                          ></textarea>
                        </div>
                      </li>
                      <li>
                        <div className={styles.inputBox}>
                          <div className={styles.inputName}>Ad</div>
                          <input
                            type="text"
                            className={styles.form_name}
                            id="form_name"
                            name="form_name"
                            placeholder="•••••"
                            required
                          />
                        </div>
                      </li>
                      <li>
                        <div className={styles.inputBox}>
                          <div className={styles.inputName}>Soyad</div>
                          <input
                            type="text"
                            className={styles.form_surname}
                            id="form_surname"
                            name="form_surname"
                            placeholder="•••••"
                            required
                          />
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
                            id="form_phone"
                            name="form_phone"
                            placeholder="(•••) ••• •• ••"
                            required
                          />
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
                            id="form_email"
                            name="form_email"
                            placeholder="•••••••••"
                            required
                          />
                        </div>
                      </li>
                    </ul>
                  </form>
                  <div className={styles.linkBox}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className={`${styles["blueButtonArrow"]} ${styles["sendCommentForm"]}`}
                    >
                      <span>Yorumu Gönder</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.apartments}>
            <div className={styles.container}>
              <div className={styles.box}>
                <div className={styles.titleBox}>
                  <div className={styles.title}>Yakınındaki Villalar</div>
                  <div className={styles.subTitle}>
                    Villalarımız arasından en seçkinlerini sizler için derledik.
                  </div>
                </div>
                <ul>
                  {nearVillas.data.map((data, index) => (
                    <VillaCard
                      listPage={true}
                      key={index}
                      data={data}
                      photos={data.attributes.photos.data}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
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
  const villa = await getVillaCategory({
    category: slug,
    page: parseInt(query?.p) || 1,
    size: 12,
  });
  const totalPage = villa?.meta?.pagination?.pageCount;
  const category = await getCategorySlug({ slug: slug });
  const villaDetail = await getVilla({ slug: slug[1] });
  const nearVillaSlug = await villaDetail?.data[0]?.attributes?.region;
  const nearVillas = await getNearVillas({
    slug: nearVillaSlug,
    nSlug: slug[1],
  });
  const imgs = await getPhotosVilla({ slug: slug[1] });
  return {
    props: { villa, category, villaDetail, nearVillas, imgs, totalPage },
  };
}
