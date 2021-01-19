import React, { useState } from "react";
import { Icon, Button } from 'semantic-ui-react';
import "./Card.scss";

const Card = ({ task, empty }) => {
    const [isOver, setIsOver] = useState(false);

    const handleOnOver = () => setIsOver(true);
    const handleOnLeave = () => setIsOver(false);

    return (
        <div
            onMouseEnter={handleOnOver}
            onMouseLeave={handleOnLeave}
        >
            <div className={`card ` + (empty ? "card--empty" : "")}>
                {task}
                {isOver ? (
                    <Icon name='delete' size='large' color='red' style={{ float: 'right' }} />
                ) : (<></>)}
            </div>
        </div>
    );
};

export default Card;
