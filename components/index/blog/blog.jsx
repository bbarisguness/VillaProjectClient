import Link from "next/link"
import styles from "./blog.module.css"
import BlogCard from "./blogCard"
const qs = require('qs');

export default function Blog({ blog }) {
    return (
        <div className={styles.blog}>
            <div className={styles.container}>
                <div className={styles.box}>
                    <div className={styles.titleBox}>
                        <div className={styles.title}>Blog</div>
                        <div className={styles.subTitle}>Bölgemizle ilgili bilgiyi bloglarımızdan alabilirsiniz</div>
                    </div>
                    <ul>
                        {
                            blog.data.map((blog, index) => {
                                //Anasayfa Blog başlığının altına 2 tane blog basar
                                if (index >= 2) return;
                                return <BlogCard key={index} data={blog} />
                            })
                        }
                    </ul>
                    <div className={styles.linkBox}>
                        <Link href="/bloglar" className={styles.greyButton}>
                            <span>Tümü</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}