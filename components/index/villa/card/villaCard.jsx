import styles from "./villaCard.module.css"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
//import { getPhotosVilla } from "@/services/photo"

export default function VillaCard({ data, type, from, activeCategorySlug, listPage, photos, salePage, activeCategoryId, categories, homeVillasActiveImage, setHomeVillasActiveImage }) {
    const router = useRouter()

    // const a = Math.max(...data.attributes.price_tables.data.map(o => o.attributes.price))
    const [imageIndex, setImageIndex] = useState(0)
    const [image, setImage] = useState()
    const [images, setImages] = useState(data?.attributes?.photos?.data)
    const [activeImage, setActiveImage] = useState(0)

    // useEffect(() => {
    //     getPhotosVilla({ slug: data.attributes.slug }).then((res) => {
    //         setImages(res.data)
    //     })
    // }, [])

    function checkVillaCategory() {
        const found = categories?.data?.find((element) => element?.id == activeCategoryId);
        if (found) {
            return true
        }
        else {
            return false
        }
    }

    useEffect(() => {
        setImage(data?.attributes?.gallery?.data?.attributes?.image?.data[0]?.attributes.url)
    }, [data])

    useEffect(() => {
        setImage(data?.attributes?.gallery?.data?.attributes?.image?.data[imageIndex]?.attributes?.url)
    }, [imageIndex])

    const imageHandler = (e, operation) => {
        e.preventDefault();

        if (operation == "next") {
            if (activeImage == 2) { setActiveImage(0) }
            else { setActiveImage(activeImage + 1) }
        }
        else {
            if (activeImage == 0) { setActiveImage(2) }
            else { setActiveImage(activeImage - 1) }
        }
    }

    if (from == "newest" && !listPage) {
        if (data) {
            return (
                <div className={styles.testimonialItemContainer}>
                    <div className={styles.column}>
                        <Link href={`/villalar/${data?.attributes?.categories?.data[0]?.attributes?.slug}/${data?.attributes?.slug}`}>
                            <div className={styles.imgBox}>
                                <div className={styles.carouselBox}>
                                    <div className={styles.bgImage} style={{ backgroundImage: photos[activeImage]?.image != undefined ? `url(${process.env.NEXT_PUBLIC_APIPHOTOS_URL+'k_'+photos[activeImage]?.image})` : "none"}}>
                                        <div className={styles.imgNav}>
                                            <button onClick={(e) => imageHandler(e, "prev")}></button>
                                            <button style={{ transform: "rotate(180deg)" }} onClick={(e) => imageHandler(e, "next")}></button>
                                        </div>
                                    </div>
                                </div>
                                {data?.villaDetails[0].featureTextBlue != null && <div className={styles.cardFeatures}>{data?.villaDetails[0].featureTextBlue}</div>}
                                {data?.villaDetails[0].featureTextRed != null && <div className={styles.cardFeatures2}>{data?.villaDetails[0].featureTextRed}</div>}
                                {data?.villaDetails[0].featureTextWhite != null && <div className={styles.cardFeatures3}>{data?.villaDetails[0].featureTextWhite}</div>}
                            </div>
                            <div className={styles.textBox}>
                                <div className={styles.title}>{data.attributes.name}</div>
                                {data?.attributes?.region ? <div className={styles.location}>{data?.attributes?.region}</div> : <></>}
                                <div className={styles.priceTitle}>Günlük Fiyat Aralığı</div>
                                {data?.attributes?.price_tables?.data ? <div className={styles.price}>{Math.min(...data.attributes.price_tables.data.map(o => o.attributes.price)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} TL - {Math.max(...data.attributes.price_tables.data.map(o => o.attributes.price)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} TL</div> : <></>}
                                <div className={styles.features}>
                                    <div className={styles.colon}>
                                        <i className={styles.person_icon}></i>
                                        <span>{data.attributes.person} Kişi</span>
                                    </div>
                                    <div className={styles.colon}>
                                        <i className={styles.room_icon}></i>
                                        <span>{data.attributes.room} Oda</span>
                                    </div>
                                    <div className={styles.colon}>
                                        <i className={styles.bath_icon}></i>
                                        <span>{data.attributes.bath} Banyo</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            )
        }
        else {
            return (<div>loading</div>)
        }
    }
    else if (listPage) {
        //kiralık villalar sayfası
        if (data) {
            return (
                <li id={styles.cardContainer}>
                    <div className={styles.column}>
                        <Link href={`/villalar/${data?.id}`}>
                            <div className={styles.imgBox}>
                                <div className={styles.carouselBox}>
                                    <div className={styles.bgImage} style={{ backgroundImage: photos[activeImage]?.image != undefined ? `url(${process.env.NEXT_PUBLIC_APIPHOTOS_URL+'k_'+photos[activeImage]?.image})` : "none"}}>
                                        <div className={styles.imgNav}>
                                            <button onClick={(e) => imageHandler(e, "prev")}></button>
                                            <button style={{ transform: "rotate(180deg)" }} onClick={(e) => imageHandler(e, "next")}></button>
                                        </div>
                                    </div>
                                </div>
                                {data?.villaDetails[0].featureTextBlue != null && <div className={styles.cardFeatures}>{data?.villaDetails[0].featureTextBlue}</div>}
                                {data?.villaDetails[0].featureTextRed != null && <div className={styles.cardFeatures2}>{data?.villaDetails[0].featureTextRed}</div>}
                                {data?.villaDetails[0].featureTextWhite != null && <div className={styles.cardFeatures3}>{data?.villaDetails[0].featureTextWhite}</div>}
                            </div>
                            <div className={styles.textBox}>
                                <div className={styles.title}>{data.villaDetails[0].name}</div>
                                {data?.town ? <div className={styles.location}>{data?.town?.district?.name} / {data?.town?.name}</div> : <></>}
                                <div className={styles.priceTitle}>Günlük Fiyat Aralığı</div>
                                {data?.priceTables?.length > 0 ? <div className={styles.price}>{Math.min(...data.priceTables.map(o => o.price)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} TL - {Math.max(...data.priceTables.map(o => o.price)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} TL</div> : <></>}
                                <div className={styles.features}>
                                    <div className={styles.colon}>
                                        <i className={styles.person_icon}></i>
                                        <span>{data.person} Kişi</span>
                                    </div>
                                    <div className={styles.colon}>
                                        <i className={styles.room_icon}></i>
                                        <span>{data.room} Oda</span>
                                    </div>
                                    <div className={styles.colon}>
                                        <i className={styles.bath_icon}></i>
                                        <span>{data.bath} Banyo</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </li>
            )
        }
    }
    else if (salePage) {
        if (data) {
            return (
                <li id={styles.cardContainer}>
                    <div className={styles.column}>
                        <Link href={`/satilik-villalar/${data?.id}`}>
                            <div className={styles.imgBox}>
                                <div className={styles.carouselBox}>
                                    <div className={styles.bgImage} style={{ backgroundImage: photos[activeImage]?.image != undefined ? `url(${process.env.NEXT_PUBLIC_APIPHOTOS_URL+'k_'+photos[activeImage]?.image})` : "none"}}>
                                        <div className={styles.imgNav}>
                                            <button onClick={(e) => imageHandler(e, "prev")}></button>
                                            <button style={{ transform: "rotate(180deg)" }} onClick={(e) => imageHandler(e, "next")}></button>
                                        </div>
                                    </div>
                                </div>
                                {data?.villaDetails[0].featureTextBlue != null && <div className={styles.cardFeatures}>{data?.villaDetails[0].featureTextBlue}</div>}
                                {data?.villaDetails[0].featureTextRed != null && <div className={styles.cardFeatures2}>{data?.villaDetails[0].featureTextRed}</div>}
                                {data?.villaDetails[0].featureTextWhite != null && <div className={styles.cardFeatures3}>{data?.villaDetails[0].featureTextWhite}</div>}
                            </div>
                            <div className={styles.textBox}>
                                <div className={styles.title}>{data?.villaDetails[0]?.name}</div>
                                {data?.town ? <div className={styles.location}>{data?.town?.district?.name} / {data?.town?.name}</div> : <></>}
                                <div style={{ marginTop: '5rem' }} className={styles.features}>
                                    <div className={styles.colon}>
                                        <i className={styles.person_icon}></i>
                                        <span>{data?.person} Kişi</span>
                                    </div>
                                    <div className={styles.colon}>
                                        <i className={styles.room_icon}></i>
                                        <span>{data?.room} Oda</span>
                                    </div>
                                    <div className={styles.colon}>
                                        <i className={styles.bath_icon}></i>
                                        <span>{data?.bath} Banyo</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </li>
            )
        }
    }
    else {
        //anasayfadaki liste
        if (data && !listPage) {
            return (
                <li style={{ display: checkVillaCategory() ? 'block' : 'none' }} id={styles.cardContainer}>
                    <div className={styles.column}>
                        <Link href={`/villalar/${data?.id}`}>
                            <div className={styles.imgBox}>
                                <div className={styles.carouselBox}>
                                    <div className={styles.bgImage} style={{ backgroundImage: photos[activeImage]?.image != undefined ? `url(${process.env.NEXT_PUBLIC_APIPHOTOS_URL+'k_'+photos[activeImage]?.image})` : "none"}}>
                                        <div className={styles.imgNav}>
                                            <button onClick={(e) => imageHandler(e, "prev")}></button>
                                            <button style={{ transform: "rotate(180deg)" }} onClick={(e) => imageHandler(e, "next")}></button>
                                        </div>
                                    </div>
                                </div>
                                {data?.villaDetails[0].featureTextBlue != null && <div className={styles.cardFeatures}>{data?.villaDetails[0].featureTextBlue}</div>}
                                {data?.villaDetails[0].featureTextRed != null && <div className={styles.cardFeatures2}>{data?.villaDetails[0].featureTextRed}</div>}
                                {data?.villaDetails[0].featureTextWhite != null && <div className={styles.cardFeatures3}>{data?.villaDetails[0].featureTextWhite}</div>}
                            </div>
                            <div className={styles.textBox}>
                                <div className={styles.title}>{data.villaDetails[0].name}</div>
                                {true ? <div className={styles.location}>{data?.town?.district?.name} / {data?.town?.name}</div> : <></>}
                                <div className={styles.priceTitle}>Günlük Fiyat Aralığı</div>
                                {/* {data.attributes.price_tables.data ? <div className={styles.price}>{data.attributes.price_tables?.data[0]?.attributes?.price} TL - {data.attributes.price_tables?.data[(data.attributes.price_tables.data.length - 1)]?.attributes?.price} TL</div> : <></>} */}
                                {data?.priceTables?.length > 0 ? <div className={styles.price}>{Math.min(...data?.priceTables?.map(o => o.price)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} TL - {Math.max(...data?.priceTables?.map(o => o.price)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} TL</div> : <></>}
                                <div className={styles.features}>
                                    <div className={styles.colon}>
                                        <i className={styles.person_icon}></i>
                                        <span>{data.person} Kişi</span>
                                    </div>
                                    <div className={styles.colon}>
                                        <i className={styles.room_icon}></i>
                                        <span>{data.room} Oda</span>
                                    </div>
                                    <div className={styles.colon}>
                                        <i className={styles.bath_icon}></i>
                                        <span>{data.bath} Banyo</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </li>
            )
        }
        else {
            return (<div>loading...</div>)
        }
    }
}