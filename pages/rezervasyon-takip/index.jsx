import BreadCrumb from '@/components/breadCrumb/breadCrumb'
import React, { useState } from 'react'
import styles from './page.module.css'
import { Formik } from "formik"
import * as Yup from "yup"
import Seo from '@/components/seo'
import { searchReservation } from '@/services/reservation'
import { getCoverPhotoVilla } from '@/services/photo'

export default function RezervasyonTakip() {
    const [step, setStep] = useState(0)
    const [villaCoverPhoto, setVillaCoverPhoto] = useState('')
    const [reservationDetail, setReservationDetail] = useState({
        checkIn: '',
        checkOut: '',
        reservationNumber: '',
    })
    const [ownerInfo, setOwnerInfo] = useState({
        email: '',
        phone: '',
        name: '',
        surname: ''
    })
    const [villaDetail, setVillaDetail] = useState({
        name: '',
        region: '',
    })

    function searchHandle(values) {
        searchReservation({ reservationNumber: values?.reservationNumber }).then((res) => {
            if (res?.data[0]?.attributes) {
                setStep(1)
                res?.data[0]?.attributes?.reservation_infos?.data.map((item) => {
                    if (item?.attributes.owner) {
                        setOwnerInfo({
                            email: item?.attributes.email,
                            phone: item?.attributes.phone,
                            name: item?.attributes.name,
                            surname: item?.attributes.surname
                        })
                    }
                })
                setVillaDetail({
                    name: res?.data[0]?.attributes?.villa?.data?.attributes?.name,
                    region: res?.data[0]?.attributes?.villa?.data?.attributes?.region
                })
                setReservationDetail({
                    checkIn: res?.data[0]?.attributes?.checkIn,
                    checkOut: res?.data[0]?.attributes?.checkOut,
                    reservationNumber: res?.data[0]?.attributes?.reservationNumber,
                })
                getCoverPhotoVilla({ id: res?.data[0]?.attributes?.villa?.data?.id }).then((img) => {
                    setVillaCoverPhoto(img?.data[0]?.attributes?.photo?.data?.attributes?.url)
                })
            } else {
                alert('Rezervasyon numarası hatalı !')
            }
        })
    }

    return (
        <>
            <Seo pageTitle={'Rezervasyon Takip'} pageDesc={'Rezervasyon Takip'} />
            <BreadCrumb link={'rezervasyon-takip'} />
            {
                step === 0 ?
                    <div className={styles.container}>
                        <div className={styles.content}>
                            <h1>Rezervasyon Takip Bölümü - Müşteri Girişi</h1>
                            <div className={styles.formContent}>
                                <Formik
                                    initialValues={{
                                        reservationNumber: "",
                                    }}
                                    validationSchema={
                                        Yup.object({
                                            reservationNumber: Yup.string().required("Bu alan boş bırakılamaz")
                                        })
                                    }
                                    onSubmit={(values) => {
                                        searchHandle(values)
                                    }}
                                >
                                    {
                                        ({ values, errors, handleChange, handleSubmit, handleReset, dirty, isSubmitting, touched, setFieldValue }) => (
                                            <form onSubmit={handleSubmit}>
                                                <ul>
                                                    <li>
                                                        <div className={styles.inputBox}>
                                                            <div className={styles.inputName}>Rezervasyon No</div>
                                                            <input name="reservationNumber" value={values.reservationNumber} onChange={handleChange} type="text" placeholder="43530537205723057" minLength="2" maxLength="30" />
                                                            {
                                                                errors.reservationNumber && touched.reservationNumber && (
                                                                    <div className={styles.inputFeedback}>
                                                                        {errors.reservationNumber}
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                    </li>
                                                </ul>
                                                <div className={styles.linkBox}>
                                                    <button type='submit' className={styles.blueButton2}>
                                                        <span>Giriş Yap</span>
                                                    </button>
                                                </div>
                                            </form>
                                        )
                                    }
                                </Formik>
                            </div>
                        </div>
                    </div> :
                    <div className={styles.container}>
                        <div className={styles.content}>
                            <div className={styles.successMessage}>
                                <div className={styles.iconBox}>
                                    <div style={{ backgroundImage: `url(${villaCoverPhoto})` }}></div>
                                </div>
                                <div className={styles.textBox}>
                                    <div className={styles.title}>{reservationDetail?.reservationNumber} Numaralı Rezervasyon Bilgileri</div>
                                    <div className={styles.desc}>
                                        Giriş Tarihi : {reservationDetail?.checkIn}
                                    </div>
                                    <div className={styles.desc}>
                                        Çıkış Tarihi : {reservationDetail?.checkOut}
                                    </div>
                                    <div className={styles.desc}>
                                        Villa İsmi : {villaDetail?.name}
                                    </div>
                                    <div className={styles.desc}>
                                        Villa Bölgesi : {villaDetail?.region}
                                    </div>
                                    <div className={styles.desc}>
                                        Rezervasyon Sahibi : {ownerInfo?.name} {ownerInfo?.surname}
                                    </div>
                                    <div className={styles.desc}>
                                        Telefon Numarası : {ownerInfo?.phone}
                                    </div>
                                    <div className={styles.desc}>
                                        Email : {ownerInfo?.email}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}
