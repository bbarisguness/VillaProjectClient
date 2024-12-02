import Link from "next/link";
import Image from "next/image";
import styles from "./service.module.css";
import { useTranslation } from "react-i18next";
import { capitalizeWords } from "@/utils/globalUtils";

export default function Service() {
  const { t } = useTranslation("common");
  return (
    <div className={styles.services}>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.top}>
            <div className={styles.colon}>
              <div className={styles.imgBox}>
                <div
                  className={styles.bgImage}
                  style={{ backgroundImage: "url(/images/services-img-1.png)" }}
                ></div>
              </div>
              <div className={styles.textBox}>
                <div className={styles.title}>{t("ourVillasForSale")}</div>
                <div className={styles.desc}>{t("ourVillasForSaleText")}</div>
                <div className={styles.linkBox}>
                  <Link href="/satilik-villalar" className={styles.blueButton2}>
                    <span>{t("examineInDetail")}</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles.colon}>
              <div className={styles.imgBox}>
                <div
                  className={styles.bgImage}
                  style={{ backgroundImage: "url(/images/services-img-2.png)" }}
                ></div>
              </div>
              <div className={styles.textBox}>
                <div className={styles.title}>
                  {capitalizeWords(t("headerCarRental"))}
                </div>
                <div className={styles.desc}>{t("carRentalText")}</div>
                <div className={styles.linkBox}>
                  <Link href="/arac-kiralama" className={styles.blueButton2}>
                    <span>{t("examineInDetail")}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.titleBox}>
            <div className={styles.title}>{t("ourServices")}</div>
            <div className={styles.subTitle}>
              {t("thePerfectHolidayStartsHere")}
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.row}>
              <ul>
                <li>
                  <div className={styles.column}>
                    <Link onClick={(e) => e.preventDefault()} href="#">
                      <div className={styles.iconBox}>
                        <Image
                          src="/images/services1.png"
                          alt="services1"
                          width={50}
                          height={50}
                        />
                        <Image
                          src="/images/services1-hover.png"
                          alt="services1Hover"
                          width={50}
                          height={50}
                          className={styles.two_i}
                        />
                      </div>
                      <div className={styles.title}>
                        {capitalizeWords(t("headerCarRental"))}
                      </div>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className={styles.column}>
                    <Link onClick={(e) => e.preventDefault()} href="#">
                      <div className={styles.iconBox}>
                        <Image
                          src="/images/services2.png"
                          alt="services2"
                          width={50}
                          height={50}
                        />
                        <Image
                          src="/images/services2-hover.png"
                          alt="services2Hover"
                          width={50}
                          height={50}
                          className={styles.two_i}
                        />
                      </div>
                      <div className={styles.title}>{t("parachute")}</div>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className={styles.column}>
                    <Link onClick={(e) => e.preventDefault()} href="#">
                      <div className={styles.iconBox}>
                        <Image
                          src="/images/services3.png"
                          alt="services3"
                          width={50}
                          height={50}
                        />
                        <Image
                          src="/images/services3-hover.png"
                          alt="services3Hover"
                          width={50}
                          height={50}
                          className={styles.two_i}
                        />
                      </div>
                      <div className={styles.title}>{t("transfer")}</div>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className={styles.column}>
                    <Link onClick={(e) => e.preventDefault()} href="#">
                      <div className={styles.iconBox}>
                        <Image
                          src="/images/services4.png"
                          alt="services4"
                          width={50}
                          height={50}
                        />
                        <Image
                          src="/images/services4-hover.png"
                          alt="services4Hover"
                          width={50}
                          height={50}
                          className={styles.two_i}
                        />
                      </div>
                      <div className={styles.title}>{t("jeepSafari")}</div>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className={styles.column}>
                    <Link onClick={(e) => e.preventDefault()} href="#">
                      <div className={styles.iconBox}>
                        <Image
                          src="/images/services5.png"
                          alt="services5"
                          width={50}
                          height={50}
                        />
                        <Image
                          src="/images/services5-hover.png"
                          alt="services5Hover"
                          width={50}
                          height={50}
                          className={styles.two_i}
                        />
                      </div>
                      <div className={styles.title}>{t("atvSafari")}</div>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className={styles.column}>
                    <Link onClick={(e) => e.preventDefault()} href="#">
                      <div className={styles.iconBox}>
                        <Image
                          src="/images/services6.png"
                          alt="services6"
                          width={50}
                          height={50}
                        />
                        <Image
                          src="/images/services6-hover.png"
                          alt="services6Hover"
                          width={50}
                          height={50}
                          className={styles.two_i}
                        />
                      </div>
                      <div className={styles.title}>
                        {t("horseRidingTours")}
                      </div>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className={styles.column}>
                    <Link onClick={(e) => e.preventDefault()} href="#">
                      <div className={styles.iconBox}>
                        <Image
                          src="/images/services7.png"
                          alt="services7"
                          width={50}
                          height={50}
                        />
                        <Image
                          src="/images/services7-hover.png"
                          alt="services7Hover"
                          width={50}
                          height={50}
                          className={styles.two_i}
                        />
                      </div>
                      <div className={styles.title}>{t("rafting")}</div>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className={styles.column}>
                    <Link onClick={(e) => e.preventDefault()} href="#">
                      <div className={styles.iconBox}>
                        <Image
                          src="/images/services8.png"
                          alt="services8"
                          width={50}
                          height={50}
                        />
                        <Image
                          src="/images/services8-hover.png"
                          alt="services8Hover"
                          width={50}
                          height={50}
                          className={styles.two_i}
                        />
                      </div>
                      <div className={styles.title}>{t("dive")}</div>
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
