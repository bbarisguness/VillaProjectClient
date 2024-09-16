import styles from "./regionCard.module.css"
import Link from "next/link"

export default function RegionCard({ data }) {
    var backgroundImg = {
        backgroundImage: "url(" + data?.attributes?.photo?.data?.attributes?.url + ")"
    };

    return (
        <li className={styles.cardContainer}>
            <Link href={`/bolgeler/${data?.attributes?.slug}`}>
                <div style={backgroundImg} className={`${styles.imgBox}`}></div>
                <div className={styles.textBox}>
                    <div className={styles.title}>{data?.attributes?.name}</div>
                    <div className={styles.desc}>{data?.attributes?.descriptionShort}</div>
                </div>
            </Link>

        </li>
    )
}