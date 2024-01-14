import styles from "../../style.module.css";
import SlidingPane from "react-sliding-pane";
import { useState } from "react";

export default function NavBar({ user }) {
  const [paneOpen, setPaneOpen] = useState(false);

  const showInfoButtonSliderWindow = () => {
    setPaneOpen(true);
  };

  return (
    <nav className={styles.navBar}>
      <div className={styles.navBarTitle}>Bubit</div>
      <div className={styles.navBarWelcome}>Hello {user}</div>
      <svg
        className={styles.navBarHelp}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        viewBox="0 0 24 24"
        height="1.5em"
        width="1.5em"
        onClick={showInfoButtonSliderWindow}
      >
        <path d="M22 12 A10 10 0 0 1 12 22 A10 10 0 0 1 2 12 A10 10 0 0 1 22 12 z" />
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
      </svg>
      {/* <div className={styles.infoModal}></div> */}
      <SlidingPane
        className={styles.infoModal}
        closeIcon={<div>Some div containing custom close icon.</div>}
        isOpen={paneOpen}
        title="By TeamSbear"
        from="top-right"
        width="200px"
        onRequestClose={() => setPaneOpen(false)}
      >
        <div>And I am pane content on left.</div>
      </SlidingPane>
    </nav>
  );
}
