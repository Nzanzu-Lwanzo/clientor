import IconBtn from "../../_general/IconBtn";
import { Italic as ItalicIcon } from "lucide-react";
import { useClientorContext } from "../../../../lib/contexts/clientorContext";

const Italic = () => {
  // STATES
  const { setEditMode, styler, editorType, selectedRange, setRawText, textAreaDivRef, setSelectedRange } = useClientorContext();

  const handleMdxItalic = () => {
    if (selectedRange) {
      if (!selectedRange.collapsed) {
        const selectedText = selectedRange.toString();
        const italicText = `*${selectedText}*`;
        const textNode = document.createTextNode(italicText);
        selectedRange.deleteContents();
        selectedRange.insertNode(textNode);
      } else {
        // Collapsed range: insert ** and place caret in middle
        const italicTags = document.createTextNode("**");
        selectedRange.insertNode(italicTags);
        
        // Move caret in middle
        const newRange = document.createRange();
        newRange.setStart(italicTags, 1);
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
