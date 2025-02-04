import { useState, useTransition } from "react";
import { useClientorContext } from "./contexts/clientorContext";
import { useStorage } from "./hooks";
import { formatImage, formatLink } from "./utils";
import { useClientorUserContext } from "./contexts/clientorUserContext";
import ClientorDefaultConfiguration from "../clientor.config";

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
    setLocalImages,
    setRemoteImages,
    setReferences,
    countImagesInDb,
  } = useClientorContext();

  const { storeImage } = useStorage({
    handleError() {
      console.log("error");
    },

    handleIdbNotSupported() {
      console.log("Not supported");
    },
  });

  /*
    Merge the option values passed through the context provider
    with the default option values.
  */
  const {
    formatURL,
    request,
    label: refLabel,
    id: refId,
  } = Object.assign(
    useClientorUserContext().references || {},
    ClientorDefaultConfiguration.referenceOptions
  );

  /*
    Merge the option values passed through the context provider
    with the default option values.
  */
  const { max: maxImagesCount } = Object.assign(
    useClientorUserContext().imagesValidate || {},
    ClientorDefaultConfiguration.imagesValidate
  );
  const [refs, setRefs] = useState<any[]>([]);
  const [updatingRefsState, startTransition] = useTransition();
  const [loadingRefs, setLoadingRefs] = useState<"idle" | "loading" | "error">(
    "idle"
  );

  // For the debounce, when requesting for refs
  let timer: NodeJS.Timeout;

  return {
    // FUNCTIONALITY ****************************************************************
    bold: {
      toggler: () => {
        setEditMode((prevModes) => {
          if (prevModes.includes("bold")) {
            return prevModes.filter((mode) => mode !== "bold");
          } else {
            return [...prevModes, "bold"];
          }
        });
      },
      handleFeature: () => {},
    },

    // FUNCTIONALITY ****************************************************************
    italic: {
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
    },

    // FUNCTIONALITY ****************************************************************
    underline: {
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
    },

    // FUNCTIONALITY ****************************************************************
    deleteAll: {
      handleFeature: () => {
        if (textAreaDivRef.current) {
          textAreaDivRef.current.innerHTML = "";
          setHtmlText("");
          setRawText("");
        }
      },
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
      handleFeature: (event: React.FormEvent<HTMLFormElement>) => {
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
      handleFeature: async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Return if no image has been selected when user clicks insert
        if (localImages.length === 0 && remoteImages.length === 0) return;

        // Return if the max count of images stored in idb has been reached
        if (countImagesInDb >= maxImagesCount!) {
          return;
        }
        const textarea = textAreaDivRef.current;

        if (!textarea) return;

        const imagesEltString = [...localImages, ...remoteImages]
          .map((image) => {
            const imgElet = formatImage(image);
            return editorType === "rtx" ? imgElet.rtx() : imgElet.mdx;
          })
          .join(" ");

        textarea.innerHTML += " ".concat(imagesEltString, "<br/><br/>");

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

        // TEMPORARILY STORE THE IMAGES
        storeImage();

        // Empty the states so we don't displayed images
        // more than once
        setLocalImages([]);
        setRemoteImages([]);

        // Add

        event.currentTarget.reset();
      },
    },

    // FUNCTIONALITY ****************************************************************
    reference: {
      toggler: () => {
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
      handleFeature: (
        id: string | number,
        searchInput: HTMLInputElement | null
      ) => {
        // If there's no textarea, don't do any of the stuff below
        const textarea = textAreaDivRef.current;
        if (!textarea) return;

        // Reset the value of the search hint
        if (searchInput) {
          searchInput.value = "";
        }

        /*
          Search for the ref that correspond to this id
          and then pass the object to a function that will
          be provided by the user, so we get back a URL
          that's formatted to match a record or a document
          in the backend.
        */
        const foundRef = refs.find(
          (_ref) => (_ref as any)[refId!] === id
        ) as any;

        if (!foundRef) {
          return;
        }

        if (!foundRef["absolute_url"] && !formatURL) {
          const error = new Error();
          error.name = "NO_REFERENCE_ERROR";
          error.message =
            "There's no valid URL to reference. Each record should have a 'absolute_url' property or you should provide a 'formatURL' fuction that returns the url string ";
          throw error;
        }

        let absolute_url = ((foundRef as any)["absolute_url"] ||
          formatURL!(foundRef)) as string;

        // Insert the reference in the document flow
        const { mdx, rtx } = formatLink({
          link: absolute_url.trim().replaceAll(" ", ""),
          label: `@${foundRef[refLabel!]}`,
          target: "blank",
        });

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
              return prev.concat(
                ` ${`@${foundRef[refLabel!]}` || absolute_url}`
              );
            });
            break;
          }
        }

        // Hide the floating card
        setEditMode((prevModes) =>
          prevModes.filter((_mode) => _mode !== "$reference")
        );

        // Store the reference id in a state
        setReferences((prev) => [...prev, foundRef[refId!]]);
      },
      getRefs: async (event: React.ChangeEvent<HTMLInputElement>) => {
        // For debouncing purpose, reset the timeout
        clearTimeout(timer);

        // Get the hint to perform a search
        let hint = event.target.value;

        if (hint.trim().length === 0) {
          return;
        }

        /*
          Request the refs after 3 seconds of non typing
          **ISSUE** : Instead of being called once
          the callback is being called twice.
        */
        timer = setTimeout(() => {
          /*
            Set the loading state to true
            so we can display a feedback to the user
            indicating that a request is on its way
          */
          setLoadingRefs("loading");

          /*
            This function to request for references
            will be provided by the user
            through the context. It must return a Promise
            that resolves to an array (even if it's one element).
            Normally, this would be function to request
            some data from the database, based on the
            search hint and then return it. Or maybe it would
            return an array stored as a state.
          */
          request(hint)
            .then(function (_refs) {
              startTransition(() => {
                setRefs(_refs);
              });
              setLoadingRefs("idle");
            })
            .catch(() => {
              setLoadingRefs("error");
            });
        }, 1000);
      },
      refs,
      loadingRefs,
      updatingRefsState,
    },

    insertHeading: () => {},
  };
}
