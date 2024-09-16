import styles from "./foodPackage.module.css"

export default function FoodPackage() {
    return (
        <div className={styles.bottom}>
            <div className={styles.box}>
                <div className={styles.title}>Yiyecek Paketlerimiz</div>
                <ul>
                    <li>
                        <div className={styles.imageBox}>
                            <i></i>
                        </div>
                        <div className={styles.textBox}>
                            <div className={styles.title}>Yiyecek Paket 1</div>
                            <div className={styles.desc}>Every single thing we tried with John was delicious</div>
                        </div>
                    </li>
                    <li>
                        <div className={styles.imageBox}>
                            <i></i>
                        </div>
                        <div className={styles.textBox}>
                            <div className={styles.title}>Yiyecek Paket 2</div>
                            <div className={styles.desc}>Every single thing we tried with John was delicious</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}