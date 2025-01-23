import { ImagesValidateOptionsType } from "./lib/contexts/clientorUserContext";

export interface ClientorConfigType {
  showCountChars: boolean;
  imagesValidate: ImagesValidateOptionsType;
}

const ClientorDefaultConfiguration: ClientorConfigType = {
  showCountChars: true,
  imagesValidate: {
    max: 5,
    remote: {
      allowHttpImages: false,
      allowOrigins: "*",
      banOrigins: [],
    },
    local: {
      moMaxSize: 0.8,
    },
  },
};

export default ClientorDefaultConfiguration;
