import "../css/clientor.css";
import Top from "./components/top/_index";
import Bottom from "./components/bottom/_index";
import Textarea from "./components/textarea/_index";
import ClientorDefaultConfiguration from "../clientor.config";
import Preview from "./components/preview/_index";
import { useHandleSubmission } from "../lib/hooks";
import { ClientorBoxProps } from "../lib/types";
import { CSSProperties } from "react";

const defaulyBoxStyles: CSSProperties = {
  // maxHeight: "350px",
};

const ClientorBox = ({
  handleSubmit,
  boxStyle,
  showCountChars,
  maxContentLength,
  minContentLength,
  playSounds,
}: ClientorBoxProps) => {
  const { handler } = useHandleSubmission({
    handleSubmit,
    maxContentLength,
    minContentLength,
    playSounds,
  });

  return (
    <>
      <div
        id="clientor-main-container"
        style={{ ...defaulyBoxStyles, ...boxStyle }}
      >
        <Top />
        <Preview />
        <Textarea maxContentLength={maxContentLength} />
        <Bottom
          showCountChars={
            showCountChars ?? ClientorDefaultConfiguration.showCountChars
          }
          handler={handler}
        />
      </div>
    </>
  );
};

export default ClientorBox;
