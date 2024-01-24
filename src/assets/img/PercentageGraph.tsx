import React from "react";

export default function PercentageGraph(props: {
  width?: number;
  height?: number;
  level?: number;
}) {
  const { width, height, level } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "71"}
      height={height || "77"}
      viewBox="0 0 71 77"
      fill="none"
    >
      <path
        d="M3 35.5C3 17.5507 17.5507 3 35.5 3C53.4493 3.00001 68 17.5508 68 35.5C68 53.4493 53.4493 68 35.5 68C17.5507 68 2.99999 53.4492 3 35.5Z"
        stroke="#EBECEF"
        strokeWidth="6"
      />
      <path
        d="M35.5 3C53.4493 3.00001 68 17.5508 68 35.5C68 53.4493 53.4493 68 35.5 68"
        stroke="#CEC4F4"
        strokeOpacity="0.5"
        strokeWidth="6"
      />
      <g filter="url(#filter0_d_48_805)">
        <circle
          cx="5.5"
          cy="5.5"
          r="5.5"
          transform="matrix(1 0 0 -1 26 73)"
          fill="#CEC4F4"
        />
      </g>
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="18"
        fontWeight={500}
        fill="#24424D"
      >
        {level}%
      </text>
      <defs>
        <filter
          id="filter0_d_48_805"
          x="24"
          y="62"
          width="15"
          height="15"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_48_805"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_48_805"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
