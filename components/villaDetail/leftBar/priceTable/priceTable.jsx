'use client';
import styles from "./priceTable.module.css"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { getPriceTypeDetail } from "@/data/data";


export default function PriceTable({ data, priceTypeNumber }) {

    // console.log(data);

    const [priceTableActiveIndex, setPriceTableActiveIndex] = useState(priceTypeNumber)

    const handlePriceTable = (index) => {
        setPriceTableActiveIndex(index)


    }

    // exchange
    const [usd, setUsd] = useState(34.31)
    const [eur, setEur] = useState(37.56)
    const [gbp, setGbp] = useState(44.85)
    // useEffect(() => {

    //     fetch('http://hasanadiguzel.com.tr/api/kurgetir')
    //         .then(response => response.json())
    //         .then(data => {
    //             //console.log(data.TCMB_AnlikKurBilgileri)
    //             //setExchanges(data.TCMB_AnlikKurBilgileri)
    //             //setReady(true)
    //             setUsd(data.TCMB_AnlikKurBilgileri[0].BanknoteSelling)
    //             setEur(data.TCMB_AnlikKurBilgileri[3].BanknoteSelling)
    //             setGbp(data.TCMB_AnlikKurBilgileri[4].BanknoteSelling)
    //         });

    // }, [gbp])

    return (
        <div className={styles.priceTable}>
            <div className={styles.top}>
                <div className={styles.title}>Fiyat Tablosu</div>
                <div className={styles.exchangeRateMenu}>
                    <ul>
                        <li onClick={() => handlePriceTable(1)} className={`${priceTableActiveIndex == 1 ? styles["active"] : ""}`}><Link onClick={(e) => e.preventDefault()} href="#">TL</Link></li>
                        <li onClick={() => handlePriceTable(2)} className={`${priceTableActiveIndex == 2 ? styles["active"] : ""}`}><Link onClick={(e) => e.preventDefault()} href="#">DOLAR</Link></li>
                        <li onClick={() => handlePriceTable(3)} className={`${priceTableActiveIndex == 3 ? styles["active"] : ""}`}><Link onClick={(e) => e.preventDefault()} href="#">EURO</Link></li>
                        <li onClick={() => handlePriceTable(4)} className={`${priceTableActiveIndex == 4 ? styles["active"] : ""}`}><Link onClick={(e) => e.preventDefault()} href="#">POUND</Link></li>
                    </ul>
                </div>
            </div>
            <div className={styles.bottom}>
                <ul>

                    {
                        data?.map((data, index) => (
                            <li key={index}>
                                <div className={styles.box}>
                                    <div className={styles.leftBox}>
                                        <div className={styles.imageBox}><i className={styles.cloud_icon}></i></div>
                                    </div>
                                    <div className={styles.rightBox}>
                                        <div className={styles.name}>
                                            {data?.priceTableDetails[0]?.title}
                                        </div>
                                        <div className={styles.desc}>{data?.priceTableDetails[0]?.description}</div>
                                        <div className={styles.price}>
                                            {
                                                (priceTableActiveIndex === 2 ? ((data?.price / usd).toFixed(2) + " " + getPriceTypeDetail(2)?.text) : priceTableActiveIndex === 3 ? ((data?.price / eur).toFixed(2) + " " + getPriceTypeDetail(3)?.text) : priceTableActiveIndex === 4 ? ((data?.price / gbp).toFixed(2) + " " + getPriceTypeDetail(4)?.text) : (data?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " " + getPriceTypeDetail(1)?.text))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))
                    }


                </ul>
                <p className={styles.notice}>Özel günlerde (Bayram, Yılbaşı, vb..) fiyat değişiklik göstermektedir.</p>
            </div>
        </div>
    )
}