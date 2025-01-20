import { CSSProperties } from "react";

export interface TextareaPropsType {
  maxContentLength?: {
    value: number;
    handler: () => void;
  };
}

export interface BottomPropsType {
  showCountChars?: boolean;
}

interface TextReturnType {
  raw: string;
  html: string;
}

export interface ClientorBoxProps extends TextareaPropsType, BottomPropsType {
  handleSubmit: (
    text: TextReturnType
  ) => boolean;
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
}
