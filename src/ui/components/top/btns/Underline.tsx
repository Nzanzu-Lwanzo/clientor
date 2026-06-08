import IconBtn from "../../_general/IconBtn";
import { Underline as UnderlineIcon } from "lucide-react";
import { useClientorContext } from "../../../../lib/contexts/clientorContext";

const Underline = () => {
  // STATES
  const { setEditMode, styler, editorType, selectedRange, setRawText, textAreaDivRef } = useClientorContext();

  const handleMdxUnderline = () => {
    if (selectedRange && !selectedRange.collapsed) {
      const selectedText = selectedRange.toString();
      const underlinedText = `<u>${selectedText}</u>`;
      const textNode = document.createTextNode(underlinedText);
      selectedRange.deleteContents();
      selectedRange.insertNode(textNode);
      if (textAreaDivRef.current) {
        setRawText(textAreaDivRef.current.innerText);
      }
    } else {
      setEditMode((prev) => prev.includes("underline") ? prev.filter(m => m !== "underline") : [...prev, "underline"]);
    }
  };

  return (
    <IconBtn
      handleClick={() => {
        if (editorType === "mdx") {
          handleMdxUnderline();
        } else {
          styler?.handleUnderline(() => {
            setEditMode((prevModes) => {
              if (!prevModes.includes("underline")) {
                return [...prevModes, "underline"];
              } else {
                return prevModes.filter((mode) => mode !== "underline");
              }
            });
          });
        }
      }}
      editMode="underline"
      type="button"
    >
      <UnderlineIcon size={19} />
    </IconBtn>
  );
};

export default Underline;
