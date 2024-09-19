import VillaTab from "./tab/tab"
import styles from "./villa.module.css"
import VillaCard from "./card/villaCard"
import { useEffect, useState } from "react"
import Link from "next/link"
import { getAllVillaByCategoryId, getVillasHome } from "@/services/villa"
const qs = require('qs');

export default function Villa({ villas, category }) {
    const [activeTabIndex, setActiveTabIndex] = useState(0)
    const [activeCategoryId, setActiveCategoryId] = useState(category?.data[0]?.id)
    const [activeCategorySlug, setActiveCategorySlug] = useState(category?.data[0]?.slug || "balayi-villalari")
    const [villasData, setVillasData] = useState(villas)
    const [homeVillasActiveImage, setHomeVillasActiveImage] = useState(0)
    const [isTabChanged, setTabIsChanged] = useState(false)

    useEffect(()=> {
        async function getHomeVillas(){
            const data = await getVillasHome(8, 0, activeCategoryId)
            setVillasData(data)
            setHomeVillasActiveImage(0)
        }
        if(isTabChanged){
            getHomeVillas()
        }
    }, [activeCategoryId])

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
                            <VillaTab setTabIsChanged={setTabIsChanged} setActiveCategorySlug={setActiveCategorySlug} setActiveCategoryId={setActiveCategoryId} activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} categories={category} />
                        </ul>
                    </div>
                    <div className={styles.bottom}>
                        <div className={styles.row}>
                            <ul>
                                {
                                    villasData?.data?.map((villa, index) => <VillaCard homeVillasActiveImage={homeVillasActiveImage} setHomeVillasActiveImage={setHomeVillasActiveImage} categories={category} activeCategorySlug={activeCategorySlug} activeCategoryId={activeCategoryId} key={index} data={villa} type="villa" photos={villa?.photos} />)
                                }
                                <div className={styles.linkBox}>
                                    <Link className={styles.blueButton2} href={`/villalar/${activeCategorySlug}`}>
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