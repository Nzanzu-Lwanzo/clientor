import { useClientorContext } from "../contexts/clientorContext";

export default function useBold() {
  const { setEditMode } = useClientorContext();

  return {
    toggler: () => {
      setEditMode((prevModes) => {
        if (!prevModes.includes("bold")) {
          return [...prevModes, "bold"];
        } else {
          return prevModes.filter((mode) => mode !== "bold");
        }
      });
    },
    handleFeature: () => {},
  };
}
