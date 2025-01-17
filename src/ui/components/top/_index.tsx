import {
  Bold,
  Italic,
  Underline,
  Link,
  AtSign,
  List,
  Image,
  Heading1,
  RemoveFormatting,
  EllipsisVertical,
  X,
  Sun,
  Delete,
} from "lucide-react";
import IconBtn from "../_general/IconBtn";
import { useState, memo, useCallback } from "react";
import { EditMode, useClientorContext } from "../../../lib/context";

type DoType = "apply" | "unapply";
type ActionFnType = (action: DoType) => void;

const Top = memo(() => {
  const [menuSwitched, setMenuSwitched] = useState(false);
  const { setEditMode, textAreaDivRef, editorType, setHtmlText, setRawText } =
    useClientorContext();

  const MapModesToActionFns: Record<EditMode, ActionFnType> = {
    bold: (action) => {
      switch (action) {
        case "apply": {
          // APPLY BOLD
          break;
        }

        case "unapply": {
          // UNAPPLY BOLD
          break;
        }
      }
    },
    italic: (action) => {
      switch (action) {
        case "apply": {
          // APPLY ITALIC
          break;
        }

        case "unapply": {
          // UNAPPLY ITALIC
          break;
        }
      }
    },
    underline: (action) => {
      switch (action) {
        case "apply": {
          // APPLY UNDERLINE
          break;
        }

        case "unapply": {
          // UNAPPLY UNDERLINE
          break;
        }
      }
    },
    none: () => {},
  };

  const editModeSetter = useCallback((mode: EditMode) => {
    setEditMode((prev) => {
      if (prev.includes(mode)) {
        // Stop applying the style
        MapModesToActionFns[mode]("unapply");

        // I mode alrady exists in the modes array, remove it
        return prev.filter((m) => m !== mode);
      } else {
        // Apply style to the text that will be shortly typed
        MapModesToActionFns[mode]("apply");

        // If mode doesn't exist in the modes array, add it
        return [...prev, mode];
      }
    });
  }, []);

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
              {/* Insert a Heading */}
              <IconBtn type="button">
                <Heading1 size={19} />
              </IconBtn>

              {/* Bold the text */}
              <IconBtn
                onClick={() => {
                  editModeSetter("bold");
                }}
                editMode="bold"
                type="button"
              >
                <Bold size={19} />
              </IconBtn>

              {/* Italic the text */}
              <IconBtn
                onClick={() => {
                  editModeSetter("italic");
                }}
                editMode="italic"
                type="button"
              >
                <Italic size={19} />
              </IconBtn>

              {/* Underline the text */}
              <IconBtn
                onClick={() => {
                  editModeSetter("underline");
                }}
                editMode="underline"
                type="button"
              >
                <Underline size={19} />
              </IconBtn>

              {/* Make a list */}
              <IconBtn type="button">
                <List size={19} />
              </IconBtn>
            </div>
          </>
        )}

        <div className={`switched-menu ${menuSwitched ? "show" : "hide"}`}>
          {/* Remove formatting */}
          <IconBtn type="button">
            <RemoveFormatting size={19} />
          </IconBtn>

          {/* Add a link */}
          <IconBtn type="button">
            <Link size={19} />
          </IconBtn>

          {/* Reference somebody */}
          <IconBtn type="button">
            <AtSign size={19} />
          </IconBtn>

          {/* Insert an image */}
          <IconBtn type="button">
            <Image size={19} />
          </IconBtn>

          {/* Switch light-dark modes */}
          <IconBtn type="button">
            <Sun size={19} />
          </IconBtn>

          {/* Delete all */}
          <IconBtn
            onClick={() => {
              if (textAreaDivRef.current) {
                textAreaDivRef.current.innerHTML = "";
                setHtmlText("");
                setRawText("");
              }
            }}
            type="button"
          >
            <Delete size={19} />
          </IconBtn>
        </div>
      </div>
      {editorType === "rtx" && (
        <>
          <div className="actions">
            <IconBtn
              onClick={() => setMenuSwitched((prev) => !prev)}
              id="show-switched-menu"
              type="button"
            >
              {menuSwitched ? <X size={19} /> : <EllipsisVertical size={19} />}
            </IconBtn>
          </div>
        </>
      )}
    </div>
  );
});

export default Top;
