import {
  Bold,
  Italic,
  Underline,
  Link,
  AtSign,
  Paperclip,
  List,
  Image,
  Heading1,
  RemoveFormatting,
  EllipsisVertical,
  X,
  Sun,
} from "lucide-react";
import IconBtn from "../_general/IconBtn";
import { useState, memo, useCallback } from "react";
import { EditMode, useClientorContext } from "../../../lib/context";

const Top = memo(() => {
  const [menuSwitched, setMenuSwitched] = useState(false);
  const { setEditMode } = useClientorContext();

  const editModeSetter = useCallback((mode: EditMode) => {
    setEditMode((prev) => {
      if (prev.includes(mode)) {
        return prev.filter((m) => m !== mode);
      } else {
        return [...prev, mode];
      }
    });
  }, []);

  return (
    <div className="clientor-top">
      <div className="text-style">
        <div className={`switched-menu ${menuSwitched ? "hide" : "show"}`}>
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

          {/* Upload a file */}
          <IconBtn type="button">
            <Paperclip size={19} />
          </IconBtn>

          <IconBtn type="button">
            <Sun size={19} />
          </IconBtn>
        </div>
      </div>
      <div className="actions">
        <IconBtn
          onClick={() => setMenuSwitched((prev) => !prev)}
          id="show-switched-menu"
          type="button"
        >
          {menuSwitched ? <X size={19} /> : <EllipsisVertical size={19} />}
        </IconBtn>
      </div>
    </div>
  );
});

export default Top;
