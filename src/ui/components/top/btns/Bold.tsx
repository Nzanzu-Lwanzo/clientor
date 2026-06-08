import { useClientorContext } from "../../../../lib/contexts/clientorContext";
import IconBtn from "../../_general/IconBtn";
import { Bold as BoldIcon } from "lucide-react";

const Bold = () => {
  // STATES
  const { styler, setEditMode, editorType, selectedRange, setRawText, textAreaDivRef, setSelectedRange } = useClientorContext();

  const handleMdxBold = () => {
    if (selectedRange) {
      if (!selectedRange.collapsed) {
        const selectedText = selectedRange.toString();
        const boldText = `**${selectedText}**`;
        const textNode = document.createTextNode(boldText);
        selectedRange.deleteContents();
        selectedRange.insertNode(textNode);
      } else {
        // Collapsed range: insert **** and place caret in middle
        const boldTags = document.createTextNode("****");
        selectedRange.insertNode(boldTags);
        
        // Move caret in middle
        const newRange = document.createRange();
        newRange.setStart(boldTags, 2);
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
      setEditMode((prev) => prev.includes("bold") ? prev.filter(m => m !== "bold") : [...prev, "bold"]);
    }
  };

  return (
    <IconBtn
      handleClick={() => {
        if (editorType === "mdx") {
          handleMdxBold();
        } else {
          styler?.handleBold(() => {
            setEditMode((prevModes) => {
              if (!prevModes.includes("bold")) {
                return [...prevModes, "bold"];
              } else {
                return prevModes.filter((mode) => mode !== "bold");
              }
            });
          });
        }
      }}
      editMode="bold"
      type="button"
    >
      <BoldIcon size={19} />
    </IconBtn>
  );
};

export default Bold;
