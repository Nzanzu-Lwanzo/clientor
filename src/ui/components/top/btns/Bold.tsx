import { useClientorContext } from "../../../../lib/contexts/clientorContext";
import IconBtn from "../../_general/IconBtn";
import { Bold as BoldIcon } from "lucide-react";

const Bold = () => {
  // STATES
  const { styler, setEditMode, editorType, selectedRange, setRawText, textAreaDivRef, setSelectedRange } = useClientorContext();

  const handleMdxBold = () => {
    if (selectedRange) {
      const textarea = textAreaDivRef.current;
      if (!textarea) return;

      if (!selectedRange.collapsed) {
        const selectedText = selectedRange.toString();
        // Toggle: check if already wrapped in **
        if (selectedText.startsWith("**") && selectedText.endsWith("**")) {
          const unboldedText = selectedText.slice(2, -2);
          const textNode = document.createTextNode(unboldedText);
          selectedRange.deleteContents();
          selectedRange.insertNode(textNode);
        } else {
          const boldText = `**${selectedText}**`;
          const textNode = document.createTextNode(boldText);
          selectedRange.deleteContents();
          selectedRange.insertNode(textNode);
        }
      } else {
        // Collapsed range: toggle logic
        // Check if caret is inside ****
        const selection = window.getSelection();
        if (selection && selection.anchorNode) {
          const content = selection.anchorNode.textContent || "";
          const offset = selection.anchorOffset;
          const before = content.slice(0, offset);
          const after = content.slice(offset);

          if (before.endsWith("**") && after.startsWith("**")) {
            // Toggle OFF: remove ** from both sides
            const newContent = before.slice(0, -2) + after.slice(2);
            selection.anchorNode.textContent = newContent;
            
            // Move caret to original position (minus 2 for the removed **)
            const newRange = document.createRange();
            newRange.setStart(selection.anchorNode, offset - 2);
            newRange.collapse(true);
            selection.removeAllRanges();
            selection.addRange(newRange);
            setSelectedRange(newRange);
          } else {
            // Toggle ON: insert ****
            const boldTags = document.createTextNode("****");
            selectedRange.insertNode(boldTags);
            
            const newRange = document.createRange();
            newRange.setStart(boldTags, 2);
            newRange.collapse(true);
            selection.removeAllRanges();
            selection.addRange(newRange);
            setSelectedRange(newRange);
          }
        }
      }
      
      setRawText(textarea.innerText);
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
