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

const Gallery = memo(function Gallery({ photos, from }) {
  if (photos != null) {
    if (from == "hotelList") {
      return (
        <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]}>
          {photos.map((data, index) =>
            index < 10 ? (
              index === 0 ? (
                <Link
                  key={index}
                  className={styles.lightBoxItem}
                  href={`${
                    process.env.NEXT_PUBLIC_APIHOTELPHOTOS_URL +
                    "b_" +
                    data?.image
                  }`}
                >
                  <div className={styles.lightBoxItemChild}>
                    <div className={styles.imageBox}>
                      <div
                        className={styles.img}
                        style={{
                          backgroundImage: `url(${
                            process.env.NEXT_PUBLIC_APIHOTELPHOTOS_URL +
                            "b_" +
                            data?.image
                          })`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <Image
                    alt=""
                    src={
                      process.env.NEXT_PUBLIC_APIHOTELPHOTOS_URL +
                      "k_" +
                      data?.image
                    }
                    width={96}
                    height={76}
                    style={{ display: "none" }}
                  />
                </Link>
              ) : index === 9 ? (
                <Link
                  key={index}
                  className={`${styles["lightBoxItem"]} ${styles["lastLi"]}`}
                  href={
                    process.env.NEXT_PUBLIC_APIHOTELPHOTOS_URL +
                    "b_" +
                    data?.image
                  }
                >
                  <div className={styles.lightBoxItemChild}>
                    <div className={styles.imageBox}>
                      <div
                        className={styles.img}
                        style={{
                          backgroundImage: `url(${
                            process.env.NEXT_PUBLIC_APIHOTELPHOTOS_URL +
                            "k_" +
                            data?.image
                          })`,
                        }}
                      ></div>
                    </div>
                    <span>
                      {photos.length - 10 > 0 ? `+${photos.length - 10}` : "+"}
                    </span>
                  </div>
                  <Image
                    alt=""
                    src={
                      process.env.NEXT_PUBLIC_APIHOTELPHOTOS_URL +
                      "k_" +
                      data?.image
                    }
                    width={96}
                    height={76}
                    style={{ display: "none" }}
                  />
                </Link>
              ) : (
                <Link
                  key={index}
                  className={styles.lightBoxItem}
                  href={
                    process.env.NEXT_PUBLIC_APIHOTELPHOTOS_URL +
                    "b_" +
                    data?.image
                  }
                >
                  <div className={styles.lightBoxItemChild}>
                    <div className={styles.imageBox}>
                      <div
                        className={styles.img}
                        style={{
                          backgroundImage: `url(${
                            process.env.NEXT_PUBLIC_APIHOTELPHOTOS_URL +
                            "k_" +
                            data?.image
                          })`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <Image
                    alt=""
                    src={
                      process.env.NEXT_PUBLIC_APIHOTELPHOTOS_URL +
                      "k_" +
                      data?.image
                    }
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
                href={
                  process.env.NEXT_PUBLIC_APIHOTELPHOTOS_URL +
                  "b_" +
                  data?.image
                }
              >
                <Image
                  alt=""
                  src={
                    process.env.NEXT_PUBLIC_APIHOTELPHOTOS_URL +
                    "k_" +
                    data?.image
                  }
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
      return (
        <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]}>
          {photos.map((data, index) =>
            index < 10 ? (
              index === 0 ? (
                <Link
                  key={index}
                  className={styles.lightBoxItem}
                  href={`${
                    process.env.NEXT_PUBLIC_APIPHOTOS_URL + "b_" + data?.image
                  }`}
                >
                  <div className={styles.lightBoxItemChild}>
                    <div className={styles.imageBox}>
                      <div
                        className={styles.img}
                        style={{
                          backgroundImage: `url(${
                            process.env.NEXT_PUBLIC_APIPHOTOS_URL +
                            "b_" +
                            data?.image
                          })`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <Image
                    alt=""
                    src={
                      process.env.NEXT_PUBLIC_APIPHOTOS_URL + "k_" + data?.image
                    }
                    width={96}
                    height={76}
                    style={{ display: "none" }}
                  />
                </Link>
              ) : index === 9 ? (
                <Link
                  key={index}
                  className={`${styles["lightBoxItem"]} ${styles["lastLi"]}`}
                  href={
                    process.env.NEXT_PUBLIC_APIPHOTOS_URL + "b_" + data?.image
                  }
                >
                  <div className={styles.lightBoxItemChild}>
                    <div className={styles.imageBox}>
                      <div
                        className={styles.img}
                        style={{
                          backgroundImage: `url(${
                            process.env.NEXT_PUBLIC_APIPHOTOS_URL +
                            "k_" +
                            data?.image
                          })`,
                        }}
                      ></div>
                    </div>
                    <span>
                      {photos.length - 10 > 0 ? `+${photos.length - 10}` : "+"}
                    </span>
                  </div>
                  <Image
                    alt=""
                    src={
                      process.env.NEXT_PUBLIC_APIPHOTOS_URL + "k_" + data?.image
                    }
                    width={96}
                    height={76}
                    style={{ display: "none" }}
                  />
                </Link>
              ) : (
                <Link
                  key={index}
                  className={styles.lightBoxItem}
                  href={
                    process.env.NEXT_PUBLIC_APIPHOTOS_URL + "b_" + data?.image
                  }
                >
                  <div className={styles.lightBoxItemChild}>
                    <div className={styles.imageBox}>
                      <div
                        className={styles.img}
                        style={{
                          backgroundImage: `url(${
                            process.env.NEXT_PUBLIC_APIPHOTOS_URL +
                            "k_" +
                            data?.image
                          })`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <Image
                    alt=""
                    src={
                      process.env.NEXT_PUBLIC_APIPHOTOS_URL + "k_" + data?.image
                    }
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
                href={
                  process.env.NEXT_PUBLIC_APIPHOTOS_URL + "b_" + data?.image
                }
              >
                <Image
                  alt=""
                  src={
                    process.env.NEXT_PUBLIC_APIPHOTOS_URL + "k_" + data?.image
                  }
                  width={96}
                  height={76}
                  style={{ display: "none" }}
                />
              </Link>
            )
          )}
        </LightGallery>
      );
    }
  } else {
    return <>loading</>;
  }
});

export default Gallery;
