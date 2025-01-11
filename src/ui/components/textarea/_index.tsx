import { useCallback } from "react";
import { useClientorContext } from "../../../lib/context";
import type { TextareaPropsType } from "../../ClientorBox";

const Textarea = ({ maxContentLength }: TextareaPropsType) => {
  const { setRawText, rawText, setHtmlText, textAreaDivRef, editorType } =
    useClientorContext();

  const handleTyping = useCallback((event: React.FormEvent<HTMLDivElement>) => {
    setRawText(event.currentTarget.innerText);
    let innerHTML = event.currentTarget.innerHTML;
    setHtmlText(innerHTML);

    if (maxContentLength && rawText.length >= maxContentLength.value) {
      maxContentLength?.handler();
    }
  }, []);

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
