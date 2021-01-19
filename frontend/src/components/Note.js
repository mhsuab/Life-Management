import React, { useState, useEffect } from 'react'
import { Form, TextArea } from 'semantic-ui-react'
import { UPDATE_NOTE, GET_NOTES } from '../graphql'
import { useMutation } from '@apollo/react-hooks';
import { useForm } from '../util/hooks';

function Note() {
  //const [contents, setContents] = useState('')
  const { values, onChange } = useForm(() => {}, {
    msg: ''
  });
  // const { user } = useContext(AuthContext);

  const [updateNotes, { error }] = useMutation(UPDATE_NOTE, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: GET_NOTES
      });
      console.log(data)
      data.getNote = [result.data.updateNote, ...data.getNote];
      proxy.writeQuery({ query: GET_NOTES, data });
    },
    onError(err) {
      console.log(err)
    },
    variables: values,
  });

  const writeInput = (event) => {
    onChange(event)
    updateNotes();
  }

  return (
    <>
    <Form >
      <TextArea
        placeholder='Take some notes...'
        onInput={writeInput}
        name='msg'
        value={values.msg}
        style={{height:'100%', borderRadius: '3px', resize: 'none' }}
      />
    </Form>
    </>
  )
}

export default Note
