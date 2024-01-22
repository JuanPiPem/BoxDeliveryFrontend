import React from "react";

export default function StatusInProgress(props: {
  width?: number;
  height?: number;
}) {
  const { width, height } = props;
  return (
    <svg
      width={width || "7"}
      height={height || "7"}
      viewBox="0 0 7 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="3.5" cy="3.5" r="3.5" fill="#80CF8B" />
    </svg>
  );
}
