import { useEffect, useState } from "react"
import styles from "./mydatepicker.module.css"

//reservasyon tarihleri düşük aydan yükselen aya doğru gelmesi lazım
export default function MyDatePicker({ year = 2023, dates, nowYear, currentMounth }) {
    const twoDifferentYearsWillBeListed = 6-currentMounth
    
    let oldDates = dates
    dates.sort((a, b) => new Date(a.attributes.checkIn) - new Date(b.attributes.checkIn))
    dates = dates.filter(item => item.attributes.reservationStatus != 110)

    //reservationDates = ["2022/11/25-2023/0/3", "2023/0/29-2023/1/5", "2023/1/5-2023/1/7", "2023/1/25-2023/5/21", "2023/6/5-2023/6/10", "2023/6/10-2023/6/15", "2023/11/9-2023/11/12"]
    //let datesString = []

    let reservationDates = []
    let reservationDatesStatus = []
    dates.map((date) => {
        //console.log(date.attributes.checkIn.split("-")[0] + "/" + date.attributes.checkIn.split("-")[1] + "/" + date.attributes.checkIn.split("-")[2]+"-"+date.attributes.checkOut.split("-")[0] + "/" + date.attributes.checkOut.split("-")[1] + "/" + date.attributes.checkOut.split("-")[2]);
        reservationDates.push(date.attributes.checkIn.split("-")[0] + "/" + (date.attributes.checkIn.split("-")[1] - 1) + "/" + date.attributes.checkIn.split("-")[2] + "-" + date.attributes.checkOut.split("-")[0] + "/" + (date.attributes.checkOut.split("-")[1] - 1) + "/" + date.attributes.checkOut.split("-")[2])
        reservationDatesStatus.push(parseInt(date.attributes.reservationStatus))
    })
    //console.log("statuses ",reservationDatesStatus);

    const [ready, setReady] = useState(false)
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let dayUtc = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    let monthsTurkish = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']
    let isStartResarvation = false
    let isEndResarvation = false
    let isReservationContiniung = false
    let currentDate = new Date(year, 0, 1)
    let reservationIndex = 0

    //müsaitlik takviminde yıl değiştirildği zaman geçen yıldan devam eden rezervasyon var mı yok mu o belirleniyor
    let reservationContinuingFromBeforeYearDates = dates.filter(item => (item.attributes.checkIn.split('-')[0] == (year-1)) && (item.attributes.checkOut.split('-')[0] == year))
    
    if(reservationContinuingFromBeforeYearDates.length > 0){
        reservationIndex = dates.findIndex(item => item.id == reservationContinuingFromBeforeYearDates[0].id)+1
    }
    else if(year - nowYear == 2){
        reservationIndex = dates.findIndex(item => item.attributes.checkIn.split('-')[0] == year || item.attributes.checkOut.split('-')[0] == year)
    }
    else {
        if(year == nowYear+1){
            reservationIndex = oldDates.findIndex(item => item.attributes.reservationStatus == 110)
        }
        else {
            reservationIndex = 0
        }
    }

    useEffect(() => {
        setReady(true)
    }, [])

    const stringToDate = (dateString = "2023/0/1") => {
        let year, month, day, dateArray
        dateArray = dateString.split('/')
        year = dateArray[0]
        month = dateArray[1]
        day = dateArray[2]
        return new Date(year, month, day)
    }

    const stringToDate2 = (dateString = "2023-06-01") => {
        let year, month, day, dateArray
        dateArray = dateString.split('-')
        year = dateArray[0]
        month = dateArray[1]-1
        day = dateArray[2]
        return new Date(year, month, day)
    }

    //belirtilen yıl ve ayın ilk gününü döndürür
    const getFirstDayOfMonth = (year, month) => {
        const date = new Date(year, month, 1)
        return (days[date.getDay()])
        /*for (let index = 0; index < 5; index++) {
            console.log(index + 1)
        }*/
    }

    //Belirtilen tarihin gün sayısını döndürür
    const getDayCountOfMMonth = (year, month) => {
        const date = new Date(year, month + 1, 0)
        return date.getDate()
    }

    //her ay için çalışacak olan fonksiyon(12 sefer çalışacak)
    const getRows = (month = 0, _getRowsYear= 2024) => {
        let day = 1
        let rows = []
        let numberOfMonth = getDayCountOfMMonth(_getRowsYear, month) // Aydaki gün sayısı 2.parametre olan 2 Mart ayına denk gelir fonksiyondan 31 döner
        let firstDay = getFirstDayOfMonth(_getRowsYear, month)
        let isFirstRowInEnded = false
        let reservationDateStrings


        if (reservationDates[reservationIndex]) {
            reservationDateStrings = reservationDates[reservationIndex].split('-')
        }

        let reservationDates2 = [] // reservasyon tarihi buraya alındı(sadece 1 reservasyon başlangıç ve bitiş tarihi)
        if (reservationDateStrings) {
            reservationDateStrings.map((item, index) => {
                reservationDates2[index] = stringToDate(item)
            })
        }

        //start-end-continue background stillerini koşullara göre döndüren fonksiyon
        const backgroundColor = () => {
            if(reservationContinuingFromBeforeYearDates.length >= 1){
                if(stringToDate2(reservationContinuingFromBeforeYearDates[0].attributes.checkOut).getTime() == currentDate.getTime()){
                    isEndResarvation = true;

                    if(reservationContinuingFromBeforeYearDates[0].attributes.reservationStatus == 100) {
                        reservationContinuingFromBeforeYearDates= []
                        if(reservationDatesStatus[reservationIndex] == 100) {
                            if(reservationDatesStatus[reservationIndex] == 100) {
                                if(stringToDate2(reservationDates[reservationIndex-1].split('-')[1]).getTime() == stringToDate2(reservationDates[reservationIndex].split('-')[0]).getTime()){
                                    return styles["day-continueOrange"]
                                }
                                else {
                                    if(reservationDatesStatus[reservationIndex] == 100){
                                        if(reservationDates[reservationIndex-1].split('-')[1] == reservationDates[reservationIndex].split('-')[0]){
                                            return styles["day-continueOrange"]
                                        }
                                        else {
                                            return styles["day-endOrange"]
                                        }
                                    }
                                    else {
                                        return styles["day-endOrange"]
                                    }
                                }
                            }
                        }
                        else if (reservationDatesStatus[reservationIndex] == 110 && reservationDatesStatus[reservationIndex-1] == 100 && (reservationDatesStatus[reservationIndex] == 120 || reservationDatesStatus[reservationIndex] == 130 || reservationDatesStatus[reservationIndex] == 140)){
                            return styles["day-starRedToOrange"]
                        }
                        else {
                            if(reservationDates[reservationIndex-1]?.split('-')[1] == reservationDates[reservationIndex]?.split('-')[0]){
                                return styles["day-starRedToOrange"]
                            }
                            else {
                                return styles["day-endOrange"]
                            }
                        }
                    }
                    else if(reservationContinuingFromBeforeYearDates[0].attributes.reservationStatus == 120 || reservationContinuingFromBeforeYearDates[0].attributes.reservationStatus == 130 || reservationContinuingFromBeforeYearDates[0].attributes.reservationStatus == 140) {
                        //kırmızı
                        reservationContinuingFromBeforeYearDates= []
                        if(reservationDatesStatus[reservationIndex] == 100){
                            return styles["day-starOrangeToRed"]
                        }
                        else if(reservationDatesStatus[reservationIndex] == 120 || reservationDatesStatus[reservationIndex] == 130 || reservationDatesStatus[reservationIndex] == 140){
                            if(reservationDates[reservationIndex-1].split('-')[1] == reservationDates[reservationIndex].split('-')[0]){
                                return styles["day-continueRed"]
                            }
                            else {
                                return styles["day-endRed"]
                            }
                        }

                        return styles["day-endRed"]
                    }
                    else {
                        //rezervasyon iptal edilmişse
                        reservationContinuingFromBeforeYearDates= []
                        return;
                    }
                }

                if(reservationContinuingFromBeforeYearDates[0].attributes.reservationStatus == 100) {
                    return styles["day-continueOrange"]
                }
                else if(reservationContinuingFromBeforeYearDates[0].attributes.reservationStatus == 120 || reservationContinuingFromBeforeYearDates[0].attributes.reservationStatus == 130 || reservationContinuingFromBeforeYearDates[0].attributes.reservationStatus == 140) {
                    return styles["day-continueRed"]
                }
                else {
                    return ''
                }
            }


            if (reservationDates2.length == 2) {
                if (currentDate.getTime() == reservationDates2[0].getTime()) { isStartResarvation = true } else { isStartResarvation = false }
                if (currentDate.getTime() > reservationDates2[0].getTime() && currentDate.getTime() < reservationDates2[1].getTime()) {
                    isReservationContiniung = true
                } else {
                    isReservationContiniung = false
                }
                if (currentDate.getTime() == reservationDates2[1].getTime()) {
                    isEndResarvation = true;
                    reservationIndex++;
                    if ((reservationIndex < reservationDates.length) && reservationIndex != reservationDates.length) {
                        reservationDateStrings = reservationDates[reservationIndex].split('-');
                        reservationDateStrings.map((item, index) => {
                            reservationDates2[index] = stringToDate(item)
                        })
                    }
                } 
                else { 
                    isEndResarvation = false
                }
            }
            else {
                isStartResarvation = false
                isReservationContiniung = false
                isEndResarvation = false
            }


            if (reservationIndex > 0 && reservationIndex < reservationDates.length) {
                if (reservationDates[reservationIndex - 1].split('-')[1] == reservationDates[reservationIndex].split('-')[0]) {
                    // isReservationContiniung = true

                    if(currentDate.getTime() == stringToDate(reservationDates[reservationIndex].split('-')[0]).getTime()){
                        if( reservationDatesStatus[reservationIndex-1] == 100 && (reservationDatesStatus[reservationIndex] == 120 || reservationDatesStatus[reservationIndex] == 130 || reservationDatesStatus[reservationIndex] == 140) ){
                            return styles["day-starRedToOrange"]
                        }
                        else if(reservationDatesStatus[reservationIndex] == 100 && (reservationDatesStatus[reservationIndex-1] == 120 || reservationDatesStatus[reservationIndex-1] == 130 || reservationDatesStatus[reservationIndex-1] == 140)){
                            return styles["day-starOrangeToRed"]
                        }
                        else {
                            if(reservationIndex > 0 && reservationDatesStatus[reservationIndex] == 100){
                                return styles["day-continueOrange"]
                            }
                        }
                    }
                }
            }




            if (isStartResarvation && reservationDatesStatus[reservationIndex] != 110) {
                if(reservationDatesStatus[reservationIndex] != 100 && (reservationDatesStatus[reservationIndex] == 120 || reservationDatesStatus[reservationIndex] == 130 || reservationDatesStatus[reservationIndex] == 140))
                {
                    return styles["day-startRed"]
                }
                else
                    return styles["day-startOrange"]
            }
            else if (isReservationContiniung) {
                isReservationContiniung = false
                if(reservationDatesStatus[reservationIndex] != 100 && (reservationDatesStatus[reservationIndex] == 120 || reservationDatesStatus[reservationIndex] == 130 || reservationDatesStatus[reservationIndex] == 140))
                {
                    if(reservationDatesStatus[reservationIndex] != 110){
                        return styles["day-continueRed"]
                    }
                }
                else
                {
                    if(reservationDatesStatus[reservationIndex] != 110){
                        return styles["day-continueOrange"]
                    }
                }
            }
            else if (isEndResarvation && reservationDatesStatus[reservationIndex-1] != 110) {
                if(reservationDatesStatus[reservationIndex-1] == 100){

                    if(reservationDatesStatus[reservationIndex-1] == 120 || reservationDatesStatus[reservationIndex] == 130 || reservationDatesStatus[reservationIndex] == 140){
                        return styles["day-starRedToOrange"]
                    }
                    else {
                        return styles["day-endOrange"]
                    }
                }
                else {
                    if(reservationDatesStatus[reservationIndex] == 120 || reservationDatesStatus[reservationIndex] == 130 || reservationDatesStatus[reservationIndex] == 140){
                        if(stringToDate(reservationDates[reservationIndex].split('-')[0]).getTime() == stringToDate(reservationDates[reservationIndex-1].split('-')[1]).getTime()){
                            return styles["day-continueRed"]
                        }
                        else {
                            return styles["day-endRed"]
                        }
                    }
                    else {
                        return styles["day-endRed"]
                    }
                }
            }
            else{
                return ''
            }
        }

        const addDay = () => {
            currentDate = new Date(_getRowsYear, month, day + 1)
            return day++
        }

        const getRow = () => {
            let row = []
            if (!isFirstRowInEnded) {
                let dayStartingIndex = ((dayUtc.indexOf(firstDay)))
                for (let index = 0; index <= 6; index++) {
                    row.push(
                        <div key={monthsTurkish[month] + "firshRowItem" + index} className={`${styles['day']} ${!(index >= dayStartingIndex) ? styles['old'] : ''} ${index >= dayStartingIndex ? backgroundColor() : ''}`}>
                            {
                                index >= dayStartingIndex ? <div className={`${styles['day-content']}`}>{addDay()}</div>
                                    : undefined
                            }
                        </div>
                    )
                    if (index == 6) {
                        isFirstRowInEnded = true
                        break
                    }
                }
            } else {
                for (let index = 0; index < 7; index++) {
                    
                    if (day == numberOfMonth + 1){
                        row.push(
                            <div key={monthsTurkish[month] + "notFirstRow" + index} className={`${styles['day']}`}>
                                <div className={`${styles['day-content']}`}></div>
                            </div>
                        )
                    }
                    else{
                        row.push(
                            <div key={monthsTurkish[month] + "notFirstRow" + index} className={`${styles['day']} ${backgroundColor()}`}>
                                <div className={`${styles['day-content']}`}>{addDay()}</div>
                            </div>
                        )
                    }
                }
            }
            return row
        }

        for (let index = 0; index < 6; index++) {
            rows.push(
                <div key={monthsTurkish[month] + "row" + index} className={styles.rowContainer}>
                    {
                        day <= numberOfMonth && getRow()
                    }
                </div>
            )
        }
        return rows
    }

    if (ready) {
        /*getFirstDayOfMonth(2023, 1)*/
        /*getDayCountOfMMonth(2023, 3)*/
        return (
            <div className={`${styles['months-container']}`} style={{ opacity: 1, display: "flex" }}>
                {monthsTurkish.slice(currentMounth, monthsTurkish.length).map((item, index) => (
                    <div key={item + index} className={`${styles['month-container']} ${styles['month-']}`}>
                        <div className={styles.month}>
                            <div className={styles.mainTitleContainer}>
                                <div className={styles.montTitleContainer}>
                                    <div className={`${styles['month-title']}`} colSpan="7">{monthsTurkish[index+currentMounth]} {new Date().getFullYear()}</div>
                                </div>
                                <div className={styles.daysHeaderContainer}>
                                    <div className={`${styles['day-header']}`}>Pzt</div>
                                    <div className={`${styles['day-header']}`}>Sa</div>
                                    <div className={`${styles['day-header']}`}>Çr</div>
                                    <div className={`${styles['day-header']}`}>Pr</div>
                                    <div className={`${styles['day-header']}`}>Cu</div>
                                    <div className={`${styles['day-header']}`}>Ct</div>
                                    <div className={`${styles['day-header']}`}>Pz</div>
                                </div>
                            </div>
                            {getRows(index+currentMounth, new Date().getFullYear())}
                        </div>
                    </div>
                ))}
                { twoDifferentYearsWillBeListed < 0 && monthsTurkish.slice(twoDifferentYearsWillBeListed).map((item, index) => (
                    <div key={item + index} className={`${styles['month-container']} ${styles['month-']}`}>
                        <div className={styles.month}>
                            <div className={styles.mainTitleContainer}>
                                <div className={styles.montTitleContainer}>
                                    <div className={`${styles['month-title']}`} colSpan="7">{monthsTurkish[index]} {new Date().getFullYear()+1}</div>
                                </div>
                                <div className={styles.daysHeaderContainer}>
                                    <div className={`${styles['day-header']}`}>Pzt</div>
                                    <div className={`${styles['day-header']}`}>Sa</div>
                                    <div className={`${styles['day-header']}`}>Çr</div>
                                    <div className={`${styles['day-header']}`}>Pr</div>
                                    <div className={`${styles['day-header']}`}>Cu</div>
                                    <div className={`${styles['day-header']}`}>Ct</div>
                                    <div className={`${styles['day-header']}`}>Pz</div>
                                </div>
                            </div>
                            {getRows(index, new Date().getFullYear()+1)}
                        </div>
                    </div>
                ))}
            </div>
        )
        setReady(false)
    }
}