import { useEffect } from "react";
import {
  LocalImageType,
  RemoteImageType,
  useClientorContext,
} from "../contexts/clientorContext";
import connectDB from "../storage/idb";

const useStorage = ({
  handleIdbNotSupported,
  handleError,
}: {
  handleIdbNotSupported: () => void;
  handleError: () => void;
}) => {
  const { setIdb, localImages, remoteImages, idb, setCountImagesInDb } =
    useClientorContext();

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

        let countTotalImages = localImages.length + remoteImages.length;

        // STORE LOCAL IMAGES
        for (let image of localImages) {
          transaction.objectStore("clientor_images_local").put(image);
        }

        // STORE REMOTE IMAGES
        for (let image of remoteImages) {
          transaction.objectStore("clientor_images_remote").put(image);
        }

        // MEMORIZE THE NUMBER OF IMAGES ALREADY IN IDB
        setCountImagesInDb((prev) => prev + countTotalImages);
      }
    },

    emptyStore: (database?: IDBDatabase | undefined) => {
      const db = database || idb;
      if (db) {
        const transaction = db.transaction(
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
      /*
        If we use this function inside of an effect,
        idb state is null. So, to avoid this, we let
        user of the function provide an instance of
        the opened database when they can.
      */
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

export default useStorage;
