import React from "react";

export default function VectorDown(props: { width?: number; height?: number }) {
  const { width, height } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="12"
      viewBox="0 0 24 12"
      fill="none"
    >
      <path
        d="M2 2L12 10L22 2"
        stroke="#24424D"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
