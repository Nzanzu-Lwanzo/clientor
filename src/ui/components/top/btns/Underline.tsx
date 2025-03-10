import IconBtn from "../../_general/IconBtn";
import { Underline as UnderlineIcon } from "lucide-react";
import { useClientorContext } from "../../../../lib/contexts/clientorContext";

const Underline = () => {
  // STATES
  const { setEditMode, styler } = useClientorContext();

  return (
    <IconBtn
      handleClick={() => {
        styler?.handleUnderline(() => {
          setEditMode((prevModes) => {
            if (!prevModes.includes("underline")) {
              return [...prevModes, "underline"];
            } else {
              return prevModes.filter((mode) => mode !== "underline");
            }
          });
        });
      }}
      editMode="underline"
      type="button"
    >
      <UnderlineIcon size={19} />
    </IconBtn>
  );
};

export default Underline;
