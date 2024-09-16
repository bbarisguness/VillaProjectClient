import FooterTop from "./top/footerTop"
import FooterBottom from "./bottom/footerBottom"
import styles from "./footer.module.css"

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <FooterTop />
            <FooterBottom />
        </footer>
    )
}