import { useClientorContext } from "../../contexts/clientorContext";
import useSTYLE from "./_core_";

export default function useItalic() {
  const { setEditMode } = useClientorContext();
  const { handleWithSelection, selection } = useSTYLE();

  return {
    toggler: () => {
      setEditMode((prevModes) => {
        if (!prevModes.includes("italic") && !selection) {
          return [...prevModes, "italic"];
        } else {
          return prevModes.filter((mode) => mode !== "italic");
        }
      });
    },
    handleFeature: () => {
      if (selection) {
        handleWithSelection("italic");
      }
    },
  };
}
