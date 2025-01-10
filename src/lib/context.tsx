import React, { createContext, useContext, useState } from "react";

export type EditMode = "bold" | "italic" | "underline" | "none";

export type EditorType = "rtx" | "mdx";

interface ClientorContexttype {
  rawText: string;
  setRawText: React.Dispatch<React.SetStateAction<string>>;

  htmlText: string;
  setHtmlText: React.Dispatch<React.SetStateAction<string>>;

  editModes: EditMode[];
  setEditMode: React.Dispatch<React.SetStateAction<EditMode[]>>;

  editorType: EditorType;
  setEditorType: React.Dispatch<React.SetStateAction<EditorType>>;
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
  const [editorType, setEditorType] = useState<EditorType>("rtx");

  const value: ClientorContexttype = {
    rawText,
    setRawText,
    htmlText,
    setHtmlText,
    editModes,
    setEditMode,
    editorType,
    setEditorType,
  };

  return (
    <ClientorContext.Provider value={value}>
      {children}
    </ClientorContext.Provider>
  );
};
