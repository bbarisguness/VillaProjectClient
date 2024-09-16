import Link from "next/link"
import styles from "./service.module.css"

export default function Service() {
    return (
        <div className={styles.services}>
            <div className={styles.container}>
                <div className={styles.box}>
                    <div className={styles.top}>
                        <div className={styles.colon}>
                            <div className={styles.imgBox}>
                                <div className={styles.bgImage} style={{ backgroundImage: "url(/images/services-img-1.png)" }}>
                                </div>
                            </div>
                            <div className={styles.textBox}>
                                <div className={styles.title}>Satılık Villalarımız</div>
                                <div className={styles.desc}>
                                    Muğla, Fethiye ve çevresinde yer alan en güzel ve en özel satılık villaları
                                    sizler için bir araya getirdik.
                                    Alternatifleri inceleyebilir, ihtiyaçlarınıza ve bütçenize en uygun satılık
                                    villalarımızı görüp
                                    değerlendirebilirsiniz. Ülkemizin en güzel bölgelerinde yer alan, doğası ve
                                    tarihi ile mest eden, özel
                                    dekore edilmiş, gerek konaklamak ve tatil yapmak için gerekse ticari amaçla
                                    kullanabileceğiniz
                                    villalarını sayfamızda bulabilirsiniz. Geniş fiyat aralığıyla bütçenize göre
                                    seçim yapabilirsiniz.
                                </div>
                                <div className={styles.linkBox}>
                                    <Link href="/satilik-villalar" className={styles.blueButton2}>
                                        <span>Detaylı İncele</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className={styles.colon}>
                            <div className={styles.imgBox}>
                                <div className={styles.bgImage} style={{ backgroundImage: "url(/images/services-img-2.png)" }}>
                                </div>
                            </div>
                            <div className={styles.textBox}>
                                <div className={styles.title}>Araç Kiralama</div>
                                <div className={styles.desc}>
                                    Bölgemizde ggeçireceğiniz zamanı çok daha konforlu ve kaliteli hale getirmek
                                    için araç kiralama
                                    hizmetimizden yararlanabilirsiniz. Kullanım alışkanlıklarınıza, ihtiyaçlarınıza
                                    ve bütçenize en uygun
                                    araçları kolayca kiralayabilirsiniz. Bütün doğal, tarihi ve kültürel
                                    güzellikleri özel aracınızın rahatlığıyla
                                    tadabilirsiniz.
                                </div>
                                <div className={styles.linkBox}>
                                    <Link href="/arac-kiralama" className={styles.blueButton2}>
                                        <span>Detaylı İncele</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.titleBox}>
                        <div className={styles.title}>Hizmetlerimiz</div>
                        <div className={styles.subTitle}>Mükemmel tatil burada başlar</div>
                    </div>
                    <div className={styles.bottom}>
                        <div className={styles.row}>
                            <ul>
                                <li>
                                    <div className={styles.column}>
                                        <Link href="#">
                                            <div className={styles.iconBox}>
                                                <i style={{backgroundImage: "url(/images/services1.png)"}}></i>
                                                <i className={styles.two_i} style={{backgroundImage: "url(/images/services1-hover.png)"}}></i>
                                            </div>
                                            <div className={styles.title}>Araç Kiralama</div>
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className={styles.column}>
                                        <Link href="#">
                                            <div className={styles.iconBox}>
                                                <i style={{backgroundImage: "url(/images/services2.png)"}}></i>
                                                <i className={styles.two_i} style={{backgroundImage: "url(/images/services2-hover.png)"}}></i>
                                            </div>
                                            <div className={styles.title}>Paraşüt</div>
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className={styles.column}>
                                        <Link href="#">
                                            <div className={styles.iconBox}>
                                                <i style={{backgroundImage: "url(/images/services3.png)"}}></i>
                                                <i className={styles.two_i} style={{backgroundImage: "url(/images/services3-hover.png)"}}></i>
                                            </div>
                                            <div className={styles.title}>Transfer</div>
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className={styles.column}>
                                        <Link href="#">
                                            <div className={styles.iconBox}>
                                                <i style={{backgroundImage: "url(/images/services4.png)"}}></i>
                                                <i className={styles.two_i} style={{backgroundImage: "url(/images/services4-hover.png)"}}></i>
                                            </div>
                                            <div className={styles.title}>Jeep Safari</div>
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className={styles.column}>
                                        <Link href="#">
                                            <div className={styles.iconBox}>
                                                <i style={{backgroundImage: "url(/images/services5.png)"}}></i>
                                                <i className={styles.two_i} style={{backgroundImage: "url(/images/services5-hover.png)"}}></i>
                                            </div>
                                            <div className={styles.title}>Atv Safari</div>
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className={styles.column}>
                                        <Link href="#">
                                            <div className={styles.iconBox}>
                                                <i style={{backgroundImage: "url(/images/services6.png)"}}></i>
                                                <i className={styles.two_i} style={{backgroundImage: "url(/images/services6-hover.png)"}}></i>
                                            </div>
                                            <div className={styles.title}>Atlı Geziler</div>
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className={styles.column}>
                                        <Link href="#">
                                            <div className={styles.iconBox}>
                                                <i style={{backgroundImage: "url(/images/services7.png)"}}></i>
                                                <i className={styles.two_i} style={{backgroundImage: "url(/images/services7-hover.png)"}}></i>
                                            </div>
                                            <div className={styles.title}>Rafting</div>
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className={styles.column}>
                                        <Link href="#">
                                            <div className={styles.iconBox}>
                                                <i style={{backgroundImage: "url(/images/services8.png)"}}></i>
                                                <i className={styles.two_i} style={{backgroundImage: "url(/images/services8-hover.png)"}}></i>
                                            </div>
                                            <div className={styles.title}>Dalış</div>
                                        </Link>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}