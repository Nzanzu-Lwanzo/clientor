import React, { ButtonHTMLAttributes } from "react";
import {
  EditMode,
  useClientorContext,
} from "../../../lib/contexts/clientorContext";

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

  let thisButtonIsActive = editMode && editModes.includes(editMode);
  let thisButtonShowAFloating = ["$ins_img", "$ins_link", "$reference"].some(
    (mode) => editModes.includes(mode as EditMode)
  );

  return (
    <div className="icon-btn-container" {...props}>
      <div
        className={`
          icon-btn center
          ${thisButtonIsActive ? "active" : undefined}
          ${thisButtonShowAFloating ? "with-floating" : undefined}
        `}
        onClick={(e) => {
          let target = e.target as HTMLElement;

          if (
            (potentialNodeNamesToBeTarget.includes(target.nodeName) &&
              !target.matches(".span-btn *")) ||
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
