import { LocalImageType, RemoteImageType } from "./contexts/clientorContext";
import { isLocalImage } from "./types";
import { LinkDataType } from "./useFunctionalities";

// export const debouncer = (fn: (args: any) => void, delay: number) => {
//   let timer: NodeJS.Timeout;

//   return (...args: any) => {
//     clearTimeout(timer);

//     timer = setTimeout(() => {
//       fn(args);
//     }, delay * 1000);
//   };
// };

// export const throttler = (fn: (args: any) => void, delay: number) => {
//   let timer: null | NodeJS.Timeout = null;

//   return (...args: any) => {
//     if (timer === null) {
//       fn(args);
//       timer = setTimeout(() => {
//         timer = null;
//       }, delay * 1000);
//     }
//   };
// };

export const formatLink = (linkData: LinkDataType) => {
  return {
    mdx: `[${linkData.label || linkData.link}](${linkData.link})`,
    rtx: () => {
      let attributes = `href="${linkData.link}"`;
      if (linkData.target) {
        attributes += ` target="_${linkData.target}"`;
      }
      let linkText = `<a ${attributes}>${linkData.label || linkData.link}</a>`;
      return linkText;
    },
  };
};

const getImageURL = (file: File) => {
  return URL.createObjectURL(file);
};

export const formatImage = (image: LocalImageType | RemoteImageType) => {
  let label = `Preview image ${image.id}`;

  const mdx = isLocalImage(image)
    ? `![${label}](${getImageURL(image.file)})`
    : `![${label}](${image.url})`;

  const rtx = () => {
    return isLocalImage(image)
      ? `<img src="${getImageURL(
          image.file
        )}" alt="${label}" class="clientor-inserted-image-${image.id}">` // Tags should not be self encoded
      : `<img src="${image.url}" alt="${label}" class="clientor-inserted-image-${image.id}">`; // Tags should not be self encoded
  };

  // All the images have a 'clientor-inserted-image-{id}' classname
  // so they can be easily targeted and removed

  return {
    mdx,
    rtx,
    id: image.id,
  };
};

/*
Tags should not be self closed because to remove an image element from the htmlText state
we first select it, take its outerHTML and replace any substring that matches the outerHTML by an empty string.
In the DOM, the closing tag gets removed. So, if in the state the closed tag exists but not in the string
gotten from outerHTML of the DOM element, the strings won't match.

So, please, no matter what, never self close the orphan tags.
*/
