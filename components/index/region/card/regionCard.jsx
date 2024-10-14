import styles from "./regionCard.module.css"
import Link from "next/link"

export default function RegionCard({ data }) {
    return (
        <li className={styles.cardContainer}>
            <Link href={`/bolgeler/${data?.id}`}>
                <div style={{ backgroundImage: `url(https://villaapi.testgrande.com/Uploads/WebPhotos/k_${data?.photos[0]?.image})` }} className={`${styles.imgBox}`}></div>
                <div className={styles.textBox}>
                    <div className={styles.title}>{data?.webPageDetails[0]?.title}</div>
                    <div className={styles.desc}>{data?.webPageDetails[0]?.descriptionShort}</div>
                </div>
            </Link>

        </li>
    )
}