import { useState } from "react";
import useFunctionalities from "../../../../lib/useFunctionalities";
import IconBtn from "../../_general/IconBtn";
import { Image } from "lucide-react";
import { Cloud, Computer } from "lucide-react";
import RemoteImage from "./ImagePicker/Remote";
import LocalImage from "./ImagePicker/Local";

const InsertImage = () => {
  // STATES
  const [imgLocation, setImgLocation] = useState<"cloud" | "local">("local");

  // CH
  const {
    insertImage: { toggler, handleFeature },
  } = useFunctionalities();

  return (
    <IconBtn type="button" handleClick={toggler} editMode="$ins_img">
      <Image size={19} />
      <form className="floating" onSubmit={handleFeature}>
        <div className="top-bar">
          <span
            className={`center span-btn ${
              imgLocation === "cloud" ? "active" : undefined
            }`}
            onClick={() => setImgLocation("cloud")}
          >
            <Cloud size={17} />
          </span>
          <span
            className={`center span-btn ${
              imgLocation === "local" ? "active" : undefined
            }`}
            onClick={() => setImgLocation("local")}
          >
            <Computer size={17} />
          </span>
        </div>

        <div className="img-infos-container">
          {imgLocation == "cloud" ? <RemoteImage /> : <LocalImage />}
          <button className="btn" type="submit">
            Insert
          </button>
        </div>
      </form>
    </IconBtn>
  );
};

export default InsertImage;
