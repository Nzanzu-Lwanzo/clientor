import { useClientorContext } from "../../../../lib/contexts/clientorContext";
import IconBtn from "../../_general/IconBtn";
import { Bold as BoldIcon } from "lucide-react";
import useBold from "../../../../lib/functionalities/stylers/bold";

const Bold = () => {
  // STATES
  const { editModes } = useClientorContext();
  // CH
  const { toggler, handleFeature } = useBold();

  return (
    <IconBtn
      handleClick={() => {
        /*
          The following functions must be called in this order.

          Explanation : when we click on the bold button,
          if the bold editMode is already in the editModes array,
          that means we're trying to switch off the styling, 
          therefore we don't need to apply any style. But, if 
          the editMode is not in the array, then we'll apply the style.

          Why call the two functions in that order ? Because we 
          must check the current state of the editModes array (and make
          decisions based on tha ) before we update it.
        */
        if (!editModes.includes("bold")) {
          handleFeature();
        }

        toggler();
      }}
      editMode="bold"
      type="button"
    >
      <BoldIcon size={19} />
    </IconBtn>
  );
};

export default Bold;
