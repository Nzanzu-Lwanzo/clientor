import IconBtn from "../../_general/IconBtn";
import { Underline as UnderlineIcon } from "lucide-react";
import { useClientorContext } from "../../../../lib/contexts/clientorContext";

const Underline = () => {
  // STATES
  const { setEditMode, styler, editorType, selectedRange, setRawText, textAreaDivRef, setSelectedRange } = useClientorContext();

  const handleMdxUnderline = () => {
    if (selectedRange) {
      if (!selectedRange.collapsed) {
        const selectedText = selectedRange.toString();
        const underlinedText = `<u>${selectedText}</u>`;
        const textNode = document.createTextNode(underlinedText);
        selectedRange.deleteContents();
        selectedRange.insertNode(textNode);
      } else {
        // Collapsed range: insert <u></u> and place caret in middle
        const underlineTags = document.createTextNode("<u></u>");
        selectedRange.insertNode(underlineTags);
        
        // Move caret in middle (between <u> and </u>)
        const newRange = document.createRange();
        newRange.setStart(underlineTags, 3);
        newRange.collapse(true);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(newRange);
        setSelectedRange(newRange);
      }
      
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
