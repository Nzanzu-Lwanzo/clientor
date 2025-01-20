import { useClientorContext } from "../../../../lib/context";
import IconBtn from "../../_general/IconBtn";
import { Delete } from "lucide-react";

const DeleteAll = () => {
  const { textAreaDivRef, setHtmlText, setRawText } = useClientorContext();

  return (
    <IconBtn
      handleClick={() => {
        if (textAreaDivRef.current) {
          textAreaDivRef.current.innerHTML = "";
          setHtmlText("");
          setRawText("");
        }
      }}
      type="button"
    >
      <Delete size={19} />
    </IconBtn>
  );
};

export default DeleteAll;
