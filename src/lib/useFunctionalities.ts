import { useClientorContext } from "./context";
import { formatLink } from "./utils";

// event: React.MouseEvent<HTMLDivElement, MouseEvent>

export interface LinkDataType {
  link: string;
  label?: string;
  target?: "blank" | "parent" | "top";
}

export default function useFunctionalities() {
  const { setEditMode, textAreaDivRef, setHtmlText, setRawText, editorType } =
    useClientorContext();

  return {
    // FUNCTIONALITY ****************************************************************
    bold: () => {
      setEditMode((prevModes) => {
        if (prevModes.includes("bold")) {
          return prevModes.filter((mode) => mode !== "bold");
        } else {
          return [...prevModes, "bold"];
        }
      });
    },

    // FUNCTIONALITY ****************************************************************
    italic: () => {
      setEditMode((prevModes) => {
        if (prevModes.includes("italic")) {
          return prevModes.filter((mode) => mode !== "italic");
        } else {
          return [...prevModes, "italic"];
        }
      });
    },

    // FUNCTIONALITY ****************************************************************
    underline: () => {
      setEditMode((prevModes) => {
        if (prevModes.includes("underline")) {
          return prevModes.filter((mode) => mode !== "underline");
        } else {
          return [...prevModes, "underline"];
        }
      });
    },

    // FUNCTIONALITY ****************************************************************
    deleteAll: () => {
      if (textAreaDivRef.current) {
        textAreaDivRef.current.innerHTML = "";
        setHtmlText("");
        setRawText("");
      }
    },

    // FUNCTIONALITY ****************************************************************
    insertLink: {
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

      dataHandler: (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const linkData = Object.fromEntries(
          formData
        ) as unknown as LinkDataType;

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
            setHtmlText((prev) => prev.concat(` ${rtx()}`));
            setRawText((prev) => prev.concat(` ${mdx}`));
            break;
          }

          case "rtx": {
            textarea.innerHTML += ` ${rtx()}`;
            setHtmlText((prev) => prev.concat(` ${rtx()}`));
            setRawText((prev) => {
              return prev.concat(` ${linkData.label || linkData.link}`);
            });
            break;
          }
        }

        setEditMode((prevModes) =>
          prevModes.filter((_mode) => _mode !== "$ins_link")
        );
      },
    },

    // FUNCTIONALITY ****************************************************************
    insertImage: () => {
      setEditMode((prevModes) => {
        if (prevModes.includes("$ins_img")) {
          return prevModes.filter((_mode) => _mode !== "$ins_img");
        } else {
          return [
            ...prevModes.filter((_mode) => !_mode.startsWith("$")),
            "$ins_img",
          ];
        }
      });
    },

    // FUNCTIONALITY ****************************************************************
    reference: () => {
      setEditMode((prevModes) => {
        if (prevModes.includes("$reference")) {
          return prevModes.filter((_mode) => _mode !== "$reference");
        } else {
          return [
            ...prevModes.filter((_mode) => !_mode.startsWith("$")),
            "$reference",
          ];
        }
      });
    },

    insertHeading: () => {},
  };
}
