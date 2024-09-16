import VillaTab from "./tab/tab"
import styles from "./villa.module.css"
import VillaCard from "./card/villaCard"
import { useEffect, useState } from "react"
import Link from "next/link"
import { getVillasHome } from "@/services/villa"
const qs = require('qs');

export default function Villa({ villas, category }) {
    const [activeTabIndex, setActiveTabIndex] = useState(0)
    const [activeCategory, setActiveCategory] = useState('balayi-villalari')
    const [villasData, setVillasData] = useState(villas)

    useEffect(()=> {
        async function getHomeVillas(){
            const data = await getVillasHome(8,1,activeCategory)
            setVillasData(data)
        }
        getHomeVillas()
    }, [activeCategory])

    return (
        <div className={styles.villas}>
            <div className={styles.container}>
                <div className={styles.box}>
                    <div className={styles.titleBox}>
                        <div className={styles.title}>Villalarımız</div>
                        <div className={styles.subTitle}>Villalarımız arasından en seçkinlerini sizler için derledik.</div>
                    </div>
                    <div className={styles.top}>
                        <ul>
                            <VillaTab setActiveCategory={setActiveCategory} activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} categories={category} />
                        </ul>
                    </div>
                    <div className={styles.bottom}>
                        <div className={styles.row}>
                            <ul>
                                {
                                    villasData?.data.map((villa, index) => <VillaCard activeCategory={activeCategory} key={index} data={villa} type="villa" photos={villa.attributes.photos.data} />)
                                }
                                <div className={styles.linkBox}>
                                    <Link className={styles.blueButton2} href={`/villalar/${activeCategory}`}>
                                        <span>Tümünü Görüntüle</span>
                                    </Link>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}