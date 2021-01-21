import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { ItemTypes } from "./../../config";
import Card from "./Card";
import EmptyBlock from './EmptyBlock';
import Block from './Block';

const DraggableCard = (props) => {
    const [, dragRef, preview] = useDrag({
        item: { type: ((props.WEEK || props.SIDEBAR) ? ItemTypes.WEEK : ItemTypes.CARD), ...props }
    });

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [preview]);
    return (
        <>
            { props.SIDEBAR ? (
                <div ref={dragRef}>
                    <EmptyBlock {...props} />
                </div>
            ) : (props.WEEK ? (
                <div ref={dragRef}>
                    <Block {...props} />
                </div>
            ) : (
                    <div ref={dragRef}>
                        <Card {...props} />
                    </div>
                ))}
        </>
    )
};

export default DraggableCard;