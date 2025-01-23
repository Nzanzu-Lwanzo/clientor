import useFunctionalities from "../../../../lib/useFunctionalities";
import IconBtn from "../../_general/IconBtn";
import { Bold as BoldIcon } from "lucide-react";

const Bold = () => {
  // CH
  const { bold } = useFunctionalities();

  return (
    <IconBtn handleClick={bold} editMode="bold" type="button">
      <BoldIcon size={19} />
    </IconBtn>
  );
};

export default Bold;
