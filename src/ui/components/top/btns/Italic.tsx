import { useClientorContext } from "../../../../lib/context";
import IconBtn from "../../_general/IconBtn";
import { Italic as ItalicIcon } from "lucide-react";

const Italic = () => {
  const { setEditMode } = useClientorContext();

  return (
    <IconBtn
      handleClick={() =>
        setEditMode((prevModes) => {
          if (prevModes.includes("italic")) {
            return prevModes.filter((mode) => mode !== "italic");
          } else {
            return [...prevModes, "italic"];
          }
        })
      }
      editMode="italic"
      type="button"
    >
      <ItalicIcon size={19} />
    </IconBtn>
  );
};

export default Italic;
