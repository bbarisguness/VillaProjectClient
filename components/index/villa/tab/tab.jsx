import styles from "./tab.module.css"
import Link from "next/link"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const qs = require('qs');


export default function VillaTab({ categories, activeTabIndex, setActiveTabIndex, setActiveCategorySlug, setActiveCategoryId, setTabIsChanged }) {
    const router = useRouter()
    //console.log(categories);
    const changeIndex = (index) => {
        setActiveTabIndex(index)
        setTabIsChanged(true)
    }

    const [error, setError] = useState(null);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (false) {
        return <div>Loading...</div>;
    } else {
        return (
            <ul>
                {
                    categories.data.map((item, i) => (
                        <li id={styles.villaTabLi} className={activeTabIndex == i ? styles.active : null} key={item.id}>
                            <span onClick={() => { changeIndex(i); setActiveCategoryId(item?.id); setActiveCategorySlug(item?.slug) }}>
                                <div className={styles.iconBox}>
                                    <i style={{ backgroundImage: `url(/images/${item?.icon})` }}></i>
                                </div>
                                <div className={styles.title}>{item?.categoryDetails[0]?.name}</div>
                            </span>
                        </li>

                    ))}
            </ul>
        );
    }


}