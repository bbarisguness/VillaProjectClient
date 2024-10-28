import styles from "./top.module.css"
import Link from "next/link"

export default function HeaderTop() {

    return (
        <div className={styles.top}>
            <div className={styles.container}>
                <div className={styles.box}>
                    <div className={styles.left}>
                        <div className={styles.colon}>
                            <i style={{ backgroundImage: `url(/images/call.png)` }}></i>
                            <span>Bize Ulaşın <a href="tel:02428443988">+90 252 616 66 48</a></span>
                        </div>
                        <div className={styles.colon}>
                            <i style={{ backgroundImage: `url(/images/clock.png)` }}></i>
                            <span>Çalışma Saatleri : 09:00 - 18:00</span>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.socialMedia}>
                            <div className={styles.socialText}>Bizi Takip Edin</div>
                            <ul>
                                <li>
                                    <Link target="_blank" rel="nofollow" href='https://www.facebook.com/Labirentfethiye/' className={styles.facebook}>
                                        <i></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link target="_blank" rel="nofollow" href='https://www.youtube.com/channel/UCHSwoqGIPpT6rqP2fsA9TwA' className={styles.youtube}>
                                        <i></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link target="_blank" rel="nofollow" href='https://www.instagram.com/labirentfethiye/' className={styles.instagram}>
                                        <i></i>
                                    </Link>
                                </li>
                                {/* <li>
                                    <Link target="_blank" href='https://g.page/labirentfethiye?share' className={styles.google}>
                                        <i></i>
                                    </Link>
                                </li> */}
                            </ul>
                        </div>
                        <div className={styles.lang}>
                            <Link href="#">TR</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

