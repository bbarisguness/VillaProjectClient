import { useEffect, useState } from "react";
import styles from "./detailTitleBox.module.css";
import { getPriceRange } from "@/utils/globalUtils";
import { parseCookies } from "nookies";

export default function DetailTitleBox({
  villaDetail,
  currentPriceTypeText,
  t,
  i18n,
}) {
  const [currencies, setCurrencies] = useState(null);

  useEffect(() => {
    const cookies = parseCookies();
    setCurrencies(JSON.parse(cookies.currencies));
  }, []);

  return (
    <div className={styles.detailTitleBox}>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.left}>
            <div className={styles.detailTitle}>
              {villaDetail?.name}
            </div>
            <div className={styles.villaInformation}>
              <div className={styles.features}>
                <div className={styles.colon}>
                  <i className={styles.pin_icon}></i>
                  <span>
                    {villaDetail?.district} /{" "}
                    {villaDetail?.town}
                  </span>
                </div>
                <div className={styles.colon}>
                  <i className={styles.person_icon}></i>
                  <span>
                    {villaDetail?.person} {t("people")}
                  </span>
                </div>
                <div className={styles.colon}>
                  <i className={styles.room_icon}></i>
                  <span>
                    {villaDetail?.room} {t("room")}
                  </span>
                </div>
                <div className={styles.colon}>
                  <i className={styles.bath_icon}></i>
                  <span>
                    {villaDetail?.bath} {t("bath")}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.priceType}>{t("lowestNightly")}</div>
            <div className={styles.price}>
              {getPriceRange(
                villaDetail?.data?.priceTables,
                currentPriceTypeText,
                villaDetail?.data?.priceType,
                i18n,
                currencies
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
