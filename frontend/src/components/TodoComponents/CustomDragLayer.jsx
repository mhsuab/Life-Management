import React from "react";
import { useDragLayer } from "react-dnd";
import { ItemTypes } from "./../../config";
import Card from "./Card";
import Block from './Block';

const layerStyles = {
    position: "fixed",
    pointerEvents: "none",
    zIndex: 100,
    left: 0,
    top: 0
};

function getItemStyles(initialOffset, currentOffset) {
    if (!initialOffset || !currentOffset) {
        return {
            display: "none"
        };
    }
    let { x, y } = currentOffset;
    const transform = `translate(${x}px, ${y}px) rotate(5deg)`;
    return {
        transform,
        WebkitTransform: transform
    };
}

const CustomDragLayer = () => {
    const {
        itemType,
        isDragging,
        item,
        initialOffset,
        currentOffset
    } = useDragLayer(monitor => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        initialOffset: monitor.getInitialSourceClientOffset(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging()
    }));
    function renderItem() {
        switch (itemType) {
            case ItemTypes.CARD:
                return <Card task={item.task} />;
            case ItemTypes.WEEK:
                return <Card task={item.task} WEEK/>;
            default:
                return null;
        }
    }
    if (!isDragging) {
        return null;
    }
    return (
        <div style={layerStyles}>
            <div style={getItemStyles(initialOffset, currentOffset)}>
                {renderItem()}
            </div>
        </div>
    );
};
export default CustomDragLayer;
