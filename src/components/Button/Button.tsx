import React, { MouseEventHandler } from "react";

const Button = ({
  title,
  clickHandler,
}: {
  title: string;
  clickHandler: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button onClick={clickHandler} className="btn">
      <span style={{ zIndex: 1000, position: "relative" }}>{title}</span>
      <div className="wave"></div>
    </button>
  );
};

export default Button;
