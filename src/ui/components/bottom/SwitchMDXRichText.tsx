import { memo } from "react";
import { useClientorContext } from "../../../lib/context";

const SwitchMDXRichText = memo(() => {
  const { editorType, setEditorType } = useClientorContext();

  return (
    <button
      type="button"
      className="square-btn"
      onClick={() => {
        if (editorType === "mdx") {
          setEditorType("rtx");
        } else {
          setEditorType("mdx");
        }
      }}
    >
      {editorType === "rtx" ? "RTX" : "MDX"}
    </button>
  );
});

export default SwitchMDXRichText;
