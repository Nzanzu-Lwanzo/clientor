import "../css/clientor.css";
import Top from "./components/top/_index";
import Bottom from "./components/bottom/_index";
import Textarea from "./components/textarea/_index";
import { CSSProperties } from "react";
import ClientorDefaultConfiguration from "../clientor.config";
import { useClientorContext } from "../lib/context";

const defaulyBoxStyles: CSSProperties = {
  maxHeight: "350px",
};

export interface TextareaPropsType {
  maxContentLength?: {
    value: number;
    handler: () => void;
  };
}

export interface BottomPropsType {
  showCountChars?: boolean;
}

interface ClientorBoxProps extends TextareaPropsType, BottomPropsType {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>, text: string) => true;
  boxStyle?: CSSProperties;
  minContentLength?: {
    value: number;
    handler: () => void;
  };
}

const ClientorBox = ({
  handleSubmit,
  boxStyle,
  showCountChars,
  maxContentLength,
  minContentLength,
}: ClientorBoxProps) => {
  const { rawText } = useClientorContext();

  return (
    <form
      id="clientor-main-container"
      onSubmit={(event) => {
        event.preventDefault();

        if (minContentLength && rawText.length <= minContentLength.value) {
          minContentLength.handler();
        }

        handleSubmit(event, "");
      }}
      style={{ ...defaulyBoxStyles, ...boxStyle }}
    >
      <Top />
      <Textarea maxContentLength={maxContentLength} />
      <Bottom
        showCountChars={
          showCountChars ?? ClientorDefaultConfiguration.showCountChars
        }
      />
    </form>
  );
};

export default ClientorBox;
