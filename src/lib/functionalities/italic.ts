import { useClientorContext } from "../contexts/clientorContext";

export default function useItalic() {

    const {setEditMode} = useClientorContext()

    return {
      toggler: () => {
        setEditMode((prevModes) => {
          if (prevModes.includes("italic")) {
            return prevModes.filter((mode) => mode !== "italic");
          } else {
            return [...prevModes, "italic"];
          }
        });
      },
      handleFeature: () => {},
    };
}