import { FC, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './editor.css';

const TextEditor: FC<any> = ({ value, setValue, placeholder }) => {
  const editorRef = useRef(null);
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['link', 'image'],
      [
        { list: 'bullet' },
        { list: 'ordered' },
        { indent: '-1' },
        { indent: '+1' },
      ],
    ],
  };
  return (
    <ReactQuill
      theme='snow'
      value={value}
      onChange={setValue}
      modules={modules}
      ref={editorRef}
      placeholder={placeholder}
    />
  );
};
export default TextEditor;
