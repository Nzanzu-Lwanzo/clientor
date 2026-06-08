import IconBtn from "../../_general/IconBtn";
import { Underline as UnderlineIcon } from "lucide-react";
import { useClientorContext } from "../../../../lib/contexts/clientorContext";

const Underline = () => {
  // STATES
  const { setEditMode, styler, editorType, selectedRange, setRawText, textAreaDivRef, setSelectedRange } = useClientorContext();

  const handleMdxUnderline = () => {
    if (selectedRange) {
      const textarea = textAreaDivRef.current;
      if (!textarea) return;

      if (!selectedRange.collapsed) {
        const selectedText = selectedRange.toString();
        // Toggle: check if already wrapped in <u></u>
        if (selectedText.startsWith("<u>") && selectedText.endsWith("</u>")) {
          const unboldedText = selectedText.slice(3, -4);
          const textNode = document.createTextNode(unboldedText);
          selectedRange.deleteContents();
          selectedRange.insertNode(textNode);
        } else {
          const boldText = `<u>${selectedText}</u>`;
          const textNode = document.createTextNode(boldText);
          selectedRange.deleteContents();
          selectedRange.insertNode(textNode);
        }
      } else {
        // Collapsed range: toggle logic
        const selection = window.getSelection();
        if (selection && selection.anchorNode) {
          const content = selection.anchorNode.textContent || "";
          const offset = selection.anchorOffset;
          const before = content.slice(0, offset);
          const after = content.slice(offset);

          if (before.endsWith("<u>") && after.startsWith("</u>")) {
            // Toggle OFF: remove <u></u> from both sides
            const newContent = before.slice(0, -3) + after.slice(4);
            selection.anchorNode.textContent = newContent;
            
            const newRange = document.createRange();
            newRange.setStart(selection.anchorNode, offset - 3);
            newRange.collapse(true);
            selection.removeAllRanges();
            selection.addRange(newRange);
            setSelectedRange(newRange);
          } else {
            // Toggle ON: insert <u></u>
            const underlineTags = document.createTextNode("<u></u>");
            selectedRange.insertNode(underlineTags);
            
            const newRange = document.createRange();
            newRange.setStart(underlineTags, 3);
            newRange.collapse(true);
            selection.removeAllRanges();
            selection.addRange(newRange);
            setSelectedRange(newRange);
          }
        }
      }
      
      setRawText(textarea.innerText);
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
