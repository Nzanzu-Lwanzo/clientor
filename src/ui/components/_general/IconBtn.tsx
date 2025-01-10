import React, { ButtonHTMLAttributes } from "react";
import { EditMode, useClientorContext } from "../../../lib/context";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  editMode?: EditMode;
};

const IconBtn: React.FC<ButtonProps> = ({
  children,
  editMode,
  ...props
}: ButtonProps) => {
  const { editModes } = useClientorContext();

  return (
    <button
      className={`icon-btn center ${
        editMode && editModes.includes(editMode) ? "active" : undefined
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconBtn;
