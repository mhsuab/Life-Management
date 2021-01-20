import React, { useState } from "react";
import { Icon, Button } from 'semantic-ui-react';

const Card = ({ task: {
    id,
    name,
    subject,
    color,
    onCalendar,
    startTime,
    endTime,
    Day,
    isReview,
    repeated,
    expiredAfter,
    blockExpiresDay
}, columnIndex, index, delIconClick, editTodo }) => {
    const [isOver, setIsOver] = useState(false);

    const handleOnOver = () => setIsOver(true);
    const handleOnLeave = () => setIsOver(false);

    const cardStyle = {
        width: '100%',
        // display: 'inline-block',
        height: 'auto',
        background: color,
        marginBottom: '10px',
        padding: '10px 10px',
        borderRadius: '3px',
        cursor: 'pointer',
    };

    return (
        <div
            onMouseEnter={handleOnOver}
            onMouseLeave={handleOnLeave}
        >
            <Icon.Group>
                <div
                    className={`card`}
                    onClick={() => editTodo({ columnIndex, index, id, name })}
                    style={cardStyle}
                >
                    {name}
                    <Label tag>
                        {subject}
                    </Label>
                </div>
                {isOver ? (
                    <Icon
                        corner='top right'
                        name='delete'
                        size='massive'
                        color='red'
                        onClick={(event) => delIconClick(event, { columnIndex, index, id })}
                    />
                ) : (<></>)}
            </Icon.Group>
        </div>
    );
};

export default Card;
