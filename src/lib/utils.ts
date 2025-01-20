import { LinkDataType } from "./useFunctionalities";
export const debouncer = (fn: (args: any) => void, delay: number) => {
  let timer: number;

  return (...args: any) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn(args);
    }, delay * 1000);
  };
};

export const throttler = (fn: (args: any) => void, delay: number) => {
  let timer: null | number = null;

  return (...args: any) => {
    if (timer === null) {
      fn(args);
      timer = setTimeout(() => {
        timer = null;
      }, delay * 1000);
    }
  };
};

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
