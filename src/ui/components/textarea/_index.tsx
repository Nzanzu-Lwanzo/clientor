import { useCallback, useEffect, useTransition } from "react";
import { useClientorContext } from "../../../lib/contexts/clientorContext";
import { useClientorUserContext } from "../../../lib/contexts/clientorUserContext";

const Textarea = () => {
  const { maxContentLength } = useClientorUserContext();

  const {
    setRawText,
    rawText,
    setHtmlText,
    textAreaDivRef,
    editorType,
    setLocalImages,
    setRemoteImages,
  } = useClientorContext();

  // RH
  const [deleteImageTransition, setDeleteImageTransition] = useTransition();

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

    if (textarea) {
      textarea.addEventListener("dblclick", function (event) {
        const element = event.target as HTMLElement;
        const elementStr = element.outerHTML; // .replaceAll(`"`, `\"`)
        if (element.matches("img")) {
          let classname = element.className;
          let id = classname.split("-").at(-1);

          setDeleteImageTransition(() => {
            // Check first in local images
            // because the user is more likely to want to remove locally selected images
            setLocalImages((prevImages) => {
              return prevImages.filter((image) => image.id != id);
            });

            // Then check in the remote images
            setRemoteImages((prevImages) => {
              return prevImages.filter((image) => image.id != id);
            });
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
            return prevText.replaceAll(elementStr, "");
          });
        }
      });
    }
  }, []);

  return (
    <div
      id="textarea"
      style={{ display: editorType === "preview" ? "none" : "block" }}
    >
      <div
        id="text"
        contentEditable={!deleteImageTransition}
        onInput={handleTyping}
        ref={textAreaDivRef}
        autoFocus
        aria-placeholder="Write your text here ..."
      ></div>
    </div>
  );
};

export default Textarea;
