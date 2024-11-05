import Link from "next/link"
import Image from "next/image"
import styles from "./footerTop.module.css"

export default function FooterTop({ regions }) {
    return (
        <div className={styles.top}>
            <div className={styles.container}>
                <div className={styles.box}>
                    <div className={styles.left}>
                        <div className={styles.footerLogo}>
                            <Link href="/" title="Labirent Fethiye">
                                <Image src="/images/labirent.png" alt="" width={142} height={56} />
                            </Link>
                        </div>
                        <div className={styles.footerContact}>
                            <ul>
                                <li>
                                    <div className={styles.footerTitle}>Adres</div>
                                    <div className={styles.footerDecs}>Ölüdeniz, Atatürk Cd. No:83, 48340 Fethiye/Muğla</div>
                                </li>
                                <li>
                                    <div className={styles.footerTitle}>Rezervasyon</div>
                                    <div className={styles.footerDecs}>
                                        <Link rel="nofollow" href="tel:+902526166648">+90 252 616 66 48</Link>
                                    </div>
                                </li>
                                <li>
                                    <div className={styles.footerTitle}>Çalışma Saatlerimiz</div>
                                    <div className={styles.footerDecs}>
                                        Hafta içi 09:00 - 18:00 <br />
                                        Hafta sonu 09:00 - 18:00
                                    </div>
                                </li>
                                <li>
                                    <div className={styles.footerTitle}>E-Mail</div>
                                    <div className={styles.footerDecs}>
                                        <Link rel="nofollow" href="mailto:info@labirentfethiye.com">info@labirentfethiye.com</Link>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.socialMedia}>
                            <div className={styles.socialText}>Bizi Takip Edin</div>
                            <ul>
                                <li>
                                    <Link href="https://www.facebook.com/Labirentfethiye/" target="_blank" rel="nofollow" className={styles.facebook}
                                        title="">
                                        <i></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://www.youtube.com/channel/UCHSwoqGIPpT6rqP2fsA9TwA" rel="nofollow" target="_blank"
                                        className={styles.youtube} title="">
                                        <i></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://www.instagram.com/labirentfethiye/" rel="nofollow" target="_blank" className={styles.instagram}
                                        title="">
                                        <i></i>
                                    </Link>
                                </li>
                                {/* <li>
                                    <Link href="https://g.page/labirentfethiye?share" target="_blank" className={styles.google} title="">
                                        <i></i>
                                    </Link>
                                </li> */}
                            </ul>
                        </div>
                        <div className={styles.tursabBox}>
                            <Link href="https://www.tursab.org.tr/tr/ddsv" target="_blank">
                                <Image src="/images/tursab-dds-1210.png" alt="" width={290} height={132} />
                            </Link>
                        </div>
                    </div>
                    <div className={styles.right}>
                        {/* <div className={styles.bulletionBox}>
                            <form action="" className={styles.formBulletion}>
                                <div className={styles.formTitle}>E-Posta`nızı Kayıt Edin</div>
                                <div className={styles.inputBox}>
                                    <input type="text" className={styles.inputText} placeholder="Email Adresiniz." />
                                    <input type="submit" className={styles.bulletionButton} value="" />
                                </div>
                            </form>
                        </div> */}
                        <div className={styles.footerMenu}>
                            <div className={styles.colon}>
                                <div className={styles.colonTitle}>Faydalı Bağlantılar</div>
                                <ul className={styles.footerMenu}>
                                    <li>
                                        <Link href="/kiralama-sartlari" rel="nofollow" title="">
                                            <span>Kiralama Şartları</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/yemek-servisi" rel="nofollow" title="">
                                            <span>Yemek Servisi</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/sikayet-bildirimi" rel="nofollow" title="">
                                            <span>Şikayet Bildirimi</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/dolandiricilara-dikkat" rel="nofollow" title="">
                                            <span>Dolandırıcılara Dikkat</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/neden-labirent" rel="nofollow" title="">
                                            <span>Neden labirent</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link rel="nofollow" href="/hakkimizda" title="">
                                            <span>Hakkımızda</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/sss" rel="nofollow" title="">
                                            <span>Sıkça Sorulan Sorular</span>
                                        </Link>
                                    </li>
                                    {/* <li>
                                        <Link href="#" title="">
                                            <span>Soru Cevap</span>
                                        </Link>
                                    </li> */}
                                    <li>
                                        <Link onClick={e=> e.preventDefault()} href="#" rel="nofollow" title="">
                                            <span>Fırsatlar</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className={styles.colon}>
                                <div className={styles.colonTitle}>Bölgeler</div>
                                <ul className={styles.footerMenu}>
                                    {
                                        regions?.map((item, index) => (
                                            <li key={item?.id || ("regionItem" + index)}>
                                                <Link href={`/bolgeler/${item?.slug}`}>
                                                    <span>{item?.webPageDetails ? item?.webPageDetails[0]?.title : undefined}</span>
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}