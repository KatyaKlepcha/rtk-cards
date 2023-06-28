import React from "react";
import { Slider, SliderProps } from "@mui/material";

const BaseRange: React.FC<SliderProps> = (props) => {
  return <Slider {...props} />;
};

export default BaseRange;
