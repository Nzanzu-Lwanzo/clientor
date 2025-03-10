import { useClientorContext } from "../../../../lib/contexts/clientorContext";
import IconBtn from "../../_general/IconBtn";
import { Bold as BoldIcon } from "lucide-react";

const Bold = () => {
  // STATES
  const { styler, setEditMode } = useClientorContext();

  return (
    <IconBtn
      handleClick={() => {
        styler?.handleBold(() => {
          setEditMode((prevModes) => {
            /*
              We should persistently add the "bold" editMode to the array
              if we weren't just styling the lately selected content.

              So, if there's a selected content, we won't add the mode
              to the state array.
            */
            if (!prevModes.includes("bold")) {
              return [...prevModes, "bold"];
            } else {
              return prevModes.filter((mode) => mode !== "bold");
            }
          });
        });
      }}
      editMode="bold"
      type="button"
    >
      <BoldIcon size={19} />
    </IconBtn>
  );
};

export default Bold;
