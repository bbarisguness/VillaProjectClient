import Image from "next/image";
import * as Yup from "yup";
import { Formik } from "formik";
import styles from "./page.module.css";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "@emailjs/browser";

export default function Form() {
  const [isActiveSuccessMessage, setActiveSuccessMessage] = useState(false);
  const [isActiveErrorMessage, setActiveErrorMessage] = useState(false);

  const [captchaIsDone, setCaptchaIsDone] = useState(false);
  const [isMailSended, setMailSended] = useState(false);
  const [isMailSending, setMailSending] = useState(false);
  const [isMailSendError, setMailSendError] = useState(false);

  function onChange() {
    setCaptchaIsDone(true);
  }

  const phoneFormat = (value) => {
    if (value.length > 15) return value.slice(0, value.length - 1);
    if (!value) return value;
    if (value == 0) return "";
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    if (phoneNumberLength < 9) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
        3,
        6
      )} ${phoneNumber.slice(6, 10)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )} ${phoneNumber.slice(6, 8)} ${phoneNumber.slice(8)}`;
  };

  return (
    <div className={styles.formContent}>
      <Formik
        initialValues={{
          phone: "",
          nameAndSurname: "",
          facilityName: "",
          facilityAddress: "",
          message: "",
        }}
        validationSchema={Yup.object({
          phone: Yup.string().required("Bu alan boş bırakılamaz"),
          nameAndSurname: Yup.string().required("Bu alan boş bırakılamaz"),
          facilityName: Yup.string().required("Bu alan boş bırakılamaz"),
          facilityAddress: Yup.string().required("Bu alan boş bırakılamaz"),
          message: Yup.string().required("Bu alan boş bırakılamaz"),
        })}
        onSubmit={(values) => {
          if (captchaIsDone) {
            setMailSending(true);
            const templateParams = {
              message: values.message,
              from_nameAndSurname: values.nameAndSurname,
              to_email: "tevfikk.durmus@gmail.com", //mailin gideceği adress
              phone: values.phone,
              facilityName: values.facilityName,
              facilityAddress: values.facilityAddress,
            };
            emailjs
              .send(
                "service_hoy1hhc",
                "template_n90pb1d",
                templateParams,
                "kmsc6KUwfTD0e3ajH"
              )
              .then(
                (response) => {
                  //console.log("SUCCESS!", response.status, response.text);
                  setMailSended(true);
                  setMailSending(false);
                  setActiveSuccessMessage(true);
                },
                (err) => {
                  console.log("FAILED...", err);
                  setMailSending(false);
                  setMailSendError(true);
                  setActiveErrorMessage(true);
                }
              );
          } else {
            alert("Lütfen robot olmadığınızı kanıtlayın");
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
          <form onSubmit={handleSubmit}>
            <ul>
              <li>
                <div className={styles.inputBox}>
                  <div className={styles.inputName}>Ad Soyad</div>
                  <input
                    name="nameAndSurname"
                    value={values.nameAndSurname}
                    onChange={handleChange}
                    type="text"
                    placeholder="•••••"
                    maxLength="50"
                  />
                  {errors.nameAndSurname && touched.nameAndSurname && (
                    <div className={styles.inputFeedback}>
                      {errors.nameAndSurname}
                    </div>
                  )}
                </div>
              </li>
              <li>
                <div className={styles.inputBox}>
                  <div className={styles.inputName}>Telefon</div>
                  <input
                    name="phone"
                    value={values.phone}
                    onChange={(e) =>
                      setFieldValue("phone", phoneFormat(e.target.value))
                    }
                    type="text"
                    placeholder="(•••) ••• •• ••"
                    minLength="15"
                    maxLength="15"
                  />
                  {errors.phone && touched.phone && (
                    <div className={styles.inputFeedback}>{errors.phone}</div>
                  )}
                </div>
              </li>
              <li>
                <div className={styles.inputBox}>
                  <div className={styles.inputName}>Tesis İsmi</div>
                  <input
                    name="facilityName"
                    value={values.facilityName}
                    onChange={handleChange}
                    type="text"
                    placeholder="•••••"
                  />
                  {errors.facilityName && touched.facilityName && (
                    <div className={styles.inputFeedback}>
                      {errors.facilityName}
                    </div>
                  )}
                </div>
              </li>
              <li>
                <div className={styles.inputBox}>
                  <div className={styles.inputName}>Tesis Adresi</div>
                  <input
                    name="facilityAddress"
                    value={values.facilityAddress}
                    onChange={handleChange}
                    type="text"
                    placeholder="•••••"
                  />
                  {errors.facilityAddress && touched.facilityAddress && (
                    <div className={styles.inputFeedback}>
                      {errors.facilityAddress}
                    </div>
                  )}
                </div>
              </li>
              <li style={{ width: "100%" }}>
                <div className={styles.inputBox}>
                  <div className={styles.inputName}>Mesajınız</div>
                  {/* <input
                          name="message"
                          value={values.message}
                          onChange={handleChange}
                          type="text"
                          placeholder="•••"
                        /> */}
                  <textarea
                    rows={4}
                    cols={4}
                    onChange={handleChange}
                    name="message"
                    placeholder="•••"
                  ></textarea>
                  {errors.message && touched.message && (
                    <div className={styles.inputFeedback}>{errors.message}</div>
                  )}
                </div>
              </li>
            </ul>
            <ReCAPTCHA
              style={{ marginTop: "20px" }}
              sitekey="6LcAW8MpAAAAAKYC7E-Ozne_W61-fmMVlyDvgXmG"
              onChange={onChange}
              onExpired={() => setCaptchaIsDone(false)}
            />
            {!isMailSending && (
              <div className={styles.linkBox}>
                <button type="submit" className={styles.blueButton2}>
                  <span>Gönder</span>
                </button>
              </div>
            )}
          </form>
        )}
      </Formik>
      <div
        className={`${styles.mask}${
          isActiveSuccessMessage ? " " + styles.active : ""
        }`}
      >
        <div className={styles.iconBox}>
          <Image
            width={102}
            height={101}
            src="/images/success.png"
            alt="succes"
          />
        </div>
        <div className={styles.title}>Teşekkürler!</div>
        <div className={styles.desc}>
          Talebiniz bize ulaşmıştır. En yakın zaman içerisinde tarafınıza dönüş
          sağlanacaktır.
        </div>
      </div>
      <div
        className={`${styles.mask}${
          isActiveErrorMessage ? " " + styles.active : ""
        }`}
      >
        <div className={styles.iconBox}>
          <Image width={102} height={101} src="/images/error.png" alt="error" />
        </div>
        <div className={styles.title}>Gönderilemedi!</div>
        <div className={styles.desc}>Talebiniz bize ulaşmamıştır.</div>
      </div>
    </div>
  );
}
