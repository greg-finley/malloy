/*
 * Copyright 2021 Google LLC
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * version 2 as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 */

import React from "react";
import styled, { keyframes } from "styled-components";

interface SpinnerProps {
  text: string;
}

const SpinnerSVG: React.FC = () => {
  return (
    <svg
      width="25px"
      height="25px"
      viewBox="0 0 15 15"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <title>malloy-icon-status-progress</title>
      <defs>
        <circle id="path-1" cx="7.5" cy="7.5" r="7.5"></circle>
        <mask
          id="mask-2"
          maskContentUnits="userSpaceOnUse"
          maskUnits="objectBoundingBox"
          x="0"
          y="0"
          width="15"
          height="15"
          fill="white"
        >
          <use xlinkHref="#path-1"></use>
        </mask>
      </defs>
      <g
        id="malloy-icon-status-progress"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        strokeDasharray="16"
      >
        <use
          id="Oval-Copy-3"
          stroke="#1a73e8"
          mask="url(#mask-2)"
          strokeWidth="3"
          transform="translate(7.500000, 7.500000) rotate(-240.000000) translate(-7.500000, -7.500000) "
          xlinkHref="#path-1"
        ></use>
      </g>
    </svg>
  );
};

export const Spinner: React.FC<SpinnerProps> = ({ text }) => {
  return (
    <VerticalCenter>
      <HorizontalCenter>
        <Label>{text}</Label>
        <SpinningSVG>
          <SpinnerSVG />
        </SpinningSVG>
      </HorizontalCenter>
    </VerticalCenter>
  );
};

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

const SpinningSVG = styled.div`
  width: 25px;
  height: 25px;
  animation: ${rotation} 2s infinite linear;
`;

const Label = styled.div`
  margin-bottom: 10px;
  color: #505050;
  font-size: 15px;
`;

const VerticalCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 0 auto;
  width: 100%;
  height: 100%;
`;

const HorizontalCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
