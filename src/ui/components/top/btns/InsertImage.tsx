import { useState } from "react";
import useFunctionalities from "../../../../lib/useFunctionalities";
import IconBtn from "../../_general/IconBtn";
import { Image } from "lucide-react";
import { Cloud, Computer } from "lucide-react";
import RemoteImage from "./ImagePicker/Remote";
import LocalImage from "./ImagePicker/Local";
import { useClientorUserContext } from "../../../../lib/contexts/clientorUserContext";
import { useClientorContext } from "../../../../lib/contexts/clientorContext";

const InsertImage = () => {
  // STATES
  const [imgLocation, setImgLocation] = useState<"cloud" | "local">("local");
  const { imagesValidate } = useClientorUserContext();
  const { countImagesInDb } = useClientorContext();

  // CH
  const {
    insertImage: { toggler, handleFeature },
  } = useFunctionalities();

  // IVS
  let reachedMaxImagesCount = countImagesInDb >= imagesValidate?.max!;

  return (
    <IconBtn type="button" handleClick={toggler} editMode="$ins_img">
      <Image size={19} />
      <form
        className="floating"
        onSubmit={handleFeature}
        /*
          This is so that, when the COUNTER element below stays the 
          only one inside of its container, it be well positioned.
          That means centered.
        */
        style={{ flexDirection: reachedMaxImagesCount ? "row" : "column" }}
      >
        <div className="top-bar">
          {!reachedMaxImagesCount && (
            <>
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
            </>
          )}

          {/* COUNTER */}
          <p className="bulb">
            {countImagesInDb} / {imagesValidate?.max} images
          </p>
        </div>

        {!reachedMaxImagesCount && (
          <div className="img-infos-container">
            {imgLocation == "cloud" ? <RemoteImage /> : <LocalImage />}
            <button
              className="btn"
              type="submit"
              disabled={reachedMaxImagesCount}
            >
              Insert
            </button>
          </div>
        )}
      </form>
    </IconBtn>
  );
};

export default InsertImage;
