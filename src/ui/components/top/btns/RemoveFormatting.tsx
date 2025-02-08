import useRemoveFormatting from "../../../../lib/functionalities/stylers/removeFormatting";
import IconBtn from "../../_general/IconBtn";
import { RemoveFormatting as RemoveFormattingIcon } from "lucide-react";

const RemoveFormatting = () => {

  // CH
  const handler = useRemoveFormatting()

  return (
    <IconBtn handleClick={handler} type="button">
      <RemoveFormattingIcon size={19} />
    </IconBtn>
  );
};

export default RemoveFormatting;
