import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from "lightgallery/plugins/video";
import styles from "./page.module.css";
import { memo } from "react";
import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lg-video.css'

const VideoWithComment = memo(function VideoWithComment({ t }) {
  return (
    <div className={styles.videoButton}>
      <LightGallery plugins={[lgZoom, lgVideo]}>
        <a data-src="https://www.youtube.com/embed/cFYXWYyYcB0">
          {t("videoComment")}
        </a>
      </LightGallery>
    </div>
  );
});

export default VideoWithComment;
