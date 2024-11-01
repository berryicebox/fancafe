import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/toastui-editor.css';
import { forwardRef } from 'react';

const WriteEditor = forwardRef((props, ref) => {

  return (
    <>
        <Editor
            ref={ref}
            initialValue=""
            previewStyle="vertical"
            height="600px"
            initialEditType="wysiwyg"
            useCommandShortcut={false}
            placeholder="글을 작성해주세요."
        />
    </>
  );
});

export default WriteEditor;