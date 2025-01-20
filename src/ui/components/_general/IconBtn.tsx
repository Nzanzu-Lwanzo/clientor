import React, { ButtonHTMLAttributes } from "react";
import { EditMode, useClientorContext } from "../../../lib/context";

type ButtonProps = ButtonHTMLAttributes<HTMLDivElement> & {
  editMode?: EditMode;
  handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const potentialNodeNamesToBeTarget = ["path", "circle", "svg", "rect"];

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
        onClick={(e) => {
          let target = e.target as HTMLElement;
          // let currentTarget = e.currentTarget;

          if (
            potentialNodeNamesToBeTarget.includes(target.nodeName) ||
            target.classList.contains("icon-btn")
          ) {
            handleClick(e);
          }
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default IconBtn;
