import React, { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  action: () => void;
};

const IconBtn :React.FC<ButtonProps> = ({ action, children, ...props }: ButtonProps) => {
  return (
    <button className="icon-btn center" onClick={action} {...props}>
      {children}
    </button>
  );
};

export default IconBtn;
