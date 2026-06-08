import IconBtn from "../../_general/IconBtn";
import { List } from "lucide-react";
import { useClientorContext } from "../../../../lib/contexts/clientorContext";

const InsertList = () => {
  const { styler, editorType, selectedRange, setRawText, textAreaDivRef } = useClientorContext();

  const handleMdxList = () => {
    if (selectedRange) {
      const selectedText = selectedRange.toString();
      const listText = `\n- ${selectedText}`;
      const textNode = document.createTextNode(listText);
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
          handleMdxList();
        } else {
          styler?.handleList("unordered", () => {});
        }
      }} 
      type="button"
    >
      <List size={19} />
    </IconBtn>
  );
};

export default InsertList;

