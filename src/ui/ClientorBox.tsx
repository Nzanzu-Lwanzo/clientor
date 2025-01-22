import "../css/clientor.css";
import Top from "./components/top/_index";
import Bottom from "./components/bottom/_index";
import Textarea from "./components/textarea/_index";
import Preview from "./components/preview/_index";
import { CSSProperties } from "react";
import { useClientorUserContext } from "../lib/contexts/clientorUserContext";

const defaulyBoxStyles: CSSProperties = {
  // maxHeight: "350px",
};

const ClientorBox = () => {
  const { boxStyle } = useClientorUserContext();

  return (
    <>
      <div
        id="clientor-main-container"
        style={{ ...defaulyBoxStyles, ...boxStyle }}
      >
        <Top />
        <Preview />
        <Textarea />
        <Bottom />
      </div>
    </>
  );
};

export default ClientorBox;
