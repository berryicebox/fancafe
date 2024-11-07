import {Editor} from '@toast-ui/react-editor';
import '@toast-ui/editor/toastui-editor.css';
import {forwardRef} from 'react';
import instance from "./axios";
import axios from "axios";

let image;
const form = new FormData();

const WriteEditor = forwardRef((props, ref) => {

    const onUploadImage = async (blob, callback) => {
        try {
            console.log(blob);

            let filename
            let imageUrl

            const formData = new FormData();
            formData.append('image', blob);

            axios({
                url: 'http://localhost:8080/file/image-upload',
                method: 'POST',
                data: formData,
            }).then((response) => {
                console.log(response.data);
                imageUrl = `http://localhost:8080/file/image-print?filename=${response.data}`;
                callback(imageUrl, 'image alt attribute');
            }).catch((error) => {
                console.log(error)
            })


        } catch (error) {
            console.error(error);
        }


    };

    const handleSave = async () => {
        const editorInstance = ref.current.getInstance();
        const content = editorInstance.getMarkdown();
        const html = editorInstance.getHTML();

        console.log(html);
        console.log(content);


        if (content.length < 1) {
            alert('에디터 내용을 입력해 주세요.');
            throw new Error('editor content is required!');
        }

        const url = '/post/write';
        const params = {
            title: 'title',
            content: {html},
        }

        // 3. API 호출

        instance({
            url: url,
            method: 'POST',
            data: params,
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        });


    }

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
                hooks={{
                    addImageBlobHook: onUploadImage,
                }}
            />

        </>
    );
});

export default WriteEditor;