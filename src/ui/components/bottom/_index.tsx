import IconBtn from "../_general/IconBtn";
import { Send, Newspaper, Sun } from "lucide-react";
import SwitchMDXRichText from "./SwitchMDXRichText";

const Bottom = () => {
  const action = () => console.log("Action in topbar");

  return (
    <div className="clientor-bottom">
      <div className="settings">
        <span className="count-chars">2000 chars</span>
        {/* Switch light-dark mode */}
        <IconBtn action={action}>
          <Sun size={19} />
        </IconBtn>

        <SwitchMDXRichText />
      </div>

      <div className="actions">
        <IconBtn action={action}>
          <Newspaper size={19} />
        </IconBtn>
        <IconBtn action={action} type="submit">
          <Send size={19} />
        </IconBtn>
      </div>
    </div>
  );
};

export default Bottom;
