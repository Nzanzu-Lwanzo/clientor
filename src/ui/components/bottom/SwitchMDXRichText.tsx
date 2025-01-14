import { memo } from "react";
import { useClientorContext } from "../../../lib/context";

const SwitchMDXRichText = memo(() => {
  const { editorType, setEditorType } = useClientorContext();

  return (
    <button
      type="button"
      className="square-btn"
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
