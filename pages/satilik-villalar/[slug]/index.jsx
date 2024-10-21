import Seo from '@/components/seo';
import Gallery from '@/components/villaDetail/leftBar/gallery/gallery';
import { getPhotosVilla } from '@/services/photo';
import { getNearVillas, getVillaSale, getVilla } from '@/services/villa';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import DistanceRuler from '@/components/villaDetail/leftBar/distanceRuler/distanceRuler';
import VillaCard from '@/components/index/villa/card/villaCard';
import { useRouter } from 'next/router';
import Comments from '@/components/other/comment/Comments';
import CommentForm from '@/components/other/commentForm/CommentForm';

export default function SaleDetail({ villaDetail, nearVillas, imgs }) {
    console.log(villaDetail)
    const router = useRouter();
    const [isDescOpen, setIsDescOpen] = useState(false);
    if (villaDetail?.data) {
        return (
            <>
                <Seo
                    pageTitle={villaDetail?.data?.villaDetails[0]?.name}
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
                                        href={`/satilik-villalar`}
                                    >
                                        Satılık Villalar
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
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
                                                <span>{villaDetail?.data?.town?.district?.name} / {villaDetail?.data?.town?.name}</span>
                                            </div>
                                            <div className={styles.colon}>
                                                <i className={styles.person_icon}></i>
                                                <span>
                                                    {villaDetail?.data?.person} Kişi
                                                </span>
                                            </div>
                                            <div className={styles.colon}>
                                                <i className={styles.room_icon}></i>
                                                <span>
                                                    {villaDetail?.data?.room} Oda
                                                </span>
                                            </div>
                                            <div className={styles.colon}>
                                                <i className={styles.bath_icon}></i>
                                                <span>
                                                    {villaDetail?.data?.bath} Banyo
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.right}>
                                    <div className={styles.price}>
                                        SATILIK
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
                                            style={{ whiteSpace: "pre-line" }}
                                            className={`${styles["desc"]} ${isDescOpen && styles["active"]
                                                }`}
                                        >
                                            {villaDetail?.data?.villaDetails[0]?.descriptionLong}
                                        </div>
                                        <div
                                            className={`${styles["readMore"]} ${isDescOpen && styles["active"]
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
                                            villaDetail?.data?.distanceRulers
                                        }
                                    />
                                    {/* <PriceTable
                                    data={villaDetail?.data[0]?.attributes?.price_tables?.data}
                                />
                                <Calendar
                                    ready={ready}
                                    dates={villaDetail?.data[0]?.attributes?.reservations?.data}
                                /> */}
                                </div>
                                <div className={styles.right}>
                                    <div className={styles.general}>
                                        {/* <Reservation villaId={villaDetail?.data[0]?.id} /> */}
                                        {/* <FoodPackage /> */}
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
                                                    <a data-src={villaDetail?.data[0]?.attributes?.video}>
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
                    {nearVillas?.data?.length > 0 && (<div className={styles.apartments}>
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
                                            photos={data?.photos}
                                        />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>)}
                </section>
            </>
        );
    } else {
        useEffect(() => {
            router.replace('/404')
        }, [])
    }
}
export async function getServerSideProps({ params }) {
    const slug = params?.slug;
    const villaDetail = await getVilla(slug);
    const nearVillas = await getNearVillas(villaDetail?.data?.town?.id);
    const imgs = villaDetail?.data?.photos;
    return { props: { villaDetail, nearVillas, imgs } };
}