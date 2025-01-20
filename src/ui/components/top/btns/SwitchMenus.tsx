import IconBtn from "../../_general/IconBtn";
import { X, EllipsisVertical } from "lucide-react";

const SwitchMenus = ({
  onClick,
  menuSwitched,
}: {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  menuSwitched: boolean;
}) => {
  return (
    <IconBtn handleClick={onClick} id="show-switched-menu" type="button">
      {menuSwitched ? <X size={19} /> : <EllipsisVertical size={19} />}
    </IconBtn>
  );
};

export default SwitchMenus;
