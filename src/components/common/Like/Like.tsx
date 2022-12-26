import React, { MouseEventHandler } from "react";

interface LikeProps {
  onClick: MouseEventHandler;
  isClick: boolean;
}
const Like: React.FC<LikeProps> = ({ onClick, isClick }) => {
  return (
    <i
      onClick={onClick}
      style={{ cursor: "pointer" }}
      className={isClick ? "fa fa-heart" : "fa fa-heart-o"}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
