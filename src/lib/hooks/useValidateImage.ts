import ClientorDefaultConfiguration from "../../clientor.config";
import { useClientorContext } from "../contexts/clientorContext";
import { useClientorUserContext } from "../contexts/clientorUserContext";
import { bytesToMB } from "../helpers/converters";
import { validateURL } from "../helpers/validators";

const useValidateImage = () => {
  /*
    Merge the option values passed through the context provider
    with the default option values.
  */
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
      // First validate the URL by confronting it to a Regexp
      if (!validateURL(image, "https") && !validateURL(image, "http")) {
        return {
          verdict: false,
          reason: "INVALID_URL_SCHEMA",
        };
      }

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

export default useValidateImage;
