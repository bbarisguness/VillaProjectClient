'use client';
import styles from "./hamburgerMenu.module.css"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { changeHamburgerMenuState } from "@/store/globalState";
import { getCategories } from "@/services/category";
import Image from "next/image";

export default function HamburgerMenu() {
    const dispatch = useDispatch()
    const isHamburgerMenuActive = useSelector(state => state.globalState.isHamburgerMenuActive)
    const [menu1, setMenu1] = useState(false)
    const [menu2, setMenu2] = useState(false)
    const [category, setCategory] = useState([])

    const closeMenu = () => {
        dispatch(changeHamburgerMenuState())
        setMenu1(false)
        setMenu2(false)
    }

    useEffect(() => {
        getCategories().then((res) => {
            setCategory(res?.data)
        })
    }, [])
    return (
        <>
            <div className={`${(isHamburgerMenuActive) && styles.openMenuDark}`}></div>
            <section className={`${styles["hamburgerMenu"]} ${isHamburgerMenuActive ? styles["active"] : ""}`}>
                <div className={styles.hamburgerMenuBox}>
                    <div className={styles.menuCloseBox}>
                        <div className={styles.logo}>
                            <Image
                                src="/images/labirent.png"
                                alt="call"
                                width={142}
                                height={56}
                                priority={true}
                            />
                        </div>
                        <div onClick={closeMenu} className={styles.menuClose}></div>
                    </div>
                    <div className={styles.hmMenu}>
                        <ul className={styles.hmMenuUl}>
                            <li className={styles.hmMenuLi}>
                                <Link onClick={closeMenu} href="/" className={styles.hmMenuLink}>ANASAYFA</Link>
                            </li>
                            <li onClick={() => setMenu1(!menu1)} className={`${styles["hmMenuLi"]} ${styles["menuOpen"]} ${menu1 ? styles["open"] : ""}`}>
                                <Link href="#" onClick={e => e.preventDefault()} className={styles.hmMenuLink}>KİRALIK VİLLALAR</Link>
                                <ul style={{ marginTop: menu1 ? '24px' : 0 }}>
                                    {/* <li><Link href="villalar/balayi-villalari">Balayı Villaları</Link></li>
                                <li><Link href="#">Popüler Villalar</Link></li>
                                <li><Link href="#">Çocuk Havuzlu Villalar</Link></li>
                                <li><Link href="#">Ekonomik Manzaralı</Link></li>
                                <li><Link href="#">Korunaklı Villalar</Link></li>
                                <li><Link href="#">Kış Aylarına Uygun</Link></li> */}
                                    <li><Link onClick={closeMenu} href={`/villalar`}>Tüm Villalar</Link></li>
                                    {
                                        category.map((item, i) => {
                                            return (
                                                <li key={i}><Link onClick={closeMenu} href={`/villalar/${item?.slug}`}>{item?.categoryDetails[0]?.name}</Link></li>
                                            )
                                        })
                                    }
                                </ul>
                            </li>
                            <li className={styles.hmMenuLi}>
                                <Link onClick={closeMenu} href="#" className={styles.hmMenuLink}>KİRALIK APARTLAR</Link>
                            </li>
                            <li className={styles.hmMenuLi}>
                                <Link onClick={closeMenu} href="#" className={styles.hmMenuLink}>YARDIM / DESTEK</Link>
                            </li>
                            <li className={styles.hmMenuLi}>
                                <Link onClick={closeMenu} href="/iletisim" className={styles.hmMenuLink}>İLETİŞİM</Link>
                            </li>
                            <li onClick={() => setMenu2(!menu2)} className={`${styles["hmMenuLi"]} ${styles["menuOpen"]} ${menu2 ? styles["open"] : ""}`}>
                                <Link href="#" onClick={e => e.preventDefault()} className={styles.hmMenuLink}>KURUMSAL</Link>
                                <ul>
                                    <li>
                                        <Link onClick={closeMenu} href="/hakkimizda">Hakkımızda</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.bottomSection}>
                        <div className={`${styles["linkBox"]}`}>
                            <Link onClick={closeMenu} href="/rezervasyon-takip">
                                <span>REZERVASYON SORGULA</span>
                            </Link>
                        </div>
                    </div>
                </div >
            </section >
        </>
    )
}