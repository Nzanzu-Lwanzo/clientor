import { useContext, createContext, PropsWithChildren } from "react";
import { CSSProperties } from "react";
import { ClientorBoxReturnType } from "../types";

export interface RemoteImagesValidateOptionsType {
  allowHttpImages: boolean;
  allowOrigins?: (string | RegExp)[] | "*";
  banOrigins?: (string | RegExp)[];
}

export interface LocalImagesValidateOptionsType {
  moMaxSize?: number;
  mimeType?: string;
}

export interface ImagesValidateOptionsType {
  max?: number | undefined; // To select all images, the user must explicitly set this value to undefined
  remote?: RemoteImagesValidateOptionsType;
  local?: LocalImagesValidateOptionsType;
}

export interface ClientorUserContextType {
  handleSubmit: (data: ClientorBoxReturnType) => boolean;
  maxContentLength?: {
    value: number;
    handler: () => void;
  };
  boxStyle?: CSSProperties;
  minContentLength?: {
    value: number;
    handler: () => void;
  };
  playSounds?: {
    onSend?: boolean | HTMLAudioElement;
    onDelete?: boolean | HTMLAudioElement;
    onError?: boolean | HTMLAudioElement;
  };
  imagesValidate?: ImagesValidateOptionsType;
  showCountChars?: boolean;
}

const ClientorUserContext = createContext<ClientorUserContextType | null>(null);

export const useClientorUserContext = () => {
  return useContext(ClientorUserContext)!;
};

const ClientorUserProvider = ({
  children,
  ...props
}: PropsWithChildren<ClientorUserContextType>) => {
  return (
    <ClientorUserContext.Provider value={props}>
      {children}
    </ClientorUserContext.Provider>
  );
};

export default ClientorUserProvider;
