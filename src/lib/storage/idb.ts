/*
    Why store in indexedDB ? Because File objects can be stored inside of it but not in local nor session storages.
    So this is the best option to temporarily store the images, I guess. Especially the local ones.
*/

let dbnName = "clientor";
let dbVersion = 1;

function connectDB(): Promise<IDBDatabase | "NOT_SUPPORTED" | "ERROR"> {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      resolve("NOT_SUPPORTED");
      return;
    }
    const request = window.indexedDB.open(dbnName, dbVersion);
    request.addEventListener("error", function (event) {
      event.stopImmediatePropagation();
      event.stopPropagation();
      event.preventDefault();
      reject("ERROR");
    });

    request.addEventListener("success", function () {
      resolve(this.result);
    });

    request.addEventListener("upgradeneeded", function () {
      const database = this.result;
      if (!database.objectStoreNames.contains("clientor_images_local")) {
        // CLIENTOR LOCAL IMAGES TABLE -> SQL STYLE
        database.createObjectStore("clientor_images_local", {
          keyPath: "id",
        });
      }

      if (!database.objectStoreNames.contains("clientor_images_remote")) {
        // CLIENTOR REMOTE TABLE -> SQL STYLE
        database.createObjectStore("clientor_images_remote", {
          keyPath: "id",
        });
      }
    });
  });
}

export const connectToDb = connectDB().then((result) => {
  /*
      Open a database connection, handle the exceptions
      and return the result of the operation - the database reference
    */
  if (result === "ERROR") {
    return;
  }

  if (result === "NOT_SUPPORTED") {
    return;
  }

  return result;
});

export default connectDB;
