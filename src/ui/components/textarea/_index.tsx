import { useCallback, useEffect } from "react";
import { useClientorContext } from "../../../lib/contexts/clientorContext";
import { useClientorUserContext } from "../../../lib/contexts/clientorUserContext";
import connectDB from "../../../lib/storage/idb";
import { connectToDb } from "../../../lib/storage/idb";
import useStorage from "../../../lib/hooks/useStorage";
import { getImageIDFromDOM } from "../../../lib/helpers/getters";

const Textarea = () => {
  // STATES
  const { maxContentLength } = useClientorUserContext();
  const { setSelectedRange } = useClientorContext();

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
  }, [maxContentLength, rawText.length, setRawText]);

  // EFFECTS
  useEffect(() => {
    /*
      Delete inserted images by double clicking on them
      DELETE FROM IDB DATABASE TOO
    */

    const textarea = textAreaDivRef.current;

    let handleDbClick: (event: MouseEvent) => void;
    let handleOpenLinkOnClick: (event: MouseEvent | TouchEvent) => void;
    let handleTrackCursorPosition: (event: Event) => void;
    let handlePersistentFocus: (event: MouseEvent) => void;

    if (textarea) {
      // Delete images on double click
      handleDbClick = function (event: MouseEvent) {
        const element = event.target as HTMLElement;

        if (element.matches("img")) {
          let id = getImageIDFromDOM(element as HTMLImageElement);

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
        const anchorTag = event.target as HTMLAnchorElement;

        if (anchorTag.matches("a")) {
          event.preventDefault();
          window.open(anchorTag.href);
        }
      };

      // Save the position of the cursor, so the user can insert something
      handleTrackCursorPosition = function () {
        try {
          const selection = window.getSelection();
          if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            // Ensure the range is within the textarea
            if (textarea.contains(range.commonAncestorContainer)) {
              setSelectedRange(range);
            }
          }
        } catch {}
      };

      // Requirement 1: Persistent Focus
      handlePersistentFocus = function (event: MouseEvent) {
        const target = event.target as HTMLElement;
        const mainContainer = document.getElementById("clientor-main-container");
        
        // If we click inside the main container but not in the textarea, focus the textarea
        if (mainContainer?.contains(target) && !textarea.contains(target)) {
          // Check if we are clicking a button (buttons handle focus themselves or prevent it)
          if (!target.closest(".icon-btn") && !target.closest(".square-btn") && !target.closest(".floating")) {
             textarea.focus();
          }
        }
      };

      textarea.addEventListener("selectstart", handleTrackCursorPosition);
      textarea.addEventListener("mouseup", handleTrackCursorPosition);
      textarea.addEventListener("keyup", handleTrackCursorPosition);
      textarea.addEventListener("click", handleTrackCursorPosition);

      textarea.addEventListener("dblclick", handleDbClick);
      textarea.addEventListener("click", handleOpenLinkOnClick);
      textarea.addEventListener("touchstart", handleOpenLinkOnClick);
      
      document.addEventListener("mousedown", handlePersistentFocus);
    }

    return () => {
      if (textarea) {
        textarea.removeEventListener("selectstart", handleTrackCursorPosition);
        textarea.removeEventListener("mouseup", handleTrackCursorPosition);
        textarea.removeEventListener("keyup", handleTrackCursorPosition);
        textarea.removeEventListener("click", handleTrackCursorPosition);
        textarea.removeEventListener("dblclick", handleDbClick);
        textarea.removeEventListener("click", handleOpenLinkOnClick);
        textarea.removeEventListener("touchstart", handleOpenLinkOnClick);
        document.removeEventListener("mousedown", handlePersistentFocus);
      }
    };
  }, [setSelectedRange, textAreaDivRef, setCountImagesInDb, deleteImageFromStore]);

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

    return () => {
      window.removeEventListener("load", handleClearTempStorageOnLoad);
    };
  }, [emptyStore]);

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
