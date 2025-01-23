import { memo } from "react";
import { useClientorContext } from "../../../lib/contexts/clientorContext";

const SwitchMDXRichText = memo(() => {
  // STATES
  const { editorType, setEditorType, rawText } = useClientorContext();

  return (
    <button
      type="button"
      className="square-btn"
      disabled={rawText.trim() !== ""}
      onClick={() => {
        if (["mdx", "preview"].includes(editorType)) {
          setEditorType("rtx");
        } else {
          setEditorType("mdx");
        }
      }}
    >
      {(function () {
        switch (editorType) {
          case "mdx": {
            return "MDX";
          }

          case "rtx": {
            return "RTX";
          }

          case "preview": {
            return "VIEW";
          }
        }
      })()}
    </button>
  );
});

export default SwitchMDXRichText;
