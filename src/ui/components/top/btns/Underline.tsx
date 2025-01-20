import useFunctionalities from "../../../../lib/useFunctionalities";
import IconBtn from "../../_general/IconBtn";
import { Underline as UnderlineIcon } from "lucide-react";

const Underline = () => {
  const { underline } = useFunctionalities();

  return (
    <IconBtn handleClick={underline} editMode="underline" type="button">
      <UnderlineIcon size={19} />
    </IconBtn>
  );
};

export default Underline;
