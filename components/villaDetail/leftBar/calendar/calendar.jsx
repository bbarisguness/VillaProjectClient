import MyDatePicker from "./mydatepicker";
import styles from "./calendar.module.css";
import { useState } from "react";

export default function Calendar({
  ready,
  dates,
  calendarPrices,
  priceTypeText,
}) {
  const [yearTab, setYearTab] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  const handleYearTab = (operation) => {
    if (operation == "next" && yearTab - new Date().getFullYear() < 2) {
      setYearTab(yearTab + 1);
    }
    // console.log(operation)
    if (
      operation == "back" &&
      yearTab - new Date().getFullYear() > 0 &&
      yearTab - new Date().getFullYear() <= 2
    ) {
      setYearTab(yearTab - 1);
    }
  };

  const displayLessIcon = (operation) => {
    if (operation == "back") {
      if (!(yearTab == new Date().getFullYear())) {
        return "‹";
      } else {
        return "";
      }
    } else {
      if (yearTab - new Date().getFullYear() < 2) {
        return "›";
      } else {
        return "";
      }
    }
  };

  const displayYearTab = (year) => {
    if (year == new Date().getFullYear()) {
      return "";
    } else if (year - 1 == new Date().getFullYear()) {
      return "";
    } else if (year - 2 == new Date().getFullYear()) {
      return "";
    } else {
      return styles["disabled"];
    }
  };

  return (
    <div className={styles.fullDatepicker}>
      <div className={styles.title}>
        Müsaitlik Takvimi
        <div style={{ display: "flex", gap: "20px" }}>
          <span className={styles.orange}>Opsiyonlu</span>
          <span className={styles.red}>Dolu</span>
        </div>
      </div>
      {/* {ready &&
                <div className={`${styles['calendar-header']}`}>
                    <div>
                        <div onClick={() => handleYearTab('back')} className={styles.prev}><span>{displayLessIcon('back')}</span></div>
                        <div onClick={() => setYearTab(yearTab - 2)} className={`${styles['year-title']} ${styles['year-neighbor2']} ${displayYearTab(yearTab - 2)}`}>{yearTab - 2}</div>
                        <div onClick={() => setYearTab(yearTab - 1)} className={`${styles['year-title']} ${styles['year-neighbor']} ${displayYearTab(yearTab - 1)}`}>{yearTab - 1}</div>
                        <div className={`${styles['year-title']}`}>{yearTab}</div>
                        <div onClick={() => setYearTab(yearTab + 1)} className={`${styles['year-title']} ${styles['year-neighbor']} ${displayYearTab(yearTab + 1)}`}>{yearTab + 1}</div>
                        <div onClick={() => setYearTab(yearTab + 2)} className={`${styles['year-title']} ${styles['year-neighbor2']} ${displayYearTab(yearTab + 2)}`}>{yearTab + 2}</div>
                        <div onClick={() => handleYearTab('next')} className={`${styles['next']}`}><span>{displayLessIcon('next')}</span></div>
                    </div>
                </div>
            } */}
      <div className={styles.datepickerBox}>
        <MyDatePicker
          calendarPrices={calendarPrices}
          nowYear={yearTab}
          year={yearTab}
          dates={dates}
          currentMounth={month}
          priceTypeText={priceTypeText}
        />
      </div>
    </div>
  );
}
