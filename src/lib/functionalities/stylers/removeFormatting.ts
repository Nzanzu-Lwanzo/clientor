import { useClientorContext } from "../../contexts/clientorContext";

const useRemoveFormatting = () => {
  const { textAreaDivRef } = useClientorContext();

  return () => {
    const textarea = textAreaDivRef.current;
    if (!textarea) {
      return;
    }

    const innerText = textarea.innerText;
    textarea.innerHTML = innerText.replaceAll("\n", "<br>");
  };
};

export default useRemoveFormatting;
