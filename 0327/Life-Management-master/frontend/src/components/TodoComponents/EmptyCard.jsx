import React from "react";
import "./Card.scss";

const EmptyCard = ({ task, empty }) => {
  return (
    <div
      className={`card card--empty`}
      style={{
        width: '100%',
        marginBottom: '10px',
        padding: '10px 10px',
        borderRadius: '3px',
        cursor: 'pointer',
        color: 'gray',
        background: 'gray'
      }}
    />
  );
};

export default EmptyCard;
