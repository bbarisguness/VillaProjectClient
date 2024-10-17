import VideoWithComment from "../villaDetail/VideoWithComment";
import styles from "./comments.module.css";
import { formatDate } from "@/utils/date";

export default function Comments({ commentData }) {
  return (
    <>
      <div className={styles.title}>4,91 · 11 değerlendirme</div>
      <div className={styles.commentRating}>
        <ul>
          <li>
            <div className={styles.name}>Temizlik</div>
            <div className={styles.rating}>
              <div className={styles.graphic}>
                <span></span>
              </div>
              <div className={styles.rate}>1.8</div>
            </div>
          </li>
          <li>
            <div className={styles.name}>İletişim</div>
            <div className={styles.rating}>
              <div className={styles.graphic}>
                <span></span>
              </div>
              <div className={styles.rate}>2.5</div>
            </div>
          </li>
          <li>
            <div className={styles.name}>Giriş</div>
            <div className={styles.rating}>
              <div className={styles.graphic}>
                <span></span>
              </div>
              <div className={styles.rate}>5.0</div>
            </div>
          </li>
          <li>
            <div className={styles.name}>Doğruluk</div>
            <div className={styles.rating}>
              <div className={styles.graphic}>
                <span></span>
              </div>
              <div className={styles.rate}>4.7</div>
            </div>
          </li>
          <li>
            <div className={styles.name}>Konum</div>
            <div className={styles.rating}>
              <div className={styles.graphic}>
                <span></span>
              </div>
              <div className={styles.rate}>3.9</div>
            </div>
          </li>
          <li>
            <div className={styles.name}>Kalite/fiyat oranı</div>
            <div className={styles.rating}>
              <div className={styles.graphic}>
                <span></span>
              </div>
              <div className={styles.rate}>4.7</div>
            </div>
          </li>
        </ul>
      </div>
      <div className={styles.comments}>
        <ul>
          {commentData.slice(0, 3).map((item) => {
            return (
              <li>
                <div className={styles.imageBox}>
                  <div className={styles.img}>
                    <img src="/images/person-3.png" alt="" />
                  </div>
                  {item?.video != null ? <VideoWithComment /> : null}
                </div>
                <div className={styles.name}>
                  {item.name} {item.surName}
                </div>
                <div className={styles.dateandRating}>
                  <div className={styles.date}>
                    {formatDate(item?.createdAt)}
                  </div>
                  <div className={styles.stars}>
                    <div className={styles.starItems}>
                      <div
                        className={`${styles["starItem"]} ${styles["active"]}`}
                      >
                        <div className={styles.star}></div>
                      </div>
                      <div
                        className={`${styles["starItem"]} ${styles["active"]}`}
                      >
                        <div className={styles.star}></div>
                      </div>
                      <div
                        className={`${styles["starItem"]} ${styles["active"]}`}
                      >
                        <div className={styles.star}></div>
                      </div>
                      <div
                        className={`${styles["starItem"]} ${styles["active"]}`}
                      >
                        <div className={styles.star}></div>
                      </div>
                      <div
                        className={`${styles["starItem"]} ${styles["active"]}`}
                      >
                        <div className={styles.star}></div>
                      </div>
                    </div>
                    <div className={styles.text}>(5 reviews)</div>
                  </div>
                </div>
                <div className={styles.descBox}>
                  Every single thing we tried with John was delicious! Found
                  some awesome places we would definitely go back to on our
                  trip. John was also super friendly and passionate about
                  Beşiktaş and Istanbul.{" "}
                </div>
              </li>
            );
          })}
        </ul>
        <div className={styles.linkBox}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
            }}
            className={styles.blueButtonArrowOpa}
          >
            <span>45 değerlendirmenin tümünü göster</span>
          </a>
        </div>
      </div>
    </>
  );
}
