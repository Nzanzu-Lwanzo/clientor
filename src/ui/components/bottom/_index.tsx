import IconBtn from "../_general/IconBtn";
import { Send, Newspaper, NotebookPen } from "lucide-react";
import SwitchMDXRichText from "./SwitchMDXRichText";
import { useClientorContext } from "../../../lib/contexts/clientorContext";
import { memo } from "react";
import { useClientorUserContext } from "../../../lib/contexts/clientorUserContext";
import ClientorDefaultConfiguration from "../../../clientor.config";
import useHandleSubmission from "../../../lib/hooks/useHandleSubmission";

const Bottom = memo(() => {
  // STATES
  const { rawText, editorType, setEditorType } = useClientorContext();
  const { showCountChars, handleSubmit } = useClientorUserContext();

  // CH
  const { handler } = useHandleSubmission({ handleSubmit });

  return (
    <div className="clientor-bottom">
      <div className="settings">
        {(showCountChars ?? ClientorDefaultConfiguration.showCountChars) && (
          <span className="count-chars">{rawText.length} chars</span>
        )}
        <SwitchMDXRichText />
      </div>

      <div className="actions">
        {["mdx", "preview"].includes(editorType) && (
          <IconBtn
            type="button"
            handleClick={() => {
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

        <IconBtn handleClick={handler}>
          <Send size={19} />
        </IconBtn>
      </div>
    </div>
  );
});

export default Bottom;
