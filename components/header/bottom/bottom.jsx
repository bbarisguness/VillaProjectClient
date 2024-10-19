import styles from "./bottom.module.css"
import Image from "next/image"
import Link from "next/link"
import { changeHamburgerMenuState } from "@/store/globalState"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { getCategories } from "@/services/category"

export default function HeaderBottom({ from }) {
    const [category, setCategory] = useState([])
    const dispatch = useDispatch()
    function menuHandle() {
        dispatch(changeHamburgerMenuState())
    }
    useEffect(() => {
        getCategories().then((res) => {
            setCategory(res?.data)
        })
    }, [])
    return (
        <div className={styles.bottom}>
            <div className={styles.container}>
                <div className={styles.box}>
                    <div className={styles.left}>
                        <div className={styles.logoBox}>
                            <Link href="/">
                                <Image
                                    src="/images/labirent.png"
                                    alt="call"
                                    width={142}
                                    height={56}
                                    priority={true}
                                />
                            </Link>
                        </div>
                        <nav>
                            <ul className={styles.menu_ul}>
                                <li className={styles.menu_li}>
                                    <Link href="/" className={styles.menuLink}>
                                        <span>ANASAYFA</span>
                                    </Link>
                                </li>
                                <li className={`${styles["menu_li"]} ${styles["li_open"]}`}>
                                    <Link href="/villalar" className={styles.menuLink}>
                                        <span>KİRALIK VİLLALAR</span>
                                        <i></i>
                                    </Link>
                                    <div className={styles.openMenu}>
                                        <ul className={styles.openMenu_ul}>
                                            {/* <li className={styles.openMenu_li}>
                                                <Link href="/villalar/balayi-villalari-1" className={styles.openMenu_Link}>
                                                    <span>Balayı Villaları</span>
                                                </Link>
                                            </li>
                                            <li className={styles.openMenu_li}>
                                                <Link href="/villalar/populer-villalar-5" className={styles.openMenu_Link}>
                                                    <span>Popüler Villalar</span>
                                                </Link>
                                            </li>
                                            <li className={styles.openMenu_li}>
                                                <Link href="/villalar/cocuk-havuzlu-villalar-2" className={styles.openMenu_Link}>
                                                    <span>Çocuk Havuzlu Villalar</span>
                                                </Link>
                                            </li>
                                            <li className={styles.openMenu_li}>
                                                <Link href="/villalar/ekonomik-villalar-4" className={styles.openMenu_Link}>
                                                    <span>Ekonomik Villalar</span>
                                                </Link>
                                            </li>
                                            <li className={styles.openMenu_li}>
                                                <Link href="/villalar/korunakli-villalar-6" className={styles.openMenu_Link}>
                                                    <span>Korunaklı Villalar</span>
                                                </Link>
                                            </li>
                                            <li className={styles.openMenu_li}>
                                                <Link href="/villalar/kis-aylarina-uygun-villalar-7" className={styles.openMenu_Link}>
                                                    <span>Kış Aylarına Uygun Villalar</span>
                                                </Link>
                                            </li> */}
                                            {
                                                category.map((item, i) => {
                                                    return (
                                                        <li key={i} className={styles.openMenu_li}>
                                                            <Link href={`/villalar/${item?.slug}`} className={styles.openMenu_Link}>
                                                                <span>{item?.categoryDetails[0]?.name}</span>
                                                            </Link>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </li>
                                <li className={styles.menu_li}>
                                    <Link href="/apartlar" className={styles.menuLink}>
                                        <span>KİRALIK APARTLAR</span>
                                    </Link>
                                </li>
                                <li className={styles.menu_li}>
                                    <Link href="/arac-kiralama" className={styles.menuLink}>
                                        <span>ARAÇ KİRALAMA</span>
                                    </Link>
                                </li>
                                <li className={styles.menu_li}>
                                    <Link href="/bloglar" className={styles.menuLink}>
                                        <span>BLOG</span>
                                    </Link>
                                </li>
                                <li className={`${styles["menu_li"]} ${styles["li_open"]}`}>
                                    <Link href="#" onClick={e=> e.preventDefault()} className={styles.menuLink}>
                                        <span>KURUMSAL</span>
                                        <i></i>
                                    </Link>
                                    <div className={styles.openMenu}>
                                        <ul className={styles.openMenu_ul}>
                                            <li className={styles.openMenu_li}>
                                                <Link href="/hakkimizda" className={styles.openMenu_Link}>
                                                    <span>Hakkımızda</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className={styles.menu_li}>
                                    <Link href="/iletisim" className={styles.menuLink}>
                                        <span>İLETİŞİM</span>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className={styles.right}>
                        {/* <div className={styles.basketBox}>
                            <Link href="/">
                                <i></i>
                                <span>SEPETİM</span>
                            </Link>
                        </div>
                        <div className={styles.loginBox}>
                            <div className={`${styles["linkBox"]} ${from ? styles["linkBoxDetailed"] : ""}`}>
                                <Link href="#">
                                    <span>GİRİŞ YAPIN</span>
                                </Link>
                            </div>
                        </div> */}
                        <div className={`${styles["linkBox"]} ${from ? styles["linkBoxDetailed"] : ""}`}>
                            <Link href="/rezervasyon-takip">
                                <span>REZERVASYON SORGULA</span>
                            </Link>
                        </div>
                        <div onClick={() => menuHandle()} className={styles.menuIcon}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}