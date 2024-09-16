import styles from "./villaRentInfo.module.css"
import Link from "next/link"

export default function VillaRent() {
    return (
        <div className={styles.villaRent}>
            <div className={styles.container}>
                <div className={styles.box}>
                    <div className={styles.colon}>
                        <div className={styles.rentTitle}>Villanızı Kiraya Verin</div>
                        <div className={styles.rentDesc}>
                            Sahip olduğunuz villalarınızı, yazlığınızı profesyonel bir firma aracılığıyla kiralamak,
                            gelir elde etmek,
                            yeni insanlara ev sahipliği yapmak ve profesyonel bir firmadan hizmet almak istiyorsanız
                            bizimle
                            iletişime geçebilirsiniz.
                        </div>
                        <div className={styles.linkBox}>
                            <Link href="/kiraya-ver" className={styles.pinkButton}>
                                <span>Kiraya Ver</span>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.colon}>
                        <div className={styles.rentTitle}>Size Özel Gıda Sepeti</div>
                        <div className={styles.rentDesc}>
                            Balayınızda ya da tatilinizde damaklarınıza ve gönüllerinize bayram ettirecek, kaliteli
                            ve güvenli
                            gıdalarla dolu bir sepete sahip olmak istiyorsanız bizimle iletişime geçebilir,
                            tercihinize en uygun gıda
                            sepetini sizin ve sevdikleriniz için hazır etmemizi sağlayabilirsiniz.
                        </div>
                        <div className={styles.linkBox}>
                            <Link href="#" className={styles.blueButton}>
                                <span>Sepetleri Gör</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.leftAbs}></div>
            <div className={styles.rightAbs}></div>
        </div>
    )
}