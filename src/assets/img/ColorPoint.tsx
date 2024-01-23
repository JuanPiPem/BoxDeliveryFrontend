import React from "react";

export default function ColorPoint(props: {
  width?: number;
  height?: number;
  state?: string;
}) {
  const { width, height, state} = props;
  let color = ""
  if(state === "en curso") color = "#80CF8B"
  if(state === "entregado") color = "#24424D"
  if(state === "deshabilitado") color = "#626262"
  if(state === "pendiente") color = "#EF7709;"
  return (
    <svg
      width={width || "7"}
      height={height || "7"}
      viewBox="0 0 7 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle id="Ellipse 1" cx="3.5" cy="3.5" r="3.5" fill={color} />
    </svg>
  );
}
