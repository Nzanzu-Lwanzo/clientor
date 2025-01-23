import { useState, memo } from "react";
import { useClientorContext } from "../../../lib/contexts/clientorContext";
import Headings from "./btns/Headings";
import Bold from "./btns/Bold";
import Italic from "./btns/Italic";
import Underline from "./btns/Underline";
import RemoveFormatting from "./btns/RemoveFormatting";
import InsertLink from "./btns/InsertLink";
import AtTag from "./btns/AtTag";
import InsertImage from "./btns/InsertImage";
// import SwitchLightDark from "./btns/SwitchLightDark";
import DeleteAll from "./btns/DeleteAll";
import SwitchMenus from "./btns/SwitchMenus";

const Top = memo(() => {

  // STATES
  const [menuSwitched, setMenuSwitched] = useState(false);
  const { editorType, setEditMode } = useClientorContext();

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
          <InsertLink />
          <AtTag />
          <InsertImage />
          {/* <SwitchLightDark /> */}
          <RemoveFormatting />
          <DeleteAll />
        </div>
      </div>
      {editorType === "rtx" && (
        <>
          <div className="actions">
            <SwitchMenus
              onClick={() => {
                setMenuSwitched((prev) => !prev);
                setEditMode((prevModes) => {
                  // On switch menus (640px breakpoint)
                  // remove the insertions editModes
                  // which means if the user was trying to insert a link
                  // and then switched to the style menu,
                  // when they goes back to the insert menu
                  // there will be no floating menu active
                  return prevModes.filter((mode) => !mode.startsWith("$"));
                });
              }}
              menuSwitched={menuSwitched}
            />
          </div>
        </>
      )}
    </div>
  );
});

export default Top;
