import React from "react";
import "./Card.scss";

const EmptyCard = ({ task, empty }) => {
  return <div className={`card card--empty`} />;
};

export default EmptyCard;
