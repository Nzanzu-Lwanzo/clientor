import IconBtn from "../_general/IconBtn";
import { Send, Newspaper } from "lucide-react";
import SwitchMDXRichText from "./SwitchMDXRichText";
import { useClientorContext } from "../../../lib/context";
import { memo } from "react";

const Bottom = memo(({ showCountChars }: { showCountChars: boolean }) => {
  const { rawText } = useClientorContext();

  return (
    <div className="clientor-bottom">
      <div className="settings">
        {showCountChars && (
          <span className="count-chars">{rawText.length} chars</span>
        )}
        <SwitchMDXRichText />
      </div>

      <div className="actions">
        <IconBtn type="button">
          <Newspaper size={19} />
        </IconBtn>
        <IconBtn type="submit">
          <Send size={19} />
        </IconBtn>
      </div>
    </div>
  );
});

export default Bottom;
