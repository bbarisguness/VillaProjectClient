import Gallery from "@/components/villaDetail/leftBar/gallery/gallery";
import styles from "./productImageBox.module.css";

export default function ProductImageBox({ imgs }) {
  return (
    <div className={styles.productImagesBox}>
      <div className={styles.container}>
        <div className={styles.productImages}>
          <div className={styles.row}>
            <Gallery photos={imgs} />
          </div>
        </div>
      </div>
    </div>
  );
}
