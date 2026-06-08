import { useClientorContext } from "../contexts/clientorContext";
import { formatLink } from "../helpers/formatters";
import { getLinkNode } from "../helpers/getters";

export interface LinkDataType {
  link: string;
  label?: string;
  target?: "blank" | "parent" | "top";
}

export default function useInsertLinks() {
  const { setEditMode, textAreaDivRef, editorType, setRawText, selectedRange, setSelectedRange } =
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

      const refocus = () => {
        textarea.focus();
        // Hide the floating card
        setEditMode((prevModes) =>
          prevModes.filter((_mode) => _mode !== "$ins_link")
        );
      };

      const placeCaretAfter = (node: Node) => {
        const selection = window.getSelection();
        const range = document.createRange();
        range.setStartAfter(node);
        range.collapse(true);
        selection?.removeAllRanges();
        selection?.addRange(range);
        setSelectedRange(range);
      };

      // Insert the link inside of the textarea
      switch (editorType) {
        case "mdx": {
          const { mdx } = formatLink(linkData);
          const textNode = document.createTextNode(` ${mdx} `);
          
          if (selectedRange) {
            selectedRange.deleteContents();
            selectedRange.insertNode(textNode);
            placeCaretAfter(textNode);
          } else {
            textarea.appendChild(textNode);
            placeCaretAfter(textNode);
          }
          setRawText(textarea.innerText);
          break;
        }

        case "rtx": {
          const node = getLinkNode(linkData);
          const spaceBefore = document.createTextNode(" ");
          const spaceAfter = document.createTextNode(" ");
          
          if (selectedRange) {
            selectedRange.deleteContents();
            selectedRange.insertNode(spaceAfter);
            selectedRange.insertNode(node);
            selectedRange.insertNode(spaceBefore);
            placeCaretAfter(spaceAfter);
          }
          // Otherwise, just add it at the end
          else {
            textarea.appendChild(spaceBefore);
            textarea.appendChild(node);
            textarea.appendChild(spaceAfter);
            placeCaretAfter(spaceAfter);
          }
          setRawText(textarea.innerText);
          break;
        }
      }

      refocus();

      // Delete all the informations entered
      event.currentTarget.reset();
    },
  };
}
