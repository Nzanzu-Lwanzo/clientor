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

/*
  The user must either provide the formatLink function
  or include a absolute_url property in each object.
  If they provide both, the absolute_url value
  will prime over the return value of the formatLink function
*/
export interface ReferencesOptionsType {
  request: (hint: string) => Promise<any[]>;
  label?: string;
  formatURL?: (_ref: unknown) => string;
  id?: string;
}

export interface ClientorUserContextType {
  handleSubmit: (data: ClientorBoxReturnType) => boolean;
  references: ReferencesOptionsType;
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
