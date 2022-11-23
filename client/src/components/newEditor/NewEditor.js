import { useState, useEffect } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { convertToRaw } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'


const NewEditor = ({ formFields, setFormFields }) => {

  const [ editorState, setEditorState ] = useState()

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
    setFormFields({ ...formFields, article: draftToHtml(convertToRaw(editorState.getCurrentContent())) })
  }

  return (
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={onEditorStateChange}
    />
  )
}
export default NewEditor