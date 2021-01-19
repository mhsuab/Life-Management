import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import HTML5backend from "react-dnd-html5-backend";
import { useQuery, useMutation } from '@apollo/react-hooks';
import Column from "./TodoComponents/Column";
import CustomDragLayer from "./TodoComponents/CustomDragLayer";
import './Todo.scss';

import { GET_TODOS } from './../graphql/index';
import { testTodos } from './../config';

const Todo = () => {
    // const [myTasks, moveMyTask] = useState(tasks);

    // const {loading, error, data} = useQuery(GET_TODOS);
    const loading = true;
    const data = { 'getTodo': testTodos }

    const parseQueryData = (todos) => {
        return [
            {
                title: 'Todo',
                tasks: todos.filter(todo => {
                    if (todo.category === 'Todo') return true;
                    else return false;
                })
            },
            {
                title: 'Doing',
                tasks: todos.filter(todo => {
                    if (todo.category === 'Doing') return true;
                    else return false;
                })
            },
            {
                title: 'Completed',
                tasks: todos.filter(todo => {
                    if (todo.category === 'Completed') return true;
                    else return false;
                })
            },
            {
                title: 'e',
                tasks: todos.filter(todo => {
                    if (todo.category === 'Todo') return true;
                    else return false;
                })
            },
            {
                title: 'a',
                tasks: todos.filter(todo => {
                    if (todo.category === 'Doing') return true;
                    else return false;
                })
            },
            {
                title: 'd',
                tasks: todos.filter(todo => {
                    if (todo.category === 'Completed') return true;
                    else return false;
                })
            },
            {
                title: 'd',
                tasks: todos.filter(todo => {
                    if (todo.category === 'Completed') return true;
                    else return false;
                })
            }
        ];
    }
    const t = parseQueryData(data.getTodo);

    const [myTasks, moveMyTask] = useState(t);

    const handleMoveMyTask = (from, to) => {
        // TODO: comunicate with backend `updateTodo`, if update successfully then run
        // TODO: else CRASH(server error?)
        const { task, columnIndex: fromColumnIndex, index } = from;
        console.log({ 'columnidx': fromColumnIndex })
        const { columnIndex: toColumnIndex } = to;
        console.log({
            from, to
        })

        const newMyTasks = [...myTasks];
        // remove task
        if (fromColumnIndex !== -1) newMyTasks[fromColumnIndex].tasks.splice(index, 1);
        // move task
        newMyTasks[toColumnIndex].tasks.push(task);
        moveMyTask(newMyTasks);
    };

    const delIconClick = (event, { columnIndex, index, id }) => {
        console.log('week')
        event.stopPropagation();
        // TODO: comunicate with backend `deleteTodo`, if delete successfully then run the following
        const newMyTasks = [...myTasks];
        newMyTasks[columnIndex].tasks.splice(index, 1);
        moveMyTask(newMyTasks);
    }
    const addTodo = (title) => {
        // TODO: comunicate with backend `addTodo`, if add successfully then run
        // TODO: trigger input form
        alert('add ' + title);
    }

    const editTodo = ({ columnIndex, index, id, name }) => {
        // TODO: comunicate with backend `updateTodo`, if update successfully then run
        // TODO: trigger input form
        alert('edit ' + name);
    }

    return (
        <DndProvider backend={HTML5backend}>
            <CustomDragLayer />
            <div className="task-board" style={{
                display: "grid",
                gridTemplateColumns: "14% 16% 14% 14% 14% 14% 14%",
                padding: '0px'
            }}>
                {
                    myTasks.map((tasks, columnIndex) => (
                        <Column
                            key={`column-week ${columnIndex}`}
                            {...{ tasks, columnIndex, handleMoveMyTask, delIconClick, addTodo, editTodo }}
                            WEEK
                        />
                    ))
                }
            </div>
        </DndProvider>
    );
}

export default Todo
