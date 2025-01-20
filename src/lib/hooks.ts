import { useClientorContext } from "./context";
import { ClientorBoxProps } from "./types";
import { marked } from "marked";
import { playSoundOnError, playSoundOnSend } from "./sounds";
import { EditMode } from "./context";

interface HookParamsType {
  minContentLength: ClientorBoxProps["minContentLength"];
  maxContentLength: ClientorBoxProps["maxContentLength"];
  playSounds: ClientorBoxProps["playSounds"];
  handleSubmit: ClientorBoxProps["handleSubmit"];
}

export const useHandleSubmission = ({
  minContentLength,
  playSounds,
  handleSubmit,
}: HookParamsType) => {
  const {
    rawText,
    htmlText,
    editorType,
    textAreaDivRef,
    setRawText,
    setHtmlText,
  } = useClientorContext();

  return {
    handler: (event: React.FormEvent<HTMLFormElement>) => {
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
        } else {
        }
      } else {
        if (playSounds?.onError == true) {
          playSoundOnError();
        } else if (playSounds?.onError instanceof HTMLAudioElement) {
          playSoundOnError(playSounds?.onError);
        }
      }
    },
  };
};

export const useShowOneMenuAtATime = () => {
  const { setEditMode } = useClientorContext();

  return (mode: EditMode) => {
    setEditMode((prevModes) => {
      if (prevModes.includes(mode)) {
        return prevModes.filter((_mode) => _mode !== mode);
      } else {
        return [...prevModes.filter((_mode) => !mode.startsWith("$")), mode];
      }
    });
  };
};
