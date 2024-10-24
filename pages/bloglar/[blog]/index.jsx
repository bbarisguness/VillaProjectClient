import styles from "./page.module.css"
import BreadCrumb from '@/components/breadCrumb/breadCrumb'
import TreeStep from '@/components/index/treestep/treestep'
import Seo from "@/components/seo";
import { getBlog } from "@/services/blog"
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Blog({ blog }) {
    const router = useRouter();
    const renderHtmlContent = () => {

        const description = blog?.data?.webPageDetails[0]?.descriptionLong

        const strongContent = description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        const headerContent = strongContent.replace(/(#+)\s*(.*?)\s*(?=(?:\r\n|\r|\n|$))/g, (_, hashes, content) => `<h${hashes.length}>${content}</h${hashes.length}>`);
        const finalContent = headerContent.length > 0 ? headerContent : `<p>${strongContent}</p>`;
        return { __html: finalContent };
    };

    if (blog.data) {
        return (
            <>
                <Seo pageTitle={blog?.data?.metaTitle} pageDesc={blog?.data?.metaDescription} />
                <BreadCrumb />
                <section className={`${styles['contentDetail']} ${styles['corporate']}`}>
                    <div className={styles.titleBox}>
                        <div className={styles.container}>
                            <h1 className={styles.title}>{blog?.data?.webPageDetails[0]?.title}</h1>
                        </div>
                    </div>
                    <div className={styles.textBox}>
                        <div className={styles.container}>
                            <div className={styles.text}>
                                <img src={`https://villaapi.testgrande.com/Uploads/WebPhotos/k_${blog?.data?.photos[0]?.image}`} />
                                <div dangerouslySetInnerHTML={renderHtmlContent()} style={{ whiteSpace: 'pre-line' }} />
                            </div>
                        </div>
                    </div>
                    <TreeStep from="blogDetail" />
                </section>
            </>
        )
    } else {
        useEffect(() => {
            router.replace('/404')
        }, [])
    }
}

export async function getServerSideProps({ query }) {
    const slug = query.blog
    const blog = await getBlog({ slug: slug })
    return { props: { blog } }
}