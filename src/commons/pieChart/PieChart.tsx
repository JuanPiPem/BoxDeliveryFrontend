import React from "react";
import s from "./pieChart.module.scss";
import { ChakraProvider } from "@chakra-ui/react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

type Prop = {
  percent: number;
};

const PieChart = (prop: Prop) => {
  return (
    <ChakraProvider>
      <CircularProgress
        value={prop.percent}
        color="#dcd8f1"
        className={`${s.container}`}
        size="71px"
      >
        <CircularProgressLabel className={`${s.percent}`}>
          {prop.percent}%
        </CircularProgressLabel>
      </CircularProgress>
    </ChakraProvider>
  );
};

export default PieChart;
