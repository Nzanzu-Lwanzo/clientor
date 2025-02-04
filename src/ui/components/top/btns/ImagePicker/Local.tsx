import { useState, useEffect, useRef, useMemo } from "react";
import { LocalImageType } from "../../../../../lib/contexts/clientorContext";
import { useClientorContext } from "../../../../../lib/contexts/clientorContext";
import { nanoid } from "nanoid";
import { useValidateImage } from "../../../../../lib/hooks";
import { useClientorUserContext } from "../../../../../lib/contexts/clientorUserContext";
import ClientorDefaultConfiguration from "../../../../../clientor.config";

const LocalImagePreviewer = ({
  image,
  deleteImage,
}: {
  image: LocalImageType;
  deleteImage: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) => {
  // STATES
  const [url, setUrl] = useState<string | null>(null);

  // EFFECTS
  useEffect(() => {
    if (typeof image.file === "string") {
      setUrl(image.file);
      return;
    }

    const fileReader = new FileReader();

    fileReader.addEventListener("load", function (event) {
      setUrl(event.target?.result as string | null);
    });

    fileReader.readAsDataURL(image.file as File);
  }, []);

  return (
    <>
      {url && (
        <div className="img" onClick={deleteImage}>
          <img src={url} alt={`Image ${image.id} previewer`} />
        </div>
      )}
    </>
  );
};

const LocalImage = () => {
  // STATES
  const {
    setLocalImages: setImages,
    localImages: images,
    countImagesInDb,
  } = useClientorContext();
  const imagesValidate = useClientorUserContext().imagesValidate;

  // RH
  const { max } = useMemo(() => {
    return Object.assign(
      imagesValidate || {},
      ClientorDefaultConfiguration.imagesValidate
    );
  }, []);

  // CH
  const validateImage = useValidateImage(); // Image validation

  // REFS
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fileBtnRef = useRef<HTMLSpanElement | null>(null);

  // EFFECTS
  useEffect(() => {
    const fileInput = fileInputRef.current;
    const fileBtn = fileBtnRef.current;

    if (fileBtn) {
      fileBtn.addEventListener("click", function () {
        fileInput?.click();
      });
    }

    if (fileInput) {
      fileInput.addEventListener("change", function (event) {
        const files = (
          event.target as (EventTarget | null) & { files: FileList }
        )?.files;

        setImages(
          Array.from(files)
            // Validate first the images before adding them to the state
            .filter((image) => {
              return validateImage(image).verdict;
            })
            // Only take the first images according to the max images option
            .slice(0, max!)
            // Only the first images according to the number of images left to select
            .slice(0, Math.abs(max! - countImagesInDb))
            .map((file) => {
              return {
                file: file,
                id: nanoid(),
              };
            })
        );
      });
    }
  }, []);

  return (
    <>
      <div className="image-picker-box">
        <span
          style={{ textDecoration: "underline", lineHeight: "1.3rem" }}
          ref={fileBtnRef}
        >
          Drop an image or click here to select
        </span>
        <input
          type="file"
          name="image"
          id="image"
          style={{ display: "none" }}
          ref={fileInputRef}
          multiple
          accept="image/*"
        />
      </div>
      {images.length > 0 && (
        <div className="preview-imgs">
          {images.map((image) => {
            return (
              <LocalImagePreviewer
                image={image}
                key={image.id}
                deleteImage={() => {
                  setImages((allImages) =>
                    allImages.filter((img) => img.id !== image.id)
                  );
                }}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default LocalImage;
