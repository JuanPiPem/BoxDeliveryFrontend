import React from "react";
import s from "./buttonDarkBlue.module.scss";

type Prop = {
  text: string | undefined;
};

const ButtonDarkBlue = (prop: Prop) => {
  return <button className={`${s.buttonStyle}`}>{prop.text}</button>;
};

export default ButtonDarkBlue;
