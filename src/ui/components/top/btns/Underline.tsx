import IconBtn from "../../_general/IconBtn";
import { Underline as UnderlineIcon } from "lucide-react";
import useUnderline from "../../../../lib/functionalities/underline";

const Underline = () => {
  // CH
  const { toggler } = useUnderline();

  return (
    <IconBtn handleClick={toggler} editMode="underline" type="button">
      <UnderlineIcon size={19} />
    </IconBtn>
  );
};

export default Underline;
