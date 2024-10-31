import store from "@/store"
import { Providers } from "@/store/provider"
import Header from "@/components/header/header"
import Footer from "@/components/footer/footer"
import HamburgerMenu from "@/components/hamburger/hamburgerMenu"
import { useEffect, useState } from "react";
import { getRegions } from "@/services/region"


import "@/styles/styles.css"
//import { usePageLoading } from "@/hooks/usePageLoading"
import Loading from "@/app/loading"

function myApp({ Component, pageProps }) {
    //const { isPageLoading } = usePageLoading();
    const [footerData, setFooterData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getRegions()
            setFooterData(data?.data);
        }
        fetchData();
    }, []);

    return (
        <Providers store={store}>
            <Header />
            {/* {isPageLoading ? <Loading /> :
                <Component {...pageProps} />
            } */}
            <Component {...pageProps} />
            <Footer regions={footerData} />
            <HamburgerMenu />
        </Providers>
    )
}

export default myApp

