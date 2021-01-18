import { StylesProvider } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import Event from './Event'

const Todo = () => {
  const [contents, setContents] = useState('')
  const [init, setInit] = useState(false)

  const todoStyle = {
      background: "#FFFFFF",
      display: 'grid',
      gridTemplateColumns: 'auto auto auto',
      gridTemplateRows: '10% 90%',
      textAlign: 'center',
      borderRadius: '3px',
      gridGap: '3px',
      padding: '3px',
      border: '1px solid rgba(34, 36, 38, 0.15)'
  }

  return (
    <div style={todoStyle}>
        <div>TODO</div>
        <div>DOING</div>
        <div>COMPLETED</div>
        <Event color='yellow'/>
        <Event color='purple'/>
        <Event color='red'/>
    </div>
  )
}

export default Todo
