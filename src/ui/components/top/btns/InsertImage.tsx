import { useShowOneMenuAtATime } from "../../../../lib/hooks";
import IconBtn from "../../_general/IconBtn";
import { Image } from "lucide-react";

const InsertImage = () => {
  const toggler = useShowOneMenuAtATime();

  return (
    <IconBtn
      type="button"
      handleClick={() => toggler("$ins_img")}
      editMode="$ins_img"
    >
      <Image size={19} />
      <div className="floating"></div>
    </IconBtn>
  );
};

export default InsertImage;
