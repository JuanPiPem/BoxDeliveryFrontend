import React from "react";

export default function DeployArrowRight(props: {
  width?: number;
  height?: number;
}) {
  const { width, height } = props;
  return (
    <svg
      width={width || "8"}
      height={height || "14"}
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Stroke 7"
        d="M0.33213 13.6564C-0.0716676 13.2411 -0.107106 12.5926 0.224929 12.1364L0.335563 12.0057L5.24422 7.0014L0.335563 1.99427C-0.0699586 1.58077 -0.108095 0.932423 0.22204 0.47477L0.332129 0.34362C0.735927 -0.0716381 1.36907 -0.110689 1.816 0.227372L1.94407 0.340105L7.66444 6.17292C8.07118 6.58766 8.10816 7.23837 7.77537 7.69601L7.66444 7.82708L1.94407 13.6599C1.498 14.1147 0.776307 14.1132 0.33213 13.6564Z"
        fill="#24424D"
      />
    </svg>
  );
}
