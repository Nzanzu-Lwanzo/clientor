import {
  LocalImageType,
  RemoteImageType,
  useClientorContext,
} from "./contexts/clientorContext";
import { marked } from "marked";
import { playSoundOnError, playSoundOnSend } from "./sounds";
import { EditMode } from "./contexts/clientorContext";
import { useClientorUserContext } from "./contexts/clientorUserContext";
import { ClientorUserContextType } from "./contexts/clientorUserContext";
import ClientorDefaultConfiguration from "../clientor.config";
import { bytesToMB } from "./helpers";
import connectDB from "./storage/idb";
import { useEffect } from "react";

interface HookParamsType {
  handleSubmit: ClientorUserContextType["handleSubmit"];
}

export const useHandleSubmission = ({ handleSubmit }: HookParamsType) => {
  const {
    rawText,
    htmlText,
    editorType,
    textAreaDivRef,
    setRawText,
    setHtmlText,
    references,
  } = useClientorContext();

  const { minContentLength, maxContentLength, playSounds } =
    useClientorUserContext();

  const { emptyStore, getImages } = useStorage({
    handleIdbNotSupported() {},

    handleError() {},
  });

  return {
    handler: async () => {
      // if the user provided a minimum content length
      // and the length of the raw text is inferior to that value
      // then we the function he defined to handle the case
      if (minContentLength && rawText.length <= minContentLength.value) {
        minContentLength.handler();
      }

      // if the user provided a maximun content length
      // and the length of the raw text is superior to that value
      // then we the function he defined to handle the case
      if (maxContentLength && rawText.length >= maxContentLength.value) {
        maxContentLength.handler();
      }

      // This is so we can make decisions and perform actions
      // based on wether the message was successfully successfullyHandled or whatever
      const localImgs = (await getImages("local")) as LocalImageType[];
      const remoteImgs = (await getImages("remote")) as RemoteImageType[];
      let successfullyHandled = handleSubmit({
        html:
          editorType !== "rtx" ? (marked.parse(htmlText) as string) : htmlText,
        raw: rawText,
        localImages: localImgs.map((img) => img.file),
        remoteImages: remoteImgs.map((img) => img.url),
        references,
      });

      if (successfullyHandled) {
        // Play sound on send
        if (playSounds?.onSend == true) {
          playSoundOnSend();
        } else if (playSounds?.onSend instanceof HTMLAudioElement) {
          playSoundOnSend(playSounds?.onSend);
        }

        // Delete everything in the box
        // update the text states
        if (textAreaDivRef.current) {
          textAreaDivRef.current.innerHTML = "";
          setRawText("");
          setHtmlText("");

          // Delete the images temporarily stored in the idb database
          emptyStore();
        } else {
        }
      } else {
        if (playSounds?.onError == true) {
          playSoundOnError();
        } else if (playSounds?.onError instanceof HTMLAudioElement) {
          playSoundOnError(playSounds?.onError);
        }
      }
    },
  };
};

export const useShowOneMenuAtATime = () => {
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

export const useValidateImage = () => {
  const {
    local: localOptions,
    remote: remoteOptions,
    max,
  } = Object.assign(
    useClientorUserContext().imagesValidate || {},
    ClientorDefaultConfiguration.imagesValidate
  );

  const { localImages, remoteImages } = useClientorContext();

  return (image: File | string) => {
    // Check for the number of images already uploaded
    if (localImages.length + remoteImages.length >= max!) {
      return {
        verdict: false,
        reason: "MAX_IMAGES_COUNT_REACHED",
      };
    }

    // LOCAL IMAGE
    if (image instanceof File) {
      const { moMaxSize } = localOptions!;

      // 1. Check the size of the image
      if (bytesToMB(image.size) > moMaxSize!) {
        return {
          verdict: false,
          reason: "IMAGE_MAX_SIZE_REACHED",
        };
      }

      // If passed all the checks
      return {
        verdict: true,
        reason: "OK",
      };
    }

    // REMOTE IMAGHE
    else if (typeof image == "string") {
      const { allowHttpImages, allowOrigins, banOrigins } = remoteOptions!;
      const { origin, protocol } = new URL(image);

      // 1. Check the schema | allowHttpImages
      if (!allowHttpImages && protocol === "http:") {
        return {
          verdict: false,
          reason: "HTTP_IMAGES_NOT_ALLOWED",
        };
      }

      // 2. If passed, check banned origins
      if (banOrigins?.includes(origin)) {
        return {
          verdict: false,
          reason: "IMAGE_ORIGIN_BANNED",
        };
      }

      // 3. If passed, check allowed origins
      if (allowOrigins === "*") {
        return {
          verdict: true,
          reason: "WILDCARD_ALLOW_ALL",
        };
      }

      if (!allowOrigins?.includes(origin)) {
        return {
          verdict: false,
          reason: "IMAGE_ORIGIN_NOT_ALLOWED",
        };
      }

      // If passed all the checks
      return {
        verdict: true,
        reason: "OK",
      };
    } else {
      return {
        verdict: false,
        reason: "IMAGE_TYPE_UNRECOGNIZED",
      };
    }
  };
};

export const useStorage = ({
  handleIdbNotSupported,
  handleError,
}: {
  handleIdbNotSupported: () => void;
  handleError: () => void;
}) => {
  const { setIdb, localImages, remoteImages, idb } = useClientorContext();

  useEffect(() => {
    connectDB()
      .then((result) => {
        if (result === "NOT_SUPPORTED") {
          handleIdbNotSupported();
          return;
        }

        if (result === "ERROR") {
          if (handleError) {
            handleError();
          }
          return;
        }

        setIdb(result);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return {
    storeImage: () => {
      if (idb) {
        const transaction = idb.transaction(
          ["clientor_images_local", "clientor_images_remote"],
          "readwrite"
        );

        // STORE LOCAL IMAGES
        for (let image of localImages) {
          transaction.objectStore("clientor_images_local").put(image);
        }

        // STORE REMOTE IMAGES
        for (let image of remoteImages) {
          transaction.objectStore("clientor_images_remote").put(image);
        }
      }
    },

    emptyStore: () => {
      if (idb) {
        const transaction = idb.transaction(
          ["clientor_images_local", "clientor_images_remote"],
          "readwrite"
        );
        transaction.objectStore("clientor_images_local").clear();
        transaction.objectStore("clientor_images_remote").clear();
      }
    },

    deleteImageFromStore: ({
      id,
      store,
      database,
    }: {
      id: string | undefined;
      store: "local" | "remote";
      database?: IDBDatabase;
    }) => {
      // If we use this function inside of an effect,
      // idb state is null. So, to avoid this, we let
      // user of the function provide an instance of
      // the opened database when they can.
      const db = database || idb;

      if (db && id) {
        const transaction = db.transaction(
          ["clientor_images_local", "clientor_images_remote"],
          "readwrite"
        );

        switch (store) {
          case "local": {
            transaction.objectStore("clientor_images_local").delete(id);
            break;
          }

          case "remote": {
            transaction.objectStore("clientor_images_remote").delete(id);
            break;
          }
        }
      }
    },

    getImages: (
      type: "local" | "remote"
    ): Promise<(LocalImageType | RemoteImageType)[]> => {
      switch (type) {
        case "local": {
          const request = idb
            ?.transaction("clientor_images_local", "readonly")
            .objectStore("clientor_images_local")
            .getAll();

          return new Promise((resolve, reject) => {
            request?.addEventListener("success", function () {
              resolve(this.result);
            });

            request?.addEventListener("error", function () {
              reject([]);
            });
          });
        }

        case "remote": {
          const request = idb
            ?.transaction("clientor_images_remote", "readonly")
            .objectStore("clientor_images_remote")
            .getAll();

          return new Promise((resolve, reject) => {
            request?.addEventListener("success", function () {
              resolve(this.result);
            });

            request?.addEventListener("error", function () {
              reject([]);
            });
          });
        }
      }
    },
  };
};
