import useFunctionalities from "../../../../lib/useFunctionalities";
import IconBtn from "../../_general/IconBtn";
import { Italic as ItalicIcon } from "lucide-react";

const Italic = () => {
  // CH
  const {
    italic: { toggler },
  } = useFunctionalities();

  return (
    <IconBtn handleClick={toggler} editMode="italic" type="button">
      <ItalicIcon size={19} />
    </IconBtn>
  );
};

export default Italic;
