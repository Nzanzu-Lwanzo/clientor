import "../css/clientor.css";
import Top from "./components/top/_index";
import Bottom from "./components/bottom/_index";
import Textarea from "./components/textarea/_index";
import { CSSProperties } from "react";
import ClientorDefaultConfiguration from "../clientor.config";
import { useClientorContext } from "../lib/context";
import Preview from "./components/preview/_index";
import { marked } from "marked";

const defaulyBoxStyles: CSSProperties = {
  // maxHeight: "350px",
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

interface TextReturnType {
  raw: string;
  html: string;
}

interface ClientorBoxProps extends TextareaPropsType, BottomPropsType {
  handleSubmit: (
    text: TextReturnType,
    event: React.FormEvent<HTMLFormElement>
  ) => boolean;
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
  const { rawText, htmlText, editorType } = useClientorContext();

  return (
    <>
      <form
        id="clientor-main-container"
        onSubmit={(event) => {
          event.preventDefault();

          if (minContentLength && rawText.length <= minContentLength.value) {
            minContentLength.handler();
          }

          handleSubmit(
            {
              html:
                editorType !== "rtx"
                  ? (marked.parse(htmlText) as string)
                  : htmlText,
              raw: rawText,
            },
            event
          );
        }}
        style={{ ...defaulyBoxStyles, ...boxStyle }}
      >
        <Top />
        <Preview />
        <Textarea maxContentLength={maxContentLength} />
        <Bottom
          showCountChars={
            showCountChars ?? ClientorDefaultConfiguration.showCountChars
          }
        />
      </form>
    </>
  );
};

export default ClientorBox;
