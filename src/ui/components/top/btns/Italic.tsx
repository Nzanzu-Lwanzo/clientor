import IconBtn from "../../_general/IconBtn";
import { Italic as ItalicIcon } from "lucide-react";
import useItalic from "../../../../lib/functionalities/italic";

const Italic = () => {
  // CH
  const { toggler } = useItalic();

  return (
    <IconBtn handleClick={toggler} editMode="italic" type="button">
      <ItalicIcon size={19} />
    </IconBtn>
  );
};

export default Italic;
