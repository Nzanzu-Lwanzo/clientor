import { useClientorContext } from "../contexts/clientorContext";

export default function useUnderline() {
  const { setEditMode } = useClientorContext();

  return {
    toggler: () => {
      setEditMode((prevModes) => {
        if (prevModes.includes("underline")) {
          return prevModes.filter((mode) => mode !== "underline");
        } else {
          return [...prevModes, "underline"];
        }
      });
    },
    handleFeature: () => {},
  };
}
