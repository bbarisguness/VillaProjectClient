'use client';
import styles from "./apart.module.css"
import Link from "next/link"
import { stockData } from "@/data/data";
import VillaCard from "../villa/card/villaCard";
import { useState, useEffect } from "react";
const qs = require('qs');

export default function Apart() {

    const [aparts, setAparts] = useState([])

    const query = qs.stringify(
        {
            filters: {
                isApart: {
                    $eq: true
                }
            },
            pagination: {
                page: 1,
                pageSize: 4,
            },
            populate: ["gallery.image", "price_tables.price_type", "region", "localizations"]
        },
        {
            encodeValuesOnly: true, // prettify URL
        }
    );


    // useEffect(() => {
    //     fetch(`http://3.127.136.179:1337/api/villas?${query}`)
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 setAparts(result.data)
    //                 //console.log(result.data);
    //                 //console.log(result.data[0].attributes.gallery.data.attributes.image.data);
    //             },
    //             (error) => {

    //             }
    //         )

    //     //console.log(`http://3.127.136.179:1337/api/villas?${query}`);
    // }, [])

    return (
        <div className={styles.apartments}>
            <div className={styles.container}>
                <div className={styles.box}>
                    <div className={styles.titleBox}>
                        <div className={styles.title}>Apartlarımız</div>
                        <div className={styles.subTitle}>Apartlarımız arasından en seçkinlerini sizler için derledik.</div>
                    </div>
                    <ul>
                        {/* {
                            
                            stockData.map((data, index) =>
                                <VillaCard key={index} data={data} type="apart" />
                            )} */}

                        {
                            aparts.map((apart, index) => <VillaCard key={index} data={apart} type="apart" />)
                        }
                    </ul>
                    <div className={styles.linkBox}>
                        <Link className={styles.greyButton} href="#">
                            <span>Tümü</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}