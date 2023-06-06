import { FC } from "react";

interface AnimatedBackgroundProps {
  images: string[];
}

const AnimatedBackground: FC<AnimatedBackgroundProps> = ({ images }) => {
  return (
    <div className="background">
      {images.map((image) => (
        <span
          style={{ backgroundImage: `url(${image})` }}
          className="bg-cover blur-[2px]"
        ></span>
      ))}
    </div>
  );
};

export default AnimatedBackground;
