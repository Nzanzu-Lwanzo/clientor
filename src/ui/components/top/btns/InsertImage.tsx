import useFunctionalities from "../../../../lib/useFunctionalities";
import IconBtn from "../../_general/IconBtn";
import { Image } from "lucide-react";

const InsertImage = () => {
  const { insertImage: toggler } = useFunctionalities();

  return (
    <IconBtn type="button" handleClick={toggler} editMode="$ins_img">
      <Image size={19} />
      <div className="floating"></div>
    </IconBtn>
  );
};

export default InsertImage;
