import React, { createContext, useContext, useRef, useState } from "react";

export type EditMode = "bold" | "italic" | "underline" | "none";

export type EditorType = "rtx" | "mdx" | "preview";

interface ClientorContexttype {
  rawText: string;
  setRawText: React.Dispatch<React.SetStateAction<string>>;

  htmlText: string;
  setHtmlText: React.Dispatch<React.SetStateAction<string>>;

  editModes: EditMode[];
  setEditMode: React.Dispatch<React.SetStateAction<EditMode[]>>;

  editorType: EditorType;
  setEditorType: React.Dispatch<React.SetStateAction<EditorType>>;

  textAreaDivRef: React.MutableRefObject<HTMLDivElement | null>;
  previewDivRef: React.MutableRefObject<HTMLDivElement | null>;
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
  const [editModes, setEditMode] = useState<EditMode[]>(["none"]);
  const [editorType, setEditorType] = useState<EditorType>("mdx");
  const textAreaDivRef = useRef<HTMLDivElement | null>(null);
  const previewDivRef = useRef<HTMLDivElement | null>(null);

  const value: ClientorContexttype = {
    rawText,
    setRawText,
    htmlText,
    setHtmlText,
    editModes,
    setEditMode,
    editorType,
    setEditorType,
    textAreaDivRef,
    previewDivRef,
  };

  return (
    <ClientorContext.Provider value={value}>
      {children}
    </ClientorContext.Provider>
  );
};
