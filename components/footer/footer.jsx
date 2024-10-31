import FooterTop from "./top/footerTop";
import FooterBottom from "./bottom/footerBottom";
import styles from "./footer.module.css";
import { getRegions } from "@/services/region";
import React from "react";

const Footer = ({ regions }) => {
  console.log("Footer rendered");
  return (
    <footer className={styles.footer}>
      <FooterTop regions={regions} />
      <FooterBottom />
    </footer>
  );
};

export default React.memo(Footer);
