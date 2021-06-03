import React from "react";
import flags from "../flagsAndCodes";
import "./FlagText.scss";

function FlagText({country, text}) {
  return (
    <div className="flagText">
      <img className="flagText__flag" src={flags[country]} alt="" />
      <p>{text}</p>
    </div>
  );
}

export default FlagText;
