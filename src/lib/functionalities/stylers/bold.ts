import { useClientorContext } from "../../contexts/clientorContext";
import useSTYLE from "./core/hook";

export default function useBold() {
  const { setEditMode } = useClientorContext();
  const { selection, handleWithSelection } = useSTYLE();

  return {
    toggler: () => {
      setEditMode((prevModes) => {
        /*
          We should persistently add the "bold" editMode to the array
          if we weren't just styling the lately selected content.

          So, if there's a selected content, we won't add the mode
          to the state array.
        */
        if (!prevModes.includes("bold") && !selection) {
          return [...prevModes, "bold"];
        } else {
          return prevModes.filter((mode) => mode !== "bold");
        }
      });
    },
    handleFeature: () => {
      if (selection) {
        handleWithSelection("bold");
      }
    },
  };
}
