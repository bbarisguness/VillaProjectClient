import styles from "./top.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export default function HeaderTop() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { locales, locale: activeLocale } = router;
  const { pathname, query, asPath } = router;

  const otherLocales = (locales || []).filter(
    (locale) => locale !== activeLocale
  );

  return (
    <div className={styles.top}>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.left}>
            <div className={styles.colon}>
              <Image src="/images/call.png" alt="call" width={20} height={20} />
              <span>
                {t("contactUs")} <a href="tel:02428443988">+90 252 616 66 48</a>
              </span>
            </div>
            <div className={styles.colon}>
              <Image
                src="/images/clock.png"
                alt="clock"
                width={20}
                height={20}
              />
              <span>{t("workingHours")} : 09:00 - 18:00</span>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.socialMedia}>
              <div className={styles.socialText}>{t("followUs")}</div>
              <ul>
                <li>
                  <Link
                    target="_blank"
                    rel="nofollow"
                    href="https://www.facebook.com/Labirentfethiye/"
                    className={styles.facebook}
                  >
                    <i></i>
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    rel="nofollow"
                    href="https://www.youtube.com/channel/UCHSwoqGIPpT6rqP2fsA9TwA"
                    className={styles.youtube}
                  >
                    <i></i>
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    rel="nofollow"
                    href="https://www.instagram.com/labirentfethiye/"
                    className={styles.instagram}
                  >
                    <i></i>
                  </Link>
                </li>
                {/* <li>
                                    <Link target="_blank" href='https://g.page/labirentfethiye?share' className={styles.google}>
                                        <i></i>
                                    </Link>
                                </li> */}
              </ul>
            </div>
            <div className={styles.lang}>
              <ul>
                {otherLocales.map((localeItem) => {
                  return (
                    <li key={localeItem}>
                      <Link
                        href={{ pathname, query }}
                        as={asPath}
                        locale={localeItem}
                        legacyBehavior
                      >
                        {activeLocale}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
