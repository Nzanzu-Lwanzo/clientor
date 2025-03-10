import IconBtn from "../../_general/IconBtn";
import { Italic as ItalicIcon } from "lucide-react";
import { useClientorContext } from "../../../../lib/contexts/clientorContext";

const Italic = () => {
  // STATES
  const { setEditMode, styler } = useClientorContext();

  return (
    <IconBtn
      handleClick={() => {
        styler?.handleUnderline(() => {
          setEditMode((prevModes) => {
            if (!prevModes.includes("italic")) {
              return [...prevModes, "italic"];
            } else {
              return prevModes.filter((mode) => mode !== "italic");
            }
          });
        });
      }}
      editMode="italic"
      type="button"
    >
      <ItalicIcon size={19} />
    </IconBtn>
  );
};

export default Italic;
