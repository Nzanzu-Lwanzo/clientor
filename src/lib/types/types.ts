import { LocalImageType, RemoteImageType } from "../contexts/clientorContext";

export interface ClientorBoxReturnType {
  raw: string;
  html: string;
  localImages: LocalImageType[];
  remoteImages: RemoteImageType["url"][];
  references: (number | string)[];
}

export const isLocalImage = (
  image: LocalImageType | RemoteImageType
): image is LocalImageType => {
  return Object.keys(image).includes("file");
};

export const isRemoteImage = (
  image: LocalImageType | RemoteImageType
): image is RemoteImageType => {
  return Object.keys(image).includes("url");
};
