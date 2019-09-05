import React from "react";

import style from "./InfoBox.module.css";

export const InfoBox = ({ name }) => {
  return <div className={style.infoBox}>{name}</div>;
};
