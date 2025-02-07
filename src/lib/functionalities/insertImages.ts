import { useClientorContext } from "../contexts/clientorContext";
import { useStorage } from "../hooks";
import ClientorDefaultConfiguration from "../../clientor.config";
import { useClientorUserContext } from "../contexts/clientorUserContext";
import { formatImage } from "../utils";

export default function useInsertImages() {
  const {
    localImages,
    remoteImages,
    setLocalImages,
    setRemoteImages,
    countImagesInDb,
    setEditMode,
    textAreaDivRef,
    editorType,
    setRawText,
  } = useClientorContext();

  const { storeImage } = useStorage({
    handleError() {
      console.log("error");
    },

    handleIdbNotSupported() {
      console.log("Not supported");
    },
  });

  /*
    Merge the option values passed through the context provider
    with the default option values.
  */
  const { max: maxImagesCount } = Object.assign(
    ClientorDefaultConfiguration.imagesValidate,
    useClientorUserContext().imagesValidate || {}
  );

  return {
    toggler: () => {
      setEditMode((prevModes) => {
        if (prevModes.includes("$ins_img")) {
          return prevModes.filter((_mode) => _mode !== "$ins_img");
        } else {
          return [
            ...prevModes.filter((_mode) => !_mode.startsWith("$")),
            "$ins_img",
          ];
        }
      });
    },

    // This function is the one being called when the user clicks on insert button
    handleFeature: async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      // Return if no image has been selected when user clicks insert
      if (localImages.length === 0 && remoteImages.length === 0) return;

      // Return if the max count of images stored in idb has been reached
      if (countImagesInDb >= maxImagesCount!) {
        return;
      }
      const textarea = textAreaDivRef.current;

      if (!textarea) return;

      const imagesEltString = [...localImages, ...remoteImages]
        .map((image) => {
          const imgElet = formatImage(image);
          return editorType === "rtx" ? imgElet.rtx() : imgElet.mdx;
        })
        .join(" ");

      // This is for rtx
      textarea.innerHTML += " ".concat(imagesEltString, "<br/><br/>");
      // This is for mdx
      setRawText((prevText) => `${prevText} ${imagesEltString}`);

      // Hide the floating card
      setEditMode((prevModes) =>
        prevModes.filter((_mode) => _mode !== "$ins_img")
      );

      // TEMPORARILY STORE THE IMAGES
      storeImage();

      // Empty the states so we don't displayed images
      // more than once
      setLocalImages([]);
      setRemoteImages([]);

      // Add

      event.currentTarget.reset();
    },
  };
}
