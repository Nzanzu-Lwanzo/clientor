import { useClientorContext } from "../../../../lib/context";
import IconBtn from "../../_general/IconBtn";
import { Underline as UnderlineIcon } from "lucide-react";

const Underline = () => {
  const { setEditMode } = useClientorContext();

  return (
    <IconBtn
      handleClick={() =>
        setEditMode((prevModes) => {
          if (prevModes.includes("underline")) {
            return prevModes.filter((mode) => mode !== "underline");
          } else {
            return [...prevModes, "underline"];
          }
        })
      }
      editMode="underline"
      type="button"
    >
      <UnderlineIcon size={19} />
    </IconBtn>
  );
};

export default Underline;
