import React from "react";
import { useDrop } from "react-dnd";
import "./Column.scss";
import DraggableCard from "./DraggableCard";
import { ItemTypes } from "./../../config";
import { Icon } from "semantic-ui-react";
import EmptyCard from "./EmptyCard";

const Column = ({ tasks: { title, tasks }, columnIndex, handleMoveMyTask, delIconClick, addTodo, editTodo }) => {
  const cards = tasks.map((task, index) => {
    const propsToDraggbleCard = { task, columnIndex, index, delIconClick, editTodo };
    return (
      <DraggableCard
        key={`${columnIndex} ${index} ${task.id}`}
        { ...propsToDraggbleCard }
      />
    );
  });

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: ItemTypes.CARD,
    drop: item => {
      const from = item;
      const to = { columnIndex };
      handleMoveMyTask(from, to);
    },
    canDrop: item => item.columnIndex !== columnIndex,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  return (
    <div ref={dropRef} className="column">
      <div className="column__title">
        {title}
        <Icon
          link
          name='edit'
          size='small'
          color='grey'
          style={{ float: 'right' }}
          onClick={() => addTodo(title)}
        />
      </div>
      <div className="column__cards">
        {cards}
        {isOver && canDrop ? <EmptyCard /> : ""}
      </div>
    </div>
  );
};

export default Column;
