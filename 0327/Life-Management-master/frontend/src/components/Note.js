import React, { useState, useEffect, useContext } from 'react'
import { Form, TextArea } from 'semantic-ui-react'
import { UPDATE_NOTE, GET_NOTE } from '../graphql'
import { useMutation, useQuery } from '@apollo/react-hooks';

import { AuthContext } from '../context/auth';

function Note() {
  const [ msg, setMsg ] = useState('')
  const { user } = useContext(AuthContext);

  const [ updateNote ] = useMutation(UPDATE_NOTE)
  const { refetch } = useQuery(GET_NOTE)

  useEffect(async () => {
    const d = await refetch()
    setMsg(d.data.getNote)
  }, [user])

  const writeInput = (event) => {
    setMsg(event.target.value)
    updateNote({ variables: { msg: event.target.value } })
  }

  return (
    <>
    <Form >
      <TextArea
        placeholder='Take some notes...'
        onInput={writeInput}
        value={msg}
        style={{height:'100%', borderRadius: '3px', resize: 'none' }}
      />
    </Form>
    </>
  )
}

export default Note
