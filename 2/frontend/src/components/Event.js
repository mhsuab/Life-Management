import React, { useState, useEffect } from 'react'
import { Message, Icon, Grid, Input, Button } from 'semantic-ui-react'
import './styles.css'
import 'semantic-ui-css/semantic.min.css'


const Event = (props) => {
  //edit = 1 => go to edit mode
  // const [edit, setEdit] = useState(false)
  // const [name, setName] = useState('')
  // const [deadLine, setDeadline] = useState([2020, 12, 14, 19, 16]); // 2020/12/14 19:16
  // const [date, setDate] = useState([2020, 12, 14]); // 2020/12/14
  // const [startTime, setStartTime] = useState([19, 16]); // 19:16
  // const [endTime, setEndTime] = useState([19, 16]); // 19:16
  // const [onCalendar, setOnCalendar] = useState(false)
  // const [review, setReview] = useState(false)
  // const [type, setType] = useState('')

  // const [color, setColor] = useState('')
  const {color} = props

  return (
    <div id="event-container">
      <Message color={color} style={{ height: 30, width: '100%', draggable: 'true', overflow: 'auto', padding:0}}>
        <Icon name='edit' style={{position: 'absolute', right: 10, top: 3.5, display: 'inline', width:1}} />
        event
      </Message>
    </div>
  )
}

export default Event;