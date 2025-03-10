export interface StylerApiImplementation {
  element: HTMLDivElement | null;
  selection: Selection | null;
  range: Range | undefined;
}

export interface StylerApiConstructor
  extends Pick<StylerApiImplementation, "element"> {
  cb: (selection: Selection | null) => Range | undefined;
}

export type StyleType = "bold" | "underline" | "italic";
