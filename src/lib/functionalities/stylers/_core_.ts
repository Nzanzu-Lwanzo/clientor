import { useClientorContext } from "../../contexts/clientorContext";
import { useEffect, useState } from "react";

type StyleType = "bold" | "underline" | "italic";

export default function useSTYLE() {
  const { textAreaDivRef } = useClientorContext();
  const [selection, setSelection] = useState<Range | undefined>(undefined);

  useEffect(() => {
    const textarea = textAreaDivRef.current;

    if (textarea) {
      document.addEventListener("selectionchange", function () {
        const $selection = document.getSelection();
        if (!$selection?.isCollapsed) {
          const _selection = window.getSelection();
          setSelection(_selection?.getRangeAt(0));
        } else {
          /*
            This is the place where we could
            unnaply all the styles, in case the user
            has unfocused or finished typing
          */
          return;
        }
      });
    }
  }, []);

  return {
    selection,
    handleWithSelection: (styleType: StyleType) => {
      switch (styleType) {
        case "bold": {
          if (selection) {
            const tag = document.createElement("strong");
            selection.surroundContents(tag);
          }
          break;
        }

        case "italic": {
          if (selection) {
            const tag = document.createElement("i");
            selection.surroundContents(tag);
          }
          break;
        }

        case "underline": {
          if (selection) {
            const tag = document.createElement("u");
            selection.surroundContents(tag);
          }
          break;
        }
      }
    },
    handleWithNoSelection: (styleType: StyleType) => {
      switch (styleType) {
        case "bold": {
        }
      }
    },
  };
}
