import styles from "./page.module.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { Rating } from "react-simple-star-rating";
import { useState } from "react";

export default function CommentForm() {
    const [rating, setRating] = useState(0);

    const handleRating = (rate) => {
        setRating(rate);
        // other logic
      };

  return (
    <div className={styles.commentForm}>
      <div className={styles.title}>Yorumunuzu Bekliyoruz</div>
      <div className={styles.row}>
        <ul className={styles.commentUl}>
          <li className={styles.commentLi}>
            <div className={styles.textandRating}>
              <div className={styles.text}>Temizlik</div>
              <div className={`${styles["stars"]} ${styles["active"]}`}>
                <div className={styles.starItems} rating="5">
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className={styles.commentLi}>
            <div className={styles.textandRating}>
              <div className={styles.text}>Doğruluk</div>
              <div className={`${styles["stars"]} ${styles["active"]}`}>
                <div className={styles.starItems} rating="5">
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className={styles.commentLi}>
            <div className={styles.textandRating}>
              <div className={styles.text}>İletişim</div>
              <div className={`${styles["stars"]} ${styles["active"]}`}>
                <div className={styles.starItems} rating="5">
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className={styles.commentLi}>
            <div className={styles.textandRating}>
              <div className={styles.text}>Konum</div>
              <div className={`${styles["stars"]} ${styles["active"]}`}>
                <div className={styles.starItems} rating="5">
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className={styles.commentLi}>
            <div className={styles.textandRating}>
              <div className={styles.text}>Giriş</div>
              <div className={`${styles["stars"]} ${styles["active"]}`}>
                <div className={styles.starItems} rating="5">
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className={styles.commentLi}>
            <div className={styles.textandRating}>
              <div className={styles.text}>Kalite/fiyat oranı</div>
              <div className={`${styles["stars"]} ${styles["active"]}`}>
                <div className={styles.starItems} rating="5">
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <Formik
        initialValues={{
          form_email: "",
          form_name: "",
          form_surname: "",
          form_phone: "",
          form_message: "",
          form_rating: 0,
        }}
        validationSchema={Yup.object({
          form_email: Yup.string().required("Bu alan boş bırakılamaz"),
          form_name: Yup.string().required("Bu alan boş bırakılamaz"),
          form_surname: Yup.string().required("Bu alan boş bırakılamaz"),
          form_phone: Yup.string().required("Bu alan boş bırakılamaz"),
          form_message: Yup.string().required("Bu alan boş bırakılamaz"),
          form_rating: Yup.number()
            .transform((value, originalValue) =>
              originalValue === "" ? null : value
            )
            .required("Puan verin")
            .min(0.5, "Lütfen puan verin"),
        })}
        onSubmit={async (values, { resetForm }) => {
          const response = await createComment(0, {
            ...values,
            id: villaId,
          });
          if (response.statusCode == 200) {
            alert("Yorum gönderildi");
            resetForm();
          }
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          handleReset,
          dirty,
          isSubmitting,
          touched,
          setFieldValue,
        }) => (
          <form id={styles.commentForm} onSubmit={handleSubmit}>
            <ul>
              <li
                className={styles.full}
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <span style={{ fontSize: 22 }}>Puanınız</span>
                <Rating
                  transition
                  onClick={(value) => {
                    handleRating(value);
                    setFieldValue("form_rating", value);
                  }}
                  allowFraction
                />
                {errors.form_rating && touched.form_rating && (
                  <div className={styles.inputFeedback}>
                    {errors.form_rating}
                  </div>
                )}
              </li>
              <li className={styles.full}>
                <div className={styles.inputBox}>
                  <div className={styles.inputName}>Villa için Yorumunuz</div>
                  <textarea
                    name="form_message"
                    rows="4"
                    cols="50"
                    placeholder="•••"
                    value={values.form_message}
                    onChange={handleChange}
                  ></textarea>
                  {errors.form_message && touched.form_message && (
                    <div className={styles.inputFeedback}>
                      {errors.form_message}
                    </div>
                  )}
                </div>
              </li>
              <li>
                <div className={styles.inputBox}>
                  <div className={styles.inputName}>Ad</div>
                  <input
                    name="form_name"
                    value={values.form_name}
                    onChange={handleChange}
                    type="text"
                    className={styles.form_name}
                    placeholder="•••••"
                  />
                  {errors.form_name && touched.form_name && (
                    <div className={styles.inputFeedback}>
                      {errors.form_name}
                    </div>
                  )}
                </div>
              </li>
              <li>
                <div className={styles.inputBox}>
                  <div className={styles.inputName}>Soyad</div>
                  <input
                    type="text"
                    className={styles.form_surname}
                    name="form_surname"
                    placeholder="•••••"
                    onChange={handleChange}
                    value={values.form_surname}
                  />
                  {errors.form_surname && touched.form_surname && (
                    <div className={styles.inputFeedback}>
                      {errors.form_surname}
                    </div>
                  )}
                </div>
              </li>
              <li>
                <div className={styles.inputBox}>
                  <div className={styles.inputName}>Telefon Numaranız</div>
                  <input
                    type="text"
                    className={styles.form_phone}
                    name="form_phone"
                    placeholder="(•••) ••• •• ••"
                    onChange={handleChange}
                    value={values.form_phone}
                  />
                  {errors.form_phone && touched.form_phone && (
                    <div className={styles.inputFeedback}>
                      {errors.form_phone}
                    </div>
                  )}
                </div>
              </li>
              <li>
                <div className={styles.inputBox}>
                  <div className={styles.inputName}>Email Adresiniz</div>
                  <input
                    type="text"
                    className={styles.form_email}
                    name="form_email"
                    placeholder="•••••••••"
                    onChange={handleChange}
                    value={values.form_email}
                  />
                  {errors.form_email && touched.form_email && (
                    <div className={styles.inputFeedback}>
                      {errors.form_email}
                    </div>
                  )}
                </div>
              </li>
            </ul>
            <div className={styles.linkBox}>
              <button
                type={"submit"}
                className={`${styles["blueButtonArrow"]} ${styles["sendCommentForm"]}`}
              >
                <span>Yorumu Gönder</span>
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}