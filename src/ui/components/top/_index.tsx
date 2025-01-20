import { useState, memo } from "react";
import { useClientorContext } from "../../../lib/context";
import Headings from "./btns/Headings";
import Bold from "./btns/Bold";
import Italic from "./btns/Italic";
import Underline from "./btns/Underline";
import RemoveFormatting from "./btns/RemoveFormatting";
import InsertLink from "./btns/InsertLink";
import AtTag from "./btns/AtTag";
import InsertImage from "./btns/InsertImage";
import SwitchLightDark from "./btns/SwitchLightDark";
import DeleteAll from "./btns/DeleteAll";
import SwitchMenus from "./btns/SwitchMenus";

const Top = memo(() => {
  const [menuSwitched, setMenuSwitched] = useState(false);
  const { editorType } = useClientorContext();

  return (
    <div className="clientor-top">
      <div className="text-style">
        {editorType === "rtx" && (
          <>
            <div
              className={`switched-menu ${
                menuSwitched ? "hide" : "show"
              } only-for-rtx-mode`}
            >
              <Headings />
              <Bold />
              <Italic />
              <Underline />
            </div>
          </>
        )}

        <div className={`switched-menu ${menuSwitched ? "show" : "hide"}`}>
          <RemoveFormatting />
          <InsertLink />
          <AtTag />
          <InsertImage />
          <SwitchLightDark />
          <DeleteAll />
        </div>
      </div>
      {editorType === "rtx" && (
        <>
          <div className="actions">
            <SwitchMenus
              onClick={() => setMenuSwitched((prev) => !prev)}
              menuSwitched={menuSwitched}
            />
          </div>
        </>
      )}
    </div>
  );
});

export default Top;
