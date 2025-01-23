import useFunctionalities from "../../../../lib/useFunctionalities";
import IconBtn from "../../_general/IconBtn";
import { Italic as ItalicIcon } from "lucide-react";

const Italic = () => {
  // CH
  const { italic } = useFunctionalities();

  return (
    <IconBtn handleClick={italic} editMode="italic" type="button">
      <ItalicIcon size={19} />
    </IconBtn>
  );
};

export default Italic;
