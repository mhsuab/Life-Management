import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { ItemTypes } from "./../../config";
import Card from "./Card";

const DraggableCard = (props) => {
    const [, dragRef, preview] = useDrag({
        item: { type: ItemTypes.CARD, ...props }
    });

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [preview]);

    return (
        <div ref={dragRef}>
            <Card {...props} />
        </div>
    );
};

export default DraggableCard;