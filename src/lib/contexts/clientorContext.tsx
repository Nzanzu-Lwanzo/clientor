import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type EditMode =
  | "bold"
  | "italic"
  | "underline"
  | "$ins_img"
  | "$ins_link"
  | "$reference"
  | "none";

export type EditorType = "rtx" | "mdx" | "preview";

export type LocalImageType = {
  file: File;
  id: string;
};

export type RemoteImageType = {
  url: string;
  id: string;
};

interface ClientorContexttype {
  // To be returned to the user
  rawText: string;
  setRawText: React.Dispatch<React.SetStateAction<string>>;

  htmlText: string;
  setHtmlText: React.Dispatch<React.SetStateAction<string>>;

  localImages: LocalImageType[];
  setLocalImages: React.Dispatch<React.SetStateAction<LocalImageType[]>>;

  remoteImages: RemoteImageType[];
  setRemoteImages: React.Dispatch<React.SetStateAction<RemoteImageType[]>>;

  references: (string | number)[];
  setReferences: React.Dispatch<React.SetStateAction<(string | number)[]>>;

  // Local states - for local use
  editModes: EditMode[];
  setEditMode: React.Dispatch<React.SetStateAction<EditMode[]>>;

  editorType: EditorType;
  setEditorType: React.Dispatch<React.SetStateAction<EditorType>>;

  textAreaDivRef: React.MutableRefObject<HTMLDivElement | null>;
  previewDivRef: React.MutableRefObject<HTMLDivElement | null>;

  idb: IDBDatabase | null;
  setIdb: React.Dispatch<React.SetStateAction<IDBDatabase | null>>;
}

const ClientorContext = createContext<ClientorContexttype | null>(null);

export const useClientorContext = () => {
  return useContext(ClientorContext)!;
};

export const ClientorContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [rawText, setRawText] = useState("");
  const [htmlText, setHtmlText] = useState("");
  const [localImages, setLocalImages] = useState<LocalImageType[]>([]);
  const [remoteImages, setRemoteImages] = useState<RemoteImageType[]>([]);
  const [references, setReferences] = useState<(string | number)[]>([]);
  const [editModes, setEditMode] = useState<EditMode[]>(["none"]);
  const [editorType, setEditorType] = useState<EditorType>("rtx");
  const [idb, setIdb] = useState<IDBDatabase | null>(null);
  const textAreaDivRef = useRef<HTMLDivElement | null>(null);
  const previewDivRef = useRef<HTMLDivElement | null>(null);

  const value: ClientorContexttype = {
    rawText,
    setRawText,
    htmlText,
    setHtmlText,
    references,
    setReferences,
    localImages,
    setLocalImages,
    remoteImages,
    setRemoteImages,
    editModes,
    setEditMode,
    editorType,
    setEditorType,
    textAreaDivRef,
    previewDivRef,
    idb,
    setIdb,
  };

  useEffect(() => {
    const textarea = textAreaDivRef.current;

    if (textarea) {
      document.addEventListener("selectionchange", function () {
        if (window.getSelection()?.isCollapsed) {
          // This is the place where we could
          // unnaply all the styles, in case the user
          // has unfocused or finished typing
          return;
        }
      });
    }
  }, []);

  return (
    <ClientorContext.Provider value={value}>
      {children}
    </ClientorContext.Provider>
  );
};
