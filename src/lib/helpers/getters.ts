import { LocalImageType, RemoteImageType } from "../contexts/clientorContext";
import { LinkDataType } from "../functionalities/insertLinks";
import { isLocalImage } from "../types/types";

export function getSelectionData() {
  const selection = window.getSelection();

  if (selection) {
    /*
      selection.anchorOffset alias "aof" is where the selection starts
      selection.focusOffset alias "fof" is where the selection ends.

      If you select from the end of the word to its start,
      aof will be > to fof.

      If you select from the beginning of a word to its end,
      fof will be > to aof.

      In case, we want the start index to be < to the end index,
      that's why we compare those values below using 
      the Math.max and Math.min

    */
    let selectionStartPosition = selection.anchorOffset;
    let selectionEndPosition = selection.focusOffset;
    let selectedText = selection.toString();
    let range: Range | null;
    try {
      range = selection.getRangeAt(0);
    } catch {
      range = null;
    }

    return {
      selectedText,
      selectionStartPosition: Math.min(
        selectionStartPosition,
        selectionEndPosition
      ),
      selectionEndPosition: Math.max(
        selectionStartPosition,
        selectionEndPosition
      ),
      range,
    };
  }
}

export function getElementWithNewTag({
  tag,
  textarea,
}: {
  tag: string;
  textarea: HTMLDivElement;
}) {
  const selection = getSelectionData();

  if (selection) {
    const boldText = `<${tag}>${selection.selectedText}</${tag}> `;
    let innerHTML = textarea.innerHTML;
    let updatedInnerHTML = innerHTML.replace(selection.selectedText, boldText);

    // Insert the updated innerHTML string in the textarea element
    // so the elements look directly styled
    textarea.innerHTML = updatedInnerHTML;

    // Return the updated innerHTML so the user can do something with it
    // like updating the states
    return updatedInnerHTML;
  }
}

export const getImageURL = (file: File) => {
  return URL.createObjectURL(file);
};

export const getImageIDFromDOM = (image: HTMLImageElement) => {
  let classname = image.className;
  let id = classname.split("-").at(-1);

  return id;
};

export const getImageNode = (image: LocalImageType | RemoteImageType) => {
  const node = document.createElement("img");
  node.src = isLocalImage(image) ? getImageURL(image.file) : image.url;
  let alt = `Preview image ${image.id}`;
  node.alt = alt;
  node.className = `clientor-inserted-image-${image.id}`;
  return node;
};

export const getLinkNode = (linkData: LinkDataType) => {
  const node = document.createElement("a");
  node.href = linkData.link;
  node.target = `_${linkData.target}` || "_blank";
  node.text = linkData.label || linkData.link;
  return node;
};
