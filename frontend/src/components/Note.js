import React, { useState, useEffect } from 'react'
import { Form, TextArea } from 'semantic-ui-react'
import { UPDATE_NOTE, GET_NOTE } from '../graphql'
import { useMutation } from '@apollo/react-hooks';
import { useForm } from '../util/hooks';

function Note() {
  //const [contents, setContents] = useState('')
  const { values, onChange } = useForm(() => {}, {
    msg: ''
  });
  // const { user } = useContext(AuthContext);

  const [updateNotes] = useMutation(UPDATE_NOTE, {
    update(a, b, c, d, e, f) {
      console.log(a)
      console.log(b)
      console.log(c)
      console.log(d)
      console.log(e)
      console.log(f)
      //data.getNote = [result.data.updateNote, ...data.getNote];
      //proxy.writeQuery({ query: GET_NOTE, data });
    },
    onError(err) {
      console.log(err)
    },
    variables: values,
  });

  // const [updateNotes, { error }] = useMutation(UPDATE_NOTE, {
  //   update(proxy, result) {
  //     console.log('ddd')
  //     const data = proxy.readQuery({
  //       query: GET_NOTE
  //     });
  //     console.log('dee')
  //     console.log(data)
  //     //data.getNote = [result.data.updateNote, ...data.getNote];
  //     //proxy.writeQuery({ query: GET_NOTE, data });
  //   },
  //   onError(err) {
  //     console.log(err)
  //   },
  //   variables: values,
  // });

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
