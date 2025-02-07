import IconBtn from "../../_general/IconBtn";
import { Italic as ItalicIcon } from "lucide-react";
import useItalic from "../../../../lib/functionalities/stylers/italic";
import { useClientorContext } from "../../../../lib/contexts/clientorContext";

const Italic = () => {
  // STATES
  const { editModes } = useClientorContext();

  // CH
  const { toggler, handleFeature } = useItalic();

  return (
    <IconBtn
      handleClick={() => {
        if (!editModes.includes("bold")) {
          handleFeature();
        }

        toggler();
      }}
      editMode="italic"
      type="button"
    >
      <ItalicIcon size={19} />
    </IconBtn>
  );
};

export default Italic;
