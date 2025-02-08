import { EditMode, useClientorContext } from "../contexts/clientorContext";

const useShowOneMenuAtATime = () => {
  const { setEditMode } = useClientorContext();

  return (mode: EditMode) => {
    setEditMode((prevModes) => {
      if (prevModes.includes(mode)) {
        return prevModes.filter((_mode) => _mode !== mode);
      } else {
        return [...prevModes.filter((_mode) => !mode.startsWith("$")), mode];
      }
    });
  };
};

export default useShowOneMenuAtATime;
