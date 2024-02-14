import React from "react";

export default function VectorUp(props: { width?: number; height?: number }) {
  const { width, height } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "24"}
      height={height || "12"}
      viewBox="0 0 24 12"
      fill="none"
    >
      <path
        d="M2 10L12 2L22 10"
        stroke="#24424D"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
