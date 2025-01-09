import React from "react";

interface Props {
  children: React.ReactNode;
  action: () => void;
  type?: "submit" | "button";
}

const IconBtn = ({ action, children, type = "button" }: Props) => {
  return (
    <button className="icon-btn center" onClick={action} type={type}>
      {children}
    </button>
  );
};

export default IconBtn;
