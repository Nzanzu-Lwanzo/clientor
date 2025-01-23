import useFunctionalities from "../../../../lib/useFunctionalities";
import IconBtn from "../../_general/IconBtn";
import { Delete } from "lucide-react";

const DeleteAll = () => {
  // CH
  const { deleteAll } = useFunctionalities();

  return (
    <IconBtn handleClick={deleteAll} type="button">
      <Delete size={19} />
    </IconBtn>
  );
};

export default DeleteAll;
