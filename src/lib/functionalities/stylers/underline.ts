import { useClientorContext } from "../../contexts/clientorContext";
import useSTYLE from "./_core_";

export default function useUnderline() {
  const { setEditMode } = useClientorContext();
  const { handleWithSelection, selection } = useSTYLE();

  return {
    toggler: () => {
      setEditMode((prevModes) => {
        if (!prevModes.includes("underline") && !selection) {
          return [...prevModes, "underline"];
        } else {
          return prevModes.filter((mode) => mode !== "underline");
        }
      });
    },
    handleFeature: () => {
      if (selection) {
        handleWithSelection("underline");
      }
    },
  };
}
