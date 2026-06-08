import IconBtn from "../../_general/IconBtn";
import { Italic as ItalicIcon } from "lucide-react";
import { useClientorContext } from "../../../../lib/contexts/clientorContext";

const Italic = () => {
  // STATES
  const { setEditMode, styler, editorType, selectedRange, setRawText, textAreaDivRef, setSelectedRange } = useClientorContext();

  const handleMdxItalic = () => {
    if (selectedRange) {
      const textarea = textAreaDivRef.current;
      if (!textarea) return;

      if (!selectedRange.collapsed) {
        const selectedText = selectedRange.toString();
        // Toggle: check if already wrapped in *
        if (selectedText.startsWith("*") && selectedText.endsWith("*") && !selectedText.startsWith("**")) {
          const unitalicizedText = selectedText.slice(1, -1);
          const textNode = document.createTextNode(unitalicizedText);
          selectedRange.deleteContents();
          selectedRange.insertNode(textNode);
        } else {
          const italicText = `*${selectedText}*`;
          const textNode = document.createTextNode(italicText);
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

          if (before.endsWith("*") && after.startsWith("*") && !before.endsWith("**")) {
            // Toggle OFF: remove * from both sides
            const newContent = before.slice(0, -1) + after.slice(1);
            selection.anchorNode.textContent = newContent;
            
            const newRange = document.createRange();
            newRange.setStart(selection.anchorNode, offset - 1);
            newRange.collapse(true);
            selection.removeAllRanges();
            selection.addRange(newRange);
            setSelectedRange(newRange);
          } else {
            // Toggle ON: insert **
            const italicTags = document.createTextNode("**");
            selectedRange.insertNode(italicTags);
            
            const newRange = document.createRange();
            newRange.setStart(italicTags, 1);
            newRange.collapse(true);
            selection.removeAllRanges();
            selection.addRange(newRange);
            setSelectedRange(newRange);
          }
        }
      }
      
      setRawText(textarea.innerText);
    } else {
      setEditMode((prev) => prev.includes("italic") ? prev.filter(m => m !== "italic") : [...prev, "italic"]);
    }
  };

  return (
    <IconBtn
      handleClick={() => {
        if (editorType === "mdx") {
          handleMdxItalic();
        } else {
          styler?.handleItalic(() => {
            setEditMode((prevModes) => {
              if (!prevModes.includes("italic")) {
                return [...prevModes, "italic"];
              } else {
                return prevModes.filter((mode) => mode !== "italic");
              }
            });
          });
        }
      }}
      editMode="italic"
      type="button"
    >
      <ItalicIcon size={19} />
    </IconBtn>
  );
};

export default Italic;
