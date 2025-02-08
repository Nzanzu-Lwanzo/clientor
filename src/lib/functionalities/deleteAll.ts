import { useClientorContext } from "../contexts/clientorContext";
import useStorage from "../hooks/useStorage";

export default function useDeleteAll() {
  const { textAreaDivRef, setRawText, setCountImagesInDb } =
    useClientorContext();

  const { emptyStore } = useStorage({
    handleError() {
      console.log("error");
    },

    handleIdbNotSupported() {
      console.log("Not supported");
    },
  });

  return {
    handleFeature: () => {
      if (textAreaDivRef.current) {
        textAreaDivRef.current.innerHTML = "";
        setRawText("");
      }

      // Delete all images from the temporary store
      // and reset the state counter of idb stored images
      emptyStore();
      setCountImagesInDb(0);
    },
  };
}
