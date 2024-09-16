import styles from "./treestep.module.css"

export default function TreeStep({ from }) {
    return (
        <div style={from && { display: "inline" }} className={styles.threeSteps}>
            <div className={styles.container}>
                <div className={styles.box}>
                    <div className={styles.titleBox}>
                        <div className={styles.title}>3 Adımda Kolay Rezervasyon</div>
                        <div className={styles.subTitle}>Mükemmel tatil burada başlar</div>
                    </div>
                    <ul>
                        <li>
                            <div className={styles.iconBox}>
                                <i style={{ backgroundImage: `url(/images/search-favorite.png)` }}></i>
                            </div>
                            <div className={styles.title}>Yüzlerce Villa İçinde Arama Yap</div>
                            <div className={styles.desc}>
                                Ege ve Akdeniz bölgelerinin en güzel villalarını bir araya getirdik.
                                İhtiyaçlarınıza göre yüzlerce villa içinde arama yaparak kendinizi için en uygununu seçin.
                            </div>
                        </li>
                        <li>
                            <div className={styles.iconBox}>
                                <i style={{ backgroundImage: `url(/images/send-2.png)` }}></i>
                            </div>
                            <div className={styles.title}>Talep Gönder</div>
                            <div className={styles.desc}>
                                Seçtiğiniz villanın bütün özelliklerini inceleyin ve belirlediğiniz tarihler için talep
                                gönderin.
                            </div>
                        </li>
                        <li>
                            <div className={styles.iconBox}>
                                <i style={{ backgroundImage: `url(/images/like-tag.png)` }}></i>
                            </div>
                            <div className={styles.title}>Rezervasyonu Tamamla</div>
                            <div className={styles.desc}>
                                Sevdiklerinizle birlikte unutulmaz bir tatil deneyimi yaşayacağınız
                                rezervasyonunuzu kolayca tamamlayın.
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}