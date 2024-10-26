import store from "@/store"
import { Providers } from "@/store/provider"
import Header from "@/components/header/header"
import Footer from "@/components/footer/footer"
import HamburgerMenu from "@/components/hamburger/hamburgerMenu"

import "@/styles/styles.css"
//import { usePageLoading } from "@/hooks/usePageLoading"
import Loading from "@/app/loading"

function myApp({ Component, pageProps }) {
    //const { isPageLoading } = usePageLoading();
    return (
        <Providers store={store}>
            <Header />
            {/* {isPageLoading ? <Loading /> :
                <Component {...pageProps} />
            } */}
            <Component {...pageProps} />
            <Footer />
            <HamburgerMenu />
        </Providers>
    )
}

export default myApp

