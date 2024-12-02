import styles from "./treestep.module.css";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function TreeStep({ from }) {
  const { t } = useTranslation("common");
  return (
    <div style={from && { display: "inline" }} className={styles.threeSteps}>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.titleBox}>
            <div className={styles.title}>3 {t("easyBookingInSteps")}</div>
            <div className={styles.subTitle}>
              {t("thePerfectHolidayStartsHere")}
            </div>
          </div>
          <ul>
            <li>
              <div className={styles.iconBox}>
                <div className={styles.iconContainer}>
                  <Image
                    src="/images/search-favorite.png"
                    alt="searchFavorite"
                    width={50}
                    height={50}
                  />
                </div>
              </div>
              <div className={styles.title}>
                {t("searchAmongHundredsofVillas")}
              </div>
              <div className={styles.desc}>
                {t("searchAmongHundredsofVillasText")}
              </div>
            </li>
            <li>
              <div className={styles.iconBox}>
                <div className={styles.iconContainer}>
                  <Image
                    src="/images/send-2.png"
                    alt="send2"
                    width={50}
                    height={50}
                  />
                </div>
              </div>
              <div className={styles.title}>{t("sendRequest")}</div>
              <div className={styles.desc}>{t("sendRequestText")}</div>
            </li>
            <li>
              <div className={styles.iconBox}>
                <div className={styles.iconContainer}>
                  <Image
                    src="/images/like-tag.png"
                    alt="likeTag"
                    width={50}
                    height={50}
                  />
                </div>
              </div>
              <div className={styles.title}>{t("completeReservation")}</div>
              <div className={styles.desc}>{t("completeReservationText")}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
