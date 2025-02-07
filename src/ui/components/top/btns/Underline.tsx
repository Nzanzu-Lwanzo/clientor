import IconBtn from "../../_general/IconBtn";
import { Underline as UnderlineIcon } from "lucide-react";
import useUnderline from "../../../../lib/functionalities/stylers/underline";
import { useClientorContext } from "../../../../lib/contexts/clientorContext";

const Underline = () => {
  // STATES
  const { editModes } = useClientorContext();
  // CH
  const { toggler, handleFeature } = useUnderline();

  return (
    <IconBtn
      handleClick={() => {
        if (!editModes.includes("bold")) {
          handleFeature();
        }
        toggler();
      }}
      editMode="underline"
      type="button"
    >
      <UnderlineIcon size={19} />
    </IconBtn>
  );
};

export default Underline;
