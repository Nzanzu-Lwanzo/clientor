import {
  ImagesValidateOptionsType,
  ReferencesOptionsType,
} from "./lib/contexts/clientorUserContext";

export interface ClientorConfigType {
  showCountChars: boolean;
  imagesValidate: ImagesValidateOptionsType;
  referenceOptions: Partial<ReferencesOptionsType>;
}

/*
  These default values are crucial.
  The component could dysfunction
  if there came not to exist one of them.
  This is because in some places in the code
  we make decisions assuming they do
  exist and will never be neither
  undefined nor null.
*/

const ClientorDefaultConfiguration: ClientorConfigType = {
  showCountChars: true,
  imagesValidate: {
    max: 3,
    remote: {
      allowHttpImages: false,
      allowOrigins: "*",
      banOrigins: [],
    },
    local: {
      moMaxSize: 0.8,
    },
  },
  referenceOptions: {
    id: "id",
    label: "name",
  },
};

export default ClientorDefaultConfiguration;
