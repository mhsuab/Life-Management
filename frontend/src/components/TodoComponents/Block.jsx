import React, { useState } from "react";
import { Icon, Label } from 'semantic-ui-react';

const cardStyle = (color) => {
    return {
        width: '100%',
        // display: 'inline-block',
        height: 'auto',
        background: `${color}`,
        wordBreak: 'break-all',
        marginBottom: '10px',
        padding: '10px 10px',
        borderRadius: '3px',
        cursor: 'pointer',
        display: 'grid',
        gridTemplateRows: 'auto auto auto',
        gridGap: '3px'
    }
};

const tagStyle = {
    fontSize: '0.1em'
}

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

    return (
        <div
            onMouseEnter={handleOnOver}
            onMouseLeave={handleOnLeave}
        >
            <Icon.Group>
                <div
                    className={`card`}
                    onClick={() => editTodo({ columnIndex, index, id, name })}
                    style={cardStyle(color)}
                >
                    {name}
                    <Label style={tagStyle}>
                        {subject}
                    </Label>
                    <Label color='orange' style={tagStyle}>
                        DURATION : {startTime.toString().padStart(2, '0')}~{endTime.toString().padStart(2, '0')}
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
