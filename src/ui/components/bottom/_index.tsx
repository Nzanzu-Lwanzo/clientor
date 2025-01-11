import IconBtn from "../_general/IconBtn";
import { Send, Newspaper, NotebookPen } from "lucide-react";
import SwitchMDXRichText from "./SwitchMDXRichText";
import { useClientorContext } from "../../../lib/context";
import { memo } from "react";

const Bottom = memo(({ showCountChars }: { showCountChars: boolean }) => {
  const { rawText, editorType, setEditorType } = useClientorContext();

  return (
    <div className="clientor-bottom">
      <div className="settings">
        {showCountChars && (
          <span className="count-chars">{rawText.length} chars</span>
        )}
        <SwitchMDXRichText />
      </div>

      <div className="actions">
        {["mdx", "preview"].includes(editorType) && (
          <IconBtn
            type="button"
            onClick={() => {
              if (editorType == "mdx") {
                setEditorType("preview");
              } else if (editorType == "preview") {
                setEditorType("mdx");
              }
            }}
          >
            {editorType === "mdx" ? (
              <Newspaper size={19} />
            ) : editorType === "preview" ? (
              <NotebookPen size={19} />
            ) : undefined}
          </IconBtn>
        )}

        <IconBtn type="submit">
          <Send size={19} />
        </IconBtn>
      </div>
    </div>
  );
});

export default Bottom;
