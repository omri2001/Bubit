import { useState } from "react";
import SlidingPane from "react-sliding-pane";
import "../navbar/NavBar.css";
import LogOutSvg from "./LogOutSvg";
import InfoSvg from "./InfoSvg";

export default function NavBar({ user }) {
  const [infoPaneOpen, setInfoPaneOpen] = useState(false);
  const openPane = () => {
    setInfoPaneOpen(true);
  };
  const closePane = () => {
    setInfoPaneOpen(false);
  };
  return (
    <nav className="navBar">
      <div className="navBarTitle navAlignLeft">Bubit</div>
      <div className="navAlignLeft">Hello {user}</div>
      <div className="bigSpace"></div>
      <LogOutSvg className="SvgBtn navAlignRight" />
      <InfoSvg
        className="SvgBtn navAlignRight"
        onMouseEnter={openPane}
        onMouseLeave={closePane}
      />
      <SlidingPane
        className="infoModal"
        isOpen={infoPaneOpen}
        title="Info"
        from="right"
        width="200px"
        closeIcon="X"
        onRequestClose={() => {}}
      >
        <div>By Team Sbear</div>
      </SlidingPane>
    </nav>
  );
}
