import { marked } from "marked";
import {
  LocalImageType,
  RemoteImageType,
  useClientorContext,
} from "../contexts/clientorContext";
import {
  ClientorUserContextType,
  useClientorUserContext,
} from "../contexts/clientorUserContext";
import { playSoundOnError, playSoundOnSend } from "../helpers/sounds";
import useStorage from "./useStorage";
import { formatFinalHtml } from "../helpers/formatters";

interface HookParamsType {
  handleSubmit: ClientorUserContextType["handleSubmit"];
}

const useHandleSubmission = ({ handleSubmit }: HookParamsType) => {
  const { rawText, editorType, textAreaDivRef, setRawText, references } =
    useClientorContext();

  const { minContentLength, maxContentLength, playSounds } =
    useClientorUserContext();

  const { emptyStore, getImages } = useStorage({
    handleIdbNotSupported() {},

    handleError() {},
  });

  return {
    handler: async () => {
      const textarea = textAreaDivRef.current;

      if (!textarea) {
        return;
      }

      /*  
        if the user provided a minimum content length
        and the length of the raw text is inferior to that value
        then we the function he defined to handle the case
      */
      if (minContentLength && rawText.length <= minContentLength.value) {
        minContentLength.handler();
      }

      /*
        if the user provided a maximun content length
        and the length of the raw text is superior to that value
        then we the function he defined to handle the case
      */
      if (maxContentLength && rawText.length >= maxContentLength.value) {
        maxContentLength.handler();
      }

      /*
        This is so we can make decisions and perform actions
        based on wether the message was successfully successfullyHandled or whatever
      */
      const localImgs = (await getImages("local")) as LocalImageType[];
      const remoteImgs = (await getImages("remote")) as RemoteImageType[];
      const html = formatFinalHtml(textarea!);
      let successfullyHandled = handleSubmit({
        html: editorType !== "rtx" ? (marked.parse(html) as string) : html,
        raw: rawText,
        localImages: localImgs,
        remoteImages: remoteImgs.map((img) => img.url),
        references,
      });

      if (successfullyHandled) {
        // Play sound on send
        if (playSounds?.onSend == true) {
          playSoundOnSend();
        } else if (playSounds?.onSend instanceof HTMLAudioElement) {
          playSoundOnSend(playSounds?.onSend);
        }

        /*
          Delete everything in the box
          update the text states
        */
        if (textAreaDivRef.current) {
          textAreaDivRef.current.innerHTML = "";
          setRawText("");

          // Delete the images temporarily stored in the idb database
          emptyStore();
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

export default useHandleSubmission;
