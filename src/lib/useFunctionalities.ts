import { useClientorContext } from "./contexts/clientorContext";
import { formatImage, formatLink } from "./utils";

// event: React.MouseEvent<HTMLDivElement, MouseEvent>

export interface LinkDataType {
  link: string;
  label?: string;
  target?: "blank" | "parent" | "top";
}

export default function useFunctionalities() {
  const {
    setEditMode,
    textAreaDivRef,
    setHtmlText,
    setRawText,
    editorType,
    localImages,
    remoteImages,
  } = useClientorContext();

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

      // This function is the one being called when the user clicks on insert button
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

        // Hide the floating card
        setEditMode((prevModes) =>
          prevModes.filter((_mode) => _mode !== "$ins_link")
        );

        // Delete all the informations entered
        event.currentTarget.reset();
      },
    },

    // FUNCTIONALITY ****************************************************************
    insertImage: {
      toggler: () => {
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

      // This function is the one being called when the user clicks on insert button
      dataHandler: (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (localImages.length === 0 && remoteImages.length === 0) return;

        const textarea = textAreaDivRef.current;

        if (!textarea) return;

        const imagesEltString = [...localImages, ...remoteImages]
          .map((image) => {
            const imgElet = formatImage(image);
            return editorType === "rtx" ? imgElet.rtx() : imgElet.mdx;
          })
          .join(" ");

        textarea.innerHTML += " ".concat(imagesEltString, "<br/>");

        switch (editorType) {
          case "mdx": {
            setRawText((prevText) => `${prevText} ${imagesEltString}`);
            break;
          }

          case "rtx": {
            setHtmlText((prevText) => `${prevText} ${imagesEltString}`);
            break;
          }
        }

        // Hide the floating card
        setEditMode((prevModes) =>
          prevModes.filter((_mode) => _mode !== "$ins_img")
        );

        event.currentTarget.reset();
      },
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
