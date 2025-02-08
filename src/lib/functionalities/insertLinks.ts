import { useClientorContext } from "../contexts/clientorContext";
import { formatLink } from "../helpers/formatters";

export interface LinkDataType {
  link: string;
  label?: string;
  target?: "blank" | "parent" | "top";
}

export default function useInsertLinks() {
  const { setEditMode, textAreaDivRef, editorType, setRawText } =
    useClientorContext();

  return {
    toggler: () => {
      // Show the floating menu
      setEditMode((prevModes) => {
        if (prevModes.includes("$ins_link")) {
          return prevModes.filter((_mode) => _mode !== "$ins_link");
        } else {
          return [
            ...prevModes.filter((_mode) => !_mode.startsWith("$")),
            "$ins_link",
          ];
        }
      });
    },

    // This function is the one being called when the user clicks on insert button
    handleFeature: (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const linkData = Object.fromEntries(formData) as unknown as LinkDataType;

      if (!linkData.link) {
        return;
      }

      const textarea = textAreaDivRef.current;
      if (!textarea) {
        return;
      }

      // Insert the link inside of the textarea
      const { mdx, rtx } = formatLink(linkData);
      switch (editorType) {
        case "mdx": {
          textarea.innerHTML += ` ${mdx}`;
          setRawText((prev) => prev.concat(` ${mdx}`));
          break;
        }

        case "rtx": {
          textarea.innerHTML += ` ${rtx()}`;
          setRawText((prev) => {
            return prev.concat(` ${linkData.label || linkData.link}`);
          });
          break;
        }
      }

      // Hide the floating card
      setEditMode((prevModes) =>
        prevModes.filter((_mode) => _mode !== "$ins_link")
      );

      // Delete all the informations entered
      event.currentTarget.reset();
    },
  };
}
