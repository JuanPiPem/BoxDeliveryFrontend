import React from "react";

export default function Line(props: { width?: number; height?: number }) {
  const { width, height } = props;
  return (
    <svg
      width={width || "270"}
      height={height || "1"}
      viewBox="0 0 270 1"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line y1="0.75" x2="270" y2="0.75" stroke="#24424D" strokeWidth="0.5" />
    </svg>
  );
}
