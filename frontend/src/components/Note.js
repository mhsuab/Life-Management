import React, { useState, useEffect } from 'react'
import { Form, TextArea } from 'semantic-ui-react'

function Note() {
  const [contents, setContents] = useState('')
  const [init, setInit] = useState(false)

  const writeInput = (msg) => {
    setContents(msg)
    //saveContents
    console.log(contents)
  }

  // useEffect(() => {
  //   if(!init) getContents()
  // })

  // const getContents = async () => {
  //   setInit(true)
  //   const res = await instance.get('/getContents')
  //   if (res.data.message === 'success') {
  //     setContents(res.data.contents)
  //   }
  // }

  return (
    <>
    <Form >
      <TextArea
        placeholder='Take some notes...'
        onInput={(e) => writeInput(e.target.value)}
        value={contents}
        style={{height:'100%', borderRadius: '3px', resize: 'none' }}
      />
    </Form>
    </>
  )
}

export default Note
