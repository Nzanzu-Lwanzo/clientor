import IconBtn from "../../_general/IconBtn";
import { Delete } from "lucide-react";
import useDeleteAll from "../../../../lib/functionalities/deleteAll";

const DeleteAll = () => {
  // CH
  const { handleFeature } = useDeleteAll();

  return (
    <IconBtn handleClick={handleFeature} type="button">
      <Delete size={19} />
    </IconBtn>
  );
};

export default DeleteAll;
