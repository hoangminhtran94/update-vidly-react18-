import React, { useRef, useState, useEffect } from "react";
import classes from "./UploadImage.module.css";
interface UploadImageProps {
  getImage: (image: string, file: File | null) => void;
  image?: string;
  name?: string;
  defaultImage?: string;
}

const UploadImage: React.FC<UploadImageProps> = ({
  getImage,
  name,
  defaultImage,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImage] = useState<string>(
    defaultImage ? defaultImage : ""
  );
  const [file, setFile] = useState<File | null>(null);
  useEffect(() => {
    getImage(imageUrl, file);
  }, [file, imageUrl]);

  return (
    <div
      tabIndex={0}
      className={classes["upload-image-container"]}
      onClick={(e) => {
        inputRef.current?.click();
      }}
    >
      {imageUrl && (
        <img
          src={
            imageUrl && !imageUrl.includes("blob")
              ? "http://localhost:5000/" + defaultImage
              : imageUrl
          }
          alt="uploadImage"
        />
      )}
      {!imageUrl && (
        <p className={classes["image-placeholder"]}>Please choose an image</p>
      )}
      <input
        type="file"
        name={name}
        multiple={false}
        ref={inputRef}
        accept={".jpg,.jpeg,.png"}
        onChange={(e) => {
          setImage(URL.createObjectURL(e.target.files![0]));
          setFile(e.target.files![0]);
        }}
      />
    </div>
  );
};
export default UploadImage;
