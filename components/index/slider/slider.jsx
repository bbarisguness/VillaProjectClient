'use client';
import styles from "./slider.module.css"
import ReservationBox from "./reservation/reservation"

export default function Slider() {
    return (
        <section className={styles.slider}>
            <div className={styles.sliderBox}>
                <div className={styles.bgImage}>
                </div>
                <div className={styles.sliderText}>
                    <ReservationBox />
                    <div className={styles.sliderSubTitle}>
                        EXCLUSIVE KONFOR
                    </div>
                    <div className={styles.sliderTitle}>
                        <strong>Türkiye`nin En Güvenilir Villa</strong>
                        <p>Kiralama Portalı</p>
                    </div>
                </div>
            </div>
        </section>
    )
}