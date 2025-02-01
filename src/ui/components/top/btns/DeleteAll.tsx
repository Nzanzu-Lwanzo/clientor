import useFunctionalities from "../../../../lib/useFunctionalities";
import IconBtn from "../../_general/IconBtn";
import { Delete } from "lucide-react";

const DeleteAll = () => {
  // CH
  const {
    deleteAll: { handleFeature },
  } = useFunctionalities();

  return (
    <IconBtn handleClick={handleFeature} type="button">
      <Delete size={19} />
    </IconBtn>
  );
};

export default DeleteAll;
