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
} from "lucide-react";
import IcconBtn from "../_general/IconBtn";
import { useState } from "react";

const Top = () => {
  const action = () => console.log("Action in topbar");

  const [showFloatMenu, setShowFloatMenu] = useState(false);

  return (
    <div className="clientor-top">
      <div className="text-style">
        {/* Insert a Heading */}
        <IcconBtn action={action}>
          <Heading1 size={19} />
        </IcconBtn>

        {/* Bold the text */}
        <IcconBtn action={action}>
          <Bold size={19} />
        </IcconBtn>

        {/* Italic the text */}
        <IcconBtn action={action}>
          <Italic size={19} />
        </IcconBtn>

        {/* Underline the text */}
        <IcconBtn action={action}>
          <Underline size={19} />
        </IcconBtn>

        {/* Make a list */}
        <IcconBtn action={action}>
          <List size={19} />
        </IcconBtn>

        <div
          className={`float-on-mobile ${showFloatMenu ? "show" : undefined}`}
        >
          {/* Remove formatting */}
          <IcconBtn action={action}>
            <RemoveFormatting size={19} />
          </IcconBtn>

          {/* Add a link */}
          <IcconBtn action={action}>
            <Link size={19} />
          </IcconBtn>

          {/* Reference somebody */}
          <IcconBtn action={action}>
            <AtSign size={19} />
          </IcconBtn>

          {/* Insert an image */}
          <IcconBtn action={action}>
            <Image size={19} />
          </IcconBtn>

          {/* Upload a file */}
          <IcconBtn action={action}>
            <Paperclip size={19} />
          </IcconBtn>

          {/* Hide this element on mobile*/}
          <IcconBtn
            action={action}
            id="hide-float-menu"
            onClick={() => setShowFloatMenu(false)}
          >
            <X size={19} />
          </IcconBtn>
        </div>
      </div>
      <div className="actions">
        <IcconBtn action={action} onClick={() => setShowFloatMenu(true)}>
          <EllipsisVertical size={19} />
        </IcconBtn>
      </div>
    </div>
  );
};

export default Top;
