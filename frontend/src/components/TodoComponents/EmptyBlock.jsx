import React, { useState } from "react";
import { Icon, Button, Label } from 'semantic-ui-react';

const cardStyle = (color) => {
    return {
        width: '8vw',
        wordBreak: 'break-all',
        height: 'auto',
        background: `${color}`,
        wordBreak: 'break-all',
        marginBottom: '10px',
        padding: '10px 10px',
        borderRadius: '3px',
        cursor: 'pointer',
    }
};

const tagStyle = {
    fontSize: '0.1em'
}

const Card = ({ task: {
    id,
    subject,
    color
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
                    onClick={() => editTodo({ columnIndex, index, id, subject })}
                    style={cardStyle(color)}
                >
                    <Label style={ tagStyle }>
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
