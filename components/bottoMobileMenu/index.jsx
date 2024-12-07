import styles from "./bottomMenu.module.css";
import Image from "next/image";
import { scrolltoHash, capitalizeWords } from "@/utils/globalUtils";

export default function Page({ t }) {
  return (
    <div className={styles.makeAReservation}>
      <div className={styles.section1}>
        <div className={styles.iconAndText}>
          <Image
            src="/images/bottomHome.png"
            alt="bottomHomeIcon"
            width={30}
            height={30}
          />
          <span className={styles.iconText}>
            {capitalizeWords(t("headerHomePage"))}
          </span>
        </div>
        <div className={styles.iconAndText}>
          <Image
            src="/images/bottomSearch.png"
            alt="bottomSearchIcon"
            width={30}
            height={30}
          />
          <span className={styles.iconText}>
            {t("searchForaFacilityForBottomMenu")}
          </span>
        </div>
      </div>
      <div className={styles.section2}>
        <div
          onClick={() => scrolltoHash("makeReservation")}
          className={styles.reservationIcon}
        >
          <div className={styles.iconAndText}>
            <Image
              src="/images/bottomCalendar.png"
              alt="bottomCalendar"
              width={35}
              height={35}
              style={{marginBottom: 5}}
            />
            <span className={styles.iconText} style={{ color: "#fff", fontSize: "12px" }}>
              {t("resevation")}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.section3}>
        <div className={styles.iconAndText}>
          <Image
            src="/images/bottomWhatsapp.png"
            alt="bottomWhatsappIcon"
            width={30}
            height={30}
          />
          <span className={styles.iconText}>Whatsapp</span>
        </div>
        <div className={styles.iconAndText}>
          <Image
            src="/images/bottomCall.png"
            alt="bottomCallIcon"
            width={30}
            height={30}
          />
          <span className={styles.iconText}>{t("call")}</span>
        </div>
      </div>
    </div>
  );
}
