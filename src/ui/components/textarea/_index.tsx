import { useCallback, useEffect } from "react";
import { useClientorContext } from "../../../lib/contexts/clientorContext";
import { useClientorUserContext } from "../../../lib/contexts/clientorUserContext";
import { useStorage } from "../../../lib/hooks";
import connectDB from "../../../lib/storage/idb";
import { connectToDb } from "../../../lib/storage/idb";

const Textarea = () => {
  // STATES
  const { maxContentLength } = useClientorUserContext();

  const {
    setRawText,
    rawText,
    textAreaDivRef,
    editorType,
    setCountImagesInDb,
  } = useClientorContext();

  // CH
  const { deleteImageFromStore, emptyStore } = useStorage({
    handleError() {},

    handleIdbNotSupported() {},
  });

  // FEH
  const handleTyping = useCallback((event: React.FormEvent<HTMLDivElement>) => {
    setRawText(event.currentTarget.innerText);

    if (maxContentLength && rawText.length >= maxContentLength.value) {
      maxContentLength?.handler();
    }
  }, []);

  // EFFECTS
  useEffect(() => {
    /*
      Delete inserted images by double clicking on them
      DELETE FROM IDB DATABASE TOO
    */

    const textarea = textAreaDivRef.current;

    let handleDbClick: (event: MouseEvent) => void;
    let handleOpenLinkOnClick: (event: MouseEvent | TouchEvent) => void;

    if (textarea) {
      // Delete images on double click
      handleDbClick = function (event: MouseEvent) {
        const element = event.target as HTMLElement;

        if (element.matches("img")) {
          let classname = element.className;
          let id = classname.split("-").at(-1);

          connectToDb.then((database) => {
            /*
              Check first in local images
              because the user is more likely to want to remove locally selected images
            */
            deleteImageFromStore({ id, store: "local", database });

            // Then check in the remote images
            deleteImageFromStore({ id, store: "remote", database });
          });

          /*
            Once the image deleted, we should remove it
            1. From the DOM
          */
          element.remove();
          setCountImagesInDb((prev) => prev - 1);
        }
      };

      // Open a link when the user clicks on a tag
      handleOpenLinkOnClick = function (event: MouseEvent | TouchEvent) {
        event.preventDefault();
        const anchorTag = event.target as HTMLAnchorElement;

        if (anchorTag.matches("a")) {
          window.open(anchorTag.href);
        }
      };

      textarea.addEventListener("dblclick", handleDbClick);
      textarea.addEventListener("click", handleOpenLinkOnClick);
      textarea.addEventListener("touchstart", handleOpenLinkOnClick);
    }

    return () => {
      if (textarea) {
        textarea.removeEventListener("dblclick", handleDbClick);
        textarea.removeEventListener("click", handleOpenLinkOnClick);
        textarea.removeEventListener("touchstart", handleOpenLinkOnClick);
      }
    };
  }, []);

  useEffect(() => {
    /*
      Clear the temorary storage
      in case the user load or reloads the page
      so useless data don't get persisted to the database
      forever (in case, for example, the user selected images,
      didn't submit the form and reloaded their page.)

      I wanted to put this effect in a context but kept
      getting errors. It's properly working only in this component.
    */
    const connectToDb = connectDB().then((result) => {
      if (result === "ERROR") {
        return;
      }

      if (result === "NOT_SUPPORTED") {
        return;
      }

      return result;
    });

    let handleClearTempStorageOnLoad = () => {
      connectToDb.then((database) => emptyStore(database));
    };

    window.addEventListener("load", handleClearTempStorageOnLoad);
  });
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
      ></div>
    </div>
  );
};

export default Textarea;
