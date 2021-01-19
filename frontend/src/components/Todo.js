import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import HTML5backend from "react-dnd-html5-backend";
import { useQuery, useMutation } from '@apollo/react-hooks';
import Column from "./TodoComponents/Column";
import CustomDragLayer from "./TodoComponents/CustomDragLayer";
import './Todo.scss';

// import { GET_TODOS } from './../../graphql/index';

const tasks = [
    {
        title: "todo",
        tasks: ["Read chapters for next class"]
    },
    {
        title: "doing",
        tasks: ["Complete in-class activity", "Brainsotrm project ideas", "Brainsotrm project ideas", "Brainsotrm project ideas"]
    },
    {
        title: "done",
        tasks: []
    }
];

// const columnStyle = {
//     display: 'grid',
//     align
// };

const Todo = () => {
    const [myTasks, moveMyTask] = useState(tasks);

    const {loading, error, data} = useQuery(GET_TODOS);

    const handleMoveMyTask = (from, to) => {
        const { task, columnIndex: fromColumnIndex, index } = from;
        const { columnIndex: toColumnIndex } = to;

        const newMyTasks = [...myTasks];
        // remove task
        newMyTasks[fromColumnIndex].tasks.splice(index, 1);
        // move task
        newMyTasks[toColumnIndex].tasks.push(task);
        moveMyTask(newMyTasks);
    };

    const columns = myTasks.map((tasks, columnIndex) => {
        const propsToColumn = { tasks, columnIndex, handleMoveMyTask };
        return <Column key={`column ${columnIndex}`} {...propsToColumn} />;
    });

    return (
        <DndProvider backend={HTML5backend}>
            <CustomDragLayer />
            <div className="task-board" style={{
                display: "grid",
                gridTemplateColumns: "33% 34% 33%",
                padding: '0px'
            }}>
                {
                    myTasks.map((tasks, columnIndex) => (
                        <Column key={`column ${columnIndex}`} {...{ tasks, columnIndex, handleMoveMyTask }} />
                    ))
                }
            </div>
        </DndProvider>
    );
}

export default Todo
