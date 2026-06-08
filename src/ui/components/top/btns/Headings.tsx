import IconBtn from "../../_general/IconBtn";
import { Heading1 } from "lucide-react";
import { useClientorContext } from "../../../../lib/contexts/clientorContext";

const Headings = () => {
  const { styler, editorType, selectedRange, setRawText, textAreaDivRef } = useClientorContext();

  const handleMdxHeading = () => {
    if (selectedRange) {
      const selectedText = selectedRange.toString();
      const headingText = `\n# ${selectedText}`;
      const textNode = document.createTextNode(headingText);
      selectedRange.deleteContents();
      selectedRange.insertNode(textNode);
      if (textAreaDivRef.current) {
        setRawText(textAreaDivRef.current.innerText);
      }
    }
  };

  return (
    <IconBtn 
      handleClick={() => {
        if (editorType === "mdx") {
          handleMdxHeading();
        } else {
          styler?.handleHeading(1, () => {});
        }
      }} 
      type="button"
    >
      <Heading1 size={19} />
    </IconBtn>
  );
};

export default Headings;
