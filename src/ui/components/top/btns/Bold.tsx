import { useClientorContext } from "../../../../lib/context";
import IconBtn from "../../_general/IconBtn";
import { Bold as BoldIcon } from "lucide-react";

const Bold = () => {
  const { setEditMode } = useClientorContext();

  return (
    <IconBtn
      handleClick={() =>
        setEditMode((prevModes) => {
          if (prevModes.includes("bold")) {
            return prevModes.filter((mode) => mode !== "bold");
          } else {
            return [...prevModes, "bold"];
          }
        })
      }
      editMode="bold"
      type="button"
    >
      <BoldIcon size={19} />
    </IconBtn>
  );
};

export default Bold;
