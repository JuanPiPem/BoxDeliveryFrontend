import React from "react";

export default function Unchecked(props: { width?: number; height?: number }) {
  const { width, height } = props;
  return (
    <svg
      width={width || "19"}
      height={height || "19"}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="18" height="18" rx="9" stroke="#24424D" />
    </svg>
  );
}
