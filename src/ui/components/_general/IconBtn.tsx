import React, { ButtonHTMLAttributes } from "react";
import { EditMode, useClientorContext } from "../../../lib/context";

type ButtonProps = ButtonHTMLAttributes<HTMLDivElement> & {
  editMode?: EditMode;
  handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const IconBtn: React.FC<ButtonProps> = ({
  children,
  editMode,
  handleClick,
  ...props
}: ButtonProps) => {
  const { editModes } = useClientorContext();

  return (
    <div className="icon-btn-container" {...props}>
      <div
        className={`icon-btn center ${
          editMode && editModes.includes(editMode) ? "active" : undefined
        }`}
        onClick={handleClick}
      >
        {children}
      </div>
    </div>
  );
};

export default IconBtn;
