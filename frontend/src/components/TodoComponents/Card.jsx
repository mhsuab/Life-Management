import React, { useState } from "react";
import { Icon, Label } from 'semantic-ui-react';

const cardStyle = (color) => {
    return {
        width: '21vw',
        height: 'auto',
        background: `${color}`,
        marginBottom: '10px',
        padding: '10px 10px',
        borderRadius: '3px',
        cursor: 'pointer',
        display: 'grid',
        gridTemplateRows: 'auto auto',
        gridGap: '3px',
    }
};

const textStyle = {
    wordBreak: 'break-all',
    mixBlendMode: 'difference',
    color: '#fff'
}

const tagStyle = {
    fontSize: '0.1em',
    float: 'left'
};

const deadLineStyle = {
    fontSize: '0.1em',
    float: 'right'
};

const Card = ({ task: {
    id,
    name,
    subject,
    color,
    deadLine
}, columnIndex, index, delIconClick, editTodo }, WEEK) => {
    if (color === '#607d8b') color = '#90afff';
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
                    <div style={textStyle}> {name} </div>
                    <Label.Group>
                        <Label style={tagStyle}>
                            {subject}
                        </Label>
                        {WEEK ? (
                            <Label color='red' style={deadLineStyle}>
                                DEADLINE : {deadLine}
                            </Label>
                        ): (<></>)}
                    </Label.Group>
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
