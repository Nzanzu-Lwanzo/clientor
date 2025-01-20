import useFunctionalities from "../../../../lib/useFunctionalities";
import IconBtn from "../../_general/IconBtn";
import { AtSign } from "lucide-react";

const AtTag = () => {
  const { reference: toggler } = useFunctionalities();

  return (
    <IconBtn type="button" handleClick={toggler} editMode="$reference">
      <AtSign size={19} />
      <div className="floating"></div>
    </IconBtn>
  );
};

export default AtTag;
