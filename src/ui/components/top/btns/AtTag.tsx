import { useShowOneMenuAtATime } from "../../../../lib/hooks";
import IconBtn from "../../_general/IconBtn";
import { AtSign } from "lucide-react";

const AtTag = () => {
  const toggler = useShowOneMenuAtATime();

  return (
    <IconBtn
      type="button"
      handleClick={() => toggler("$reference")}
      editMode="$reference"
    >
      <AtSign size={19} />
      <div className="floating"></div>
    </IconBtn>
  );
};

export default AtTag;
