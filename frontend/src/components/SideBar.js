import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import HTML5backend from "react-dnd-html5-backend";
import Column from "./TodoComponents/Column";
import CustomDragLayer from "./TodoComponents/CustomDragLayer";
import './Todo.scss';

import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_EMPTY_BLOCKS, ADD_EMPTY_BLOCK, DELETE_EMPTY_BLOCK, UPDATE_EMPTY_BLOCK } from '../graphql'
import { AuthContext } from '../context/auth';
import { testTodos, testEmptyBlock } from './../config';


const Todo = () => {
    // const { user } = useContext(AuthContext)
    // const {  refetch } = useQuery(GET_TODOS)
    // const [ updateEmpty ] = useMutation(UPDATE_EMPTY_BLOCK)
    // const [ deleteEmpty ] = useMutation(DELETE_EMPTY_BLOCK)
    // const [ addEmpty ] = useMutation(ADD_EMPTY_BLOCK)
    const loading = true;
    const data = testEmptyBlock

    const parseQueryData = (todos) => {
        return {
            title: 'Todo',
            tasks: todos
        };
    }
    const [myTasks, moveMyTask] = useState(parseQueryData(data.getEmptyBlock));

    const handleMoveMyTask = (from, to) => {
        // TODO: comunicate with backend `updateTodo`, if update successfully then run
        // TODO: else CRASH(server error?)
        const { task, columnIndex: fromColumnIndex, index } = from;
        const { columnIndex: toColumnIndex } = to;

        const newMyTasks = [...myTasks];
        // remove task
        // newMyTasks[fromColumnIndex].tasks.splice(index, 1);
        // // move task
        // newMyTasks[toColumnIndex].tasks.push(task);
        moveMyTask(newMyTasks);
    };

    const delIconClick = (event, { index, id }) => {
        event.stopPropagation();
        // TODO: comunicate with backend `deleteTodo`, if delete successfully then run the following
        console.log('sidebar')
        const newMyTasks = [...myTasks];
        newMyTasks[0].tasks.splice(index, 1);
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
                width: '100%'
            }}>
                <Column
                    key={`column-week -1`}
                    {...{ tasks: myTasks, columnIndex: -1, handleMoveMyTask, delIconClick, addTodo, editTodo }}
                    SIDEBAR
                />
            </div>
        </DndProvider>
    );
}

export default Todo
