import React from "react";

export default function UploadImage(props: {
  width?: number;
  height?: number;
}) {
  const { width, height } = props;
  return (
    <svg
      width={width || "33"}
      height={height || "30"}
      viewBox="0 0 33 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 16H12"
        stroke="#24424D"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M17 11L17 21"
        stroke="#24424D"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M26.7333 10.9333H25.2"
        stroke="#24424D"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M1 17.1212C1 12.3546 1 9.97122 2.16099 8.25916C2.66359 7.51799 3.30943 6.88162 4.06163 6.38639C5.17811 5.65132 6.57587 5.38858 8.71589 5.29467C9.73712 5.29467 10.6164 4.53217 10.8167 3.54545C11.1171 2.06538 12.436 1 13.9678 1H19.0322C20.564 1 21.8829 2.06538 22.1833 3.54545C22.3836 4.53217 23.2629 5.29467 24.2841 5.29467C26.4241 5.38858 27.8219 5.65132 28.9384 6.38639C29.6906 6.88162 30.3364 7.51799 30.839 8.25916C32 9.97122 32 12.3546 32 17.1212C32 21.8879 32 24.2712 30.839 25.9833C30.3364 26.7244 29.6906 27.3608 28.9384 27.856C27.2008 29 24.782 29 19.9444 29H13.0556C8.21796 29 5.79917 29 4.06163 27.856C3.30943 27.3608 2.66359 26.7244 2.16099 25.9833C1.83307 25.4997 1.59777 24.9626 1.42893 24.3333"
        stroke="#24424D"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
