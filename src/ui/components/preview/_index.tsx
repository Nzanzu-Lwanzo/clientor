import { useClientorContext } from "../../../lib/context";
import { marked } from "marked";

const Preview = () => {
  const { previewDivRef, rawText, editorType } = useClientorContext();
  const parsedMarkdown = marked.parse(rawText);

  return (
    <div
      className="preview"
      style={{ display: editorType === "preview" ? "block" : "none" }}
    >
      <div className="preview-top">
        <span className="title">Preview MDX</span>
        <div className="actions"></div>
      </div>
      <div
        id="content"
        ref={previewDivRef}
        dangerouslySetInnerHTML={{ __html: parsedMarkdown as string }}
      ></div>
    </div>
  );
};

export default Preview;
