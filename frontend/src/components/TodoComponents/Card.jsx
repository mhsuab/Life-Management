import React, { useState } from "react";
import { Icon, Button } from 'semantic-ui-react';
import "./Card.scss";

const Card = ({ task: {
    id,
    name,
    subject,
    color,
    deadLine
}, columnIndex, index, delIconClick, editTodo }) => {
    const [isOver, setIsOver] = useState(false);
    const [inputOpen, setInputOpen] = useState()

    const handleOnOver = () => setIsOver(true);
    const handleOnLeave = () => setIsOver(false);

    return (
        <div
            onMouseEnter={handleOnOver}
            onMouseLeave={handleOnLeave}
        >
            <div
                className={`card`}
                onClick={() => editTodo({columnIndex, index, id, name})}
            >
                {name}
                {isOver ? (

                    <Icon
                        name='delete'
                        size='large'
                        color='red'
                        style={{ float: 'right' }}
                        onClick={(event) => delIconClick(event, {columnIndex, index, id})}
                    />
                ) : (<></>)}
            </div>
        </div>
    );
};

export default Card;