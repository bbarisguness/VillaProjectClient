'use client'
import styles from "./breadCrumb.module.css"
import Link from "next/link"

export default function BreadCrumb({ link }) {

    const getName = () => {
        if (link == "sss") { return "Sıkça Sorulan Sorular" }
        else if (link == "contact") { return "İletişim" }
        else if (link == "about") { return "Hakkımızda" }
        else if (link == "yemek-servisi") { return "Yemek Servisi" }
        else if (link == "kiralama-sartlari") { return "Kiralama Şartları" }
        else if (link == "rezervasyon-takip") { return "Rezervasyon Takip" }
        else if (link == "sikayet-bildirimi") { return "Şikayet Bildirimi" }
        else if (link == "dolandiricilara-dikkat") { return "Dolandırıcılara Dikkat" }
        else if (link == "neden-labirent") { return "Neden Labirent ?" }
        else if (link == "arac-kiralama") { return "Araç Kiralama" }
        else if (link == "kiraya-ver") {return "Kiraya Ver"}
        else { return link }
    }
    return (
        <section className={styles.breadCrumb}>
            <div className={styles.container}>
                <div className={styles.breadCrumbBox}>
                    <ul className={styles.breadCrumbList}>
                        <li className={styles.breadCrumbItem}>
                            <Link href="/">Anasayfa</Link>
                        </li>
                        {link && <li className={styles.breadCrumbItem}>
                            <Link href="" onClick={(e) => e.preventDefault()}>{getName()}</Link>
                        </li>}
                    </ul>
                    <div className={styles.shareBox}>
                        {/* <div className={styles.shareItem}>
                            <Link href="" onClick={(e) => e.preventDefault()} className={styles.share}>Paylaş</Link>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    )
}