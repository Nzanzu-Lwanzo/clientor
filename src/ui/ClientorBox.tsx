import "../css/clientor.css";
import Top from "./components/top/_index";
import Bottom from "./components/bottom/_index";
import Textarea from "./components/textarea/_index";
import { CSSProperties } from "react";
import ClientorDefaultConfiguration from "../clientor.config";
import { useClientorContext } from "../lib/context";
import Preview from "./components/preview/_index";
import { marked } from "marked";
import { playSoundOnError, playSoundOnSend } from "../lib/sounds";

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
  playSounds?: {
    onSend?: boolean | HTMLAudioElement;
    onDelete?: boolean | HTMLAudioElement;
    onError?: boolean | HTMLAudioElement;
  };
}

const ClientorBox = ({
  handleSubmit,
  boxStyle,
  showCountChars,
  maxContentLength,
  minContentLength,
  playSounds,
}: ClientorBoxProps) => {
  const {
    rawText,
    htmlText,
    editorType,
    textAreaDivRef,
    setRawText,
    setHtmlText,
  } = useClientorContext();

  return (
    <>
      <form
        id="clientor-main-container"
        onSubmit={(event) => {
          event.preventDefault();

          if (minContentLength && rawText.length <= minContentLength.value) {
            minContentLength.handler();
          }

          // This is so we can make decisions and perform actions
          // based on wether the message was successfully successfullyHandled or whatever
          let successfullyHandled = handleSubmit(
            {
              html:
                editorType !== "rtx"
                  ? (marked.parse(htmlText) as string)
                  : htmlText,
              raw: rawText,
            },
            event
          );

          if (successfullyHandled) {
            // Play sound on send
            if (playSounds?.onSend == true) {
              playSoundOnSend();
            } else if (playSounds?.onSend instanceof HTMLAudioElement) {
              playSoundOnSend(playSounds?.onSend);
            }

            // Delete everything in the box
            // update the text states
            if (textAreaDivRef.current) {
              textAreaDivRef.current.innerHTML = "";
              setRawText("");
              setHtmlText("");
            }
          } else {
            if (playSounds?.onError == true) {
              playSoundOnError();
            } else if (playSounds?.onError instanceof HTMLAudioElement) {
              playSoundOnError(playSounds?.onError);
            }
          }
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
