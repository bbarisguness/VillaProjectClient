import styles from "./detailTitleBox.module.css";
import { getPriceRange } from "@/utils/globalUtils";

export default function DetailTitleBox({ villaDetail, currentPriceTypeText }) {
  return (
    <div className={styles.detailTitleBox}>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.left}>
            <div className={styles.detailTitle}>
              {villaDetail?.data?.villaDetails[0]?.name}
            </div>
            <div className={styles.villaInformation}>
              <div className={styles.features}>
                <div className={styles.colon}>
                  <i className={styles.pin_icon}></i>
                  <span>
                    {villaDetail?.data?.town?.district?.name} /{" "}
                    {villaDetail?.data?.town?.name}
                  </span>
                </div>
                <div className={styles.colon}>
                  <i className={styles.person_icon}></i>
                  <span>{villaDetail?.data?.person} Kişi</span>
                </div>
                <div className={styles.colon}>
                  <i className={styles.room_icon}></i>
                  <span>{villaDetail?.data?.room} Oda</span>
                </div>
                <div className={styles.colon}>
                  <i className={styles.bath_icon}></i>
                  <span>{villaDetail?.data?.bath} Banyo</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.priceType}>Gecelik En Düşük</div>
            <div className={styles.price}>
              {getPriceRange(
                villaDetail?.data?.priceTables,
                currentPriceTypeText
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
