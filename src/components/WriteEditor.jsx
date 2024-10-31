import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/toastui-editor.css';

const WriteEditor = () => {

  return (
    <>
        <Editor
            initalValue="작성하세요"
            previewStyle="vertical"
            height="600px"
            initialEditType="wysiwyg"
            useCommandShortcut={false}
        />
    </>
  );
};

export default WriteEditor;