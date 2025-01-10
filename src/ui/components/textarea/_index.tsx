import { useCallback } from "react";
import { useClientorContext } from "../../../lib/context";
import type { TextareaPropsType } from "../../ClientorBox";

const Textarea = ({ maxContentLength }: TextareaPropsType) => {
  const { setRawText, rawText, setHtmlText, htmlText } = useClientorContext();

  const handleTyping = useCallback(
    (event: React.FormEvent<HTMLDivElement>) => {
      setRawText(event.currentTarget.innerText);
      setHtmlText(event.currentTarget.innerHTML);

      console.log(htmlText);

      if (maxContentLength && rawText.length >= maxContentLength.value) {
        maxContentLength?.handler();
        Object.freeze(setRawText);
        Object.freeze(rawText);
      }
    },
    [rawText]
  );

  return (
    <div id="textarea">
      <div id="text" contentEditable onInput={handleTyping} autoFocus></div>
    </div>
  );
};

export default Textarea;
