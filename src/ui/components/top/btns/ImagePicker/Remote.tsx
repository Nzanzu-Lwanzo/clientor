import { useState } from "react";
import {
  RemoteImageType,
  useClientorContext,
} from "../../../../../lib/contexts/clientorContext";
import { nanoid } from "nanoid";
import useValidateImage from "../../../../../lib/hooks/useValidateImage";
import { useClientorUserContext } from "../../../../../lib/contexts/clientorUserContext";

const RemoteImagePreviewer = ({
  image,
  deleteImage,
}: {
  image: RemoteImageType;
  deleteImage: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) => {
  return (
    <>
      {image.url && (
        <div className="img" onClick={deleteImage}>
          <img src={image.url} alt={`Image ${image.id} previewer`} />
        </div>
      )}
    </>
  );
};

const RemoteImage = () => {
  // STATES
  const {
    setRemoteImages: setImages,
    remoteImages: images,
    countImagesInDb,
  } = useClientorContext();
  const { imagesValidate } = useClientorUserContext();
  const [url, setUrl] = useState<string | undefined>(undefined);

  // CH
  const validateImage = useValidateImage();

  // IVS
  let reachedMaxImagesCount = countImagesInDb >= imagesValidate?.max!;

  return (
    <>
      <div className="contains-input">
        <label htmlFor="link">Remote img link</label>
        <input
          type="url"
          placeholder="Be carefull to trust the domain"
          id="link"
          name="link"
          required
          onChange={(event) => setUrl(event.target.value)}
        />
      </div>
      {images.length > 0 && (
        <div className="preview-imgs">
          {images.map((image) => {
            return (
              <>
                <RemoteImagePreviewer
                  image={image}
                  key={image.id}
                  deleteImage={() => {
                    setImages((prevImages) =>
                      prevImages.filter((img) => img.id !== image.id)
                    );
                  }}
                />
              </>
            );
          })}
        </div>
      )}
      <button
        className="btn"
        type="button"
        onClick={() => {
          /*
            Only add this remote image if :
            1. The url state is not undefined
            2. The url state stores a string that's not an empty string
            3. The maxium number of images allowed to be uploaded is not reached yet
            4. The imag passes all the other checks
          */

          if (
            url &&
            url.trim() !== "" &&
            !reachedMaxImagesCount &&
            validateImage(url).verdict
          ) {
            setImages((prevImgs) => {
              return [
                ...prevImgs,
                {
                  url: url,
                  id: nanoid(),
                },
              ];
            });
            setUrl(undefined);
          }
        }}
      >
        Add
      </button>
    </>
  );
};

export default RemoteImage;
