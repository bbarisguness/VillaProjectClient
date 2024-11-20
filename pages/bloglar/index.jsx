import dynamic from "next/dynamic";
import styles from "./page.module.css";
import Link from "next/link";
import { getBlogs } from "@/services/blog";
import Seo from "@/components/seo";

const BlogCard = dynamic(() => import("../../components/blog/blogCard"), {
  ssr: false, // SSR olmadan yüklenmesi yeterli
});

export default function Blog({ blogs }) {
  return (
    <>
      <Seo pageTitle={"Labirent Fethiye | Bloglar"} pageDesc={"Bloglar"} />
      <section
        className={`${styles["contentDetail"]} ${styles["villasDetail"]} ${styles["blogList"]}`}
      >
        <div className={styles.villas}>
          <div className={styles.container}>
            <div className={styles.box}>
              <div className={styles.top}>
                <div className={styles.titleBox}>
                  <div className={styles.title}>Tüm Bloglar</div>
                  <div className={styles.subTitle}>
                    Toplam {blogs?.data?.length} adet blog listelendi.
                  </div>
                </div>
              </div>
              <div className={styles.bottom}>
                <div className={styles.row}>
                  <ul>
                    {blogs?.data.map((item) => (
                      <BlogCard key={item.id} item={item} />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps() {
  const blogs = await getBlogs();
  return { props: { blogs } };
}
