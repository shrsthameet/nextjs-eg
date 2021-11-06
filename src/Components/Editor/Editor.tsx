import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { FC } from 'react'

const editorConfiguration = {
  toolbar: {
    items: [
      'heading', '|',
      'bold', 'italic', '|',
      'link', '|',
      'outdent', 'indent', '|',
      'bulletedList', 'numberedList', '|',
      'blockQuote', '|',
      'undo', 'redo'
    ],
    shouldNotGroupWhenFull: true
  }
}

interface EditorProps {
    value: string
    handleChange: (event, editor) => void
}

const Editor: FC<EditorProps> = props => {
  const { value, handleChange } = props
  return (
    <div>
      <CKEditor
        config={editorConfiguration}
        editor={ClassicEditor}
        data={value}
        onChange={handleChange}
      />
    </div>
  )
}

export default Editor
