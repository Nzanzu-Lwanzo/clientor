import { useClientorContext } from "../contexts/clientorContext";
import useStorage from "../hooks/useStorage";
import ClientorDefaultConfiguration from "../../clientor.config";
import { useClientorUserContext } from "../contexts/clientorUserContext";
import { formatImage } from "../helpers/formatters";
import { getImageNode } from "../helpers/getters";

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
    selectedRange,
    setSelectedRange,
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
    useClientorUserContext().imagesValidate || {},
    ClientorDefaultConfiguration.imagesValidate
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

      const refocus = () => {
        textarea.focus();
        // Hide the floating card
        setEditMode((prevModes) =>
          prevModes.filter((_mode) => _mode !== "$ins_img")
        );
      };

      const placeCaretAfter = (node: Node) => {
        const selection = window.getSelection();
        const range = document.createRange();
        range.setStartAfter(node);
        range.collapse(true);
        selection?.removeAllRanges();
        selection?.addRange(range);
        setSelectedRange(range);
      };

      const allImages = [...localImages, ...remoteImages];

      if (editorType === "rtx") {
        let lastNode: Node | null = null;
        allImages.forEach((image) => {
          const node = getImageNode(image);
          const spaceBefore = document.createTextNode(" ");
          const spaceAfter = document.createTextNode(" ");
          
          if (selectedRange) {
            selectedRange.insertNode(spaceAfter);
            selectedRange.insertNode(node);
            selectedRange.insertNode(spaceBefore);
            lastNode = spaceAfter;
          } else {
            textarea.appendChild(spaceBefore);
            textarea.appendChild(node);
            textarea.appendChild(spaceAfter);
            lastNode = spaceAfter;
          }
        });
        if (lastNode) placeCaretAfter(lastNode);
      } else {
        // mdx mode
        let lastNode: Node | null = null;
        allImages.forEach((image) => {
          const { mdx } = formatImage(image);
          const textNode = document.createTextNode(` ${mdx} `);
          if (selectedRange) {
            selectedRange.insertNode(textNode);
            lastNode = textNode;
          } else {
            textarea.appendChild(textNode);
            lastNode = textNode;
          }
        });
        if (lastNode) placeCaretAfter(lastNode);
      }

      setRawText(textarea.innerText);
      refocus();

      // TEMPORARILY STORE THE IMAGES
      storeImage();

      // Empty the states so we don't displayed images
      // more than once
      setLocalImages([]);
      setRemoteImages([]);

      event.currentTarget.reset();
    },
  };
}
