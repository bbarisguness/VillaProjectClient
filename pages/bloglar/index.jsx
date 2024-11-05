import styles from "./page.module.css"
import Link from "next/link"
import BlogCard from "@/components/index/blog/blogCard";
import { getBlogs } from "@/services/blog";
import Seo from "@/components/seo";

export default function Blog({ blogs }) {
    const handleImageButton = (e) => {
        e.preventDefault();
        // console.log("butona basıldı")
    }

    return (
        <>
            <Seo pageTitle={'Labirent Fethiye | Bloglar'} pageDesc={'Bloglar'}/>
            <section className={`${styles["contentDetail"]} ${styles["villasDetail"]} ${styles["blogList"]}`}>
                <div className={styles.villas}>
                    <div className={styles.container}>
                        <div className={styles.box}>
                            <div className={styles.top}>
                                <div className={styles.titleBox}>
                                    <div className={styles.title}>Tüm Bloglar</div>
                                    <div className={styles.subTitle}>Toplam {blogs?.data?.length} adet blog listelendi.</div>
                                </div>
                            </div>
                            <div className={styles.bottom}>
                                <div className={styles.row}>
                                    <ul>
                                        {
                                            blogs?.data.map(item => (
                                                <li key={item.id}>
                                                    <div className={styles.column}>
                                                        <Link rel="nofollow" href={`/bloglar/${item?.id}`}>
                                                            <div className={styles.imgBox}>
                                                                <div className={styles.carouselBox}>
                                                                    <div className={styles.bgImage} style={{ backgroundImage: `url(https://villaapi.testgrande.com/Uploads/WebPhotos/k_${item?.photos[0]?.image})` }}></div>
                                                                    {/* <div className={styles.navButtons}>
                                                                         <button onClick={(e) => handleImageButton(e)}></button>
                                                                         <button onClick={(e) => handleImageButton(e)} className={styles.next}></button>
                                                                     </div> */}
                                                                </div>
                                                            </div>
                                                            <div className={styles.textBox}>
                                                                <div className={styles.title}>{item?.webPageDetails[0]?.title}</div>
                                                                <div className={styles.desc}>{item?.webPageDetails[0]?.descriptionShort}</div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export async function getServerSideProps() {
    const blogs = await getBlogs()
    return { props: { blogs } }
}