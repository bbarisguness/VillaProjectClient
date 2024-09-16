import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import Link from "next/link";
// LightGallery Styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import styles from "./gallery.module.css";
import Image from "next/image";
import { memo } from "react";

const Gallery = memo(function Gallery({ photos }) {
  if (photos != null) {
    return (
      <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]}>
        {photos?.data
          .sort((a, b) => (a.attributes.line > b.attributes.line ? 1 : -1))
          .map((data, index) =>
            index < 10 ? (
              index === 0 ? (
                <Link
                  key={index}
                  className={styles.lightBoxItem}
                  href={`${data?.attributes?.photo?.data?.attributes?.url}`}
                >
                  <div className={styles.lightBoxItemChild}>
                    <div className={styles.imageBox}>
                      <div
                        className={styles.img}
                        style={{
                          backgroundImage: `url(${data?.attributes?.photo?.data?.attributes?.url})`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <Image
                    alt=""
                    src={`${data?.attributes?.photo?.data?.attributes?.url}`}
                    width={96}
                    height={76}
                    style={{ display: "none" }}
                  />
                </Link>
              ) : index === 9 ? (
                <Link
                  key={index}
                  className={`${styles["lightBoxItem"]} ${styles["lastLi"]}`}
                  href={`${data?.attributes?.photo?.data?.attributes?.url}`}
                >
                  <div className={styles.lightBoxItemChild}>
                    <div className={styles.imageBox}>
                      <div
                        className={styles.img}
                        style={{
                          backgroundImage: `url(${data?.attributes?.photo?.data?.attributes?.url})`,
                        }}
                      ></div>
                    </div>
                    <span>+{photos.data.length - 10}</span>
                  </div>
                  <Image
                    alt=""
                    src={`${data?.attributes?.photo?.data?.attributes?.url}`}
                    width={96}
                    height={76}
                    style={{ display: "none" }}
                  />
                </Link>
              ) : (
                <Link
                  key={index}
                  className={styles.lightBoxItem}
                  href={`${data?.attributes?.photo?.data?.attributes?.url}`}
                >
                  <div className={styles.lightBoxItemChild}>
                    <div className={styles.imageBox}>
                      <div
                        className={styles.img}
                        style={{
                          backgroundImage: `url(${data?.attributes?.photo?.data?.attributes?.url})`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <Image
                    alt=""
                    src={`${data?.attributes?.photo?.data?.attributes?.url}`}
                    width={96}
                    height={76}
                    style={{ display: "none" }}
                  />
                </Link>
              )
            ) : (
              <Link
                key={index}
                style={{ display: "none" }}
                href={`${data?.attributes?.photo?.data?.attributes?.url}`}
              >
                <Image
                  alt=""
                  src={`${data?.attributes?.photo?.data?.attributes?.url}`}
                  width={96}
                  height={76}
                  style={{ display: "none" }}
                />
              </Link>
            )
          )}
      </LightGallery>
    );
  } else {
    return <>loading</>;
  }
});

export default Gallery;