import { useCallback, useEffect } from "react";
import { useClientorContext } from "../../../lib/contexts/clientorContext";
import { useClientorUserContext } from "../../../lib/contexts/clientorUserContext";
import { useStorage } from "../../../lib/hooks";
import connectDB from "../../../lib/storage/idb";

const Textarea = () => {
  // STATES
  const { maxContentLength } = useClientorUserContext();

  const {
    setRawText,
    rawText,
    setHtmlText,
    textAreaDivRef,
    editorType,
    htmlText,
  } = useClientorContext();

  // CH
  const { deleteImageFromStore } = useStorage({
    handleError() {},

    handleIdbNotSupported() {},
  });

  // FEH
  const handleTyping = useCallback((event: React.FormEvent<HTMLDivElement>) => {
    setRawText(event.currentTarget.innerText);
    let innerHTML = event.currentTarget.innerHTML;
    setHtmlText(innerHTML);

    if (maxContentLength && rawText.length >= maxContentLength.value) {
      maxContentLength?.handler();
    }
  }, []);

  // EFFECTS
  useEffect(() => {
    // Delete inserted images by double clicking on them
    // DELETE FROM IDB DATABASE TOO

    const textarea = textAreaDivRef.current;

    let handleDbClick: (event: MouseEvent) => void;
    let handleOpenLink: (event: MouseEvent) => void;

    if (textarea) {
      // Delete images on double click
      handleDbClick = function (event: MouseEvent) {
        const element = event.target as HTMLElement;
        const elementStr = element.outerHTML; // .replaceAll(`"`, `\"`)

        if (element.matches("img")) {
          let classname = element.className;
          let id = classname.split("-").at(-1);

          connectDB().then((result) => {
            if (result === "ERROR") {
              return;
            }

            if (result === "NOT_SUPPORTED") {
              return;
            }

            // Check first in local images
            // because the user is more likely to want to remove locally selected images
            deleteImageFromStore({ id, store: "local", database: result });
            // Then check in the remote images
            deleteImageFromStore({ id, store: "remote", database: result });
          });

          // Once the image deleted, we should remove it
          // 1. From the DOM
          element.remove();
          // 2. From the state strings - Only the htmlText state
          // because that's the one we use to display images
          // in rtx. To delete an image in mdx, the user just has
          // to remove the string from their markdown
          setHtmlText((prevText) => {
            // Remove the elementStr from prevText
            let match = htmlText.match(elementStr);
            if (!match) return prevText;
            return prevText.replaceAll(match[0], "");
          });

        }
      };

      // Open a link when the user clicks on a tag
      handleOpenLink = function (event: MouseEvent) {
        const anchorTag = event.target as HTMLAnchorElement;

        if (anchorTag.matches("a")) {
          window.open(anchorTag.href);
        }
      };

      textarea.addEventListener("dblclick", handleDbClick);
      textarea.addEventListener("click", handleOpenLink);
    }

    return () => {
      if (textarea) {
        textarea.removeEventListener("dblclick", handleDbClick);
      }
    };
  }, [htmlText]);

  return (
    <div
      id="textarea"
      style={{ display: editorType === "preview" ? "none" : "block" }}
    >
      <div
        id="text"
        contentEditable
        onInput={handleTyping}
        ref={textAreaDivRef}
        autoFocus
        aria-placeholder="Write your text here ..."
      ></div>
    </div>
  );
};

export default Textarea;
