import { useState } from "react";
import {
  RemoteImageType,
  useClientorContext,
} from "../../../../../lib/contexts/clientorContext";
import { nanoid } from "nanoid";
import { useValidateImage } from "../../../../../lib/hooks";

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
  const { setRemoteImages: setImages, remoteImages: images } =
    useClientorContext();
  const [url, setUrl] = useState("");
  const validateImage = useValidateImage();

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
          if (url !== "" && validateImage(url).verdict) {
            setImages((prevImgs) => {
              return [
                ...prevImgs,
                {
                  url: url,
                  id: nanoid(),
                },
              ];
            });
          }
        }}
      >
        Add
      </button>
    </>
  );
};

export default RemoteImage;
