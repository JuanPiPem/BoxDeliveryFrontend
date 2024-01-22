import React from "react";
import s from "./pieChart.module.scss";
import { ChakraProvider } from "@chakra-ui/react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

const PieChart = () => {
  return (
    <ChakraProvider>
      <CircularProgress
        value={20}
        color="#dcd8f1"
        className={`${s.container}`}
        size="71px"
      >
        <CircularProgressLabel className={`${s.percent}`}>
          20%
        </CircularProgressLabel>
      </CircularProgress>
    </ChakraProvider>
  );
};

export default PieChart;
