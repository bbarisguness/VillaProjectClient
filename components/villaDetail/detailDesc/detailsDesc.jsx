import styles from "./detailDesc.module.css";

export default function DetailDesc({ isDescOpen, setIsDescOpen, villaDetail }) {
  return (
    <>
      <div className={styles.villaDetailTitle}>Tesis Detayları</div>
      <div className={styles.villaDetailDesc}>
        <div
          dangerouslySetInnerHTML={{
            __html: villaDetail?.data?.villaDetails[0]?.descriptionLong,
          }}
          style={{ whiteSpace: "pre-line" }}
          className={`${styles["desc"]} ${isDescOpen && styles["active"]}`}
        ></div>
        <div
          className={`${styles["readMore"]} ${isDescOpen && styles["active"]}`}
        >
          <div className={styles.allButton}>
            <span onClick={() => setIsDescOpen(true)} className={styles.first}>
              Devamı...
            </span>
            <span onClick={() => setIsDescOpen(false)} className={styles.last}>
              Kapat...
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
