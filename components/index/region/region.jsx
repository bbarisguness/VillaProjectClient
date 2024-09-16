import styles from "./region.module.css"
import RegionCard from "./card/regionCard"

export default function Regions({ regions, homePage }) {
    return (
        <div className={styles.regions}>
            <div className={styles.box}>
                <div className={styles.container}>
                    <div className={styles.titleBox}>
                        <div className={styles.title}>Bölgelerimiz</div>
                        <div className={styles.subTitle}>Popüler Bölgelerimiz</div>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.container}>
                        {
                            homePage ?
                                <ul>
                                    {
                                        regions.data.slice(0, 4).map((region, index) =>
                                            <RegionCard key={index} data={region} />
                                        )
                                    }
                                </ul> :
                                <ul>
                                    {
                                        regions.data.map((region, index) =>
                                            <RegionCard key={index} data={region} />
                                        )
                                    }
                                </ul>
                        }
                        <div className="arrow">
                            <div className={`${styles.arrowButton} ${styles.prev}`}></div>
                            <div className={`${styles.arrowButton} ${styles.next}`}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}